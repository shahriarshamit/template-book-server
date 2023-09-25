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

const createNewBook = async function (request, response) {
    try {
        const bookDetails = request.body;
        if (!bookDetails.title) {
            return response.status(500).json({status: 'error', data: 'Book title is empty.'});
        } else if (!bookDetails.slug) {
            return response.status(500).json({status: 'error', data: 'Book slug is empty.'});
        } else if (!bookDetails.stars) {
            return response.status(500).json({status: 'error', data: 'Book star is empty.'});
        } else if (!bookDetails.description) {
            return response.status(500).json({status: 'error', data: 'Book description is empty.'});
        } else if (!bookDetails.category) {
            return response.status(500).json({status: 'error', data: 'Book category is empty.'});
        } else if (!bookDetails.thumbnail) {
            return response.status(500).json({status: 'error', data: 'Book thumbnail is empty.'});
        }
        const newBook = new BookModel({
            title: bookDetails.title,
            slug: bookDetails.slug,
            stars: bookDetails.stars,
            description: bookDetails.description,
            category: bookDetails.category,
            thumbnail: bookDetails.thumbnail
        });
        const data = await BookModel.create(newBook);
        if (!data) {
            return response.status(500).json({status: 'error', data: 'Book creation failed.'});
        }
        return response.status(200).json({status: 'success', data: data});
    } catch (error) {
        console.log(error);
        return response.status(500).json({status: 'error', data: 'An error occured while fetching books details'});
    }
};

module.exports = {
    getAllBooks,
    getSingleBook,
    createNewBook
};
