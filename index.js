const express = require('express');
const consign = require('consign');

const app = express();

consign({verbose: false})
    .include("db.js")
    .then("models")
    .then("associations.js")
    .then("auth.js")
    .then("libs/middlewares.js")
    .then("routes")
    .then("libs/boot.js")
    .into(app);
module.exports = app;