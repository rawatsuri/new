import React from 'react';
import { BarChart2, Users, Clock, Zap } from 'lucide-react';
import useStore from '../store/useStore';

const StatCard = ({ title, value, icon: Icon, trend }: { 
  title: string; 
  value: string; 
  icon: React.ElementType;
  trend: string;
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-semibold mt-1">{value}</p>
      </div>
      <div className="bg-blue-50 p-3 rounded-lg">
        <Icon className="w-6 h-6 text-blue-600" />
      </div>
    </div>
    <p className="text-sm text-green-600 mt-4">{trend}</p>
  </div>
);

const UpcomingPost = ({ platform, time, content }: {
  platform: string;
  time: string;
  content: string;
}) => (
  <div className="bg-white p-4 rounded-lg shadow-sm mb-3">
    <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-medium text-gray-600">{platform}</span>
      <span className="text-sm text-gray-500">{time}</span>
    </div>
    <p className="text-gray-800 text-sm">{content}</p>
  </div>
);

export default function Dashboard() {
  const { posts } = useStore();
  const scheduledPosts = posts.filter(post => post.status === 'Scheduled');
  const publishedPosts = posts.filter(post => post.status === 'Published');

  const totalEngagement = publishedPosts.reduce((total, post) => {
    const engagement = typeof post.engagement === 'string' ? 
      parseInt(post.engagement.replace(/[^0-9]/g, '')) || 0 : 
      post.engagement;
    return total + engagement;
  }, 0);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Posts" 
          value={posts.length.toString()}
          icon={BarChart2}
          trend={`+${publishedPosts.length} published this month`}
        />
        <StatCard 
          title="Audience Reach" 
          value={`${totalEngagement}+`}
          icon={Users}
          trend="+18.2% from last month"
        />
        <StatCard 
          title="Scheduled" 
          value={scheduledPosts.length.toString()}
          icon={Clock}
          trend={`${scheduledPosts.length} posts upcoming`}
        />
        <StatCard 
          title="Engagement Rate" 
          value="4.6%" 
          icon={Zap}
          trend="+5.25% from last month"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Upcoming Content</h3>
          {scheduledPosts.slice(0, 3).map((post) => (
            <UpcomingPost 
              key={post.id}
              platform={post.platform}
              time={post.time || ''}
              content={post.content}
            />
          ))}
          {scheduledPosts.length === 0 && (
            <p className="text-gray-500 text-sm">No upcoming posts scheduled</p>
          )}
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Performance Overview</h3>
          <div className="space-y-4">
            {['Instagram', 'LinkedIn', 'Twitter'].map(platform => {
              const platformPosts = posts.filter(post => post.platform === platform);
              const percentage = Math.round((platformPosts.length / posts.length) * 100) || 0;
              
              return (
                <div key={platform} className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">{platform}</span>
                  <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}