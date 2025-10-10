"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { login, isAuthenticated } = useAuth();

  // Check if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/admin');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    console.log("Login attempt:", { email, password });

    try {
      const success = await login(email, password);
      if (success) {
        console.log("Authentication successful, redirecting...");
        // Use window.location for hard redirect to ensure layout re-renders
        window.location.href = '/admin';
      } else {
        console.log("Authentication failed");
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-motorcycle-dark flex items-center justify-center p-5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 opacity-50"></div>
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_1px_1px,rgba(255,211,45,0.15)_1px,transparent_0)] bg-[length:40px_40px]"></div>
      </div>

      <div className="bg-motorcycle-card backdrop-blur-lg p-8 rounded-3xl shadow-professional-lg max-w-md w-full relative z-10 border-2 border-motorcycle-yellow card-professional">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-motorcycle-yellow to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg card-professional">
            <span className="text-black text-2xl font-bold">A</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-yellow-200 to-yellow-400 bg-clip-text text-transparent mb-2">
            Admin Login
          </h1>
          <p className="text-motorcycle-white/80 text-sm">
            Sign in to access the admin dashboard
          </p>
        </div>


        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-motorcycle-white font-semibold text-sm">
              Email Address
            </label>
            <input 
              type="email" 
              placeholder="admin@spevents.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border-2 border-motorcycle-yellow rounded-xl text-motorcycle-white bg-motorcycle-dark focus:ring-2 focus:ring-motorcycle-yellow focus:border-motorcycle-yellow transition-all duration-300 placeholder:text-motorcycle-white/50"
              required
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2 text-motorcycle-white font-semibold text-sm">
              Password
            </label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 pr-12 border-2 border-motorcycle-yellow rounded-xl text-motorcycle-white bg-motorcycle-dark focus:ring-2 focus:ring-motorcycle-yellow focus:border-motorcycle-yellow transition-all duration-300 placeholder:text-motorcycle-white/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-motorcycle-white/70 hover:text-motorcycle-yellow transition-colors duration-300 text-lg"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/20 border-2 border-red-500 rounded-xl p-4 mb-5 backdrop-blur-sm">
              <p className="text-red-400 text-sm font-semibold m-0">
                {error}
              </p>
            </div>
          )}
          
          {/* Login Button */}
          <button 
            type="submit"
            disabled={isLoading}
            className={`w-full p-4 rounded-xl text-base font-bold transition-all duration-300 mb-5 ${
              isLoading 
                ? 'bg-gray-500 cursor-not-allowed' 
                : 'btn-primary hover:scale-105 shadow-lg hover:shadow-2xl'
            }`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Signing in...
              </div>
            ) : (
              '🔐 Sign In to Admin Panel'
            )}
          </button>
        </form>


        {/* Footer */}
        <div className="text-center text-sm text-motorcycle-white/60 border-t border-motorcycle-yellow/30 pt-5">
          <p className="m-0">
            © 2024 SP Events. All rights reserved.
          </p>
        </div>
      </div>

      {/* CSS Animation */}
      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
