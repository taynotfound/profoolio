const express = require('express');
const path = require('path');
const axios = require('axios');
const bodyParser = require('body-parser');
const { error } = require('console');

const app = express();
const PORT = process.env.PORT || 2050;

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());

// Main route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get("/impressum", (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'impressum.html'));
    });

app.get('/impressum-en', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'impressum-en.html'));
});

// Last.fm API proxy
app.get('/api/lastfm', async (req, res) => {
  try {
    const apiKey = process.env.LASTFM_API_KEY; // Replace with your Last.fm API key
    const user = process.env.LASTFM_USER; // Replace with your Last.fm username
    const url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${user}&api_key=${apiKey}&format=json&limit=1`;
    const response = await axios.get(url);
    const data = response.data;
    const track = data.recenttracks.track[0];
    if (track) {
      res.json({
        track: {
          name: track.name,
          artist: track.artist['#text'],
          album: track.album['#text'],
          url: track.url,
          image: track.image[2]['#text'] || ''
        }
      });
    } else {
      res.json({ track: null });
    }
  } catch (e) {
    res.status(500).json({ error: 'Failed to fetch Last.fm data.', details: e.message });
  }
});

// Contact form to Discord webhook
app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) return res.status(400).json({ error: 'Missing fields' });
  try {
    await axios.post('https://canary.discord.com/api/webhooks/1374164655068418138/HMSvgBQ-DBIfpPyVubJF4fAKi6iKF5sSmFNkYOePKABIfUtYuoy3Hy0lhc4RDPeFuMSJ', {
      content: `**Portfolio Contact Form**\nName: ${name}\nEmail: ${email}\nMessage: ${message}`
    });
    res.json({ success: true });
  } catch (e) {
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

app.listen(PORT, () => {
  console.log(`Portfolio running at http://localhost:${PORT}`);
});
