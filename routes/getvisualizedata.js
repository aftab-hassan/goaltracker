var express = require('express');
var router = express.Router();
var asyncLoop = require('node-async-loop');
var request = require('request');

Goal = require('../models/goal');
Log = require('../models/log');
ExpectationReality = require('../models/expectationreality');

router.get('/', function(req, res){
    console.log('aftab : came inside the /getvisualizedata api')

    // copy paste
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

    // simpler version of hard coded response
    // res.send({
    //     "cols": [
    //         {"id":"","label":"Goals","pattern":"","type":"string"},
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
    //         {"c":[{"v":"Week 17"},{"v":6},{"v":5},{"v":4},{"v":false},{"v":3},{"v":false}]},
    //         {"c":[{"v":"Week 18"},{"v":12},{"v":11},{"v":8},{"v":false},{"v":7},{"v":false}]},
    //         {"c":[{"v":"Week 19"},{"v":18},{"v":15},{"v":12},{"v":false},{"v":12},{"v":false}]},
    //         {"c":[{"v":"Week 20"},{"v":24},{"v":20},{"v":16},{"v":false},{"v":14},{"v":false}]}
    //     ]
    // })

    // try color on simpler version of hard coded response
    // res.send({
    //     "cols": [
    //             {"id":"","label":"Topping","pattern":"","type":"string"},
    //
    //             {"id":"","label":"Workout Reality","pattern":"","type":"number"},
    //             {"id":"","label":"Node.js Reality","pattern":"","type":"number"},
    //
    //             {"id":"","label":"Workout Expectation","pattern":"","type":"number"},
    //             {"id":"","role":"certainty","type":"boolean"},
    //             {"id":"","label":"Node.js Expectation","pattern":"","type":"number"},
    //             {"id":"","role":"certainty","type":"boolean"}
    //             {"id":"","role":"style","type":"color"}
    //         ],
    //         "rows": [
    //             {"c":[{"v":"Week 17"},{"v":6},{"v":5},{"v":4},{"v":false},{"v":3},{"v":false},{"v":red}]},
    //             {"c":[{"v":"Week 18"},{"v":12},{"v":11},{"v":8},{"v":false},{"v":7},{"v":false},{"v":red}]},
    //             {"c":[{"v":"Week 19"},{"v":18},{"v":15},{"v":12},{"v":false},{"v":12},{"v":false},{"v":red}]},
    //             {"c":[{"v":"Week 20"},{"v":24},{"v":20},{"v":16},{"v":false},{"v":14},{"v":false},{"v":red}]}
    //         ]
    // })

    // simple output of REST API
    // var headers = {
    //     'User-Agent':       'Super Agent/0.0.1',
    //     'Content-Type':     'application/x-www-form-urlencoded'
    // }
    //
    // // Configure the request
    // var options = {
    //     url: 'http://localhost:3000/expectationreality/',
    //     method: 'GET',
    //     headers: headers
    // }
    //
    // request(options, function (error, response, body) {
    //     // // console.log('error : ' + error)
    //     // // console.log('response : ' + JSON.stringify(response))
    //     // console.log('body : ' + body)
    //     console.log('AFTAB AFTAB AFTAB : response.statusCode == ' + response.statusCode)
    //     if (error || response.statusCode != 200)
    //     {
    //         console.log('AFTAB AFTAB AFTAB came inside the error scenario')
    //         // Print out the response body
    //         // res.send(response)
    //         // console.log(body)
    //     }
    //     else
    //     {
    //         console.log('AFTAB : printing body')
    //         // console.log(body)
    //         // console.log(JSON.stringify(body))
    //         // console.log('AFTAB AFTAB AFTAB came inside the non-error scenario')
    //         // console.log('length of the array == ' + body.length);
    //         console.log(JSON.parse(body).length)
    //
    //         // now I have to format this body into a format that googlecharts recognizes
    //         for(var i = 0;i<JSON.parse(body).length;i++)
    //         {
    //             console.log(JSON.parse(body)[i].week);
    //         }
    //         var rows = [ {"c":[{"v":"Week 17","f":null},{"v":6,"f":null}]}, {"c":[{"v":"Week 18","f":null},{"v":12,"f":null}]}, {"c":[{"v":"Week 19","f":null},{"v":18,"f":null}]}, {"c":[{"v":"Week 20","f":null},{"v":24,"f":null}]} ];
    //         var cols = [{"id":"","label":"Topping","pattern":"","type":"string"},{"id":"","label":"Workout Reality","pattern":"","type":"number"},];
    //         var result = {rows, cols};
    //         res.send(result)
    //     }
    // })

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
            var body = JSON.parse(body);
            // var cumulativeExpectation = {};
            // var cumulativeReality = {};
            var goalSet = new Set();
            var weekSet = new Set();
            for(var i = 0;i<body.length;i++)
            {
                goalSet.add(body[i].goal)
                weekSet.add(body[i].week);
                console.log(body[i].week);
                // cumulativeExpectation[body[i].week].push({"goal":body[i].goal, "cumulativeexpectation":body[i].cumulativeexpectation});
                // cumulativeReality[body[i].week].push({"goal":body[i].goal, "cumulativeereality":body[i].cumulativeereality});
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
                    // ExpectationReality.getExpectationRealityForCondition(function(err, res){
                    //     if(err)
                    //         console.log(err)
                    //     else
                    //         console.log(res);
                    // }, weekSetValues[j], goalSetValues[i])

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
            var result = {rows:rows, cols:cols};
            console.log('printing result');
            console.log(result);
            res.send(result);

            // var myrows = [ {"c":[{"v":"Week 17","f":null},{"v":6,"f":null}]}, {"c":[{"v":"Week 18","f":null},{"v":12,"f":null}]}, {"c":[{"v":"Week 19","f":null},{"v":18,"f":null}]}, {"c":[{"v":"Week 20","f":null},{"v":24,"f":null}]} ];
            // var mycols = [{"id":"","label":"Topping","pattern":"","type":"string"},{"id":"","label":"Workout Reality","pattern":"","type":"number"},];
            // var myresult = {rows:myrows, cols:mycols};
            // res.send(myresult)
        }
    })
});

module.exports = router;