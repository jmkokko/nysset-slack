"use strict";

const
    _ = require('lodash'),
    debug = require('debug')('nysset-slack-departures'),
    logger = require('bole')('nysset-slack'),
    moment = require('moment'),
    rp = require('request-promise');

function queryByCode(code) {

    let response = {
        "response_type": "in_channel",
        "text": "*0804 Fredrikinkatu*    http://aikataulut.hsl.fi/pysakit/fi/1040438.html",
        "attachments": [
            {
                "color": "#36a64f",
                "author_name": "3  Olympiaterminaali-Eira-Kallio-Nordenskiöldinkatu",
                "author_link": "https://linjakartta.reittiopas.fi/fi/#?mapview=map&line=1003++1,1003++2",
                "author_icon": "https://linjakartta.reittiopas.fi/img/tram.png",
                "title": "23:19  01:12  01:32",
            },
            {
                "color": "#36a64f",
                "author_name": "6T  Länsiterminaali-Arabia",
                "author_link": "https://linjakartta.reittiopas.fi/fi/#?mapview=map&line=1006T+1,1006T+2",
                "author_icon": "https://linjakartta.reittiopas.fi/img/bus.png",
                "title": "23:19  01:12  01:32",
            }
        ]
    };

    return response;
}

function queryByName(name) {

    logger.info(name);

    const query = `{
  stops(
    name: "${name}"
  ) {          
    gtfsId
    url
    code
    name
    zoneId
    stoptimesForPatterns (
      startTime: "${moment().unix()}"            
      timeRange: 3600            
      numberOfDepartures: 3
    ) {            
      pattern {               
        id
        directionId
        name
        code
        headsign              
        route {                 
          mode
          url
          id
          gtfsId
          desc
          longName
          shortName 
        }           
      }            
      stoptimes {
        serviceDay
        scheduledDeparture
        realtimeDeparture
        realtime
      }
    }
  }
}`;

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
            debug(_.get(JSON.parse(response), 'data.stops'));
            return _.get(JSON.parse(response), 'data.stops');
        })
        .catch(err => {
            logger.error(err);
            return err;
        });
}

module.exports = {
    queryByCode,
    queryByName
};
