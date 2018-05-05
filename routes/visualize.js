// https://bl.ocks.org/mbostock/3884955

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('inside /visualize')

    res.render('visualize/d3js')

    req.flash('success_msg', 'You successfully retrieved all goals');
});

module.exports = router;