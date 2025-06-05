const express = require('express');
const path = require('path');
const app = express();

// Serve static files
app.use(express.static('public'));

// API routes
app.get('/api/lastfm', async (req, res) => {
  try {
    const apiKey = process.env.LASTFM_API_KEY;
    const username = 'taynotfound'; // Your Last.fm username
    
    const response = await fetch(
      `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${username}&api_key=${apiKey}&format=json&limit=1`
    );
    
    const data = await response.json();
    const track = data.recenttracks.track[0];
    
    res.json({
      track: {
        name: track.name,
        artist: track.artist['#text'],
        album: track.album['#text'],
        image: track.image[3]['#text'],
        nowplaying: track['@attr']?.nowplaying === 'true'
      }
    });
  } catch (error) {
    console.error('Last.fm API error:', error);
    res.status(500).json({ error: 'Failed to fetch Last.fm data' });
  }
});

// Contact form endpoint
app.post('/api/contact', express.json(), async (req, res) => {
  try {
    const { name, email, message } = req.body;
    // Add your email sending logic here
    // For now, we'll just log it
    console.log('Contact form submission:', { name, email, message });
    res.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

// Serve the main page
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Serve legal pages
app.get('/impressum', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'impressum.html'));
});

app.get('/impressum-en', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'impressum-en.html'));
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 2050;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

// Export for Vercel
module.exports = app; 
