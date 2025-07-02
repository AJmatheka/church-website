import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Plus, Trash2, Users, BookOpen, Calendar, Heart } from 'lucide-react'
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
    addSermon, 
    addBlogPost, 
    addBook, 
    addEvent,
    deleteSermon,
    deleteBlogPost,
    deleteBook,
    deleteEvent
  } = useData()

  const [activeTab, setActiveTab] = useState('overview')
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({})

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
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
    }
    
    setFormData({})
    setShowForm(false)
  }

  const stats = [
    { label: 'Total Sermons', value: sermons.length, icon: BookOpen, color: 'from-blue-500 to-blue-600' },
    { label: 'Blog Posts', value: blogPosts.length, icon: Calendar, color: 'from-purple-500 to-purple-600' },
    { label: 'Books Available', value: books.length, icon: BookOpen, color: 'from-green-500 to-green-600' },
    { label: 'Upcoming Events', value: events.length, icon: Heart, color: 'from-pink-500 to-pink-600' },
  ]

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Users },
    { id: 'sermons', label: 'Sermons', icon: BookOpen },
    { id: 'blog', label: 'Blog Posts', icon: Calendar },
    { id: 'books', label: 'Books', icon: BookOpen },
    { id: 'events', label: 'Events', icon: Heart },
  ]

  const renderForm = () => {
    switch (activeTab) {
      case 'sermons':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Sermon Title"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <textarea
              placeholder="Description"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
            <input
              type="url"
              placeholder="Video URL"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setFormData({...formData, videoUrl: e.target.value})}
              required
            />
            <input
              type="url"
              placeholder="Thumbnail URL"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setFormData({...formData, thumbnail: e.target.value})}
              required
            />
            <input
              type="date"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Pastor Name"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setFormData({...formData, pastor: e.target.value})}
              required
            />
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary btn-enhanced">Add Sermon</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        )
      
      case 'blog':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Blog Title"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <textarea
              placeholder="Excerpt"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-20"
              onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
              required
            />
            <textarea
              placeholder="Content"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-32"
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              required
            />
            <input
              type="url"
              placeholder="Image URL"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              required
            />
            <input
              type="date"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Author Name"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              required
            />
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary btn-enhanced">Add Blog Post</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        )
      
      case 'books':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Book Title"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Author"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setFormData({...formData, author: e.target.value})}
              required
            />
            <input
              type="number"
              placeholder="Price"
              step="0.01"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
              required
            />
            <input
              type="url"
              placeholder="Image URL"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setFormData({...formData, image: e.target.value})}
              required
            />
            <textarea
              placeholder="Description"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary btn-enhanced">Add Book</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        )
      
      case 'events':
        return (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Event Title"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              required
            />
            <textarea
              placeholder="Description"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent h-24"
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              required
            />
            <input
              type="date"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              required
            />
            <input
              type="time"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setFormData({...formData, time: e.target.value})}
              required
            />
            <input
              type="text"
              placeholder="Location"
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
            <div className="flex space-x-4">
              <button type="submit" className="btn-primary btn-enhanced">Add Event</button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">Cancel</button>
            </div>
          </form>
        )
    }
  }

  const renderContent = () => {
    if (activeTab === 'overview') {
      return (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <div key={stat.label} className="glass-card p-6 card-hover">
                  <div className="flex items-center space-x-4">
                    <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-xl`}>
                      <Icon className="text-white" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                      <p className="text-2xl font-bold text-white">{stat.value}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
          
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Welcome back, {user?.name}!</h3>
            <p className="text-gray-400 text-lg leading-relaxed">
              You're logged in as an administrator. Use the tabs above to manage sermons, blog posts, books, and events. 
              Your changes will be reflected immediately on the website.
            </p>
          </div>
        </div>
      )
    }

    switch (activeTab) {
      case 'sermons':
        return (
          <div className="space-y-4">
            {sermons.map((sermon) => (
              <div key={sermon.id} className="glass-card p-6 flex justify-between items-center card-hover">
                <div>
                  <h3 className="font-bold text-white text-lg">{sermon.title}</h3>
                  <p className="text-gray-400">{sermon.pastor} - {sermon.date}</p>
                </div>
                <button
                  onClick={() => deleteSermon(sermon.id)}
                  className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )
      
      case 'blog':
        return (
          <div className="space-y-4">
            {blogPosts.map((post) => (
              <div key={post.id} className="glass-card p-6 flex justify-between items-center card-hover">
                <div>
                  <h3 className="font-bold text-white text-lg">{post.title}</h3>
                  <p className="text-gray-400">{post.author} - {post.date}</p>
                </div>
                <button
                  onClick={() => deleteBlogPost(post.id)}
                  className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )
      
      case 'books':
        return (
          <div className="space-y-4">
            {books.map((book) => (
              <div key={book.id} className="glass-card p-6 flex justify-between items-center card-hover">
                <div>
                  <h3 className="font-bold text-white text-lg">{book.title}</h3>
                  <p className="text-gray-400">{book.author} - ${book.price}</p>
                </div>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )
      
      case 'events':
        return (
          <div className="space-y-4">
            {events.map((event) => (
              <div key={event.id} className="glass-card p-6 flex justify-between items-center card-hover">
                <div>
                  <h3 className="font-bold text-white text-lg">{event.title}</h3>
                  <p className="text-gray-400">{event.date} at {event.time} - {event.location}</p>
                </div>
                <button
                  onClick={() => deleteEvent(event.id)}
                  className="text-red-400 hover:text-red-300 p-2 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        )
    }
  }

  return (
    <div className="pt-24 min-h-screen bg-black page-transition">
      <div className="container-max section-padding">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-5xl font-black text-white mb-4 gradient-text-animated">
              Admin Dashboard
            </h1>
            <p className="text-gray-400 text-lg">Manage your church website content</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-400 hover:text-red-300 glass-card px-6 py-3 rounded-xl transition-colors magnetic-btn"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </div>

        <div className="glass-card rounded-2xl overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-white/10">
            <nav className="flex space-x-0 overflow-x-auto">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setActiveTab(tab.id)
                      setShowForm(false)
                    }}
                    className={`flex items-center space-x-2 py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-all ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                        : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
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
                <h2 className="text-3xl font-bold text-white capitalize">
                  {activeTab === 'blog' ? 'Blog Posts' : activeTab}
                </h2>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="btn-primary btn-enhanced magnetic-btn ripple flex items-center space-x-2"
                >
                  <Plus size={20} />
                  <span>Add {activeTab === 'blog' ? 'Post' : activeTab.slice(0, -1)}</span>
                </button>
              </div>
            )}

            {showForm && activeTab !== 'overview' && (
              <div className="glass-card p-6 mb-8 animate-on-scroll">
                <h3 className="text-xl font-bold text-white mb-6">
                  Add New {activeTab === 'blog' ? 'Blog Post' : activeTab.slice(0, -1)}
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