"use strict";

const
    debug = require('debug')('nysset-slack'),
    bole = require('bole'),
    SwaggerExpress = require('swagger-express-mw'),
    app = require('express')();

const nconf = require('./config');

bole.output({
    level: 'info',
    stream: process.stdout
});

const logger = bole('app');

logger.info('Creating server...');

const expressConfig = {
    appRoot: __dirname // required config
};

SwaggerExpress.create(expressConfig, function (err, swaggerExpress) {

    if (err) {
        throw err;
    }

    logger.debug('installing middleware...');

    // install middleware
    swaggerExpress.register(app);

    var port = nconf.get('PORT');
    app.listen(port);

    logger.info(`Server running in port ${port}!`);
});

module.exports = app; // for testing
