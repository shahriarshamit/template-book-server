require('dotenv').config();

const cors = require('cors');
const express = require('express');

const v1Router = require('./routes/v1/index');

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get("/", function (req, res) {
    res.json('Hello World');
});
app.use(v1Router);
app.listen(PORT, function () {
    console.log(`Server started on port ${PORT}`);
});
