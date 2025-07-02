import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, ArrowRight, Clock } from 'lucide-react'
import { useData } from '../contexts/DataContext'

const Blog = () => {
  const { blogPosts } = useData()

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

  return (
    <div className="pt-24 min-h-screen bg-black page-transition">
      <div className="container-max section-padding">
        <div className="text-center mb-16 animate-on-scroll">
          <h1 className="text-6xl font-black text-white mb-6 gradient-text-animated">
            Our Blog
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover inspiring articles, devotionals, and insights to strengthen your faith journey.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="animate-on-scroll glass-card overflow-hidden card-hover group"
              style={{ '--stagger': index } as React.CSSProperties}
            >
              <div className="relative overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Article
                </div>
              </div>
              
              <div className="p-6">
                <h2 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                  <div className="flex items-center space-x-2">
                    <User size={16} />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar size={16} />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
                
                <Link
                  to={`/blog/${post.id}`}
                  className="btn-primary btn-enhanced magnetic-btn ripple group inline-flex items-center space-x-2 w-full justify-center"
                >
                  <Clock size={16} />
                  <span>Read More</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        {blogPosts.length === 0 && (
          <div className="text-center py-20 animate-on-scroll">
            <div className="glass-card p-12 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">No Posts Yet</h3>
              <p className="text-gray-400">Check back soon for inspiring content!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Blog