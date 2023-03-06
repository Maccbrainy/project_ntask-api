module.exports = app => {
    /**
     * @api {get} / API Status
     * @apiGroup Status
     * @apisuccess {String} status API Status' message
     * @apisuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"status": "NODE API is running OK"}
     */
    app.get("/", (req, res) => {
        res.json({
            status: "NODE API is running OK"
        });
    });
};