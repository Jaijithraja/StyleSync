import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import TwinklingStars from '@/components/TwinklingStars';

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle, signInWithApple } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await signIn(email, password);
      if (error) {
        toast({
          title: "Login Failed",
          description: error.message,
          variant: "destructive",
        });
      } else if (data?.user) {
        toast({
          title: "Success",
          description: "Welcome back!",
        });
        navigate('/home');
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast({
          title: "Google Sign In Not Available",
          description: "Please use email/password to sign in. Google sign-in can be enabled in Supabase settings.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setLoading(true);
    try {
      const { error } = await signInWithApple();
      if (error) {
        toast({
          title: "Apple Sign In Not Available",
          description: "Please use email/password to sign in. Apple sign-in can be enabled in Supabase settings.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gradient-start to-gradient-end relative flex flex-col items-center justify-center p-6">
      <TwinklingStars count={15} />
      
      <div className="w-full max-w-sm space-y-8 animate-fade-in">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground tracking-wider mb-2">
            STYLESYNC
            <span className="absolute ml-1 -mt-2 text-lg">✦</span>
          </h1>
        </div>

        <div className="space-y-6">
          <div className="space-y-4">
            <Input
              type="email"
              placeholder="Username/Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-white/80 border-border rounded-lg"
            />
            
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 bg-white/80 border-border rounded-lg pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <div className="text-left">
            <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Forgot Password?
            </button>
          </div>

          <Button 
            onClick={handleLogin}
            disabled={loading}
            className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground font-medium rounded-lg"
          >
            {loading ? "Signing In..." : "LOG IN"}
          </Button>

          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{' '}
              <button 
                onClick={handleSignUp}
                className="text-primary hover:underline"
              >
                Sign Up
              </button>
            </p>

            <div className="space-y-3">
              <Button
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full h-12 bg-black text-white hover:bg-black/90 border-0 rounded-lg"
              >
                <span className="mr-2">G</span>
                Sign In with Google
              </Button>
              
              <Button
                variant="outline"
                onClick={handleAppleSignIn}
                disabled={loading}
                className="w-full h-12 bg-black text-white hover:bg-black/90 border-0 rounded-lg"
              >
                <img 
                  src="/assets/apple.png" 
                  alt="Apple"
                  className="w-5 h-5 mr-2"
                />
                Sign In with Apple
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;