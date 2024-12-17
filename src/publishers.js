const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const publishersPath = path.join(__dirname, 'publishers.json');
const booksPath = path.join(__dirname, 'books.json');
let publishers = JSON.parse(fs.readFileSync(publishersPath, 'utf8'));
let books = JSON.parse(fs.readFileSync(booksPath, 'utf8'));

// Obtener todos los publishers
router.get('/', (req, res) => {
    res.json(publishers);
});

// Obtener un publisher por ID
router.get('/:id', (req, res) => {
    const publisher = publishers.find(p => p.id === parseInt(req.params.id, 10));
    if (publisher) {
        res.json(publisher);
    } else {
        res.status(404).send('Publisher not found');
    }
});

// Obtener libros por publisher
router.get('/:id/books', (req, res) => {
    const publisherBooks = books.filter(b => b.publisher_id === parseInt(req.params.id, 10));
    res.json(publisherBooks);
});

// Agregar un publisher
router.post('/', (req, res) => {
    const newPublisher = req.body;
    publishers.push(newPublisher);
    fs.writeFileSync(publishersPath, JSON.stringify(publishers, null, 2));
    res.status(201).send('Publisher added');
});

// Modificar un publisher
router.put('/:id', (req, res) => {
    const index = publishers.findIndex(p => p.id === parseInt(req.params.id, 10));
    if (index !== -1) {
        publishers[index] = { ...publishers[index], ...req.body };
        fs.writeFileSync(publishersPath, JSON.stringify(publishers, null, 2));
        res.send('Publisher updated');
    } else {
        res.status(404).send('Publisher not found');
    }
});

// Eliminar un publisher
router.delete('/:id', (req, res) => {
    publishers = publishers.filter(p => p.id !== parseInt(req.params.id, 10));
    fs.writeFileSync(publishersPath, JSON.stringify(publishers, null, 2));
    res.send('Publisher deleted');
});

module.exports = router;
