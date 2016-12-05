'use strict';

// from https://coderwall.com/p/pho5aq/minimal-node-js-logger-for-12-factor-apps

// Usage:
// var logger = require('./logger');
// logger.info('Info message');
// logger.warn('Warn message');
// logger.error('Error message');
// logger.addLevels({
//   silly: 'white'
// });
// logger.silly('Silly message');

// Further reading:
// * http://12factor.net/logs

const
    _ = require('lodash'),
    colors = require('colors');

function makeLogFunction(color, level) {
    return function (msg) {
        if (process.env.NODE_ENV !== 'test') {
            console.log((`[${level}]`)[color] + ` ${(new Date().toString()).grey} ${msg} `);
        }
    };
}

let logger = {
    addLevels: function (levels) {
        logger = _.defaults(logger, _.mapValues(levels, makeLogFunction));
    }
};

colors.setTheme({
    errorColor: ['red', 'inverse']
});

logger.addLevels({
    info: 'blue',
    warn: 'orange',
    error: 'errorColor'
});

module.exports = logger;
