module.exports = app => {
    const Users = app.models.users;

    app.route("/user")
        .all(app.auth.authenticate())
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
        .delete( async(req, res) => {
            try {
                await Users.destroy({where: {id: req.user.id}})
                res.sendStatus(204);
            } catch (error) {
                res.status(412).json({msg: error.message});
            }
        });
        
    app.post("/users", async(req, res) => {
        try {
            const result = await Users.create(req.body);
            res.json(result)
        } catch (error) {
            res.sendStatus(412).json({msg: error.message});
        }
    });
}