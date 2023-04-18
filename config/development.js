const logger = require("../libs/logger");
module.exports = {
    /**
     * Don't share/commit the common personal secret files like
     * .env, .aws and .npmrc with anybody. Here i will be sharing
     * these database sensitive details only for my demonstration.
     */
    db: {
        database: "node_task_api",
        username: "",//Save and read from .env file
        password: "",//Save and read from .env file
        params : {
            dialect: "sqlite",//Saved and read from .env file
            storage: "node_task_api.sqlite",
            //generating sql logs commands for our app
            logging: (sql) => {
                logger.info(`[${new Date()}] ${sql}`);
            },
            define: {
                underscored: true,
            }
        }
    },
    jwt: {
        secret: "No+[)*DE#$yz./?@#_API_DEV",//Never display in public, secret code must be saved and read from .env file
        options: {
            session: false
        }
    }
};