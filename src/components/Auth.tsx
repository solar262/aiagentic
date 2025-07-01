
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAntiAbuse } from "@/hooks/useAntiAbuse";
import { generateDeviceFingerprint, getClientIP } from "@/utils/deviceFingerprint";
import { Linkedin, Mail, Lock, User, AlertTriangle } from "lucide-react";

export const Auth = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { toast } = useToast();
  const { checkForDuplicateAccount, trackUserSession } = useAntiAbuse();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Check for duplicate accounts
      const isDuplicate = await checkForDuplicateAccount(email);
      
      if (isDuplicate) {
        toast({
          title: "Account Verification Required",
          description: "Multiple accounts detected. Phone verification will be required.",
          variant: "destructive",
        });
      }

      const fingerprint = generateDeviceFingerprint();
      const ip = await getClientIP();

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            device_fingerprint: fingerprint,
            signup_ip: ip,
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      if (error) throw error;

      // Create subscriber record with tracking info
      if (data.user) {
        await supabase.from('subscribers').insert({
          user_id: data.user.id,
          email: email,
          account_creation_ip: ip,
          is_flagged_duplicate: isDuplicate,
          verification_required: isDuplicate,
        });
      }

      toast({
        title: "Account created successfully!",
        description: isDuplicate 
          ? "Please check your email to verify your account. Phone verification will be required."
          : "Please check your email to verify your account.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // Track user session after successful login
      await trackUserSession();

      toast({
        title: "Welcome back!",
        description: "Successfully signed in to your account.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDemoAccess = async () => {
    setLoading(true);
    try {
      // Try to sign in first with the demo account
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: "demo.user@gmail.com",
        password: "demo123456",
      });

      if (signInError) {
        // If sign in fails, try to create the account
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: "demo.user@gmail.com",
          password: "demo123456",
          options: {
            data: {
              full_name: "Demo User",
            },
            emailRedirectTo: `${window.location.origin}/`
          }
        });

        if (signUpError) throw signUpError;

        toast({
          title: "Demo account created!",
          description: "Since email confirmation is required, please check the demo email or contact support for instant access.",
          variant: "default",
        });
      } else {
        // Track demo user session
        await trackUserSession();
        
        toast({
          title: "Demo access granted!",
          description: "Welcome to The Peoples Partner AI Assistant.",
        });
      }
    } catch (error: any) {
      console.error('Demo access error:', error);
      toast({
        title: "Demo Access Info",
        description: "For instant demo access, please use your own email to sign up or contact support.",
        variant: "default",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Linkedin className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">The Peoples Partner</h1>
          <p className="text-slate-600 mt-2">LinkedIn AI Assistant for HR Professionals</p>
        </div>

        <Card className="bg-white/80 backdrop-blur-sm border-slate-200 shadow-xl">
          <CardHeader>
            <CardTitle>Welcome to Your AI Assistant</CardTitle>
            <CardDescription>
              Streamline your LinkedIn outreach and build meaningful connections with HR decision-makers.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Anti-abuse notice */}
            <Alert className="mb-6 border-orange-200 bg-orange-50">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              <AlertDescription className="text-orange-800">
                <strong>Account Protection:</strong> We monitor for multiple accounts and may require phone verification for security.
              </AlertDescription>
            </Alert>

            {/* Demo Access Section */}
            <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h3 className="font-medium text-blue-900 mb-2">🚀 Quick Demo Access</h3>
              <p className="text-sm text-blue-700 mb-3">
                Try the AI features with a demo account (may require email confirmation)
              </p>
              <Button 
                onClick={handleDemoAccess} 
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                {loading ? "Accessing..." : "Access Demo"}
              </Button>
            </div>

            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="signin" className="space-y-4">
                <form onSubmit={handleSignIn} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signin-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        id="signin-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        id="signin-password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                    {loading ? "Signing in..." : "Sign In"}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup" className="space-y-4">
                <form onSubmit={handleSignUp} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        id="signup-name"
                        type="text"
                        placeholder="Your Full Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="Create a secure password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                  
                  <Button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700">
                    {loading ? "Creating account..." : "Create Account"}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>

            <Alert className="mt-6">
              <AlertDescription>
                Built specifically for The Peoples Partner to help Michelle Raymond and her team connect with HR professionals at companies with 100+ employees.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
