const jwt = require("jwt-simple");

describe('Routes: Users', () => {
    const Users = app.models.users;
    let token;

    beforeEach( async() => {
        await Users.destroy({where: {}});
        const user = await Users.create({
            name: "JohnDoe",
            email: "john@gmail.com",
            password: "1234"
        });
        token = jwt.encode({id: user.id}, config.jwt.secret);
    });

    describe("GET /user", () => {
        describe("status 200", () => {
            it("returns an authenticated user", done => {
                request.get("/user")
                .set("Authorization", token)
                .expect(200)
                .end((err, res) => {
                    expect(res.body.name).to.eql("JohnDoe");
                    expect(res.body.email).to.eql("john@gmail.com");
                    done(err);
                })
            })
        })
    });

    describe("DELETE /user", () => {
        describe("status 200", () => {
            it("deletes an authenticated user", done => {
                request.delete("/user")
                .set("Authorization", token)
                .expect(204)
                .end(done);
            })
        })
    });

    describe("POST /users", () => {
        describe("status 200", () => {
            it("create a new user", done => {
                request.post("/users")
                .send({
                    name: "Maccbrainy",
                    email: "maccbrainy@gmail.com",
                    password: "Qw@#aqw"
                })
                .expect(200)
                .end((err, res) => {
                    expect(res.body.name).to.eql("Maccbrainy");
                    expect(res.body.email).to.eql("maccbrainy@gmail.com");
                    done(err);
                })
            })
        })
    })
})
