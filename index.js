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

        // Extract the required information from the response
        const creator = "Nafis";
        const mp4Link = response.data.result.url;

        // Construct the simplified response object
        const simplifiedResponse = {
            creator: creator,
            mp4Link: mp4Link
        };

        // Return the simplified response to the client
        res.json(simplifiedResponse);
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
