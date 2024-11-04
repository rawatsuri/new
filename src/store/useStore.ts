import { create } from 'zustand';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export type Post = {
  id: string;
  platform: string;
  content: string;
  status: 'Draft' | 'Scheduled' | 'Published';
  date: string;
  engagement: string | number;
  time?: string;
};

type State = {
  posts: Post[];
  selectedPlatforms: string[];
  selectedTone: string;
  currentContent: string;
  addPost: (post: Omit<Post, 'id'>) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  setSelectedPlatforms: (platforms: string[]) => void;
  setSelectedTone: (tone: string) => void;
  setCurrentContent: (content: string) => void;
  generateContent: () => Promise<void>;
  schedulePost: () => Promise<void>;
  fetchPosts: () => Promise<void>;
  suggestHashtags: (content: string, platform: string) => Promise<string[]>;
  getBestPostingTime: () => Promise<{ time: string; avg_engagement: number; }[]>;
};

const useStore = create<State>((set, get) => ({
  posts: [],
  selectedPlatforms: [],
  selectedTone: '',
  currentContent: '',

  addPost: async (post) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post),
      });
      
      if (!response.ok) throw new Error('Failed to create post');
      
      const newPost = await response.json();
      set((state) => ({ posts: [...state.posts, newPost] }));
    } catch (error) {
      console.error('Error adding post:', error);
      throw error;
    }
  },

  updatePost: async (id, updatedPost) => {
    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost),
      });
      
      if (!response.ok) throw new Error('Failed to update post');
      
      set((state) => ({
        posts: state.posts.map((post) =>
          post.id === id ? { ...post, ...updatedPost } : post
        ),
      }));
    } catch (error) {
      console.error('Error updating post:', error);
      throw error;
    }
  },

  setSelectedPlatforms: (platforms) => set({ selectedPlatforms: platforms }),
  setSelectedTone: (tone) => set({ selectedTone: tone }),
  setCurrentContent: (content) => set({ currentContent: content }),

  generateContent: async () => {
    const { selectedPlatforms, selectedTone } = get();
    
    if (!selectedTone || selectedPlatforms.length === 0) {
      throw new Error('Please select platforms and tone first');
    }

    try {
      const response = await fetch('/api/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          platforms: selectedPlatforms,
          tone: selectedTone,
          keywords: ['social media', 'content', 'engagement'],
        }),
      });

      if (!response.ok) throw new Error('Failed to generate content');

      const { content } = await response.json();
      set({ currentContent: content });
    } catch (error) {
      console.error('Error generating content:', error);
      throw error;
    }
  },

  schedulePost: async () => {
    const { selectedPlatforms, currentContent } = get();
    
    if (!currentContent || selectedPlatforms.length === 0) {
      throw new Error('Please generate content and select platforms first');
    }

    try {
      const scheduledDate = format(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
      
      for (const platform of selectedPlatforms) {
        await get().addPost({
          platform,
          content: currentContent,
          status: 'Scheduled',
          date: scheduledDate,
          engagement: '-',
          time: '10:00 AM',
        });
      }

      set({
        selectedPlatforms: [],
        selectedTone: '',
        currentContent: '',
      });
    } catch (error) {
      console.error('Error scheduling post:', error);
      throw error;
    }
  },

  fetchPosts: async () => {
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Failed to fetch posts');
      
      const posts = await response.json();
      set({ posts });
    } catch (error) {
      console.error('Error fetching posts:', error);
      throw error;
    }
  },

  suggestHashtags: async (content: string, platform: string) => {
    try {
      const response = await fetch('/api/suggest-hashtags', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, platform }),
      });

      if (!response.ok) throw new Error('Failed to suggest hashtags');

      const { hashtags } = await response.json();
      return hashtags;
    } catch (error) {
      console.error('Error suggesting hashtags:', error);
      throw error;
    }
  },

  getBestPostingTime: async () => {
    try {
      const response = await fetch('/api/best-posting-time');
      if (!response.ok) throw new Error('Failed to get best posting time');
      
      return await response.json();
    } catch (error) {
      console.error('Error getting best posting time:', error);
      throw error;
    }
  },
}));

export default useStore;