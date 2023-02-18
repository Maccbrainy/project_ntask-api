const jwt = require('jwt-simple');

describe("Routes: Tasks", () => {

    const Users = app.db.models.Users;
    const Tasks = app.db.models.Tasks;
    console.log("===app===", app)

        let token;
        let fakeTask;

        beforeEach(() => {
            Users.destroy({where : {}})
            .then(() => Users.create({
                name: "Michael",
                email: "maccbrainy@gmail.com",
                password: "123!@#"
            }))
            .then(user => {
                Tasks.destroy({where: {}})
                .then(() => Tasks.bulkCreate([
                    {
                        id: 1,
                        title: "Study",
                        userId: user.id
                    },
                    {
                        id: 2,
                        title: "Work",
                        userId: user.id
                    },
                ]))
                .then( tasks => {
                    fakeTask = tasks[0];
                    token = jwt.encode({
                        id: user.id
                    }, config.jwtSecret)
                    done();
                })
            })
        });

        describe("GET /tasks", () => {
            describe("status 200", () => {
                it("returns a list of tasks", done => {
                    request.get("/tasks")
                    .set("AUTHORIZATION", `JWT ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body).to.have.length(2);
                        expect(res.body[0].title).to.eql("Study");
                        expect(res.body[1].title).to.eql("Work");
                        done(err);
                    })
                })
            })
        });
        describe("POST /tasks", () => {
            describe("status 200", () => {
                it("Creates a new task", done => {
                    request.post("/tasks")
                    .set("AUTHORIZATION", `JWT ${token}`)
                    .send({title: "Awesome"})
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.title).to.eql("Awesome");
                        expect(res.body.done).to.be.false;
                        done(err);
                    })
                })
            })
        });

        describe("GET /tasks/:id", () => {
            describe("status 200", () => {
                it("returns one task", done => {
                    request.get(`/task/${fakeTask.id}`)
                    .set("AUTHORIZATION", `JWT ${token}`)
                    .expect(200)
                    .end((err, res) => {
                        expect(res.body.title).to.eql("Study");
                        done(err);
                    })
                })
            })
        });
        describe("status 404", () => {
            it("throws error when task not exist", done => {
                request.get("tasks/0")
                .set("AUTHORIZATION", `JWT ${token}`)
                .expect(404)
                .end((err, res) => done(err))
            })
        });
        describe("PUT /tasks/:id", () => {
            describe("status 204", () => {
                it("updates a task", done => {
                    request.put(`/tasks/${fakeTask.id}`)
                    .set("AUTHORIZATION", `JWT ${token}`)
                    .send({
                        title: "Practice",
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
                    .set("AUTHORIZATION", `JWT ${token}`)
                    .expect(204)
                    .end((err, res) => done(err))
                })
            })
        })
})