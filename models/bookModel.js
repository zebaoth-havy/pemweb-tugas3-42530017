const db = require('../config/db');

// READ: Get books with search, filter, and pagination
const getAllBooks = async ({ search, genre, limit, offset }) => {
    let conditions = [];
    let values = [];

    if (search) {
        conditions.push('(title LIKE ? OR author LIKE ?)');
        values.push(`%${search}%`, `%${search}%`);
    }

    if (genre) {
        conditions.push('genre = ?');
        values.push(genre);
    }

    let sql = 'SELECT * FROM books';

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY id DESC LIMIT ? OFFSET ?';
    values.push(limit, offset);

    const [rows] = await db.execute(sql, values);

    return rows;
};

// Count books for pagination
const countBooks = async ({ search, genre }) => {
    let conditions = [];
    let values = [];

    if (search) {
        conditions.push('(title LIKE ? OR author LIKE ?)');
        values.push(`%${search}%`, `%${search}%`);
    }

    if (genre) {
        conditions.push('genre = ?');
        values.push(genre);
    }

    let sql = 'SELECT COUNT(*) AS total FROM books';

    if (conditions.length > 0) {
        sql += ' WHERE ' + conditions.join(' AND ');
    }

    const [rows] = await db.execute(sql, values);

    return rows[0].total;
};

// READ: Get one book by ID
const getBookById = async (id) => {
    const [rows] = await db.execute(
        'SELECT * FROM books WHERE id = ?',
        [id]
    );

    return rows[0];
};

// CREATE: Insert a new book
const createBook = async (book) => {
    const {
        title,
        author,
        genre,
        published_year,
        description,
        status
    } = book;

    const [result] = await db.execute(
        `INSERT INTO books
        (title, author, genre, published_year, description, status)
        VALUES (?, ?, ?, ?, ?, ?)`,
        [title, author, genre, published_year, description, status]
    );

    return result;
};

// UPDATE: Update a book by ID
const updateBook = async (id, book) => {
    const {
        title,
        author,
        genre,
        published_year,
        description,
        status
    } = book;

    const [result] = await db.execute(
        `UPDATE books
        SET title = ?,
            author = ?,
            genre = ?,
            published_year = ?,
            description = ?,
            status = ?
        WHERE id = ?`,
        [
            title,
            author,
            genre,
            published_year,
            description,
            status,
            id
        ]
    );

    return result;
};

// DELETE: Delete a book by ID
const deleteBook = async (id) => {
    const [result] = await db.execute(
        'DELETE FROM books WHERE id = ?',
        [id]
    );

    return result;
};

module.exports = {
    getAllBooks,
    countBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook
};