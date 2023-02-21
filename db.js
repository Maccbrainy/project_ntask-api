const Sequelize = require('sequelize');
const config = require('./config')

let sequelize = null;
module.exports = () => {
    if(!sequelize) {
        const { 
            db: { database, username, password, params } 
        } = config;

        sequelize = new Sequelize(
            database,
            username,
            password,
            params
        );
    }
    return sequelize;
};