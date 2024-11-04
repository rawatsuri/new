import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday } from 'date-fns';
import useStore from '../store/useStore';
import toast from 'react-hot-toast';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type CalendarDayProps = {
  date: Date;
  currentMonth: Date;
  posts: Array<{
    platform: string;
    time: string;
    content: string;
  }>;
};

const CalendarDay = ({ date, currentMonth, posts }: CalendarDayProps) => {
  const isCurrentMonth = isSameMonth(date, currentMonth);
  const isCurrentDay = isToday(date);

  return (
    <div className={`min-h-[120px] border border-gray-200 p-2 ${
      !isCurrentMonth ? 'bg-gray-50' : ''
    } ${isCurrentDay ? 'bg-blue-50' : ''}`}>
      <div className="flex justify-between items-center mb-2">
        <span className={`text-sm font-medium ${!isCurrentMonth ? 'text-gray-400' : ''}`}>
          {format(date, 'd')}
        </span>
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
            className="text-xs p-1 rounded bg-white shadow-sm truncate cursor-pointer hover:bg-gray-50"
            title={post.content}
          >
            {post.platform} - {post.time}
          </div>
        ))}
      </div>
    </div>
  );
};

export default function ContentCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const { posts } = useStore();

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const goToToday = () => setCurrentDate(new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  const getPostsForDate = (date: Date) => {
    return posts.filter(post => {
      const postDate = new Date(post.date);
      return format(postDate, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd');
    }).map(post => ({
      platform: post.platform,
      time: post.time || '',
      content: post.content
    }));
  };

  const handleNewPost = () => {
    toast('Redirecting to Content Generator...', {
      icon: '📝',
    });
    // In a real app, we would use React Router to navigate
    document.querySelector('button[data-tab="Content Generator"]')?.click();
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-gray-900">Content Calendar</h2>
        <button 
          onClick={handleNewPost}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg"
              onClick={prevMonth}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <h3 className="text-lg font-medium">
              {format(currentDate, 'MMMM yyyy')}
            </h3>
            <button 
              className="p-2 hover:bg-gray-100 rounded-lg"
              onClick={nextMonth}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={goToToday}
              className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
            >
              Today
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-px">
          {days.map(day => (
            <div key={day} className="text-sm font-medium text-gray-600 p-2 text-center">
              {day}
            </div>
          ))}
          {daysInMonth.map((date, i) => (
            <CalendarDay
              key={i}
              date={date}
              currentMonth={currentDate}
              posts={getPostsForDate(date)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}