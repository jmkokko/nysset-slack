const
    debug = require("debug")("nysset-slack-test"),
    assert = require("assert");

const departures = require("../../../api/services/departures");

describe('services', function () {

    describe('departures', function () {

        describe('isNumeric', function () {

            it('should return true for strings presenting an integer value', function (done) {

                assert(departures.isGtfsId("1111:1111"));
                assert(departures.isGtfsId("0:0"));
                assert(departures.isGtfsId("01:aa"));
                assert(departures.isGtfsId("aa:010"));
                assert(departures.isGtfsId("_:_"));
                assert(departures.isGtfsId("MATKA:127633"));

                done();
            });

            it('should return false for strings not presenting an integer value', function (done) {

                assert(!departures.isGtfsId(""));
                assert(!departures.isGtfsId("X"));
                assert(!departures.isGtfsId(" "));
                assert(!departures.isGtfsId(" 010"));
                assert(!departures.isGtfsId("-1"));
                assert(!departures.isGtfsId("01234"));

                done();
            });
        });
    });
});
