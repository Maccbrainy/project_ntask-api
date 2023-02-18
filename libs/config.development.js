module.exports = {
    database: "nodetask",
    username: "",
    password: "",
    params : {
        dialect: "sqlite",
        storage: "nodetask.sqlite",
        define: {
            underscored: true
        }
    },
    jwtSecret: "NoDE#$yz@#_API_DEV",
    jwtSession: {
        session: false
    }
};