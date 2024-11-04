import nlp from 'compromise';

// Template library for different content types
const templates = {
  professional: [
    "Excited to share that {topic}. Learn how {benefit} and stay ahead in {industry}.",
    "New insights: {topic}. Discover how {benefit} for your business growth.",
    "Industry update: {topic}. Find out how {benefit} in today's market."
  ],
  casual: [
    "Hey everyone! 👋 Check out how {topic}! It's amazing how {benefit} 🚀",
    "Can't believe how {topic}! Want to know how {benefit}? Let's chat! 💬",
    "Just discovered something cool about {topic}! Did you know you can {benefit}? 🤔"
  ],
  humorous: [
    "Plot twist: {topic} 😅 Who knew you could {benefit}? #MindBlown",
    "Warning: {topic} might make you too awesome! Side effects include: {benefit} 😎",
    "Breaking news: {topic} just broke the internet! Apparently {benefit} 🤣"
  ]
};

// Industry-specific keywords and phrases
const keywords = {
  tech: ['innovation', 'digital transformation', 'technology', 'automation', 'AI', 'future'],
  business: ['growth', 'strategy', 'success', 'leadership', 'management', 'ROI'],
  lifestyle: ['wellness', 'balance', 'happiness', 'health', 'mindfulness', 'growth'],
  marketing: ['branding', 'engagement', 'audience', 'strategy', 'content', 'social media']
};

// Platform-specific content optimizations
const platformOptimizations = {
  LinkedIn: {
    maxLength: 1300,
    hashtagCount: 3,
    style: 'professional',
    format: (content) => content.replace(/!+/g, '.').trim()
  },
  Twitter: {
    maxLength: 280,
    hashtagCount: 2,
    style: 'casual',
    format: (content) => content.trim()
  },
  Instagram: {
    maxLength: 2200,
    hashtagCount: 25,
    style: 'casual',
    format: (content) => content.trim()
  },
  Facebook: {
    maxLength: 63206,
    hashtagCount: 2,
    style: 'casual',
    format: (content) => content.trim()
  }
};

// Hashtag generation based on content analysis
function generateHashtags(content, platform, count = 5) {
  const doc = nlp(content);
  const topics = doc.topics().out('array');
  const nouns = doc.nouns().out('array');
  const verbs = doc.verbs().out('array');
  
  const words = [...new Set([...topics, ...nouns, ...verbs])]
    .filter(word => word.length > 3)
    .map(word => word.toLowerCase().replace(/\s+/g, ''));

  const industryTags = Object.values(keywords).flat();
  const allTags = [...words, ...industryTags];
  
  return allTags
    .slice(0, count)
    .map(tag => `#${tag}`)
    .filter((tag, index, self) => self.indexOf(tag) === index);
}

// Content generation based on tone and platform
function generateContent(platforms, tone, topic = '') {
  const industry = Object.keys(keywords)[Math.floor(Math.random() * Object.keys(keywords).length)];
  const industryKeywords = keywords[industry];
  
  const benefit = industryKeywords[Math.floor(Math.random() * industryKeywords.length)];
  const template = templates[tone.toLowerCase()][Math.floor(Math.random() * templates[tone.toLowerCase()].length)];
  
  let content = template
    .replace('{topic}', topic || industryKeywords[Math.floor(Math.random() * industryKeywords.length)])
    .replace('{benefit}', benefit)
    .replace('{industry}', industry);

  // Platform-specific optimizations
  return platforms.map(platform => {
    const optimization = platformOptimizations[platform];
    let optimizedContent = optimization.format(content);
    
    // Add platform-specific hashtags
    const hashtags = generateHashtags(optimizedContent, platform, optimization.hashtagCount);
    optimizedContent += '\n\n' + hashtags.join(' ');

    // Truncate if needed
    if (optimizedContent.length > optimization.maxLength) {
      optimizedContent = optimizedContent.slice(0, optimization.maxLength - 3) + '...';
    }

    return {
      platform,
      content: optimizedContent
    };
  });
}

// Analyze engagement patterns
function analyzeBestPostingTime(posts) {
  const engagementByHour = {};
  
  posts.forEach(post => {
    const hour = new Date(post.date + ' ' + post.time).getHours();
    if (!engagementByHour[hour]) {
      engagementByHour[hour] = {
        total: 0,
        count: 0
      };
    }
    engagementByHour[hour].total += parseInt(post.engagement) || 0;
    engagementByHour[hour].count += 1;
  });

  return Object.entries(engagementByHour)
    .map(([hour, data]) => ({
      time: `${hour}:00`,
      avg_engagement: data.total / data.count
    }))
    .sort((a, b) => b.avg_engagement - a.avg_engagement)
    .slice(0, 3);
}

export { generateContent, generateHashtags, analyzeBestPostingTime };