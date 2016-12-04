'use strict';

const
    nconf = module.exports = require('nconf'),
    path = require('path');

nconf
    .env(['SLACK_TOKEN','PORT'])
    .file({ file: path.join(__dirname, 'config.json') })
    .defaults({
        SLACK_TOKEN: 'n/a',
        PORT: 8080
    });
