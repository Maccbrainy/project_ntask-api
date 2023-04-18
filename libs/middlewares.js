const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require("helmet");
const logger = require('./logger');
module.exports = app => {
    app.set("port", 8080);
    app.set("json spaces", 4);
    /**
     * Log of the requests
     * Generating request logs; to log all requests for our app
     */
    app.use(morgan("common", {
        //send these logs to our module logger.js
        stream: {
            write: (message) => {
                logger.info(message);
            }
        }
    }))
    app.use(helmet());
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