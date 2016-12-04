"use strict";

// {
//     "attachments": [
//     {
//         "fallback": "Required plain-text summary of the attachment.",
//         "color": "#36a64f",
//         "pretext": "Optional text that appears above the attachment block",
//         "author_name": "Bobby Tables",
//         "author_link": "http://flickr.com/bobby/",
//         "author_icon": "http://flickr.com/icons/bobby.jpg",
//         "title": "Slack API Documentation",
//         "title_link": "https://api.slack.com/",
//         "text": "Optional text that appears within the attachment",
//         "fields": [
//             {
//                 "title": "Priority",
//                 "value": "High",
//                 "short": false
//             }
//         ],
//         "image_url": "http://my-website.com/path/to/image.jpg",
//         "thumb_url": "http://example.com/path/to/thumb.png",
//         "footer": "Slack API",
//         "footer_icon": "https://platform.slack-edge.com/img/default_application_icon.png",
//         "ts": 123456789
//     }
// ]
// }

const
    stopsByCodeQuery = ""

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

module.exports = {
    queryByCode,
    queryByName
};
