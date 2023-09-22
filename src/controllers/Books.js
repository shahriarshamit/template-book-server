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

const getSingleBook = async function (request, response) {
    try {
        const slug = request.params.slug;
        console.log(slug);
        if (!slug) {
            return response.status(500).json({status: 'error', data: 'Book slug is empty.'});
        }
        const data = await BookModel.findOne({slug: slug});
        if (!data) {
            return response.status(500).json({status: 'error', data: 'Book details not found.'});
        }
        return response.status(200).json({status: 'success', data: data});
    } catch (error) {
        return response.status(500).json({status: 'error', data: 'An error occured while fetching books details'});
    }
};

module.exports = {
    getAllBooks,
    getSingleBook
};
