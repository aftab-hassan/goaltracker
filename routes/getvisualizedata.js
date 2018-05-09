var express = require('express');
var router = express.Router();
var asyncLoop = require('node-async-loop');
var request = require('request');

Goal = require('../models/goal');
Log = require('../models/log');

router.get('/', function(req, res){
    console.log('aftab : came inside the /getvisualizedata api')

    // res.send({
    //     "cols": [
    //         {"id":"","label":"Topping","pattern":"","type":"string"},
    //
    //         {"id":"","label":"Workout Reality","pattern":"","type":"number"},
    //         {"id":"","label":"Node.js Reality","pattern":"","type":"number"},
    //
    //         {"id":"","label":"Workout Expectation","pattern":"","type":"number"},
    //         {"id":"","role":"certainty","type":"boolean"},
    //         {"id":"","label":"Node.js Expectation","pattern":"","type":"number"},
    //         {"id":"","role":"certainty","type":"boolean"}
    //     ],
    //     "rows": [
    //         {"c":[{"v":"Week 17","f":null},{"v":6,"f":null},{"v":5,"f":null},{"v":4,"f":null},{"v":false},{"v":3,"f":null},{"v":false}]},
    //         {"c":[{"v":"Week 18","f":null},{"v":12,"f":null},{"v":11,"f":null},{"v":8,"f":null},{"v":false},{"v":7,"f":null},{"v":false}]},
    //         {"c":[{"v":"Week 19","f":null},{"v":18,"f":null},{"v":15,"f":null},{"v":12,"f":null},{"v":false},{"v":12,"f":null},{"v":false}]},
    //         {"c":[{"v":"Week 20","f":null},{"v":24,"f":null},{"v":20,"f":null},{"v":16,"f":null},{"v":false},{"v":14,"f":null},{"v":false}]}
    //     ]
    // })

    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    }

    // Configure the request
    var options = {
        url: 'http://localhost:3000/expectationreality/',
        method: 'GET',
        headers: headers
    }

    request(options, function (error, response, body) {
        // // console.log('error : ' + error)
        // // console.log('response : ' + JSON.stringify(response))
        // console.log('body : ' + body)
        console.log('AFTAB AFTAB AFTAB : response.statusCode == ' + response.statusCode)
        if (error || response.statusCode != 200)
        {
            console.log('AFTAB AFTAB AFTAB came inside the error scenario')
            // Print out the response body
            // res.send(response)
            // console.log(body)
        }
        else
        {
            console.log('AFTAB : printing body')
            // console.log(body)
            // console.log(JSON.stringify(body))
            // console.log('AFTAB AFTAB AFTAB came inside the non-error scenario')
            // console.log('length of the array == ' + body.length);
            console.log(JSON.parse(body).length)

            // now I have to format this body into a format that googlecharts recognizes
            for(var i = 0;i<JSON.parse(body).length;i++)
            {
                console.log(JSON.parse(body)[i].week);
            }
            var rows = [ {"c":[{"v":"Week 17","f":null},{"v":6,"f":null}]}, {"c":[{"v":"Week 18","f":null},{"v":12,"f":null}]}, {"c":[{"v":"Week 19","f":null},{"v":18,"f":null}]}, {"c":[{"v":"Week 20","f":null},{"v":24,"f":null}]} ];
            var cols = [{"id":"","label":"Topping","pattern":"","type":"string"},{"id":"","label":"Workout Reality","pattern":"","type":"number"},];
            var result = {rows, cols};
            res.send(result)
        }
    })
});

module.exports = router;