const express = require('express');
const router = express.Router();

const BooksRouter = require('./Books');

router.use('/api/v1', BooksRouter);

module.exports = router;