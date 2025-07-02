import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const SignIn = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const from = location.state?.from?.pathname || '/'

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true })
    }
  }, [isAuthenticated, navigate, from])

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate')
        }
      })
    }, observerOptions)

    const elements = document.querySelectorAll('.animate-on-scroll')
    elements.forEach((el) => observer.observe(el))

    return () => observer.disconnect()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const result = await login(email, password)
    
    if (result.success) {
      navigate(from, { replace: true })
    } else {
      setError(result.error || 'Login failed')
    }
    
    setIsLoading(false)
  }

  return (
    <div className="pt-24 min-h-screen bg-black flex items-center justify-center page-transition">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20" />
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400/20 rounded-full floating"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-auto px-6">
        <div className="glass-card p-8 animate-on-scroll">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl mb-6 mx-auto w-fit pulse-glow">
              <Lock className="text-white" size={32} />
            </div>
            <h1 className="text-4xl font-black text-white mb-4 gradient-text-animated">
              Welcome Back
            </h1>
            <p className="text-gray-400 text-lg">
              Sign in to your account to continue your faith journey
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="animate-on-scroll" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="animate-on-scroll bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full btn-primary btn-enhanced magnetic-btn ripple py-4 text-lg flex items-center justify-center space-x-2 animate-on-scroll"
              style={{ animationDelay: '0.3s' }}
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center animate-on-scroll" style={{ animationDelay: '0.4s' }}>
            <p className="text-gray-400">
              Don't have an account?{' '}
              <Link 
                to="/auth/signup" 
                className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
              >
                Sign up here
              </Link>
            </p>
          </div>

          <div className="mt-8 p-4 glass-card rounded-xl animate-on-scroll" style={{ animationDelay: '0.5s' }}>
            <div className="flex items-center space-x-2 mb-3">
              <Sparkles className="text-blue-400" size={16} />
              <span className="text-blue-400 font-semibold text-sm">Demo Credentials</span>
            </div>
            <div className="text-sm text-gray-400 space-y-1">
              <p><strong>Admin:</strong> admin@church.com / admin123</p>
              <p><strong>User:</strong> Create a new account or use existing</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn