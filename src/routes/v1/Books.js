const express = require('express');
const router = express.Router();

const BooksController = require('../../controllers/Books');

router.route('/books').get(BooksController.getAllBooks);

module.exports = router;