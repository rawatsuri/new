import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from 'react-hot-toast';
import App from './App';
import './index.css';

// Initialize posts on app start
const initializeApp = async () => {
  try {
    await fetch('/api/posts');
  } catch (error) {
    console.error('Failed to initialize posts:', error);
  }
};

initializeApp();

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element not found');

createRoot(rootElement).render(
  <StrictMode>
    <App />
    <Toaster position="top-right" />
  </StrictMode>
);