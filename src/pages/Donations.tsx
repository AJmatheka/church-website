import React, { useState, useEffect } from 'react'
import { Heart, Users, BookOpen, Home, CreditCard, Smartphone, Building, ArrowRight, Target } from 'lucide-react'
import { useData } from '../contexts/DataContext'

const Donations = () => {
  const { donationMetrics } = useData()
  const [selectedCause, setSelectedCause] = useState<string | null>(null)
  const [amount, setAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('card')

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

  const getIcon = (iconName: string) => {
    const icons: { [key: string]: any } = {
      Home,
      Users,
      Heart,
      Building,
      BookOpen,
      Target
    }
    return icons[iconName] || Target
  }

  const activeCauses = donationMetrics.filter(metric => metric.isActive)

  const handleDonate = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedCause && amount) {
      const cause = activeCauses.find(c => c.id === selectedCause)
      alert(`Thank you for your generous donation of $${amount} to ${cause?.title}! This would process the payment in a real application.`)
      setAmount('')
      setSelectedCause(null)
    }
  }

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-cream-50 via-sage-100 to-earth-100 page-transition">
      <div className="container-max section-padding">
        <div className="text-center mb-16 animate-on-scroll">
          <h1 className="text-6xl font-black text-sage-900 mb-6 gradient-text-animated">
            Give Back
          </h1>
          <p className="text-xl text-sage-700 max-w-3xl mx-auto leading-relaxed">
            Your generous donations help us continue our mission of spreading God's love and serving our community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Causes */}
          <div className="animate-on-scroll">
            <h2 className="text-4xl font-bold text-sage-900 mb-8 flex items-center space-x-3">
              <Target className="text-sage-600" />
              <span>Choose a Cause</span>
            </h2>
            
            <div className="space-y-6">
              {activeCauses.map((cause, index) => {
                const Icon = getIcon(cause.icon)
                const progress = (cause.raised / cause.goal) * 100
                
                return (
                  <div
                    key={cause.id}
                    className={`glass-card p-6 cursor-pointer card-hover group ${
                      selectedCause === cause.id 
                        ? 'ring-2 ring-sage-500 glow-effect' 
                        : ''
                    }`}
                    onClick={() => setSelectedCause(cause.id)}
                    style={{ '--stagger': index } as React.CSSProperties}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`bg-gradient-to-br ${cause.color} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className="text-white" size={24} />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-sage-900 mb-2 group-hover:text-sage-700 transition-colors">
                          {cause.title}
                        </h3>
                        <p className="text-sage-600 mb-4 leading-relaxed">
                          {cause.description}
                        </p>
                        
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm text-sage-600">
                            <span>Raised: ${cause.raised.toLocaleString()}</span>
                            <span>Goal: ${cause.goal.toLocaleString()}</span>
                          </div>
                          
                          <div className="w-full bg-sage-200 rounded-full h-3 overflow-hidden">
                            <div
                              className={`bg-gradient-to-r ${cause.color} h-3 rounded-full transition-all duration-1000 ease-out relative`}
                              style={{ width: `${Math.min(progress, 100)}%` }}
                            >
                              <div className="absolute inset-0 bg-white/20 animate-pulse" />
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <span className="text-sm font-semibold text-sage-700">
                              {Math.round(progress)}% Complete
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Donation Form */}
          <div className="animate-on-scroll" style={{ animationDelay: '0.2s' }}>
            <div className="glass-card p-8 sticky top-32">
              <h2 className="text-4xl font-bold text-sage-900 mb-8 flex items-center space-x-3">
                <Heart className="text-red-500" />
                <span>Make a Donation</span>
              </h2>
              
              {selectedCause ? (
                <form onSubmit={handleDonate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-3">
                      Selected Cause
                    </label>
                    <div className="glass-card p-4 rounded-xl">
                      <span className="text-sage-700 font-semibold text-lg">
                        {activeCauses.find(c => c.id === selectedCause)?.title}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-3">
                      Donation Amount
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-sage-600 text-lg">
                        $
                      </span>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full pl-10 pr-4 py-4 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent transition-all"
                        placeholder="0.00"
                        min="1"
                        step="0.01"
                        required
                      />
                    </div>
                    
                    <div className="grid grid-cols-4 gap-3 mt-4">
                      {[25, 50, 100, 250].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setAmount(preset.toString())}
                          className="px-4 py-3 glass-card hover:bg-sage-100 text-sage-700 rounded-xl transition-all magnetic-btn font-semibold"
                        >
                          ${preset}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-sage-700 mb-3">
                      Payment Method
                    </label>
                    <div className="space-y-3">
                      {[
                        { value: 'card', icon: CreditCard, label: 'Credit/Debit Card' },
                        { value: 'paypal', icon: Smartphone, label: 'PayPal' },
                        { value: 'bank', icon: Building, label: 'Bank Transfer' }
                      ].map(({ value, icon: Icon, label }) => (
                        <label key={value} className="flex items-center space-x-3 cursor-pointer group">
                          <input
                            type="radio"
                            value={value}
                            checked={paymentMethod === value}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            className="text-sage-600 focus:ring-sage-500"
                          />
                          <Icon size={20} className="text-sage-600 group-hover:text-sage-700 transition-colors" />
                          <span className="text-sage-700 group-hover:text-sage-900 transition-colors">{label}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full btn-primary btn-enhanced magnetic-btn ripple text-lg py-4 flex items-center justify-center space-x-2"
                  >
                    <Heart size={20} />
                    <span>Donate ${amount || '0.00'}</span>
                    <ArrowRight size={20} />
                  </button>
                </form>
              ) : (
                <div className="text-center py-16">
                  <div className="bg-gradient-to-br from-sage-500 to-sage-600 p-6 rounded-full mb-6 mx-auto w-fit pulse-glow">
                    <Heart className="text-white" size={48} />
                  </div>
                  <h3 className="text-xl font-bold text-sage-900 mb-4">Choose Your Impact</h3>
                  <p className="text-sage-600 leading-relaxed">
                    Please select a cause above to make your donation and help us continue our mission.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Donations