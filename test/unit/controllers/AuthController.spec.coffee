describe.only "basic url test", (done) ->
  it "test root url / ", (done) ->

    request(sails.hooks.http.app)
    .get("/")
    .end (err, res) ->
      return done(body) if res.statusCode is 500
      res.statusCode.should.equal 200
      done(err)


