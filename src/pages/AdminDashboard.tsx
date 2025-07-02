import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  LogOut, Plus, Trash2, Edit, Users, BookOpen, Calendar, Heart, 
  Home, Building, Target, TrendingUp, Eye, Save, X, Upload,
  BarChart3, PieChart, Activity, DollarSign
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useData } from '../contexts/DataContext'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const { logout, user } = useAuth()
  const { 
    sermons, 
    blogPosts, 
    books, 
    events, 
    donationMetrics,
    addSermon, 
    addBlogPost, 
    addBook, 
    addEvent,
    addDonationMetric,
    updateSermon,
    updateBlogPost,
    updateBook,
    updateEvent,
    updateDonationMetric,
    deleteSermon,
    deleteBlogPost,
    deleteBook,
    deleteEvent,
    deleteDonationMetric
  } = useData()

  const [activeTab, setActiveTab] = useState('overview')
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<any>(null)
  const [formData, setFormData] = useState<any>({})

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (editingItem) {
      // Update existing item
      switch (activeTab) {
        case 'sermons':
          updateSermon(editingItem.id, formData)
          break
        case 'blog':
          updateBlogPost(editingItem.id, formData)
          break
        case 'books':
          updateBook(editingItem.id, formData)
          break
        case 'events':
          updateEvent(editingItem.id, formData)
          break
        case 'donations':
          updateDonationMetric(editingItem.id, formData)
          break
      }
    } else {
      // Add new item
      switch (activeTab) {
        case 'sermons':
          addSermon(formData as any)
          break
        case 'blog':
          addBlogPost(formData as any)
          break
        case 'books':
          addBook(formData as any)
          break
        case 'events':
          addEvent(formData as any)
          break
        case 'donations':
          addDonationMetric(formData as any)
          break
      }
    }
    
    setFormData({})
    setShowForm(false)
    setEditingItem(null)
  }

  const handleEdit = (item: any) => {
    setEditingItem(item)
    setFormData(item)
    setShowForm(true)
  }

  const handleCancel = () => {
    setFormData({})
    setShowForm(false)
    setEditingItem(null)
  }

  const stats = [
    { 
      label: 'Total Sermons', 
      value: sermons.length, 
      icon: BookOpen, 
      color: 'from-sage-500 to-sage-600',
      change: '+12%',
      trend: 'up'
    },
    { 
      label: 'Blog Posts', 
      value: blogPosts.length, 
      icon: Calendar, 
      color: 'from-earth-500 to-earth-600',
      change: '+8%',
      trend: 'up'
    },
    { 
      label: 'Books Available', 
      value: books.length, 
      icon: BookOpen, 
      color: 'from-cream-500 to-cream-600',
      change: '+3%',
      trend: 'up'
    },
    { 
      label: 'Active Campaigns', 
      value: donationMetrics.filter(m => m.isActive).length, 
      icon: Target, 
      color: 'from-sage-600 to-sage-700',
      change: '+15%',
      trend: 'up'
    },
  ]

  const totalDonations = donationMetrics.reduce((sum, metric) => sum + metric.raised, 0)
  const totalGoals = donationMetrics.reduce((sum, metric) => sum + metric.goal, 0)
  const donationProgress = (totalDonations / totalGoals) * 100

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'sermons', label: 'Sermons', icon: BookOpen },
    { id: 'blog', label: 'Blog Posts', icon: Calendar },
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'events', label: 'Events', icon: Heart },
    { id: 'donations', label: 'Donations', icon: DollarSign },
  ]

  const renderForm = () => {
    const isEditing = !!editingItem

    switch (activeTab) {
      case 'sermons':
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Sermon Title"
                value={formData.title || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Pastor Name"
                value={formData.pastor || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, pastor: e.target.value})}
                required
              />
            </div>
            <textarea
              placeholder="Description"
              value={formData.description || ''}
              className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent h-24"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="url"
                placeholder="Video URL"
                value={formData.videoUrl || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
                required
              />
              <input
                type="url"
                placeholder="Thumbnail URL"
                value={formData.thumbnail || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="date"
                value={formData.date || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Duration (e.g., 45 minutes)"
                value={formData.duration || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, duration: e.target.value})}
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={formData.tags?.join(', ') || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, tags: e.target.value.split(', ').filter(tag => tag.trim())})}
              />
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary btn-enhanced flex items-center space-x-2">
                <Save size={16} />
                <span>{isEditing ? 'Update' : 'Add'} Sermon</span>
              </button>
              <button type="button" onClick={handleCancel} className="btn-secondary flex items-center space-x-2">
                <X size={16} />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        )
      
      case 'blog':
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Blog Title"
                value={formData.title || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Author Name"
                value={formData.author || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                required
              />
            </div>
            <textarea
              placeholder="Excerpt"
              value={formData.excerpt || ''}
              className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent h-20"
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              required
            />
            <textarea
              placeholder="Content"
              value={formData.content || ''}
              className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent h-32"
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="url"
                placeholder="Image URL"
                value={formData.image || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                required
              />
              <input
                type="date"
                value={formData.date || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="text"
                placeholder="Category"
                value={formData.category || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              />
              <input
                type="text"
                placeholder="Read Time (e.g., 5 min read)"
                value={formData.readTime || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, readTime: e.target.value})}
              />
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={formData.tags?.join(', ') || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, tags: e.target.value.split(', ').filter(tag => tag.trim())})}
              />
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary btn-enhanced flex items-center space-x-2">
                <Save size={16} />
                <span>{isEditing ? 'Update' : 'Add'} Blog Post</span>
              </button>
              <button type="button" onClick={handleCancel} className="btn-secondary flex items-center space-x-2">
                <X size={16} />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        )
      
      case 'books':
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Book Title"
                value={formData.title || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Author"
                value={formData.author || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, author: e.target.value})}
                required
              />
            </div>
            <textarea
              placeholder="Description"
              value={formData.description || ''}
              className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent h-24"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="number"
                placeholder="Price"
                step="0.01"
                value={formData.price || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                required
              />
              <input
                type="url"
                placeholder="Image URL"
                value={formData.image || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <input
                type="text"
                placeholder="Category"
                value={formData.category || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              />
              <input
                type="text"
                placeholder="ISBN"
                value={formData.isbn || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, isbn: e.target.value})}
              />
              <input
                type="number"
                placeholder="Pages"
                value={formData.pages || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, pages: parseInt(e.target.value)})}
              />
              <input
                type="text"
                placeholder="Publisher"
                value={formData.publisher || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, publisher: e.target.value})}
              />
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary btn-enhanced flex items-center space-x-2">
                <Save size={16} />
                <span>{isEditing ? 'Update' : 'Add'} Book</span>
              </button>
              <button type="button" onClick={handleCancel} className="btn-secondary flex items-center space-x-2">
                <X size={16} />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        )
      
      case 'events':
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Event Title"
                value={formData.title || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                required
              />
            </div>
            <textarea
              placeholder="Description"
              value={formData.description || ''}
              className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent h-24"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <input
                type="date"
                value={formData.date || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                required
              />
              <input
                type="time"
                value={formData.time || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, time: e.target.value})}
                required
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, category: e.target.value})}
              />
              <input
                type="number"
                placeholder="Capacity"
                value={formData.capacity || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, capacity: parseInt(e.target.value)})}
              />
            </div>
            <input
              type="url"
              placeholder="Image URL (optional)"
              value={formData.image || ''}
              className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
              onChange={(e) => setFormData({...formData, image: e.target.value})}
            />
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary btn-enhanced flex items-center space-x-2">
                <Save size={16} />
                <span>{isEditing ? 'Update' : 'Add'} Event</span>
              </button>
              <button type="button" onClick={handleCancel} className="btn-secondary flex items-center space-x-2">
                <X size={16} />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        )

      case 'donations':
        return (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Campaign Title"
                value={formData.title || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                required
              />
              <select
                value={formData.icon || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, icon: e.target.value})}
                required
              >
                <option value="">Select Icon</option>
                <option value="Home">Home</option>
                <option value="Users">Users</option>
                <option value="Heart">Heart</option>
                <option value="Building">Building</option>
                <option value="BookOpen">Book Open</option>
                <option value="Target">Target</option>
              </select>
            </div>
            <textarea
              placeholder="Description"
              value={formData.description || ''}
              className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent h-24"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <input
                type="number"
                placeholder="Goal Amount"
                value={formData.goal || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, goal: parseFloat(e.target.value)})}
                required
              />
              <input
                type="number"
                placeholder="Current Raised Amount"
                value={formData.raised || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 placeholder-sage-600 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, raised: parseFloat(e.target.value)})}
                required
              />
              <select
                value={formData.color || ''}
                className="w-full px-4 py-3 bg-white/50 border border-sage-300 rounded-xl text-sage-900 focus:ring-2 focus:ring-sage-500 focus:border-transparent"
                onChange={(e) => setFormData({...formData, color: e.target.value})}
                required
              >
                <option value="">Select Color</option>
                <option value="from-sage-500 to-sage-600">Sage</option>
                <option value="from-earth-500 to-earth-600">Earth</option>
                <option value="from-cream-500 to-cream-600">Cream</option>
                <option value="from-sage-600 to-sage-700">Dark Sage</option>
                <option value="from-earth-400 to-earth-500">Light Earth</option>
              </select>
            </div>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isActive || false}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className="w-5 h-5 text-sage-600 bg-white border-sage-300 rounded focus:ring-sage-500"
                />
                <span className="text-sage-700 font-medium">Active Campaign</span>
              </label>
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary btn-enhanced flex items-center space-x-2">
                <Save size={16} />
                <span>{isEditing ? 'Update' : 'Add'} Campaign</span>
              </button>
              <button type="button" onClick={handleCancel} className="btn-secondary flex items-center space-x-2">
                <X size={16} />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        )
    }
  }

  const renderContent = () => {
    if (activeTab === 'overview') {
      return (
        <div className="space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="glass-card p-6 card-hover">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sage-600 text-sm font-medium">{stat.label}</p>
                      <p className="text-3xl font-bold text-sage-900 mt-1">{stat.value}</p>
                      <div className="flex items-center mt-2">
                        <TrendingUp size={14} className="text-green-500 mr-1" />
                        <span className="text-green-500 text-sm font-medium">{stat.change}</span>
                      </div>
                    </div>
                    <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl`}>
                      <Icon className="text-white" size={24} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Donation Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-sage-900 mb-6 flex items-center space-x-2">
                <PieChart className="text-sage-600" size={24} />
                <span>Donation Overview</span>
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sage-700">Total Raised</span>
                  <span className="text-2xl font-bold text-sage-900">${totalDonations.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sage-700">Total Goal</span>
                  <span className="text-xl font-semibold text-sage-700">${totalGoals.toLocaleString()}</span>
                </div>
                <div className="w-full bg-sage-200 rounded-full h-4">
                  <div
                    className="bg-gradient-to-r from-sage-500 to-sage-600 h-4 rounded-full transition-all duration-1000"
                    style={{ width: `${Math.min(donationProgress, 100)}%` }}
                  />
                </div>
                <div className="text-center">
                  <span className="text-lg font-semibold text-sage-600">
                    {Math.round(donationProgress)}% Complete
                  </span>
                </div>
              </div>
            </div>

            <div className="glass-card p-8">
              <h3 className="text-2xl font-bold text-sage-900 mb-6 flex items-center space-x-2">
                <Activity className="text-sage-600" size={24} />
                <span>Recent Activity</span>
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sage-700">New sermon added: "Walking in Faith"</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-sage-700">Blog post published: "Power of Prayer"</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span className="text-sage-700">New book added to store</span>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-white/50 rounded-lg">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sage-700">Youth event scheduled</span>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Message */}
          <div className="glass-card p-8">
            <h3 className="text-3xl font-bold text-sage-900 mb-6">Welcome back, {user?.name}!</h3>
            <p className="text-sage-700 text-lg leading-relaxed">
              You're logged in as an administrator. Use the tabs above to manage sermons, blog posts, books, events, and donation campaigns. 
              Your changes will be reflected immediately on the website. The dashboard provides comprehensive tools to keep your church 
              community engaged and informed.
            </p>
          </div>
        </div>
      )
    }

    const getItemList = () => {
      switch (activeTab) {
        case 'sermons': return sermons
        case 'blog': return blogPosts
        case 'books': return books
        case 'events': return events
        case 'donations': return donationMetrics
        default: return []
      }
    }

    const getDeleteFunction = () => {
      switch (activeTab) {
        case 'sermons': return deleteSermon
        case 'blog': return deleteBlogPost
        case 'books': return deleteBook
        case 'events': return deleteEvent
        case 'donations': return deleteDonationMetric
        default: return () => {}
      }
    }

    const items = getItemList()
    const deleteFunction = getDeleteFunction()

    return (
      <div className="space-y-4">
        {items.map((item: any) => (
          <div key={item.id} className="glass-card p-6 card-hover">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold text-sage-900 text-lg mb-2">{item.title}</h3>
                <div className="text-sage-600 space-y-1">
                  {activeTab === 'sermons' && (
                    <>
                      <p>{item.pastor} - {item.date}</p>
                      {item.duration && <p>Duration: {item.duration}</p>}
                      {item.tags && <p>Tags: {item.tags.join(', ')}</p>}
                    </>
                  )}
                  {activeTab === 'blog' && (
                    <>
                      <p>{item.author} - {item.date}</p>
                      {item.category && <p>Category: {item.category}</p>}
                      {item.readTime && <p>{item.readTime}</p>}
                    </>
                  )}
                  {activeTab === 'books' && (
                    <>
                      <p>{item.author} - ${item.price}</p>
                      {item.category && <p>Category: {item.category}</p>}
                      {item.pages && <p>{item.pages} pages</p>}
                    </>
                  )}
                  {activeTab === 'events' && (
                    <>
                      <p>{item.date} at {item.time} - {item.location}</p>
                      {item.category && <p>Category: {item.category}</p>}
                      {item.capacity && <p>Capacity: {item.capacity}</p>}
                    </>
                  )}
                  {activeTab === 'donations' && (
                    <>
                      <p>${item.raised.toLocaleString()} / ${item.goal.toLocaleString()}</p>
                      <div className="w-32 bg-sage-200 rounded-full h-2 mt-2">
                        <div
                          className={`bg-gradient-to-r ${item.color} h-2 rounded-full`}
                          style={{ width: `${Math.min((item.raised / item.goal) * 100, 100)}%` }}
                        />
                      </div>
                      <p className="text-sm">
                        {item.isActive ? (
                          <span className="text-green-600 font-medium">Active</span>
                        ) : (
                          <span className="text-gray-500">Inactive</span>
                        )}
                      </p>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-sage-600 hover:text-sage-700 p-2 hover:bg-sage-100 rounded-lg transition-colors"
                  title="Edit"
                >
                  <Edit size={18} />
                </button>
                <button
                  onClick={() => deleteFunction(item.id)}
                  className="text-red-500 hover:text-red-600 p-2 hover:bg-red-50 rounded-lg transition-colors"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {items.length === 0 && (
          <div className="text-center py-12">
            <div className="glass-card p-8 max-w-md mx-auto">
              <h3 className="text-xl font-bold text-sage-900 mb-4">No {activeTab} yet</h3>
              <p className="text-sage-600">Click the "Add" button to create your first {activeTab.slice(0, -1)}.</p>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="pt-24 min-h-screen bg-gradient-to-br from-cream-50 via-sage-100 to-earth-100 page-transition">
      <div className="container-max section-padding">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-black text-sage-900 mb-4 gradient-text-animated">
              Admin Dashboard
            </h1>
            <p className="text-sage-700 text-lg">Manage your church website content and settings</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 glass-card px-6 py-3 rounded-xl transition-colors magnetic-btn"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-sage-200">
            <nav className="flex space-x-0 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setShowForm(false)
                      setEditingItem(null)
                    }}
                    className={`flex items-center space-x-2 py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'border-sage-500 text-sage-700 bg-sage-50'
                        : 'border-transparent text-sage-600 hover:text-sage-700 hover:bg-sage-25'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                )
              })}
            </nav>
          </div>

          {/* Content */}
          <div className="p-8">
            {activeTab !== 'overview' && (
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-sage-900 capitalize">
                  {activeTab === 'blog' ? 'Blog Posts' : activeTab === 'donations' ? 'Donation Campaigns' : activeTab}
                </h2>
                <button
                  onClick={() => {
                    setShowForm(!showForm)
                    setEditingItem(null)
                    setFormData({})
                  }}
                  className="btn-primary btn-enhanced magnetic-btn ripple flex items-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Add {activeTab === 'blog' ? 'Post' : activeTab === 'donations' ? 'Campaign' : activeTab.slice(0, -1)}</span>
                </button>
              </div>
            )}

            {showForm && activeTab !== 'overview' && (
              <div className="glass-card p-8 mb-8 animate-on-scroll">
                <h3 className="text-2xl font-bold text-sage-900 mb-6">
                  {editingItem ? 'Edit' : 'Add New'} {activeTab === 'blog' ? 'Blog Post' : activeTab === 'donations' ? 'Donation Campaign' : activeTab.slice(0, -1)}
                </h3>
                {renderForm()}
              </div>
            )}

            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard