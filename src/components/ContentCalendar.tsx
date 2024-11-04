import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const currentMonth = 'March 2024';

type Post = {
  platform: string;
  time: string;
  content: string;
};

const CalendarDay = ({ day, posts }: { day: number; posts: Post[] }) => (
  <div className="min-h-[120px] border border-gray-200 p-2">
    <div className="flex justify-between items-center mb-2">
      <span className="text-sm font-medium">{day}</span>
      {posts.length > 0 && (
        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
          {posts.length}
        </span>
      )}
    </div>
    <div className="space-y-1">
      {posts.map((post, idx) => (
        <div
          key={idx}
          className="text-xs p-1 rounded bg-gray-50 truncate"
          title={post.content}
        >
          {post.platform} - {post.time}
        </div>
      ))}
    </div>
  </div>
);

export default function ContentCalendar() {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Content Calendar</h2>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-medium">{currentMonth}</h3>
            <button className="p-2 hover:bg-gray-100 rounded-lg">
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50">Today</button>
            <select className="px-4 py-2 text-sm border rounded-lg bg-white">
              <option>Month</option>
              <option>Week</option>
              <option>Day</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px">
          {days.map(day => (
            <div key={day} className="text-sm font-medium text-gray-600 p-2 text-center">
              {day}
            </div>
          ))}
          {Array.from({ length: 35 }, (_, i) => (
            <CalendarDay
              key={i}
              day={i + 1}
              posts={i % 7 === 3 ? [
                { platform: 'Instagram', time: '10:00 AM', content: 'Product launch post' },
                { platform: 'Twitter', time: '2:00 PM', content: 'Industry news update' }
              ] : []}
            />
          ))}
        </div>
      </div>
    </div>
  );
}