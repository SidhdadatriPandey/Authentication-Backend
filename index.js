const express = require('express');
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

const cookieParser=require("cookie-parser");
app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json());

// Database connection
const connect = require('./config/database');
connect();

// Routes
const user = require('./routes/user');
app.use('/api/v1', user);

app.get('/', (req, res) => {
    res.send(`<h1>This is home page baby</h1>`);
});

// Start the server
app.listen(PORT, () => {
    console.log(`App is listening at port ${PORT}`);
});
