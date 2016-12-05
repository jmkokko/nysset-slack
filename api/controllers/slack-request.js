"use strict";

const
    _ = require('lodash'),
    debug = require('debug')('nysset-slack'),
    HTTPStatus = require('http-status-codes'),
    moment = require('moment'),
    rp = require('request-promise');

const
    logger = require('../../logger'),
    nconf = require('../../config'),
    departures = require('../services/departures'),
    stoptimesPattern2attachment = require('../util/stop-times-pattern-2-attachment');

function slackRequest(req, res) {

    _.forIn(
        _.get(req, 'swagger.params'),
        param => debug(`\nname: ${_.get(param, 'schema.name')} \nvalue: ${JSON.stringify(_.get(param, 'value'), null, 2)}`)
    );

    const {
        token,
        // team_id,
        // team_domain,
        // channel_id,
        // channel_name,
        // user_id,
        // user_name,
        // command,
        text,
        response_url
    } = _.get(req, 'swagger.params.command.value');

    if( token !== nconf.get('SLACK_TOKEN')) {

        logger.error(`token validation failed: ${token}`);
        res
            .status(HTTPStatus.UNAUTHORIZED)
            .json('token validation failed');

    } else {

        departures.query(text)
            .then(stops => {
                res
                    .status(HTTPStatus.OK)
                    .end();

                logger.info('Queueing delayed responses...');
                _.forEach(stops, stop => {
                    sendDelayedResponse(response_url, stop);
                })
            });
    }
}

function sendDelayedResponse(response_url, stop) {

    if( _.isEmpty(response_url) || _.isEmpty(stop) ) {
        return;
    }

    const {
        gtfsId,
        url,
        code,
        name,
        stoptimesForPatterns
    } = stop;

    if( !_.isEmpty(stoptimesForPatterns)) {
        const text = `_(${gtfsId})_ *${code} ${name}*    ${_.isNull(url) ? '' : url}`;

        logger.info(text);

        const response = {
            "response_type": "ephemeral",
            "text": text,
            "attachments": _.map(stoptimesForPatterns, stoptimesPattern2attachment)
        };

        const options = {
            uri: response_url,
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: response,
            json: true
        };

        rp(options)
            .then(() => {
                logger.info(`Response sent for ${gtfsId}`);
            })
            .catch(err => {
                logger.error(err);
            });
    }
}

module.exports = {
    slackRequest
};
