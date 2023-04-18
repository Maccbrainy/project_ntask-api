module.exports = app => {
    const Users = app.models.users;
    app.route("/user")
        .all(app.auth.authenticate())
    /**
     * @api {GET} /user Return the authenticated user's data
     * @apiGroup User
     * @apiHeader {String} Authorization Token of authenticated user
     * @apiHeaderExample {json} Header
     * {"Authorization": "JWT xyx.aBVw.@#BN.123.$%^WE@"}
     * @apiSuccess {UUID} id User id
     * @apiSuccess {String} name User name
     * @apiSuccess {String} email User email
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "id": "aswr1234-234sderTY-sdnuyte",
     *  "name": "Michael Chinedu",
     *  "email": "maccbrainy@gmail.com"
     * }
     * @apiErrorExample {json} Find Error
     * HTTP/1.1 412 Precondition failed
     */
        .get( async(req, res) => {
            try {
                const result = await Users.findByPk(req.user.id, {
                    attributes: ["id", "name", "email"]
                });
                if (result){
                    res.json(result)
                } else {
                    res.sendStatus(404);
                }
            } catch(error){
                res.status(404).json({msg: error.message});
            }
        })
        /**
         * @api {DELETE} /user Deletes an authenticated user
         * @apiGroup User
         * @apiHeader {String} Authorization Token of authenticated user
         * @apiHeaderExample {json} Header
         * {"Authorization": "JWT xyx.aBVw.@#BN.123.$%^WE@"}
         * @apiSuccessExample {json} Success
         * HTTP/1.1 204 No content
         * @apiErrorExample {json} Delete error
         * HTTP/1.1 412 Preconditional Failed
         */
        .delete( async(req, res) => {
            try {
                await Users.destroy({where: {id: req.user.id}})
                res.sendStatus(204);
            } catch (error) {
                res.status(412).json({msg: error.message});
            }
        });
    /**
     * @api {POST} "/users" Register a new user
     * @apiGroup User
     * @apiParam {String} name User name
     * @apiParam {String} email User email
     * @apiParam {String} password User password
     * @apiParamExample {json} Input
     * {
     *   "name": "Michael Chinedu",
     *   "email": "maccbrainy@gmail.com",
     *   "password": "1234"
     * }
     * @apiSuccess {UUID} id User id
     * @apiSuccess {String} name User name
     * @apiSuccess {String} email User email
     * @apiSuccess {String} password User encrypted password
     * @apiSuccess {Date} updated_at Update's date
     * @apiSuccess {Date} created_at Register's date
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {
     *  "id": "123erfd-wer43meert-1234.jkiuyeh",
     *  "name": "Michael",
     *  "email": "maccbrainy@gmail.com"
     *  "updated_at": "2023-03-10T15:20:11.700Z"
     *  "created_at": "2023-03-10T15:20:11.700Z"
     * }
     * @apiErrorExample {json} Register error
     * HTTP/1.1 412 Precondition Failed 
     */
    app.post("/users", async(req, res) => {
        try {
            const result = await Users.create(req.body);
            res.json(result)
        } catch (error) {
            res.sendStatus(412).json({msg: error.message});
        }
    });
}