const express = require('express');
const cors = require('cors');
const scrapeWebsite = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000; // Render requires a port

app.use(cors());
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
    res.send('Web Scraper API is running!');
});

// Scraping Route
app.post('/scrape', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'URL is required' });
    }

    try {
        const scrapedData = await scrapeWebsite(url);
        res.json({ message: 'Scraping successful', data: scrapedData });
    } catch (error) {
        console.error('Error scraping website:', error); // Log the error details
        res.status(500).json({ error: 'Failed to scrape website', details: error.message });
    }
});

// Start Server
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`Port ${PORT} is already in use. Trying a different port...`);
        const newPort = PORT + 1;
        app.listen(newPort, () => {
            console.log(`Server running on port ${newPort}`);
        });
    } else {
        console.error('Server error:', error);
    }
});