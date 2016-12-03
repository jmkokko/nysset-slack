"use strict";

function departures(req, res) {

    // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
    const name = req.swagger.params.name.value;
    let response;

    response = {
        "response_type": "in_channel",
        "text": "Fredrikinkatu 0804: http://aikataulut.hsl.fi/pysakit/fi/1040438.html",
        "attachments": [
            {
                // "title": "App hangs on reboot",
                "text": "*TRAM 3* Urheilutalo `23:19  01:12  01:32`",
            }
        ]
    };

    // this sends back a JSON response which is a single string
    res.json(response);
}

module.exports = {
    departures
};
