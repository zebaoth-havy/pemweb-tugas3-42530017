const express = require('express');
const path = require('path');
require('dotenv').config();

const bookRoutes = require('./routes/bookRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// EJS configuration
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/books', bookRoutes);

// Home route
app.get('/', (req, res) => {
    res.redirect('/books');
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found.');
});

// Start server
app.listen(PORT, () => {
    console.log(`Enchanted Library running at http://localhost:${PORT}`);
});