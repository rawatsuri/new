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

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  avatar?: string;
};

type Settings = {
  emailNotifications: boolean;
  pushNotifications: boolean;
  theme: 'light' | 'dark' | 'system';
  aiSuggestions: boolean;
  aiModel: 'gpt-4' | 'gpt-3.5';
  twoFactorAuth: boolean;
  loginNotifications: boolean;
};

type State = {
  posts: Post[];
  teamMembers: TeamMember[];
  settings: Settings;
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
  inviteTeamMember: (email: string, role: string) => void;
  updateSettings: (newSettings: Partial<Settings>) => void;
};

const useStore = create<State>((set) => ({
  posts: [
    {
      id: '1',
      platform: 'Instagram',
      content: 'Exciting news! Our latest AI feature is now live...',
      status: 'Published',
      date: '2024-03-15',
      engagement: '2.5K'
    },
    {
      id: '2',
      platform: 'LinkedIn',
      content: 'Join us for an exclusive webinar on digital transformation...',
      status: 'Scheduled',
      date: '2024-03-20',
      engagement: '-'
    }
  ],
  teamMembers: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Admin'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Editor'
    }
  ],
  settings: {
    emailNotifications: true,
    pushNotifications: false,
    theme: 'light',
    aiSuggestions: true,
    aiModel: 'gpt-4',
    twoFactorAuth: false,
    loginNotifications: true
  },
  selectedPlatforms: [],
  selectedTone: '',
  currentContent: '',

  addPost: (post) =>
    set((state) => ({
      posts: [...state.posts, { ...post, id: Math.random().toString(36).substr(2, 9) }]
    })),

  updatePost: (id, updatedPost) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === id ? { ...post, ...updatedPost } : post
      )
    })),

  setSelectedPlatforms: (platforms) => set({ selectedPlatforms: platforms }),
  setSelectedTone: (tone) => set({ selectedTone: tone }),
  setCurrentContent: (content) => set({ currentContent: content }),

  generateContent: async () => {
    const state = useStore.getState();
    if (!state.selectedTone || state.selectedPlatforms.length === 0) {
      throw new Error('Please select platforms and tone first');
    }

    // Simulate AI content generation
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    const generatedContent = `Generated content for ${state.selectedPlatforms.join(', ')} in ${state.selectedTone} tone.`;
    set({ currentContent: generatedContent });
  },

  schedulePost: async () => {
    const state = useStore.getState();
    if (!state.currentContent || state.selectedPlatforms.length === 0) {
      throw new Error('Please generate content and select platforms first');
    }

    // Schedule post for each selected platform
    state.selectedPlatforms.forEach((platform) => {
      const scheduledDate = format(new Date().setDate(new Date().getDate() + 1), 'yyyy-MM-dd');
      state.addPost({
        platform,
        content: state.currentContent,
        status: 'Scheduled',
        date: scheduledDate,
        engagement: '-',
        time: '10:00 AM'
      });
    });

    // Reset form
    set({
      selectedPlatforms: [],
      selectedTone: '',
      currentContent: ''
    });
  },

  inviteTeamMember: (email: string, role: string) => {
    set((state) => ({
      teamMembers: [...state.teamMembers, {
        id: Math.random().toString(36).substr(2, 9),
        name: email.split('@')[0],
        email,
        role: role as 'Admin' | 'Editor' | 'Viewer'
      }]
    }));
    toast.success(`Invitation sent to ${email}`);
  },

  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings }
    }))
}));

export default useStore;