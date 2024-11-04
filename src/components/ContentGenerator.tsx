import React, { useState } from 'react';
import { Instagram, Linkedin, Twitter, Facebook, Send } from 'lucide-react';

const platforms = [
  { name: 'Instagram', icon: Instagram },
  { name: 'LinkedIn', icon: Linkedin },
  { name: 'Twitter', icon: Twitter },
  { name: 'Facebook', icon: Facebook },
];

const tones = [
  'Professional',
  'Casual',
  'Humorous',
  'Inspirational',
  'Educational',
];

export default function ContentGenerator() {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedTone, setSelectedTone] = useState('');
  const [content, setContent] = useState('');

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Content Generator</h2>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Select Platforms</h3>
        <div className="flex flex-wrap gap-4 mb-6">
          {platforms.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setSelectedPlatforms(prev => 
                prev.includes(name) 
                  ? prev.filter(p => p !== name)
                  : [...prev, name]
              )}
              className={`flex items-center px-4 py-2 rounded-lg border ${
                selectedPlatforms.includes(name)
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <Icon className="w-5 h-5 mr-2" />
              {name}
            </button>
          ))}
        </div>

        <h3 className="text-lg font-medium mb-4">Select Tone</h3>
        <div className="flex flex-wrap gap-3 mb-6">
          {tones.map(tone => (
            <button
              key={tone}
              onClick={() => setSelectedTone(tone)}
              className={`px-4 py-2 rounded-lg border ${
                selectedTone === tone
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              {tone}
            </button>
          ))}
        </div>

        <h3 className="text-lg font-medium mb-4">Content</h3>
        <div className="mb-6">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start typing or generate content..."
            className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Generate Content
          </button>
          <button
            className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Send className="w-4 h-4 mr-2" />
            Schedule Post
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-medium mb-4">AI Suggestions</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Suggested Hashtags</p>
            <div className="flex flex-wrap gap-2">
              {['#socialmedia', '#digitalmarketing', '#contentcreation', '#growthhacking'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Best Time to Post</p>
            <p className="text-sm text-gray-800">Tuesday, 10:00 AM - 12:00 PM (Highest engagement rate)</p>
          </div>
        </div>
      </div>
    </div>
  );
}