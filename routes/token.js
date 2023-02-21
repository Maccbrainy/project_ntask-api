const  bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const config = require('../config.js');
module.exports = app => {
    const Users = app.models.users;
    const { secret } = config.jwt;
    app.post("/token", async(req, res) => {
        try {
            const {email, password} = req.body;
            if (email && password){
                const user = await Users.findOne({where :{ email: email}});

                if (bcrypt.compareSync(password, user.id)){
                    const payload = {id: user.id};
                    const token = jwt.encode(payload, secret);
                    return res.json({ token });
                }
            }
            return res.sendStatus(401);
        } catch(error){
            return res.sendStatus(401);
        }
    });

}