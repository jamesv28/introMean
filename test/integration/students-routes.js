process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../src/server/app');
var should = chai.should();
var testUtilities = require('../utilities');

var testSeed = require('../../src/server/models/test-seeds');

chai.use(chaiHttp);


describe('student routes', function() {


    beforeEach(function(done) {
        //drop db
        testUtilities.dropDatabase();
        testSeed.runSeed(done);
        //create db
        //seed db

    });

    afterEach(function(done) {
        //drop db
        testUtilities.dropDatabase(done);

    });

    describe('/GET students', function() {

        it('should return all students', function(done) {
            chai.request(server)
                .get('/students')
                .end(function(err, res){
                    res.status.should.equal(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status');
                    res.body.should.have.property('data');
                    res.type.should.equal('application/json');
                    res.body.data.should.be.a('array');
                    res.body.status.should.equal('success');
                    res.body.data.length.should.equal(1);
                    res.body.data[0].firstName.should.equal('Kevin');
                    res.body.data[0].lastName.should.equal('Schwartz');
                    res.body.data[0].year.should.equal(2001);
                    done();
                });

        });
    });
    describe('/GET students/:id', function() {

        it('should return a single student', function (done) {
            Students.findOne(function (err, student) {
                var studentID = student._id;
                chai.request(server)
                    .get('/students' + studentID)
                    .end(function (err, res) {
                        res.status.should.equal(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('status');
                        res.body.should.have.property('data');
                        res.type.should.equal('application/json');
                        res.body.data.should.be.a('array');
                        res.body.status.should.equal('success');
                        res.body.data[0].firstName.should.equal('Kevin');
                        res.body.data[0].lastName.should.equal('Schwartz');
                        res.body.data[0].year.should.equal(2001);
                        done();
                    })

            });
        });
    });
});