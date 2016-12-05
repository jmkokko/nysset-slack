"use strict";

const
    _ = require('lodash'),
    debug = require('debug')('nysset-slack-departures'),
    moment = require('moment'),
    rp = require('request-promise');

const
    logger = require('../../logger'),
    stopCodeQuery = require('./stop-code-query'),
    stopNameQuery = require('./stop-name-query');

function query(text) {

    const query = isGtfsId(text)
        ? stopCodeQuery(text, moment().unix())
        : stopNameQuery(text, moment().unix());

    const options = {
        uri: 'https://api.digitransit.fi/routing/v1/routers/finland/index/graphql',
        method: 'POST',
        headers: {
            'content-type': 'application/graphql'
        },
        body: query
    };

    debug(query);

    return rp(options)
        .then(response => {
            debug(response);
            return _.get(JSON.parse(response), 'data.stops');
        })
        .catch(err => {
            logger.error(err);
            return err;
        });
}

function isGtfsId(query) {

    return !_.isNull(query.match(/^[A-Za-z\d_]+:[A-Za-z\d_]+$/));
}

module.exports = {
    query,
    isGtfsId
};
