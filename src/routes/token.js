const  bcrypt = require('bcrypt');
const jwt = require('jwt-simple');
const config = require('../../config.js');
module.exports = app => {
    const Users = app.models.users;
    const { secret } = config.jwt;
    /**
     * @api {post} /token Authentication Token
     * @apiGroup Credentials
     * @apiParam {string} email User email
     * @apiParam {string} password User password
     * @apiParamExample {json} Input
     * {
     *  "email": "maccbrainy@gmail.com",
     *  "password": "123!@#"
     * }
     * @apiSuccess { string } token Token of authenticated user
     * @apiSuccessExample {json} Success
     * HTTP/1.1 200 OK
     * {"token" : "xyx.aBVw.@#BN.123.$%^WE@"}
     * @apiErrorExample {json} Authentication error
     * HTTP/1.1 401 Unauthorized
     */
    app.post("/token", async(req, res) => {
        try {
            const {email, password} = req.body;
            if (email && password){
                const user = await Users.findOne({where :{ email: email}});

                if (bcrypt.compareSync(password, user.password)){
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