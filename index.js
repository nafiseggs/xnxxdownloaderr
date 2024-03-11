// Import required modules
const express = require('express');
const axios = require('axios');

// Create an Express application
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware to parse query parameters
app.use(express.urlencoded({ extended: true }));

// Define the route for handling GET requests
app.get('/apikey', async (req, res) => {
    try {
        const { key, url } = req.query;

        if (key !== 'nafis') {
            return res.status(403).json({ error: 'Invalid API key' });
        }

        // Make a request to the external API using Axios
        const response = await axios.post('https://all-video-downloader1.p.rapidapi.com/xnxx', {
            urlXNXX: url
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': 'c430b8ecfbmsh1fb735a97be99a5p198e4bjsnd8ce5972748f',
                'X-RapidAPI-Host': 'all-video-downloader1.p.rapidapi.com'
            }
        });

        // Extract the MP4 link from the response
        const mp4Link = response.data.result.url;

        // Return the response with creator name and MP4 link
        res.json({ creator: 'Nafis', mp4Link: mp4Link });
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
