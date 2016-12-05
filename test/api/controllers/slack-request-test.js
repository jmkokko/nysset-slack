const
    debug = require("debug")("nysset-slack-test"),
    should = require('should'),
    request = require('supertest'),
    server = require('../../../app');

const slackRequest = require("../../../api/controllers/slack-request");

describe('controllers', function () {

    describe('slack-request', function () {

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
                    .expect(200)
                    .end(function(err, res) {
                        should.not.exist(err);
                        // res.body.should.eql('');
                        done();
                    });
            });
        });
    });
});
