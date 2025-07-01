
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Phone, Shield } from "lucide-react";

interface PhoneVerificationProps {
  onVerified: () => void;
  required?: boolean;
}

export const PhoneVerification = ({ onVerified, required = false }: PhoneVerificationProps) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [step, setStep] = useState<'phone' | 'code'>('phone');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const sendVerificationCode = async () => {
    if (!phoneNumber.match(/^\+?[\d\s-()]+$/)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      // In a real app, you'd integrate with SMS service like Twilio
      // For demo purposes, we'll use a mock verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user profile with phone number
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({ phone_number: phoneNumber })
          .eq('id', user.id);

        if (error) throw error;
      }

      setStep('code');
      toast({
        title: "Verification Code Sent",
        description: "Please check your phone for the verification code. (Demo: use 123456)",
      });
    } catch (error) {
      console.error('Phone verification error:', error);
      toast({
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyCode = async () => {
    if (verificationCode !== "123456") {
      toast({
        title: "Invalid Code",
        description: "Please enter the correct verification code.",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { error } = await supabase
          .from('profiles')
          .update({ 
            phone_verified: true,
            phone_verified_at: new Date().toISOString()
          })
          .eq('id', user.id);

        if (error) throw error;

        // Update subscriber record to remove flagged status
        await supabase
          .from('subscribers')
          .update({ 
            is_flagged_duplicate: false,
            verification_required: false
          })
          .eq('user_id', user.id);
      }

      toast({
        title: "Phone Verified!",
        description: "Your phone number has been successfully verified.",
      });
      
      onVerified();
    } catch (error) {
      console.error('Code verification error:', error);
      toast({
        title: "Error",
        description: "Failed to verify code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Phone Verification
          {required && <span className="text-red-500">*</span>}
        </CardTitle>
        <CardDescription>
          {required 
            ? "Phone verification is required to continue using the service."
            : "Verify your phone number to unlock full features and prevent account restrictions."
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {step === 'phone' ? (
          <>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+1 (555) 123-4567"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <Button 
              onClick={sendVerificationCode} 
              disabled={loading || !phoneNumber}
              className="w-full"
            >
              {loading ? "Sending..." : "Send Verification Code"}
            </Button>
          </>
        ) : (
          <>
            <Alert>
              <AlertDescription>
                Enter the 6-digit code sent to {phoneNumber}
                <br />
                <strong>Demo code: 123456</strong>
              </AlertDescription>
            </Alert>
            
            <div className="space-y-2">
              <Label htmlFor="code">Verification Code</Label>
              <Input
                id="code"
                type="text"
                placeholder="123456"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                maxLength={6}
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setStep('phone')}
                className="flex-1"
              >
                Back
              </Button>
              <Button 
                onClick={verifyCode} 
                disabled={loading || verificationCode.length !== 6}
                className="flex-1"
              >
                {loading ? "Verifying..." : "Verify"}
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
};
