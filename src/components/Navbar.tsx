import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User, LogOut, Settings } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const location = useLocation()
  const { user, isAuthenticated, isAdmin, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Blog', href: '/blog' },
    { name: 'Books', href: '/books' },
    { name: 'Donations', href: '/donations' },
  ]

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? 'bg-black/90 backdrop-blur-lg shadow-2xl py-4' 
        : 'bg-transparent py-6'
    }`}>
      <div className="container-max">
        <div className="flex justify-between items-center">
          <Link 
            to="/" 
            className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-300"
          >
            <span className="gradient-text-animated">Holy Covenant Church</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`relative text-white hover:text-blue-400 transition-all duration-300 font-medium group ${
                  location.pathname === item.href ? 'text-blue-400' : ''
                }`}
                style={{ '--stagger': index } as React.CSSProperties}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* User Menu */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-white hover:text-blue-400 transition-colors duration-300 magnetic-btn glass-card px-4 py-2 rounded-xl"
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User size={16} />
                  </div>
                  <span className="font-medium">{user?.name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-64 glass-card rounded-2xl shadow-2xl overflow-hidden animate-on-scroll">
                    <div className="p-4 border-b border-white/10">
                      <p className="text-white font-semibold">{user?.name}</p>
                      <p className="text-gray-400 text-sm">{user?.email}</p>
                      {isAdmin && (
                        <span className="inline-block mt-2 px-2 py-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white text-xs rounded-full">
                          Administrator
                        </span>
                      )}
                    </div>
                    <div className="p-2">
                      {isAdmin && (
                        <Link
                          to="/admin/dashboard"
                          className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/10 rounded-xl transition-colors"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <Settings size={16} />
                          <span>Admin Dashboard</span>
                        </Link>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:bg-red-500/10 rounded-xl transition-colors"
                      >
                        <LogOut size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/auth/signin"
                  className="text-white hover:text-blue-400 transition-colors duration-300 font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/signup"
                  className="btn-primary btn-enhanced magnetic-btn ripple"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-400 transition-colors duration-300 magnetic-btn"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden transition-all duration-500 overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <div className="pt-4 pb-3 space-y-1 bg-black/90 backdrop-blur-lg rounded-2xl mt-4 p-6">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block px-3 py-3 text-white hover:text-blue-400 transition-all duration-300 rounded-lg hover:bg-white/10 ${
                  location.pathname === item.href ? 'text-blue-400 bg-white/10' : ''
                }`}
                onClick={() => setIsOpen(false)}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: isOpen ? 'slideUp 0.5s ease-out forwards' : 'none'
                }}
              >
                {item.name}
              </Link>
            ))}
            
            {isAuthenticated ? (
              <div className="pt-4 border-t border-white/10">
                <div className="px-3 py-2 text-white">
                  <p className="font-semibold">{user?.name}</p>
                  <p className="text-gray-400 text-sm">{user?.email}</p>
                </div>
                {isAdmin && (
                  <Link
                    to="/admin/dashboard"
                    className="block px-3 py-3 text-white hover:text-blue-400 transition-all duration-300 rounded-lg hover:bg-white/10"
                    onClick={() => setIsOpen(false)}
                  >
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout()
                    setIsOpen(false)
                  }}
                  className="block w-full text-left px-3 py-3 text-red-400 hover:bg-red-500/10 transition-all duration-300 rounded-lg"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-white/10 space-y-2">
                <Link
                  to="/auth/signin"
                  className="block px-3 py-3 text-white hover:text-blue-400 transition-all duration-300 rounded-lg hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/signup"
                  className="block px-3 py-3 text-center bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-semibold"
                  onClick={() => setIsOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar