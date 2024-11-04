import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

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
          <div className="space-y-6">
            {['Instagram', 'LinkedIn', 'Twitter', 'Facebook'].map(platform => (
              <div key={platform}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{platform}</span>
                  <span className="text-sm text-gray-600">8.5K engagements</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${Math.random() * 40 + 60}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-medium mb-4">Content Type Performance</h3>
          <div className="space-y-6">
            {['Images', 'Videos', 'Text Posts', 'Stories'].map(type => (
              <div key={type}>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">{type}</span>
                  <span className="text-sm text-gray-600">{Math.floor(Math.random() * 500 + 500)} interactions</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${Math.random() * 40 + 60}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}