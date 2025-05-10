const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const db = require('./database'); // Import the database module

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (CSS, images, etc.)
app.use(express.static(path.join(__dirname)));

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'ivan.html'));
});

// Handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, message } = req.body;

    // Insert the form data into the database
    const query = `INSERT INTO submissions (name, email, message) VALUES (?, ?, ?)`;
    db.run(query, [name, email, message], function (err) {
        if (err) {
            console.error('Error inserting data:', err.message);
            res.status(500).send('An error occurred while saving your message.');
        } else {
            console.log(`Form submitted: ID=${this.lastID}, Name=${name}, Email=${email}, Message=${message}`);
            res.send('Thank you for contacting us!');
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
