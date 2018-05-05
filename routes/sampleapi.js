var express = require('express');
var router = express.Router();
var asyncLoop = require('node-async-loop');
var request = require('request');

Goal = require('../models/goal');
Log = require('../models/log');

router.get('/', function(req, res){
    console.log('aftab : came inside the /sampleapi api')
    res.send({
        "cols": [
            {"id":"","label":"Topping","pattern":"","type":"string"},
            {"id":"","label":"Slices","pattern":"","type":"number"}
        ],
        "rows": [
            {"c":[{"v":"Mushroooooms","f":null},{"v":3,"f":null}]},
            {"c":[{"v":"Onions","f":null},{"v":1,"f":null}]},
            {"c":[{"v":"Olives","f":null},{"v":2,"f":null}]},
            {"c":[{"v":"Zucchini","f":null},{"v":1,"f":null}]},
            {"c":[{"v":"Pepperoni","f":null},{"v":2,"f":null}]}
        ]
    })

    req.flash('success_msg', 'You successfully retrieved all goals');
});

module.exports = router;