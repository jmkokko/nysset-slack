"use strict";

const
    _ = require('lodash'),
    moment = require('moment');


function stoptimesPattern2attachment(stoptimesPattern) {

    const {
        pattern,
        stoptimes
    } = stoptimesPattern;

    const {
        route
    } = pattern;

    const {
        mode,
        url,
        longName,
        shortName
    } = route;

    const title = _.join(_.map(stoptimes, formatDeparture), ' ');

    return  {
        "color": "#36a64f",
        "author_name": `${shortName}  ${longName}`,
        "author_link": url,
        "author_icon": transportModeIconUrl(mode),
        "title": title,
    };
}

function formatDeparture(stoptime) {
    const {
        serviceDay,
        scheduledDeparture,
        realtimeDeparture,
        realtime
    } = stoptime;

    const departure = moment.unix(serviceDay+(realtime ? realtimeDeparture : scheduledDeparture));

    return departure.format('hh:mm');
}

function transportModeIconUrl(mode) {
    switch(mode) {
        case 'TRAM':
            return 'https://linjakartta.reittiopas.fi/img/tram.png';
        case 'SUBWAY':
            return 'https://linjakartta.reittiopas.fi/img/metro.png';
        case 'BUS':
        default:
            return 'https://linjakartta.reittiopas.fi/img/bus.png';
    }
}

module.exports = stoptimesPattern2attachment;
