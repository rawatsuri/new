import React from 'react';
import { BarChart2, Users, Clock, Zap } from 'lucide-react';

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
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Dashboard</h2>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard 
          title="Total Posts" 
          value="1,284" 
          icon={BarChart2}
          trend="+12.5% from last month"
        />
        <StatCard 
          title="Audience Reach" 
          value="42.5K" 
          icon={Users}
          trend="+18.2% from last month"
        />
        <StatCard 
          title="Scheduled" 
          value="38" 
          icon={Clock}
          trend="12 posts this week"
        />
        <StatCard 
          title="Engagement Rate" 
          value="4.6%" 
          icon={Zap}
          trend="+5.25% from last month"
        />
      </div>

      {/* Content Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Upcoming Content</h3>
          <UpcomingPost 
            platform="Instagram"
            time="Today, 2:00 PM"
            content="Launch announcement: Introducing our new AI-powered feature set! 🚀 #TechInnovation"
          />
          <UpcomingPost 
            platform="LinkedIn"
            time="Tomorrow, 10:00 AM"
            content="Discover how AI is transforming the landscape of content creation..."
          />
          <UpcomingPost 
            platform="Twitter"
            time="Tomorrow, 3:00 PM"
            content="Quick tip: Boost your social media engagement with these 3 proven strategies!"
          />
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Performance Overview</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Instagram</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '70%' }}></div>
              </div>
              <span className="text-sm font-medium">70%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">LinkedIn</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <span className="text-sm font-medium">85%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Twitter</span>
              <div className="w-2/3 bg-gray-200 rounded-full h-2.5">
                <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: '60%' }}></div>
              </div>
              <span className="text-sm font-medium">60%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}