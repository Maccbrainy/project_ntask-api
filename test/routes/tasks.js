const jwt = require('jwt-simple');

describe("Routes: Tasks", () => {

    const Users = app.models.users;
    const Tasks = app.models.tasks;

    let token;
    let fakeTask;
    
    beforeEach(async () => {
        await Users.destroy({where: {}});
        const user = await Users.create({
            name: 'John Doe',
            email: 'johndoe@gmail.com',
            password: '123!@#'
        });
        await Tasks.destroy({ where: {} });
        const tasks = await Tasks.bulkCreate([
            { id: 1, title: 'Work', userId: user.id },
            { id: 2, title: 'Study', userId: user.id }
        ]);
        fakeTask = tasks[0];
        token = jwt.encode({ id: user.id }, config.jwt.secret);

        // console.log("/////tasks?????", tasks);
        // console.log("@@@@@fakeTask?????", fakeTask);
        // console.log("====token====?????", token);
    });

    describe("GET /tasks", () => {
        describe("status 200", () => {
            it("returns a list of tasks", done => {
                request.get("/tasks")
                .set("Authorization", token)
                .expect(200)
                .end((err, res) => {
                    console.log("====token====1?????", token);
                    expect(res.body).to.have.length(2);
                    expect(res.body[0].title).to.eql("Work");
                    expect(res.body[1].title).to.eql("Study");
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
                .send({title: "Run"})
                .expect(200)
                .end((err, res) => {
                    console.log("====token====2?????", token);
                    expect(res.body.title).to.eql("Run");
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
                    console.log("====token====3?????", token);
                    expect(res.body.title).to.eql("Study");
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
                .set("Authorization", token)
                .expect(204)
                .end((err, res) => done(err))
            })
        })
    });
});