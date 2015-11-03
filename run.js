var request = require('request')
var parseString = require('xml2js').parseString;

var vast = "http://search.spotxchange.com/vast/2.00/126363?VPAID=1&content_page_url=http%3A%2F%2Ffoxnews.com%2F&cb=1446587648&player_width=302&player_height=252&vid_duration=3600&vid_url=http%3A%2F%2Ffoxnews.com%2F&vid_id=&vid_title=&vid_description=&content_type=7";

var DEFAULT_UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2543.0 Safari/537.36';
var DEFAULT_REQUESTED_WITH = 'ShockwaveFlash/19.0.0.228';

var options = {
    url: vast,
    headers: {
        'User-Agent': DEFAULT_UA,
        'Requested_With': DEFAULT_REQUESTED_WITH
    }
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
//        console.log(body);
        parseString(body, function (err, result) {
            console.dir(result.VAST.Ad[0].InLine[0].AdTitle[0]);
        });
    }
}

var FileCookieStore = require('tough-cookie-filestore');
// NOTE - currently the 'cookies.json' file must already exist!
var j = request.jar(new FileCookieStore('cookies.json'));
request = request.defaults({ jar : j });

request(options, callback);