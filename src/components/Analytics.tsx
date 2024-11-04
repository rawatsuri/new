import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import useStore from '../store/useStore';

const MetricCard = ({ title, value, trend, trendValue }: {
  title: string;
  value: string;
  trend: 'up' | 'down';
  trendValue: string;
}) => (
  <div className="bg-white rounded-xl p-6 shadow-sm">
    <h3 className="text-sm text-gray-600 mb-2">{title}</h3>
    <p className="text-2xl font-semibold mb-2">{value}</p>
    <div className={`flex items-center text-sm ${
      trend === 'up' ? 'text-green-600' : 'text-red-600'
    }`}>
      {trend === 'up' ? <ArrowUp className="w-4 h-4 mr-1" /> : <ArrowDown className="w-4 h-4 mr-1" />}
      {trendValue} vs last month
    </div>
  </div>
);

export default function Analytics() {
  const { posts } = useStore();

  const platformData = ['Instagram', 'LinkedIn', 'Twitter', 'Facebook'].map(platform => ({
    name: platform,
    posts: posts.filter(post => post.platform === platform).length,
    engagement: Math.floor(Math.random() * 1000)
  }));

  const engagementData = Array.from({ length: 7 }, (_, i) => ({
    day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    engagement: Math.floor(Math.random() * 1000 + 500)
  }));

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total Engagement"
          value="124.5K"
          trend="up"
          trendValue="+12.3%"
        />
        <MetricCard
          title="Followers Growth"
          value="2,845"
          trend="up"
          trendValue="+8.1%"
        />
        <MetricCard
          title="Average Response Time"
          value="2.4h"
          trend="down"
          trendValue="-15.4%"
        />
        <MetricCard
          title="Content Performance"
          value="89%"
          trend="up"
          trendValue="+5.7%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Platform Performance</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="posts" fill="#3b82f6" name="Posts" />
                <Bar dataKey="engagement" fill="#10b981" name="Engagement" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Weekly Engagement</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="engagement" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}