const express = require('express');
const router = express.Router();

const BooksController = require('../../controllers/Books');

router.route('/books').get(BooksController.getAllBooks);
router.route('/books/add').post(BooksController.createNewBook);
router.route('/books/:slug').get(BooksController.getSingleBook);

module.exports = router;