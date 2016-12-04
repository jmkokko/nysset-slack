"use strict";

const
    _ = require('lodash'),
    debug = require('debug')('nysset-slack'),
    HTTPStatus = require('http-status-codes'),
    logger = require('bole')('nysset-slack'),
    moment = require('moment'),
    rp = require('request-promise');

const
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

        logger.error(`token validation failed: ${token}`);
        res
            .status(HTTPStatus.UNAUTHORIZED)
            .json('token validation failed');

    } else {

        if( isNumeric(text) ) {
            const response = departures.queryByCode(text);
            res.json(response);
        } else {
            departures.queryByName(text)
                .then(stops => {
                    res
                        .status(HTTPStatus.OK)
                        .end();
                        // .json({ message: 'Processing...' });
                    logger.info('Queueing delayed responses...');
                    _.forEach(stops, stop => {
                        sendDelayedResponse(response_url, stop);
                    })
                });
        }
    }
}

function isNumeric(query) {

    return !_.isNull(query.match(/^\d+$/));
}

function stoptimesPattern2attachment(stoptimesPattern) {

    const {
        pattern,
        stoptimes
    } = stoptimesPattern;

    const {
        directionId,
        name,
        code,
        headsign,
        route
    } = pattern;

    const {
        mode,
        url,
        gtfsId,
        desc,
        longName,
        shortName
    } = route;

    const title = _.join(_.map(stoptimes, formatDeparture), ' ');

    logger.info(title);

    const attachment = {
                "color": "#36a64f",
                "author_name": `${shortName}  ${longName}`,
                "author_link": url,
                "author_icon": transportModeIconUrl(mode),
                "title": title,
    };

    return attachment;
}

function formatDeparture(stoptime) {
    const {
        serviceDay,
        scheduledDeparture,
        realtimeDeparture,
        realtime
    } = stoptime;

    let departure = moment.unix(serviceDay+(realtime ? realtimeDeparture : scheduledDeparture));

    return departure.format('hh:mm');
}

function transportModeIconUrl(mode) {
    switch(mode) {
        case 'BUS': return 'https://linjakartta.reittiopas.fi/img/bus.png'; break;
        case 'TRAM': return 'https://linjakartta.reittiopas.fi/img/tram.png'; break;
        case 'SUBWAY': return 'https://linjakartta.reittiopas.fi/img/metro.png'; break;
        default: return 'https://linjakartta.reittiopas.fi/img/bus.png';
    }
}

function sendDelayedResponse(response_url, stop) {

    const {
        gtfsId,
        url,
        code,
        name,
        zoneId,
        stoptimesForPatterns
    } = stop;

    if( !_.isEmpty(stoptimesForPatterns)) {
        const text = `*${code} ${name}*    ${url}`;

        logger.info(text);

        let response = {
            "response_type": "in_channel",
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
    slackRequest,
    isNumeric
};
