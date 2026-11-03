const Book = require('../models/bookModel');

const ITEMS_PER_PAGE = 5;

// READ: Display book collection
const getBooks = async (req, res) => {
    try {
        const search = (req.query.search || '').trim();
        const genre = (req.query.genre || '').trim();

        const requestedPage = parseInt(req.query.page, 10);
        const page = Number.isInteger(requestedPage) && requestedPage > 0
            ? requestedPage
            : 1;

        const filters = { search, genre };

        const totalBooks = await Book.countBooks(filters);
        const totalPages = Math.ceil(totalBooks / ITEMS_PER_PAGE);

        const currentPage = totalPages > 0
            ? Math.min(page, totalPages)
            : 1;

        const offset = (currentPage - 1) * ITEMS_PER_PAGE;

        const books = await Book.getAllBooks({
            ...filters,
            limit: ITEMS_PER_PAGE,
            offset
        });

        res.render('pages/books', {
            title: 'Book Collection',
            books,
            search,
            genre,
            currentPage,
            totalPages
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to load book collection.');
    }
};

// Show add form
const showAddForm = (req, res) => {
    res.render('pages/book-form', {
        title: 'Add New Book',
        book: null
    });
};

// CREATE: Save a new book
const addBook = async (req, res) => {
    try {
        const {
            title,
            author,
            genre,
            published_year,
            description,
            status
        } = req.body;

        const year = Number(published_year);

        if (
            !title?.trim() ||
            !author?.trim() ||
            !genre?.trim() ||
            !Number.isInteger(year) ||
            year < 1 ||
            year > new Date().getFullYear() ||
            !['Available', 'Borrowed'].includes(status)
        ) {
            return res.status(400).send('Invalid book information.');
        }

        await Book.createBook({
            title: title.trim(),
            author: author.trim(),
            genre: genre.trim(),
            published_year: year,
            description: description?.trim() || '',
            status
        });

        // Post-Redirect-Get
        res.redirect('/books');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to add book.');
    }
};

// Show edit form
const showEditForm = async (req, res) => {
    try {
        const book = await Book.getBookById(req.params.id);

        if (!book) {
            return res.status(404).send('Book not found.');
        }

        res.render('pages/book-form', {
            title: 'Edit Book',
            book
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to load book.');
    }
};

// UPDATE: Save edited book
const updateBook = async (req, res) => {
    try {
        const {
            title,
            author,
            genre,
            published_year,
            description,
            status
        } = req.body;

        const year = Number(published_year);

        if (
            !title?.trim() ||
            !author?.trim() ||
            !genre?.trim() ||
            !Number.isInteger(year) ||
            year < 1 ||
            year > new Date().getFullYear() ||
            !['Available', 'Borrowed'].includes(status)
        ) {
            return res.status(400).send('Invalid book information.');
        }

        const existingBook = await Book.getBookById(req.params.id);

        if (!existingBook) {
            return res.status(404).send('Book not found.');
        }

        await Book.updateBook(req.params.id, {
            title: title.trim(),
            author: author.trim(),
            genre: genre.trim(),
            published_year: year,
            description: description?.trim() || '',
            status
        });

        // Post-Redirect-Get
        res.redirect('/books');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to update book.');
    }
};

// DELETE: Remove book
const deleteBook = async (req, res) => {
    try {
        const result = await Book.deleteBook(req.params.id);

        if (result.affectedRows === 0) {
            return res.status(404).send('Book not found.');
        }

        // Post-Redirect-Get
        res.redirect('/books');
    } catch (error) {
        console.error(error);
        res.status(500).send('Failed to delete book.');
    }
};

module.exports = {
    getBooks,
    showAddForm,
    addBook,
    showEditForm,
    updateBook,
    deleteBook
};