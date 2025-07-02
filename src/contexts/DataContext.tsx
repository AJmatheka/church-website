import React, { createContext, useContext, useState, useEffect } from 'react'

interface Sermon {
  id: string
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  date: string
  pastor: string
  duration?: string
  tags?: string[]
}

interface BlogPost {
  id: string
  title: string
  content: string
  excerpt: string
  image: string
  date: string
  author: string
  category?: string
  tags?: string[]
  readTime?: string
}

interface Book {
  id: string
  title: string
  author: string
  price: number
  image: string
  description: string
  category?: string
  isbn?: string
  pages?: number
  publisher?: string
}

interface Event {
  id: string
  title: string
  description: string
  date: string
  time: string
  location: string
  image?: string
  category?: string
  capacity?: number
  registeredCount?: number
}

interface DonationMetric {
  id: string
  title: string
  description: string
  goal: number
  raised: number
  color: string
  icon: string
  isActive: boolean
}

interface DataContextType {
  sermons: Sermon[]
  blogPosts: BlogPost[]
  books: Book[]
  events: Event[]
  donationMetrics: DonationMetric[]
  addSermon: (sermon: Omit<Sermon, 'id'>) => void
  addBlogPost: (post: Omit<BlogPost, 'id'>) => void
  addBook: (book: Omit<Book, 'id'>) => void
  addEvent: (event: Omit<Event, 'id'>) => void
  addDonationMetric: (metric: Omit<DonationMetric, 'id'>) => void
  updateSermon: (id: string, sermon: Partial<Sermon>) => void
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void
  updateBook: (id: string, book: Partial<Book>) => void
  updateEvent: (id: string, event: Partial<Event>) => void
  updateDonationMetric: (id: string, metric: Partial<DonationMetric>) => void
  deleteSermon: (id: string) => void
  deleteBlogPost: (id: string) => void
  deleteBook: (id: string) => void
  deleteEvent: (id: string) => void
  deleteDonationMetric: (id: string) => void
}

const DataContext = createContext<DataContextType | undefined>(undefined)

