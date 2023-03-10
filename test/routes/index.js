describe("Routes: Index", () => {
    describe("GET /", () => {
        it("returns the API status", done => {
            request.get("/")
            .expect(200)
            .end((err, res) => {
                const expected = {
                    status: "NODE API is running OK"
                };
                expect(res.body).to.eql(expected);
                done(err);
            })
        })
    })
})