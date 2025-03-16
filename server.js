const express = require("express");
const cors = require("cors");
const scrapeWebsite = require("./scraper");

const app = express();
const PORT = process.env.PORT || 10000; // Ensure backend is running on port 10000

app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON request body

app.post("/scrape", async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: "URL is required" });
    }

    try {
        const data = await scrapeWebsite(url);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to scrape website" });
    }
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
