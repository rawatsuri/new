import express from 'express';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { generateContent, generateHashtags, analyzeBestPostingTime } from './ai/contentGenerator.js';
import cors from 'cors';

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the dist directory
app.use(express.static(join(__dirname, '../dist')));

// Database setup
const dbPromise = open({
  filename: ':memory:', // Use in-memory database for development
  driver: sqlite3.Database
});

// Initialize database tables
async function initDB() {
  const db = await dbPromise;
  await db.exec(`
    CREATE TABLE IF NOT EXISTS posts (
      id TEXT PRIMARY KEY,
      platform TEXT NOT NULL,
      content TEXT NOT NULL,
      status TEXT NOT NULL,
      date TEXT NOT NULL,
      time TEXT,
      engagement INTEGER DEFAULT 0
    );
    
    CREATE TABLE IF NOT EXISTS analytics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      platform TEXT NOT NULL,
      date TEXT NOT NULL,
      engagement INTEGER DEFAULT 0
    );
  `);

  // Add some initial data
  const posts = await db.all('SELECT * FROM posts');
  if (posts.length === 0) {
    const initialPosts = [
      {
        id: '1',
        platform: 'Instagram',
        content: 'Welcome to our new social media platform!',
        status: 'Published',
        date: new Date().toISOString().split('T')[0],
        time: '09:00',
        engagement: 150
      }
    ];

    for (const post of initialPosts) {
      await db.run(
        'INSERT INTO posts (id, platform, content, status, date, time, engagement) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [post.id, post.platform, post.content, post.status, post.date, post.time, post.engagement]
      );
    }
  }
}

initDB().catch(console.error);

// API Routes
app.post('/api/generate-content', async (req, res) => {
  try {
    const { platforms, tone, keywords } = req.body;
    const generatedContent = generateContent(platforms, tone, keywords?.join(' '));
    res.json({ content: generatedContent[0].content });
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ error: 'Failed to generate content' });
  }
});

app.post('/api/posts', async (req, res) => {
  try {
    const db = await dbPromise;
    const { platform, content, status, date, time } = req.body;
    const id = Math.random().toString(36).substr(2, 9);

    await db.run(
      'INSERT INTO posts (id, platform, content, status, date, time) VALUES (?, ?, ?, ?, ?, ?)',
      [id, platform, content, status, date, time]
    );

    res.json({ id, platform, content, status, date, time });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ error: 'Failed to create post' });
  }
});

app.get('/api/posts', async (req, res) => {
  try {
    const db = await dbPromise;
    const posts = await db.all('SELECT * FROM posts ORDER BY date DESC');
    res.json(posts);
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

app.get('/api/analytics', async (req, res) => {
  try {
    const db = await dbPromise;
    const analytics = await db.all(`
      SELECT platform, 
             SUM(engagement) as total_engagement,
             COUNT(*) as post_count
      FROM posts
      GROUP BY platform
    `);
    res.json(analytics);
  } catch (error) {
    console.error('Error fetching analytics:', error);
    res.status(500).json({ error: 'Failed to fetch analytics' });
  }
});

app.post('/api/suggest-hashtags', async (req, res) => {
  try {
    const { content, platform } = req.body;
    const hashtags = generateHashtags(content, platform);
    res.json({ hashtags });
  } catch (error) {
    console.error('Error suggesting hashtags:', error);
    res.status(500).json({ error: 'Failed to suggest hashtags' });
  }
});

app.get('/api/best-posting-time', async (req, res) => {
  try {
    const db = await dbPromise;
    const posts = await db.all('SELECT * FROM posts WHERE engagement > 0');
    const bestTimes = analyzeBestPostingTime(posts);
    res.json(bestTimes);
  } catch (error) {
    console.error('Error calculating best posting time:', error);
    res.status(500).json({ error: 'Failed to calculate best posting time' });
  }
});

// Handle all other routes by serving the index.html
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});