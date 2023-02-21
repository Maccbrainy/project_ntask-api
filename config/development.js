module.exports = {
    db: {
        database: "nTask",
        username: "",
        password: "",
        params : {
            dialect: "sqlite",
            storage: "nTask.sqlite",
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