export const useData = () => {
  const context = useContext(DataContext)
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sermons, setSermons] = useState<Sermon[]>([
    {
      id: '1',
      title: 'Walking in Faith',
      description: 'A powerful message about trusting God in uncertain times and finding strength through faith.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://images.pexels.com/photos/8468/cross-sunset-sunrise-hill.jpg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-15',
      pastor: 'Pastor John Smith',
      duration: '45 minutes',
      tags: ['Faith', 'Trust', 'Spiritual Growth']
    },
    {
      id: '2',
      title: 'Love Without Limits',
      description: 'Exploring the boundless love of Christ and how we can share that love with others in our daily lives.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-08',
      pastor: 'Pastor Sarah Johnson',
      duration: '38 minutes',
      tags: ['Love', 'Compassion', 'Service']
    },
    {
      id: '3',
      title: 'Hope in Darkness',
      description: 'Finding light and hope even in our darkest moments through the promises of God.',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      thumbnail: 'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-01',
      pastor: 'Pastor Michael Brown',
      duration: '42 minutes',
      tags: ['Hope', 'Encouragement', 'Perseverance']
    }
  ])

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      title: 'The Power of Prayer in Daily Life',
      content: 'Prayer is not just a religious ritual; it\'s a powerful tool that can transform our daily lives. When we pray, we connect with the divine and open ourselves to guidance, peace, and strength...',
      excerpt: 'Discover how prayer can transform your daily life and bring you closer to God.',
      image: 'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-20',
      author: 'Pastor John Smith',
      category: 'Spiritual Growth',
      readTime: '5 min read',
      tags: ['Prayer', 'Spiritual Discipline', 'Faith']
    },
    {
      id: '2',
      title: 'Building Strong Christian Communities',
      content: 'Christian community is at the heart of our faith. When believers come together, they create a powerful force for good in the world...',
      excerpt: 'Learn how to build and strengthen Christian communities in your local area.',
      image: 'https://images.pexels.com/photos/8468/cross-sunset-sunrise-hill.jpg?auto=compress&cs=tinysrgb&w=800',
      date: '2024-01-18',
      author: 'Pastor Sarah Johnson',
      category: 'Community',
      readTime: '7 min read',
      tags: ['Community', 'Fellowship', 'Unity']
    }
  ])

  const [books, setBooks] = useState<Book[]>([
    {
      id: '1',
      title: 'Walking with Christ',
      author: 'Pastor John Smith',
      price: 19.99,
      image: 'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'A comprehensive guide to developing a deeper relationship with Jesus Christ.',
      category: 'Spiritual Growth',
      isbn: '978-1234567890',
      pages: 256,
      publisher: 'Faith Publications'
    },
    {
      id: '2',
      title: 'Faith in Action',
      author: 'Pastor Sarah Johnson',
      price: 24.99,
      image: 'https://images.pexels.com/photos/8468/cross-sunset-sunrise-hill.jpg?auto=compress&cs=tinysrgb&w=400',
      description: 'Practical ways to live out your faith in everyday situations.',
      category: 'Christian Living',
      isbn: '978-1234567891',
      pages: 312,
      publisher: 'Grace Books'
    },
    {
      id: '3',
      title: 'The Heart of Worship',
      author: 'Pastor Michael Brown',
      price: 16.99,
      image: 'https://images.pexels.com/photos/1624438/pexels-photo-1624438.jpeg?auto=compress&cs=tinysrgb&w=400',
      description: 'Understanding the true meaning of worship and how to worship with authenticity.',
      category: 'Worship',
      isbn: '978-1234567892',
      pages: 198,
      publisher: 'Worship Press'
    }
  ])

  const [events, setEvents] = useState<Event[]>([
    {
      id: '1',
      title: 'Sunday Service',
      description: 'Join us for our weekly Sunday service with worship and teaching.',
      date: '2024-01-28',
      time: '10:00 AM',
      location: 'Main Sanctuary',
      category: 'Worship',
      capacity: 500,
      registeredCount: 0
    },
    {
      id: '2',
      title: 'Youth Group Meeting',
      description: 'Weekly youth group for ages 13-18.',
      date: '2024-01-30',
      time: '7:00 PM',
      location: 'Youth Center',
      category: 'Youth',
      capacity: 50,
      registeredCount: 0
    }
  ])

  const [donationMetrics, setDonationMetrics] = useState<DonationMetric[]>([
    {
      id: '1',
      title: 'General Fund',
      description: 'Support our church operations, staff, and general ministry needs.',
      goal: 50000,
      raised: 32000,
      color: 'from-sage-500 to-sage-600',
      icon: 'Home',
      isActive: true
    },
    {
      id: '2',
      title: 'Missions & Outreach',
      description: 'Help us spread the Gospel and serve communities around the world.',
      goal: 25000,
      raised: 18500,
      color: 'from-earth-500 to-earth-600',
      icon: 'Users',
      isActive: true
    },
    {
      id: '3',
      title: 'Youth Ministry',
      description: 'Invest in the next generation through youth programs and activities.',
      goal: 15000,
      raised: 9200,
      color: 'from-cream-500 to-cream-600',
      icon: 'Heart',
      isActive: true
    },
    {
      id: '4',
      title: 'Building Fund',
      description: 'Support facility improvements and expansion projects.',
      goal: 100000,
      raised: 45000,
      color: 'from-sage-600 to-sage-700',
      icon: 'Building',
      isActive: true
    },
    {
      id: '5',
      title: 'Christian Education',
      description: 'Fund Bible studies, seminars, and educational resources.',
      goal: 10000,
      raised: 6800,
      color: 'from-earth-400 to-earth-500',
      icon: 'BookOpen',
      isActive: true
    }
  ])

  // Add functions
  const addSermon = (sermon: Omit<Sermon, 'id'>) => {
    const newSermon = { ...sermon, id: Date.now().toString() }
    setSermons(prev => [newSermon, ...prev])
  }

  const addBlogPost = (post: Omit<BlogPost, 'id'>) => {
    const newPost = { ...post, id: Date.now().toString() }
    setBlogPosts(prev => [newPost, ...prev])
  }

  const addBook = (book: Omit<Book, 'id'>) => {
    const newBook = { ...book, id: Date.now().toString() }
    setBooks(prev => [newBook, ...prev])
  }

  const addEvent = (event: Omit<Event, 'id'>) => {
    const newEvent = { ...event, id: Date.now().toString() }
    setEvents(prev => [newEvent, ...prev])
  }

  const addDonationMetric = (metric: Omit<DonationMetric, 'id'>) => {
    const newMetric = { ...metric, id: Date.now().toString() }
    setDonationMetrics(prev => [newMetric, ...prev])
  }

  // Update functions
  const updateSermon = (id: string, updates: Partial<Sermon>) => {
    setSermons(prev => prev.map(sermon => 
      sermon.id === id ? { ...sermon, ...updates } : sermon
    ))
  }

  const updateBlogPost = (id: string, updates: Partial<BlogPost>) => {
    setBlogPosts(prev => prev.map(post => 
      post.id === id ? { ...post, ...updates } : post
    ))
  }

  const updateBook = (id: string, updates: Partial<Book>) => {
    setBooks(prev => prev.map(book => 
      book.id === id ? { ...book, ...updates } : book
    ))
  }

  const updateEvent = (id: string, updates: Partial<Event>) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updates } : event
    ))
  }

  const updateDonationMetric = (id: string, updates: Partial<DonationMetric>) => {
    setDonationMetrics(prev => prev.map(metric => 
      metric.id === id ? { ...metric, ...updates } : metric
    ))
  }

  // Delete functions
  const deleteSermon = (id: string) => {
    setSermons(prev => prev.filter(sermon => sermon.id !== id))
  }

  const deleteBlogPost = (id: string) => {
    setBlogPosts(prev => prev.filter(post => post.id !== id))
  }

  const deleteBook = (id: string) => {
    setBooks(prev => prev.filter(book => book.id !== id))
  }

  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(event => event.id !== id))
  }

  const deleteDonationMetric = (id: string) => {
    setDonationMetrics(prev => prev.filter(metric => metric.id !== id))
  }

  return (
    <DataContext.Provider value={{
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
    }}>
      {children}
    </DataContext.Provider>
  )
}