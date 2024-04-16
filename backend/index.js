const express = require('express');
const axios = require('axios');
const cors = require('cors');
const https = require('https');

const app = express();
const PORT = 3000;

// Middleware to enable CORS
app.use(cors());

// Middleware to fetch data from another API
const fetchDataMiddleware = async (req, res, next) => {
    try {
        const { apiKey, platform, country, query } = req.query; // Extract query parameters from the request
        const apiUrl = `https://scrapper.stylekaro.in/google-shopping/?apiKey=${apiKey}&platform=${platform}&country=${country}&query=${query}`;

        const response = await axios.get(apiUrl, {
            httpsAgent: new https.Agent({ rejectUnauthorized: false })
        });

        req.products = response.data; // Assign fetched data to request object
        next(); // Call next middleware 
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// Route to get products with fetched data
app.get('/api/products', fetchDataMiddleware, (req, res) => {
    const products = req.products; // Access fetched data from request object
    res.json(products);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
