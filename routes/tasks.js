module.exports = app => {
    const Tasks = app.models.tasks;
    
    app.route("/tasks")
        .all(app.auth.authenticate())
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