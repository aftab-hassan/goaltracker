var express = require('express');
var router = express.Router();
Goal = require('../models/goal');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('here aftab')

    var result = getWeekNumber(new Date());

    Goal.getAllGoalDetails(function(err, allgoalsdetails){
        if(err) throw err;

        // res.send(allgoalsdetails)
        console.log('allgoalsdetails before sending to views');
        console.log(JSON.stringify(allgoalsdetails))
        console.log('done sending allgoalsdetails to views')
        res.render('index', {weekCount:result[1], allgoalsdetails:allgoalsdetails})
    });

    req.flash('success_msg', 'You successfully retrieved all goals');

});

function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
}

module.exports = router;