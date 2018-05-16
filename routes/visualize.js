// https://bl.ocks.org/mbostock/3884955
//

var express = require('express');
var router = express.Router();
var request = require('request');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('inside /visualize')

    // Set the headers
    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    }

    // Configure the request
    // this request only gets all goal names, nothing to do with data, just calls res.render and renders visualize/googlecharts
    var options = {
        url: 'http://localhost:3000/expectationreality?retrieveallgoals=true',
        method: 'GET',
        headers: headers
    }

    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            var goalsSet = new Set();
            var body = JSON.parse(body);
            for(var i = 0;i<body.length;i++)
            {
                goalsSet.add(body[i].goal);
            }
            var goalSetValues = [];
            goalsSet.forEach(function (item) {
                console.log('spaceNoReplacedItem == ' + item);
                var nbsp = String.fromCharCode(parseInt("00A0", 16));
                // var spaceReplacedItem = item.replace("&nbsp;", nbsp);
                var spaceReplacedItem = item.replace(new RegExp(' ', 'g'), '&nbsp;');
                console.log('spaceReplacedItem == ' + spaceReplacedItem);
                goalSetValues.push({"goal" : spaceReplacedItem});
            });
            console.log('AFTAB goalSetValues : ' + JSON.stringify(goalSetValues))
            res.render('visualize/googlecharts', {goalSetValues})
            req.flash('success_msg', 'You successfully retrieved all goals');
        }
    })
});

module.exports = router;