const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const testConfig = require('./libs/config.test');
const devConfig = require('./libs/config.development');

// import fs from "fs";
// import path from "path";
// import Sequelize  from "sequelize";
// import testConfig from "./libs/config.test";
// import devConfig from "./libs/config.development";
// const config = require("./libs/config.js");

// let sequelize = null;
let db = null;
module.exports = app => {
    if(!db) {
        // const config = app.libs.config;
        const config = process.env.NODE_ENV == "test" ? testConfig : devConfig;
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );
        db = {
            sequelize,
            Sequelize,
            models: {}
        };

        const dir = path.join(__dirname, "models");
        fs.readdirSync(dir).forEach(file => {
            const modelDir = path.join(dir, file);
            //============error===========
            //import is not a function
            // const model = sequelize.import(modelDir);
            const model = require(modelDir)(sequelize, Sequelize.DataTypes);
            db.models[model.name] = model;
        });
        //==================error=================
        //.associate is not a function
        // Object.keys(db.models).forEach(key => {
        //     db.models[key].associate(db.models);
        // });
        console.log("++db>models++:", db.models);
        Object.keys(db.models).forEach(key => {
            // db.models[key].options.classMethods.associate(db.models);
            db.models[key].associate(db.models);
        });
    }
    return db;
};