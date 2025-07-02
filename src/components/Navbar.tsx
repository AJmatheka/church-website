import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

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
          <div className="hidden md:flex space-x-8">
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
          isOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
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
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar