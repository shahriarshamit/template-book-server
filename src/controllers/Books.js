const express = require('express');

const connect = require('../engine/database');
const BookModel = require('../models/Books');

connect();

const getAllBooks = async function (request, response) {
    try {
        const category = request.query.category;
        const filter = {};
        if (category) {
            filter.category = category;
        }
        const data = await BookModel.find(filter);
        return response.status(200).json({status: 'success', data: data});
    } catch (error) {
        return response.status(500).json({status: 'error', data: 'An error occured while fetching books list'});
    }
};

module.exports = {
    getAllBooks
};
