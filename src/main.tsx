import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

// Initialize store with default data
const initializeApp = async () => {
  try {
    const response = await fetch('/api/posts');
    if (!response.ok) {
      throw new Error('Failed to fetch posts');
    }
  } catch (error) {
    console.error('Failed to initialize posts:', error);
  }
};

// Initialize the app
initializeApp();

createRoot(rootElement).render(
  <StrictMode>
    <App />
    <Toaster 
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          background: '#363636',
          color: '#fff',
        },
      }}
    />
  </StrictMode>
);