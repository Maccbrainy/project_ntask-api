/**
 * Basically, this endpoint will have four tests to validate
 * i)Request authenticated by a valid user.
 * ii) Request with a valid e-mail but with the wrong password
 * iii) Request with an unregistered e-mail.
 * iv) Request without an e-mail and password
 */
describe("Route: Token", () => {
    const Users = app.models.users;
    describe("Post /token", () => {
        /**
         * Clear the user table and create one valid user inside the beforeEach() callback
         * This function will be executed before each test
         * To do this, we use the model
         * "app.models.users" and its functions
         * Users.destroy({where: {}}) to clean the user table and 
         * Users.create() to save a single valid user for each test execution
         */
        
        beforeEach( async() => {
            await Users.destroy({where:{}});
            await Users.create({
                name: "John Doe",
                email: "johndoe@gmail.com",
                password:"123!@#" 
            })
        });
        describe("status 200", ()=> {
            it("returns authenticated user token", done => {
                request.post("/token")
                .send({
                    email: "johndoe@gmail.com",
                    password: "123!@#"
                })
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.include.keys("token");
                    done(err);
                })
            })
        });
        describe("status 401", () => {
            it("throws error when password is incorrect", done => {
                request.post("/token")
                .send({
                    email: "johndoe@gmail.com",
                    password: "WRONG_PASSWORD"
                })
                .expect(401)
                .end(done)
            });
            it("throws error when email does not exist", done => {
                request.post("/token")
                .send({
                    email: "wrong@gmail.com",
                    password: "123!@#"
                })
                .expect(401)
                .end(done)
            })
            it("throws error when email and password are empty", done => {
                request.post("/token")
                .expect(401)
                .end(done)
            })
        });
    })
})