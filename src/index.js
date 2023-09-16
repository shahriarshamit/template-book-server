require('dotenv').config();

const cors = require('cors');
const express = require('express');
const connect = require('./engine/database');

const app = express();
const PORT = process.env.PORT || 8000;

connect();
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", function (req, res) {
    res.json('Hello World');
});
app.get("*", function (req, res) {
    res.sendStatus("404");
});

app.listen(PORT, function() {
    console.log(`Server started on port ${PORT}`);
});
