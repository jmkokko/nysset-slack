"use strict";

const debug = require("debug")("nysset-slack");
const SwaggerExpress = require("swagger-express-mw");
const app = require("express")();
const config = {
    appRoot: __dirname // required config
};

debug("creating server...");

SwaggerExpress.create(config, function (err, swaggerExpress) {

    if (err) {
        throw err;
    }

    debug("installing middleware...");

    // install middleware
    swaggerExpress.register(app);

    var port = process.env.PORT || 10010;
    app.listen(port);

    debug("ready!");
});

module.exports = app; // for testing
