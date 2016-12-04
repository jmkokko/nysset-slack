"use strict";

const
    _ = require('lodash'),
    debug = require('debug')('nysset-slack'),
    HTTPStatus = require('http-status-codes'),
    log = require('bole')('nysset-slack'),
    nconf = require('../../config');

const
    departures = require('../services/departures');

function slackRequest(req, res) {

    _.forIn(req.swagger.params, param => {
        debug(`\nname: ${_.get(param, 'schema.name')} \nvalue: ${JSON.stringify(_.get(param, 'value'), null, 2)}`);
    });

    const {
        token,
        team_id,
        team_domain,
        channel_id,
        channel_name,
        user_id,
        user_name,
        command,
        text,
        response_url
    } = _.get(req, 'swagger.params.command.value');

    if( token !== nconf.get('SLACK_TOKEN')) {

        log.error(`token validation failed: ${token}`);
        res.status(HTTPStatus.UNAUTHORIZED).json('token validation failed');

    } else {

        let response;
        if( isNumeric(text) ) {
            response = departures.queryByCode(text);
        } else {
            response = departures.queryByName(text);
        }

        res.json(response);
    }
}

function isNumeric(query) {

    return !_.isNull(query.match(/^\d+$/));
}

module.exports = {
    slackRequest,
    isNumeric
};
