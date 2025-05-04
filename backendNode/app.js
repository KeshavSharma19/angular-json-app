const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
const cors = require('cors'); // Import the cors package
const dataFile = './data.json';
app.use(cors()); // Enable CORS for all routes
app.get('/getData', (req, res) => {
    fs.readFile(dataFile, 'utf8', (err, data) => {
        if (err) return res.status(500).send('Error reading data.');
        res.json(JSON.parse(data));
    });
});

app.post('/addData', (req, res) => {
    const updatedData = req.body;
    fs.writeFile(dataFile, JSON.stringify(updatedData, null, 2), (err) => {
        if (err) return res.status(500).send('Error saving data.');
        res.send('Data updated successfully!');
    });
});

app.listen(3000, () => console.log('API server running on http://localhost:3000'));
