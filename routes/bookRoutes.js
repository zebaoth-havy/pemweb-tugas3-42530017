const express = require('express');
const router = express.Router();

const bookController = require('../controllers/bookController');

// Read
router.get('/', bookController.getBooks);

// Create
router.get('/add', bookController.showAddForm);
router.post('/add', bookController.addBook);

// Update
router.get('/edit/:id', bookController.showEditForm);
router.post('/edit/:id', bookController.updateBook);

// Delete
router.post('/delete/:id', bookController.deleteBook);

module.exports = router;