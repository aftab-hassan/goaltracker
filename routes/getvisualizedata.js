var express = require('express');
var router = express.Router();
var asyncLoop = require('node-async-loop');
var request = require('request');

Goal = require('../models/goal');
Log = require('../models/log');
ExpectationReality = require('../models/expectationreality');

router.get('/', function(req, res){
    console.log('aftab : came inside the /getvisualizedata api')

    // start
    // formatting the output of REST API
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
        console.log('AFTAB AFTAB AFTAB : response.statusCode == ' + response.statusCode)
        if (error || response.statusCode != 200)
        {
            console.log('AFTAB AFTAB AFTAB came inside the error scenario')
        }
        else
        {
            console.log('AFTAB : printing body')
            console.log(JSON.parse(body).length)

            // now I have to format this body into a format that googlecharts recognizes
            var body = JSON.parse(body);
            var goalSet = new Set();
            var weekSet = new Set();
            for(var i = 0;i<body.length;i++)
            {
                goalSet.add(body[i].goal)
                weekSet.add(body[i].week);
                console.log(body[i].week);
            }
            console.log(goalSet)
            console.log(weekSet)

            var goalSetValues = [];
            var weekSetValues = [];
            goalSet.forEach(function (item) {
                goalSetValues.push(item);
            });
            weekSet.forEach(function (item) {
                weekSetValues.push(item);
            });
            weekSetValues.sort();
            console.log(goalSetValues);
            console.log(weekSetValues);

            // filling cols
            var cols = [];
            cols.push({"id":"","label":"Goals","pattern":"","type":"string"})
            for(var i = 0;i<goalSetValues.length;i++)
            {
                cols.push({"id":"","label":goalSetValues[i]+" Reality","pattern":"","type":"number"});

                cols.push({"id":"","label":goalSetValues[i]+" Expectation","pattern":"","type":"number"});
                cols.push({"id":"","role":"certainty","type":"boolean"});
            }
            console.log(cols);

            // filling rows
            var rows = [];
            for(var j = 0;j<weekSetValues.length;j++)
            {
                var cValuesArray = [];
                cValuesArray.push({"v":"Week "+weekSetValues[j]})
                for(var i = 0;i<goalSetValues.length;i++)
                {
                    console.log(goalSetValues[i] + ", " + weekSetValues[j]);

                    for(var k = 0;k<body.length;k++)
                    {
                        if(body[k].goal == goalSetValues[i] && body[k].week == weekSetValues[j])
                        {
                            cValuesArray.push({"v":body[k].cumulativereality});
                        }
                    }

                    for(var k = 0;k<body.length;k++)
                    {
                        if(body[k].goal == goalSetValues[i] && body[k].week == weekSetValues[j])
                        {
                            cValuesArray.push({"v":body[k].cumulativeexpectation});
                            cValuesArray.push({"v":false});
                        }
                    }
                }
                rows.push({"c":cValuesArray})
            }
            console.log(rows);
            console.log(JSON.stringify(rows))
            var result = {rows:rows, cols:cols};
            console.log('printing result');
            console.log(JSON.stringify(result));
            res.send(result);
            // res.send(JSON.stringify(result));
        }
    })
    //end
});

module.exports = router;