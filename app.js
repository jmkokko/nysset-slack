"use strict";

const
    debug = require('debug')('nysset-slack'),
    SwaggerExpress = require('swagger-express-mw'),
    app = require('express')();

const
    logger = require('./logger'),
    nconf = require('./config');

logger.info('Creating server...');

const expressConfig = {
    appRoot: __dirname // required config
};

SwaggerExpress.create(expressConfig, function (err, swaggerExpress) {

    if (err) {
        throw err;
    }

    debug('installing middleware...');

    // install middleware
    swaggerExpress.register(app);

    const port = nconf.get('PORT');
    app.listen(port);

    logger.info(`Server running in port ${port}!`);
});

module.exports = app; // for testing
