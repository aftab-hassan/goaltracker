var express = require('express');
var router = express.Router();
var asyncLoop = require('node-async-loop');
var request = require('request');

Goal = require('../models/goal');
Log = require('../models/log');

router.get('/', function(req, res){
    console.log('aftab : came inside the /getvisualizedata api')

    res.send({
        "cols": [
            {"id":"","label":"Topping","pattern":"","type":"string"},

            {"id":"","label":"Workout Reality","pattern":"","type":"number"},
            {"id":"","label":"Node.js Reality","pattern":"","type":"number"},

            {"id":"","label":"Workout Expectation","pattern":"","type":"number"},
            {"id":"","role":"certainty","type":"boolean"},
            {"id":"","label":"Node.js Expectation","pattern":"","type":"number"},
            {"id":"","role":"certainty","type":"boolean"}
        ],
        "rows": [
            {"c":[{"v":"Week 17","f":null},{"v":6,"f":null},{"v":5,"f":null},{"v":4,"f":null},{"v":false},{"v":3,"f":null},{"v":false}]},
            {"c":[{"v":"Week 18","f":null},{"v":12,"f":null},{"v":11,"f":null},{"v":8,"f":null},{"v":false},{"v":7,"f":null},{"v":false}]},
            {"c":[{"v":"Week 19","f":null},{"v":18,"f":null},{"v":15,"f":null},{"v":12,"f":null},{"v":false},{"v":12,"f":null},{"v":false}]},
            {"c":[{"v":"Week 20","f":null},{"v":24,"f":null},{"v":20,"f":null},{"v":16,"f":null},{"v":false},{"v":14,"f":null},{"v":false}]}
        ]
    })

    console.log('done with the sample api 1')
    req.flash('success_msg', 'You successfully retrieved all goals');
    console.log('done with the sample api 2')
});

module.exports = router;