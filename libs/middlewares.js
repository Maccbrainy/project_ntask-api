const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors')
module.exports = app => {
    app.set("port", 5000);
    app.set("json spaces", 4);

    app.use(cors({
        origin: ["http://localhost:8081"],
        methods: ["POST", "GET", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "authorization"]
    }));
    app.use(bodyParser.json());
    app.use(app.auth.initialize());
    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });
    app.use(express.static('public'));
};