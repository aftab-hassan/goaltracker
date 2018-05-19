var express = require('express');
var router = express.Router();
var asyncLoop = require('node-async-loop');
var request = require('request');

Goal = require('../models/goal');
Log = require('../models/log');

router.get('/', function(req, res){
    console.log('aftab : came inside the /sampleapi api')
    // res.send(JSON.stringify({
    //     "cols": [
    //         {"id":"","label":"Topping","pattern":"","type":"string"},
    //         {"id":"","label":"Slices","pattern":"","type":"number"}
    //     ],
    //     "rows": [
    //         {"c":[{"v":"Mushroooooms","f":null},{"v":3,"f":null}]},
    //         {"c":[{"v":"Onions","f":null},{"v":1,"f":null}]},
    //         {"c":[{"v":"Olives","f":null},{"v":2,"f":null}]},
    //         {"c":[{"v":"Zucchini","f":null},{"v":1,"f":null}]},
    //         {"c":[{"v":"Pepperoni","f":null},{"v":2,"f":null}]}
    //     ]
    // }))

    // res.send({
    //     "name":"aftab",
    //     "last":"hassan"
    // })

    // res.send({
    //     "cols": [
    //         {"id":"","label":"Topping","pattern":"","type":"string"},  // x-axis
    //         {"id":"","label":"Slices 1","pattern":"","type":"number"},   // y-axis - series 0 - line 1
    //         {"id":"","label":"Slices 2","pattern":"","type":"number"},   // y-axis - series 1 - line 2
    //         {"id":"","role":"certainty","type":"boolean"},             // certainty role - false = dotted
    //         {"id":"","label":"Slices 3","pattern":"","type":"number"}   // y-axis - series 2 - line 3
    //     ],
    //     "rows": [
    //         {"c":[{"v":"Mushrooms","f":null},{"v":3,"f":null},{"v":4,"f":null},{"v":5,"f":null},{"v":false}]},
    //         {"c":[{"v":"Onions","f":null},{"v":1,"f":null},{"v":2,"f":null},{"v":3,"f":null},{"v":false}]},
    //         {"c":[{"v":"Olives","f":null},{"v":2,"f":null},{"v":3,"f":null},{"v":4,"f":null},{"v":false}]},
    //         {"c":[{"v":"Zucchini","f":null},{"v":1,"f":null},{"v":2,"f":null},{"v":3,"f":null},{"v":false}]},
    //         {"c":[{"v":"Pepperoni","f":null},{"v":2,"f":null},{"v":3,"f":null},{"v":4,"f":null},{"v":false}]}
    //     ]
    // })

    // res.send({
    //     "cols": [
    //         {"id":"","label":"Topping","pattern":"","type":"string"},  // x-axis
    //
    //         {"id":"","role":"certainty","type":"boolean"},             // certainty role - false = dotted
    //         {"id":"","label":"Workout-Expectation","pattern":"","type":"number"},   // y-axis - series 0 - line 1
    //
    //         {"id":"","label":"Workout-Reality","pattern":"","type":"number"},   // y-axis - series 1 - line 2
    //
    //         {"id":"","role":"certainty","type":"boolean"},             // certainty role - false = dotted
    //         {"id":"","label":"Node-Expectation","pattern":"","type":"number"},   // y-axis - series 2 - line 3
    //
    //         {"id":"","label":"Node-Reality","pattern":"","type":"number"}   // y-axis - series 2 - line 4
    //     ],
    //     "rows": [
    //         {"c":[{"v":"Week 17","f":null},{"v":6,"f":null},{"v":5,"f":null},{"v":4,"f":null},{"v":3,"f":null},{"v":false}]},
    //         {"c":[{"v":"Week 18","f":null},{"v":12,"f":null},{"v":11,"f":null},{"v":8,"f":null},{"v":7,"f":null},{"v":false}]},
    //         {"c":[{"v":"Week 19","f":null},{"v":18,"f":null},{"v":15,"f":null},{"v":12,"f":null},{"v":12,"f":null},{"v":false}]},
    //         {"c":[{"v":"Week 20","f":null},{"v":24,"f":null},{"v":20,"f":null},{"v":16,"f":null},{"v":14,"f":null},{"v":false}]}
    //     ]
    // })

    res.send({
        "cols": [
            {"id":"","label":"Topping","pattern":"","type":"string"},

            {"id":"","label":"Solid-Series-1","pattern":"","type":"number"},
            {"id":"","label":"Solid-Series-2","pattern":"","type":"number"},

            {"id":"","label":"Dotted-Series-1","pattern":"","type":"number"},
            {"id":"","role":"certainty","type":"boolean"},
            {"id":"","label":"Dotted-Series-2","pattern":"","type":"number"},
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
    // req.flash('success_msg', 'You successfully retrieved all goals');
    console.log('done with the sample api 2')
});

module.exports = router;