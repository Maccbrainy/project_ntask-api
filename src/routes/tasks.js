module.exports = app => {
    const Tasks = app.models.tasks;
    
    app.route("/tasks")
        .all(app.auth.authenticate())
        /**
         * @api {get} /tasks List the user's tasks
         * @apiGroup Tasks
         * @apiHeader {String} Authorization Token of authenticated user
         * @apiHeaderExample {json} Header
         * {"Authorization": "JWT xyx.aBVw.@#BN.123.$%^WE@"}
         * @apiSuccess {Object[]} tasks Task list
         * @apiSuccess {UUID} tasks.id Task id
         * @apiSuccess {String} task.title Task title
         * @apiSuccess {Boolean} task.done Task is done?
         * @apiSuccess {Date} tasks.updated_at Update's date
         * @apiSuccess {Date} tasks.created_at Register's date
         * @apiSuccess {UUID} tasks.user_id Id of user who registered the task
         * @apiSuccessExample {json} Success
         * HTTP/1.1 OK
         * [{
         *      "id": "wery-u23h4h456-345YT645-21938swer",
         *      "title": "Study",
         *      "done" : false,
         *      "updated_at": "2023-03-10T15:46:51.778Z",
         *      "created_at": "2023-03-10T15:46:51.778Z",
         *      "user_id": "aswr1234-234sderTY-sdnuyte"
         * }]
         * @apiErrorExample {json} List error
         * HTTP/1.1 412 Precondition failed 
         */
        .get( async(req, res) => {
            try{
                const result = await Tasks.findAll({where: {
                    userId: req.user.id
                }});
                res.json(result)
                
            } catch(error){
                res.status(412).json({msg: error.message})
            }
        })
        /**
         * @api {post} /tasks Register a new task
         * @apiGroup Tasks
         * @apiHeader {String} Authorization Token of authenticated user
         * @apiHeaderExample {json} Header
         * {"Authorization": "JWT xyx.aBVw.@#BN.123.$%^WE@"}
         * @apiParam {String} title Task title
         * @apiParamExample {json} Input
         * {"title": "Study"}
         * @apiSuccess {UUID} id Task id
         * @apiSuccess {String} title Task title
         * @apiSuccess {Boolean} done-false Task is done?
         * @apiSuccess {Date} updated_at Update's date
         * @apiSuccess {Date} Created_at Register's date
         * @apiSuccess {UUID} user_id User id
         * @apiSuccessExample {json} Success
         * HTTP/1.1 200 OK
         * {
         *  "id": "we123-345tyr-345rtfghvbnb-123iuytte",
         *  "title": "Study",
         *  "updated_at": "2023-03-06T15:45:51.778Z"
         *  "created_at": "2023-03-06T15:45:51.778Z"
         *  "user_id": "aswr1234-234sderTY-sdnuyte"
         * }
         * @apiErrorExample {json} Register error
         * HTTP/1.1 412 Precondition failed
         */
        .post( async(req, res) => {
            try {
                req.body.userId = req.user.id;
                const result = await Tasks.create(req.body)
                res.json(result);
            } catch(error){
                res.status(412).json({
                    msg: error.message
                })
            }
        });
    app.route("/tasks/:id")
        .all(app.auth.authenticate())
        /**
         * @api {get} /tasks/:id Get a task
         * @apiGroup Tasks
         * @apiHeader {String} Authorization Token for authenticated user
         * @apiHeaderExample {json} Header
         * {"Authorization": "JWT xyx.aBVw.@#BN.123.$%^WE@"}
         * @apiParam {id} id Task id
         * @apiSuccess {UUID} id Task id
         * @apiSuccess {String} title Task title
         * @apiSuccess {Boolean} done  Task is done?
         * @apiSuccess {Date} updated_at Updated date
         * @apiSuccess {Date} created_at Create's date
         * @apiSuccess {UUID} user_id User id
         * @apiSuccessExample {json} Success
         * HTTP/1.1 200 OK
         * {
         *  "id": "we123-345tyr-345rtfghvbnb-123iuytte",
         *  "title": "Study",
         *  "updated_at": "2023-03-06T15:45:51.778Z"
         *  "created_at": "2023-03-06T15:45:51.778Z"
         *  "user_id": "aswr1234-234sderTY-sdnuyte"
         * }
         * @apiErrorExample {json} Task not found
         * HTTP/1.1 404 Not Found
         * @apiErrorExample {json} Find error
         * HTTP/1.1 412 Precondition Failed
         */
        .get( async(req, res) => {
            try {
               const result = await Tasks.findOne({where: {
                    id: req.params.id,
                    userId: req.user.id
                }})
                if (result){
                    res.json(result);
                } else {
                    res.sendStatus(404)
                }
            } catch(error){
                res.status(412).json({msg: error.message})
            }
        })
        /**
         * @api {put} /tasks/:id Update a task
         * @apiGroup Tasks
         * @apiHeader {String} Authorization Token for authenticated user
         * @apiHeaderExample {json} Header
         * {"Authorization": "JWT xyx.aBVw.@#BN.123.$%^WE@"}
         * @apiParam {id} id Task id
         * @apiParam {String} title Task title
         * @apiParam {Boolean} done Task is done?
         * @apiParamExample {json} Input
         * {
         *  "title": "Study",
         *  "done": true
         * }
         * @apiErrorExample {json} Task not found
         * HTTP/1.1 204 No Content
         * @apiErrorExample {json} Update error
         * HTTP/1.1 412 Precondition Failed
         */
        .put( async(req, res) => {
            try {
                req.body.userId = req.user.id
                await Tasks.update(req.body, {
                    where: {
                        id: req.params.id,
                        userId: req.user.id
                    }
                });
                res.sendStatus(204)
            } catch(error){
                res.status(412).json({msg: error.message});
            }
        })
        /**
         * @api {delete} /tasks/:id Remove a task
         * @apiGroup Tasks
         * @apiHeader {String} Authorization Token to authenticated user
         * @apiHeaderExample {json} Header
         * {"Authorization": "JWT xyx.aBVw.@#BN.123.$%^WE@"}
         * @apiParam {id} id Task id
         * @apiSuccessExample {json} success
         * HTTP/1.1 204 No content
         * @apiErrorExample {json} Delete error
         * HTTP/1.1 412 Precondition Failed
         */
        .delete(async (req, res) => {
            try {
                const {id} = req.params;
                await Tasks.destroy({where: {
                    id: id,
                    userId: req.user.id
                }});
                res.sendStatus(204); 
            } catch (error) {
                res.status(412).json({msg: error.message}); 
            }
        });
};