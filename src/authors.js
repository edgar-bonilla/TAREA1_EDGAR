const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const authorsPath = path.join(__dirname, 'authors.json');
const booksPath = path.join(__dirname, 'books.json');
let authors = JSON.parse(fs.readFileSync(authorsPath, 'utf8'));
let books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));

// Obtener todos los autores
router.get('/', (req, res) => {
    res.json(authors);
});

// Obtener un autor por ID
router.get('/:id', (req, res) => {
    const author = authors.find(a => a.id === parseInt(req.params.id, 10));
    if (author) {
        res.json(author);
    } else {
        res.status(404).send('Author not found');
    }
});

// Obtener libros por autor
router.get('/:id/books', (req, res) => {
    const authorBooks = books.filter(b => b.author_id === parseInt(req.params.id, 10));
    res.json(authorBooks);
});

// Agregar un autor
router.post('/', (req, res) => {
    const newAuthor = req.body;
    authors.push(newAuthor);
    fs.writeFileSync(authorsPath, JSON.stringify(authors, null, 2));
    res.status(201).send('Author added');
});

// Modificar un autor
router.put('/:id', (req, res) => {
    const index = authors.findIndex(a => a.id === parseInt(req.params.id, 10));
    if (index !== -1) {
        authors[index] = { ...authors[index], ...req.body };
        fs.writeFileSync(authorsPath, JSON.stringify(authors, null, 2));
        res.send('Author updated');
    } else {
        res.status(404).send('Author not found');
    }
});

// Eliminar un autores
router.delete('/:id', (req, res) => {
    authors = authors.filter(a => a.id !== parseInt(req.params.id, 10));
    fs.writeFileSync(authorsPath, JSON.stringify(authors, null, 2));
    res.send('Author deleted');
});

module.exports = router;
