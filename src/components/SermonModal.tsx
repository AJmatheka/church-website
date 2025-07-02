import React, { useEffect } from 'react'
import { X, Calendar, User } from 'lucide-react'

interface Sermon {
  id: string
  title: string
  description: string
  videoUrl: string
  thumbnail: string
  date: string
  pastor: string
}

interface SermonModalProps {
  sermon: Sermon
  isOpen: boolean
  onClose: () => void
}

const SermonModal: React.FC<SermonModalProps> = ({ sermon, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-on-scroll">
      <div className="glass-card max-w-5xl w-full max-h-[90vh] overflow-y-auto animate-on-scroll">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">{sermon.title}</h2>
              <div className="flex items-center space-x-6 text-gray-400">
                <div className="flex items-center space-x-2">
                  <User size={16} />
                  <span>{sermon.pastor}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar size={16} />
                  <span>{new Date(sermon.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="aspect-video mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <iframe
              src={sermon.videoUrl}
              title={sermon.title}
              className="w-full h-full"
              allowFullScreen
            />
          </div>
          
          <div className="glass-card p-6">
            <h3 className="text-xl font-bold text-white mb-4">About This Sermon</h3>
            <p className="text-gray-300 leading-relaxed text-lg">{sermon.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SermonModal