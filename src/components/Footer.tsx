import React, { useState } from 'react'
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Send } from 'lucide-react'

const Footer = () => {
  const [email, setEmail] = useState('')
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail('')
      setTimeout(() => setIsSubscribed(false), 3000)
    }
  }

  return (
    <footer className="bg-black text-white relative overflow-hidden">
      {/* Newsletter Section */}
      <div id="join-us" className="bg-gradient-to-br from-gray-900 to-black py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        
        <div className="container-max relative z-10">
          <div className="text-center animate-on-scroll">
            <h3 className="text-4xl font-bold mb-6 gradient-text-animated">Join Our Community</h3>
            <p className="text-gray-400 mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
              Subscribe to our newsletter to receive updates about upcoming events, sermons, and community news.
            </p>
            
            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="glass-card p-2 rounded-2xl">
                <div className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                    required
                  />
                  <button
                    type="submit"
                    className="btn-primary btn-enhanced magnetic-btn ripple flex items-center space-x-2"
                  >
                    <Send size={18} />
                    <span>Join</span>
                  </button>
                </div>
              </div>
            </form>
            
            {isSubscribed && (
              <div className="mt-6 animate-on-scroll">
                <p className="text-green-400 font-semibold">Thank you for subscribing! 🎉</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="py-16 bg-black">
        <div className="container-max">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Church Info */}
            <div className="col-span-1 md:col-span-2 animate-on-scroll">
              <h3 className="text-3xl font-bold mb-6 gradient-text-animated">
                Holy Covenant Church
              </h3>
              <p className="text-gray-400 mb-8 leading-relaxed text-lg">
                A community of believers dedicated to worship, fellowship, and service. 
                Join us as we grow together in faith and love.
              </p>
              <div className="flex space-x-4">
                {[
                  { icon: Facebook, href: '#', color: 'hover:text-blue-500' },
                  { icon: Twitter, href: '#', color: 'hover:text-blue-400' },
                  { icon: Instagram, href: '#', color: 'hover:text-pink-500' }
                ].map(({ icon: Icon, href, color }, index) => (
                  <a 
                    key={index}
                    href={href} 
                    className={`text-gray-500 ${color} transition-all duration-300 p-3 rounded-full hover:bg-white/10 magnetic-btn`}
                  >
                    <Icon size={24} />
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="animate-on-scroll" style={{ animationDelay: '0.1s' }}>
              <h4 className="text-xl font-bold mb-6 text-white">Contact</h4>
              <div className="space-y-4">
                {[
                  { icon: MapPin, text: '123 Church Street, City, State 12345' },
                  { icon: Phone, text: '(555) 123-4567' },
                  { icon: Mail, text: 'info@holycovenantchurch.com' }
                ].map(({ icon: Icon, text }, index) => (
                  <div key={index} className="flex items-start space-x-3 group">
                    <Icon size={18} className="text-blue-400 mt-1 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-400 group-hover:text-white transition-colors">{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Times */}
            <div className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
              <h4 className="text-xl font-bold mb-6 text-white">Service Times</h4>
              <div className="space-y-3">
                {[
                  'Sunday Service: 10:00 AM',
                  'Wednesday Prayer: 7:00 PM',
                  'Youth Group: Friday 7:00 PM'
                ].map((time, index) => (
                  <p key={index} className="text-gray-400 hover:text-white transition-colors cursor-default">
                    {time}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center animate-on-scroll">
            <p className="text-gray-500">
              &copy; 2024 Holy Covenant Church. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer