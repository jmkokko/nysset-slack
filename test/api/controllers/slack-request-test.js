const
    debug = require("debug")("nysset-slack-test"),
    assert = require("assert"),
    should = require('should'),
    request = require('supertest'),
    server = require('../../../app');

const slackRequest = require("../../../api/controllers/slack-request");

describe('controllers', function () {

    describe('slack-request', function () {

        describe('isNumeric', function () {

            it('should return true for strings presenting an integer value', function (done) {

                assert(slackRequest.isNumeric("1111"));
                assert(slackRequest.isNumeric("0"));
                assert(slackRequest.isNumeric("01"));
                assert(slackRequest.isNumeric("010"));
                assert(slackRequest.isNumeric("2222"));

                done();

                it('should return false for strings not presenting an integer value', function (done) {

                    assert(!slackRequest.isNumeric(""));
                    assert(!slackRequest.isNumeric("X"));
                    assert(!slackRequest.isNumeric(" "));
                    assert(!slackRequest.isNumeric(" 010"));
                    assert(!slackRequest.isNumeric("-1"));

                    done();
                });
            });
        });

        describe('POST /v1/slackrequest', function() {

            it('should return a default string', function(done) {

                request(server)
                    .post('/v1/slackrequest')
                    .send({
                        token: '<slack-command-token>',
                        text: 'text',
                        response_url: 'blabla'
                    })
                    .set('Content-type', 'application/x-www-form-urlencoded')
                    .expect('Content-Type', /json/)
                    .expect(200)
                    .end(function(err, res) {
                        console.log(res.body);
                        should.not.exist(err);
                        // res.body.should.eql('');
                        done();
                    });
            });
        });
    });
});
