import React, { useState, useEffect } from 'react';
import { Instagram, Linkedin, Twitter, Facebook, Send, Hash } from 'lucide-react';
import toast from 'react-hot-toast';
import useStore from '../store/useStore';

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
  const {
    selectedPlatforms,
    setSelectedPlatforms,
    selectedTone,
    setSelectedTone,
    currentContent,
    setCurrentContent,
    generateContent,
    schedulePost,
    suggestHashtags,
    getBestPostingTime
  } = useStore();

  const [isGenerating, setIsGenerating] = useState(false);
  const [suggestedHashtags, setSuggestedHashtags] = useState<string[]>([]);
  const [bestTimes, setBestTimes] = useState<{ time: string; avg_engagement: number; }[]>([]);

  useEffect(() => {
    const fetchBestTimes = async () => {
      try {
        const times = await getBestPostingTime();
        setBestTimes(times);
      } catch (error) {
        console.error('Error fetching best times:', error);
      }
    };
    fetchBestTimes();
  }, []);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      await generateContent();
      toast.success('Content generated successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to generate content');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSchedule = async () => {
    try {
      await schedulePost();
      toast.success('Post scheduled successfully!');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to schedule post');
    }
  };

  const handleGetHashtags = async () => {
    if (!currentContent || selectedPlatforms.length === 0) {
      toast.error('Please generate content and select a platform first');
      return;
    }

    try {
      const hashtags = await suggestHashtags(currentContent, selectedPlatforms[0]);
      setSuggestedHashtags(hashtags);
    } catch (error) {
      toast.error('Failed to generate hashtags');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-6">Content Generator</h2>
      
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h3 className="text-lg font-medium mb-4">Select Platforms</h3>
        <div className="flex flex-wrap gap-4 mb-6">
          {platforms.map(({ name, icon: Icon }) => (
            <button
              key={name}
              onClick={() => setSelectedPlatforms(
                selectedPlatforms.includes(name)
                  ? selectedPlatforms.filter(p => p !== name)
                  : [...selectedPlatforms, name]
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
            value={currentContent}
            onChange={(e) => setCurrentContent(e.target.value)}
            placeholder="Start typing or generate content..."
            className="w-full h-40 p-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className={`px-6 py-2 bg-blue-600 text-white rounded-lg transition-colors ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {isGenerating ? 'Generating...' : 'Generate Content'}
          </button>
          <button
            onClick={handleSchedule}
            className="flex items-center px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            <Send className="w-4 h-4 mr-2" />
            Schedule Post
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">AI Suggestions</h3>
          <button
            onClick={handleGetHashtags}
            className="flex items-center px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
          >
            <Hash className="w-4 h-4 mr-2" />
            Generate Hashtags
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Suggested Hashtags</p>
            <div className="flex flex-wrap gap-2">
              {suggestedHashtags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border cursor-pointer hover:bg-gray-50"
                  onClick={() => setCurrentContent(prev => `${prev} ${tag}`)}
                >
                  {tag}
                </span>
              ))}
              {suggestedHashtags.length === 0 && (
                <span className="text-sm text-gray-500">
                  Click "Generate Hashtags" to get suggestions
                </span>
              )}
            </div>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600 mb-2">Best Time to Post</p>
            {bestTimes.length > 0 ? (
              <div className="space-y-2">
                {bestTimes.map((time, index) => (
                  <p key={index} className="text-sm text-gray-800">
                    {time.time} - Average engagement: {time.avg_engagement.toFixed(1)}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-500">
                Best posting times will be calculated based on engagement data
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}