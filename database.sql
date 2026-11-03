CREATE DATABASE IF NOT EXISTS enchanted_library;

USE enchanted_library;

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    author VARCHAR(100) NOT NULL,
    genre VARCHAR(50) NOT NULL,
    published_year INT NOT NULL,
    description TEXT,
    status ENUM('Available', 'Borrowed')
        DEFAULT 'Available',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO books
(title, author, genre, published_year, description, status)
VALUES
(
    'The Lion, the Witch and the Wardrobe',
    'C. S. Lewis',
    'Fantasy',
    1950,
    'Four children discover a magical world called Narnia.',
    'Available'
),
(
    'The Hobbit',
    'J. R. R. Tolkien',
    'Adventure',
    1937,
    'Bilbo Baggins embarks on an unexpected journey.',
    'Available'
),
(
    'Harry Potter and the Sorcerer''s Stone',
    'J. K. Rowling',
    'Fantasy',
    1997,
    'A young wizard discovers his magical identity.',
    'Borrowed'
),
(
    'Percy Jackson and the Lightning Thief',
    'Rick Riordan',
    'Fantasy',
    2005,
    'Percy discovers that he is the son of Poseidon.',
    'Available'
),
(
    'A Wizard of Earthsea',
    'Ursula K. Le Guin',
    'Fantasy',
    1968,
    'A young wizard learns about magic and balance.',
    'Available'
);