import React, { useEffect } from 'react'
import { ShoppingCart, Star, ArrowRight, BookOpen } from 'lucide-react'
import { useData } from '../contexts/DataContext'

const Books = () => {
  const { books } = useData()

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

  const handlePurchase = (book: any) => {
    alert(`Thank you for your interest in "${book.title}"! This would redirect to a payment processor in a real application.`)
  }

  return (
    <div className="pt-24 min-h-screen bg-black page-transition">
      <div className="container-max section-padding">
        <div className="text-center mb-16 animate-on-scroll">
          <h1 className="text-6xl font-black text-white mb-6 gradient-text-animated">
            Our Books
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Discover inspiring books and resources to deepen your faith journey and grow in your relationship with God.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {books.map((book, index) => (
            <div
              key={book.id}
              className="animate-on-scroll glass-card overflow-hidden card-hover group"
              style={{ '--stagger': index } as React.CSSProperties}
            >
              <div className="relative overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Star size={12} fill="currentColor" />
                  <span>Featured</span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                  {book.title}
                </h3>
                <p className="text-blue-400 font-medium mb-4 flex items-center space-x-2">
                  <BookOpen size={16} />
                  <span>by {book.author}</span>
                </p>
                <p className="text-gray-400 mb-6 line-clamp-3 leading-relaxed">
                  {book.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-green-400">
                    ${book.price}
                  </span>
                  <button
                    onClick={() => handlePurchase(book)}
                    className="btn-primary btn-enhanced magnetic-btn ripple group flex items-center space-x-2"
                  >
                    <ShoppingCart size={18} />
                    <span>Purchase</span>
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {books.length === 0 && (
          <div className="text-center py-20 animate-on-scroll">
            <div className="glass-card p-12 max-w-md mx-auto">
              <h3 className="text-2xl font-bold text-white mb-4">No Books Available</h3>
              <p className="text-gray-400">Check back soon for inspiring reads!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Books