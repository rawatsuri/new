import React, { useState } from 'react';
import { Grid, List, Search, Filter } from 'lucide-react';

const posts = [
  {
    id: 1,
    platform: 'Instagram',
    content: 'Exciting news! Our latest AI feature is now live...',
    status: 'Published',
    date: '2024-03-15',
    engagement: '2.5K'
  },
  {
    id: 2,
    platform: 'LinkedIn',
    content: 'Join us for an exclusive webinar on digital transformation...',
    status: 'Scheduled',
    date: '2024-03-20',
    engagement: '-'
  },
  {
    id: 3,
    platform: 'Twitter',
    content: 'Quick tip: Boost your productivity with these 3 AI tools...',
    status: 'Draft',
    date: '2024-03-18',
    engagement: '-'
  }
];

const statusColors = {
  Published: 'bg-green-100 text-green-800',
  Scheduled: 'bg-blue-100 text-blue-800',
  Draft: 'bg-gray-100 text-gray-800'
};

export default function ContentLibrary() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Content Library</h2>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
          >
            <Grid className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
          >
            <List className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search content..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
        </div>

        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
          {posts.map(post => (
            <div
              key={post.id}
              className="border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-3">
                <span className="text-sm font-medium text-gray-600">{post.platform}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${statusColors[post.status as keyof typeof statusColors]}`}>
                  {post.status}
                </span>
              </div>
              <p className="text-gray-800 mb-4 line-clamp-3">{post.content}</p>
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span>{post.date}</span>
                <span>Engagement: {post.engagement}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}