const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware para manejar JSON
app.use(bodyParser.json()); // Esto es esencial para procesar application/json

// Tus rutas
const booksRouter = require('./books');
const authorsRouter = require('./authors');
const publishersRouter = require('./publishers');

app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.use('/publishers', publishersRouter);

// Manejo de errores
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON:', err.message);
        return res.status(400).send('Invalid JSON input.');
    }
    next(err);
});

// Puerto
const port = 1337;
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
