module.exports = app => {
    app.get("/", (req, res) => {
        res.json({
            status: "NODE API is running OK"
        });
    });
};