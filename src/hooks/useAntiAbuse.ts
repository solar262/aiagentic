
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { generateDeviceFingerprint, getClientIP } from "@/utils/deviceFingerprint";
import { useToast } from "@/hooks/use-toast";

export const useAntiAbuse = () => {
  const [isTracking, setIsTracking] = useState(false);
  const [requiresVerification, setRequiresVerification] = useState(false);
  const { toast } = useToast();

  const trackUserSession = async () => {
    try {
      setIsTracking(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) return;

      const fingerprint = generateDeviceFingerprint();
      const ip = await getClientIP();

      // Track device fingerprint
      const { error: fingerprintError } = await supabase
        .from('device_fingerprints')
        .upsert({
          fingerprint_hash: fingerprint,
          ip_address: ip,
          user_agent: navigator.userAgent,
          last_seen_at: new Date().toISOString(),
        }, {
          onConflict: 'fingerprint_hash',
          ignoreDuplicates: false
        });

      if (fingerprintError) {
        console.error('Fingerprint tracking error:', fingerprintError);
      }

      // Track user session
      const { error: sessionError } = await supabase
        .from('user_sessions')
        .insert({
          user_id: user.id,
          ip_address: ip,
          fingerprint_hash: fingerprint,
        });

      if (sessionError) {
        console.error('Session tracking error:', sessionError);
      }

      // Check if user needs verification
      const { data: limits } = await supabase.rpc('get_adjusted_usage_limits', {
        user_uuid: user.id
      });

      if (limits && limits.length > 0) {
        setRequiresVerification(limits[0].requires_verification);
        
        if (limits[0].requires_verification) {
          toast({
            title: "Account Verification Required",
            description: "Please verify your phone number to continue using the service.",
            variant: "destructive",
          });
        }
      }

    } catch (error) {
      console.error('Anti-abuse tracking error:', error);
    } finally {
      setIsTracking(false);
    }
  };

  const checkForDuplicateAccount = async (email: string): Promise<boolean> => {
    try {
      const fingerprint = generateDeviceFingerprint();
      const ip = await getClientIP();

      const { data, error } = await supabase.rpc('detect_duplicate_account', {
        user_email: email,
        user_ip: ip,
        device_fingerprint: fingerprint
      });

      if (error) {
        console.error('Duplicate check error:', error);
        return false;
      }

      return data || false;
    } catch (error) {
      console.error('Duplicate account check failed:', error);
      return false;
    }
  };

  return {
    trackUserSession,
    checkForDuplicateAccount,
    isTracking,
    requiresVerification,
  };
};
