module.exports = {
    db: {
        database: "nTask_test",
        username: "",
        password: "",
        params : {
            dialect: "sqlite",
            storage: "nTask_test.sqlite",
            logging: false,
            define: {
                underscored: true
            }
        }
    },
    jwt: {
        secret: "NoDE#$yz@#_API_DEV",
        options: {
            session: false
        }
    }
};