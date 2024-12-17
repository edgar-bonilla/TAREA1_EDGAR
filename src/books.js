const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const filePath = path.join(__dirname, 'books.json');
let books = JSON.parse(fs.readFileSync(filePath, 'utf8'));

// Obtener todos los libros
router.get('/', (req, res) => {
    res.json(books);
});

// Obtener un libro por ID
router.get('/:id', (req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id, 10));
    if (book) {
        res.json(book);
    } else {
        res.status(404).send('Book not found');
    }
});

// Agregar un libro
router.post('/', (req, res) => {
    const newBook = req.body;
    books.push(newBook);
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
    res.status(201).send('Book added');
});

// Modificar un libro
router.put('/:id', (req, res) => {
    const index = books.findIndex(b => b.id === parseInt(req.params.id, 10));
    if (index !== -1) {
        books[index] = { ...books[index], ...req.body };
        fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
        res.send('Book updated');
    } else {
        res.status(404).send('Book not found');
    }
});

// Eliminar un libro
router.delete('/:id', (req, res) => {
    books = books.filter(b => b.id !== parseInt(req.params.id, 10));
    fs.writeFileSync(filePath, JSON.stringify(books, null, 2));
    res.send('Book deleted');
});

module.exports = router;
