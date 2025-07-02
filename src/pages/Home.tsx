import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Play, Calendar, MapPin, BookOpen, Heart, Users, ArrowRight, Sparkles } from 'lucide-react'
import { useData } from '../contexts/DataContext'
import SermonModal from '../components/SermonModal'

const Home = () => {
  const { sermons, events } = useData()
  const [selectedSermon, setSelectedSermon] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

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

  const handleSermonClick = (sermon: any) => {
    setSelectedSermon(sermon)
    setIsModalOpen(true)
  }

  const scrollToJoinUs = () => {
    document.getElementById('join-us')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div className="page-transition">
      {/* Cursor follower */}
      <div 
        className="fixed w-4 h-4 bg-blue-500/30 rounded-full pointer-events-none z-50 transition-all duration-100 ease-out"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transform: 'scale(1)',
        }}
      />

      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Animated background */}
        <div className="absolute inset-0">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"
            style={{
              backgroundImage: 'url(https://images.pexels.com/photos/8468/cross-sunset-sunrise-hill.jpg?auto=compress&cs=tinysrgb&w=1920)',
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          />
          <div className="absolute inset-0 bg-black/60" />
          
          {/* Floating particles */}
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
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

        <div className="relative z-10 text-center text-white container-max px-6">
          <div className="animate-on-scroll">
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-tight">
              <span className="block text-reveal">
                <span style={{ animationDelay: '0.1s' }}>WELCOME</span>
              </span>
              <span className="block text-reveal">
                <span style={{ animationDelay: '0.2s' }}>TO</span>
              </span>
              <span className="block gradient-text-animated text-reveal">
                <span style={{ animationDelay: '0.3s' }}>HOLY COVENANT</span>
              </span>
              <span className="block text-reveal">
                <span style={{ animationDelay: '0.4s' }}>CHURCH</span>
              </span>
            </h1>
          </div>
          
          <div className="animate-on-scroll" style={{ animationDelay: '0.6s' }}>
            <p className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed text-gray-300">
              A place where faith meets community, and hearts are transformed by God's love
            </p>
          </div>
          
          <div className="animate-on-scroll flex flex-col sm:flex-row gap-6 justify-center" style={{ animationDelay: '0.8s' }}>
            <Link 
              to="/donations" 
              className="btn-primary btn-enhanced magnetic-btn ripple glow-effect group"
            >
              <span className="flex items-center space-x-2">
                <Heart size={20} />
                <span>Give</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
            <button 
              onClick={scrollToJoinUs}
              className="btn-secondary btn-enhanced magnetic-btn ripple group"
            >
              <span className="flex items-center space-x-2">
                <Sparkles size={20} />
                <span>Join Us</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        </div>
        
        <div className="container-max relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-on-scroll">
              <div className="relative group">
                <img
                  src="https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Church community"
                  className="rounded-3xl shadow-2xl card-3d group-hover:shadow-blue-500/20 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
            
            <div className="animate-on-scroll text-white">
              <h2 className="text-5xl font-black mb-8 gradient-text-animated">
                ABOUT US
              </h2>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Holy Covenant Church has been serving our community for over 50 years. 
                We are a diverse congregation united by our love for Jesus Christ and 
                our commitment to spreading His message of hope, love, and redemption.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-10">
                Our mission is to create a welcoming environment where people can 
                encounter God, grow in their faith, and serve others with compassion.
              </p>
              <Link 
                to="/blog" 
                className="btn-primary btn-enhanced magnetic-btn ripple group inline-flex items-center space-x-2"
              >
                <span>Learn More</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Sermons */}
      <section className="section-padding bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 to-purple-900/10" />
        </div>
        
        <div className="container-max relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl font-black text-white mb-6 gradient-text-animated">
              RECENT SERMONS
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Watch our latest messages and grow in your faith journey
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {sermons.slice(0, 3).map((sermon, index) => (
              <div
                key={sermon.id}
                className="animate-on-scroll card-hover glass-card p-6 cursor-pointer group"
                style={{ '--stagger': index } as React.CSSProperties}
                onClick={() => handleSermonClick(sermon)}
              >
                <div className="relative overflow-hidden rounded-2xl mb-6">
                  <img
                    src={sermon.thumbnail}
                    alt={sermon.title}
                    className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 pulse-glow">
                      <Play className="text-white" size={32} />
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    New
                  </div>
                </div>
                
                <div className="text-white">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">
                    {sermon.title}
                  </h3>
                  <p className="text-gray-400 mb-4 line-clamp-2">
                    {sermon.description}
                  </p>
                  <div className="flex justify-between text-sm text-gray-500">
                    <span className="font-medium">{sermon.pastor}</span>
                    <span>{new Date(sermon.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-gradient-to-br from-gray-900 to-black relative overflow-hidden">
        <div className="container-max relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl font-black text-white mb-6 gradient-text-animated">
              EXPLORE
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Discover all the ways you can connect and grow with us
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/blog"
              className="animate-on-scroll glass-card p-8 card-hover group"
              style={{ '--stagger': 0 } as React.CSSProperties}
            >
              <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-4 rounded-2xl mb-6 w-fit group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                BLOG
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Read inspiring articles, devotionals, and insights from our pastoral team.
              </p>
              <div className="mt-6 flex items-center text-blue-400 group-hover:translate-x-2 transition-transform">
                <span className="font-semibold">Read More</span>
                <ArrowRight size={16} className="ml-2" />
              </div>
            </Link>

            <div className="animate-on-scroll glass-card p-8 card-hover group" style={{ '--stagger': 1 } as React.CSSProperties}>
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-4 rounded-2xl mb-6 w-fit group-hover:scale-110 transition-transform duration-300">
                <Users className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-400 transition-colors">
                EVENTS
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Join us for special events, community gatherings, and fellowship opportunities.
              </p>
              <div className="mt-6 flex items-center text-purple-400">
                <span className="font-semibold">Coming Soon</span>
                <Sparkles size={16} className="ml-2" />
              </div>
            </div>

            <Link
              to="/books"
              className="animate-on-scroll glass-card p-8 card-hover group"
              style={{ '--stagger': 2 } as React.CSSProperties}
            >
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-4 rounded-2xl mb-6 w-fit group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-green-400 transition-colors">
                BOOKS
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Discover inspiring books and resources to deepen your faith journey.
              </p>
              <div className="mt-6 flex items-center text-green-400 group-hover:translate-x-2 transition-transform">
                <span className="font-semibold">Shop Now</span>
                <ArrowRight size={16} className="ml-2" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="section-padding bg-black relative overflow-hidden">
        <div className="container-max relative z-10">
          <div className="text-center mb-16 animate-on-scroll">
            <h2 className="text-5xl font-black text-white mb-6 gradient-text-animated">
              VISIT US
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Come and experience worship with our community
            </p>
          </div>
          
          <div className="animate-on-scroll">
            <div className="glass-card rounded-3xl overflow-hidden card-hover">
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 h-96 flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20" />
                <div className="text-center text-white relative z-10">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-full mb-6 mx-auto w-fit pulse-glow">
                    <MapPin className="text-white" size={48} />
                  </div>
                  <h3 className="text-3xl font-bold mb-4">Find Us Here</h3>
                  <p className="text-gray-300 text-lg mb-2">123 Church Street, City, State 12345</p>
                  <p className="text-blue-400 font-semibold">Sunday Service: 10:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sermon Modal */}
      {selectedSermon && (
        <SermonModal
          sermon={selectedSermon}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false)
            setSelectedSermon(null)
          }}
        />
      )}
    </div>
  )
}

export default Home