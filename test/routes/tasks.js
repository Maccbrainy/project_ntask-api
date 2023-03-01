const jwt = require('jwt-simple');

describe("Routes: Tasks", () => {

    const Users = app.models.users;
    const Tasks = app.models.tasks;

    let token;
    let fakeTask;
    let theUserId;
    
    beforeEach(async () => {
        await Users.destroy({where: {}});
        const user = await Users.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123!@#'
        });
        await Tasks.destroy({ where: {} });
        const tasks = await Tasks.bulkCreate([
            { title: 'Automated Testing', userId: user.id },
            { title: 'Testing with Mocha', userId: user.id }
        ]);
        fakeTask = tasks[0];
        token = jwt.encode({ id: user.id }, config.jwt.secret);
        theUserId = user.id
    });

    describe("GET /tasks", () => {
        describe("status 200", () => {
            it("returns a list of tasks", done => {
                request.get("/tasks")
                .set("Authorization", token)
                .expect(200)
                .end((err, res) => {
                    expect(res.body).to.have.length(2);
                    expect(res.body[0].title).to.eql("Automated Testing");
                    expect(res.body[1].title).to.eql("Testing with Mocha");
                    done(err);
                });
            });
        });
    });

    describe("POST /tasks", () => {
        describe("status 200", () => {
            it("Creates a new task", done => {
                request.post("/tasks")
                .set("Authorization", token)
                .send({title: "Mocha, Chai and Supertest", userId: theUserId})
                .expect(200)
                .end((err, res) => {
                    expect(res.body.title).to.eql("Mocha, Chai and Supertest");
                    expect(res.body.done).to.be.false;
                    done(err);
                })
            })
        })
    });

    describe("GET /tasks/:id", () => {
        describe("status 200", () => {
            it("returns one task", done => {
                request.get(`/tasks/${fakeTask.id}`)
                .set("Authorization", token)
                .expect(200)
                .end((err, res) => {
                    expect(res.body.title).to.eql("Automated Testing");
                    done(err);
                })
            })
        })
    });
    describe("status 404", () => {
        it("throws error when task not exist", done => {
            request.get("/tasks/0")
            .set("Authorization", token)
            .expect(404)
            .end((err, res) => done(err))
        })
    });
    describe("PUT /tasks/:id", () => {
        describe("status 204", () => {
            it("updates a task", done => {
                request.put(`/tasks/${fakeTask.id}`)
                .set("Authorization", token)
                .send({
                    title: "Practicing Nodejs, Automated Testing",
                    done: true
                })
                .expect(204)
                .end((err, res) => done(err))
            })
        })
    });
    describe("DELETE /task/:id", () => {
        describe("status 204", () => {
            it("removes a task", done => {
                request.delete(`/tasks/${fakeTask.id}`)
                .set("Authorization", token)
                .expect(204)
                .end((err, res) => done(err))
            })
        })
    });
});