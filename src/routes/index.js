module.exports = app => {
    /**
     * @api {get} / API Status
     * @apiGroup Status
     * @apiSuccess {String} status API Status message
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"status": "NODE API is running OK"}
     */
    app.get("/", (req, res) => {
        res.json({
            status: "NODE API is running OK"
        });
    });
};