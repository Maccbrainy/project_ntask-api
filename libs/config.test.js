module.exports = {
    database: "nodetask",
    username: "",
    password: "",
    params : {
        dialect: "sqlite",
        storage: "nodetask.sqlite",
        logging: false,
        define: {
            underscored: true
        }
    },
    jwtSecret: "NoDE#$yz@#_API_TEST",
    jwtSession: {
        session: false
    }
};