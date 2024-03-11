const express = require('express');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.post('/apikey', async (req, res) => {
    try {
        const { url } = req.body;
        const response = await axios.post('https://all-video-downloader1.p.rapidapi.com/xnxx', {
            urlXNXX: url
        }, {
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': 'c430b8ecfbmsh1fb735a97be99a5p198e4bjsnd8ce5972748f',
                'X-RapidAPI-Host': 'all-video-downloader1.p.rapidapi.com'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
