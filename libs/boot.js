module.exports = app => {
    if(process.env.NODE_ENV !== "test"){
        app.db.sequelize.sync().then(() => {
            app.listen(app.get("port"), () => {
                console.log(`NODE API server is running on port: http://localhost:${app.get("port")}`)
            });
        });
    }
};