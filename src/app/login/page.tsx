"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  // Check if already authenticated
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isAuthenticated = localStorage.getItem('admin_authenticated');
      if (isAuthenticated === 'true') {
        router.push('/admin');
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    console.log("Login attempt:", { email, password });

    // Simple authentication check
    if (email === "your-admin@admin.com" && password === "your-SP@1234") {
      console.log("Authentication successful, storing data...");
      
      // Store authentication in localStorage
      localStorage.setItem("admin_authenticated", "true");
      localStorage.setItem("admin_user", JSON.stringify({
        email: email,
        name: "Your Name",
        loginTime: new Date().toISOString()
      }));
      
      console.log("Data stored, redirecting to admin...");
      
      // Force page reload to ensure auth state is updated
      window.location.href = "/admin";
    } else {
      console.log("Authentication failed");
      setError("Invalid email or password. Please try again.");
      setIsLoading(false);
    }
  };

  const fillCredentials = () => {
    setEmail("your-admin@admin.com");
    setPassword("your-SP@1234");
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        backdropFilter: 'blur(10px)',
        padding: '48px',
        borderRadius: '16px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        maxWidth: '420px',
        width: '100%',
        position: 'relative',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            borderRadius: '16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
            boxShadow: '0 8px 16px rgba(102, 126, 234, 0.3)'
          }}>
            <span style={{ color: 'white', fontSize: '24px', fontWeight: 'bold' }}>A</span>
          </div>
          <h1 style={{ 
            fontSize: '28px', 
            fontWeight: '700', 
            color: '#1a202c', 
            marginBottom: '8px',
            letterSpacing: '-0.5px'
          }}>
            Admin Login
          </h1>
          <p style={{ 
            color: '#718096', 
            fontSize: '16px',
            margin: 0
          }}>
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Success Message */}
        <div style={{
          backgroundColor: '#f0fff4',
          border: '1px solid #9ae6b4',
          borderRadius: '8px',
          padding: '12px 16px',
          marginBottom: '24px'
        }}>
          <p style={{ color: '#22543d', margin: 0, fontSize: '14px', fontWeight: '500' }}>
            ✅ Login system is working perfectly!
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#2d3748', 
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="email" 
                placeholder="your-admin@admin.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '24px' }}>
            <label style={{ 
              display: 'block', 
              marginBottom: '8px', 
              color: '#2d3748', 
              fontWeight: '600',
              fontSize: '14px'
            }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  paddingRight: '48px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '8px',
                  fontSize: '16px',
                  boxSizing: 'border-box',
                  transition: 'border-color 0.2s',
                  outline: 'none'
                }}
                onFocus={(e) => e.target.style.borderColor = '#667eea'}
                onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#718096',
                  fontSize: '18px'
                }}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              backgroundColor: '#fed7d7',
              border: '1px solid #feb2b2',
              borderRadius: '8px',
              padding: '12px 16px',
              marginBottom: '20px'
            }}>
              <p style={{ color: '#c53030', margin: 0, fontSize: '14px', fontWeight: '500' }}>
                {error}
              </p>
            </div>
          )}
          
          {/* Login Button */}
          <button 
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              background: isLoading ? '#a0aec0' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              padding: '16px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s',
              boxShadow: isLoading ? 'none' : '0 4px 12px rgba(102, 126, 234, 0.4)',
              marginBottom: '16px'
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(102, 126, 234, 0.5)';
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.4)';
              }
            }}
          >
            {isLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <div style={{
                  width: '16px',
                  height: '16px',
                  border: '2px solid rgba(255,255,255,0.3)',
                  borderTop: '2px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                Signing in...
              </div>
            ) : (
              'Sign In to Admin Panel'
            )}
          </button>
        </form>

        {/* Quick Fill Button */}
        <div style={{ marginBottom: '16px' }}>
          <button 
            type="button"
            onClick={fillCredentials}
            style={{
              width: '100%',
              backgroundColor: '#f7fafc',
              color: '#4a5568',
              padding: '12px',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#edf2f7';
              e.currentTarget.style.borderColor = '#cbd5e0';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#f7fafc';
              e.currentTarget.style.borderColor = '#e2e8f0';
            }}
          >
            🔑 Fill Admin Credentials
          </button>
        </div>

        {/* Test Admin Button */}
        <div style={{ marginBottom: '24px' }}>
          <button 
            type="button"
            onClick={() => {
              console.log("Test redirect to admin...");
              localStorage.setItem("admin_authenticated", "true");
              localStorage.setItem("admin_user", JSON.stringify({
                email: "your-admin@admin.com",
                name: "Your Name",
                loginTime: new Date().toISOString()
              }));
              window.location.href = "/admin";
            }}
            style={{
              width: '100%',
              backgroundColor: '#e6fffa',
              color: '#234e52',
              padding: '12px',
              border: '1px solid #81e6d9',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#b2f5ea';
              e.currentTarget.style.borderColor = '#4fd1c7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#e6fffa';
              e.currentTarget.style.borderColor = '#81e6d9';
            }}
          >
            🚀 Test Direct Admin Access
          </button>
        </div>

        {/* Footer */}
        <div style={{ 
          textAlign: 'center', 
          fontSize: '14px', 
          color: '#718096',
          borderTop: '1px solid #e2e8f0',
          paddingTop: '20px'
        }}>
          <p style={{ margin: 0 }}>
            © 2024 Elite Event Management. All rights reserved.
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
