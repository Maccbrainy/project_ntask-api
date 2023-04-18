module.exports = {
    /**
     * Don't share/commit the common personal secret files like
     * .env, .aws and .npmrc with anybody. Here i will be sharing
     * these database sensitive details only for my demonstration.
     */
    db: {
        database: "node_test_task_api",
        username: "",//Save and read from .env file
        password: "",//Save and read from .env file
        params : {
            dialect: "sqlite",//Saved and read from .env file
            logging: false,
            storage: "node_test_task_api.sqlite",
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