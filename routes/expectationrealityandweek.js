var express = require('express');
var router = express.Router();
var request = require('request');
var asyncLoop = require('node-async-loop');

Week = require('../models/week');
ExpectationReality = require('../models/expectationreality');

// add expectation-reality to expectationrealities table, and week to weekdetails table
router.post('/add', function(req, res){
    console.log('inside /expectationrealityandweek/add')
    console.log(JSON.stringify(req.body))

	info = [];
	info['weekDate'] = getMonthDateYear();

    var result = getWeekNumber(new Date());
    // info['weekCount'] = result[1];
    info['weekCount'] = req.body.weekCount;

    info['personaldescription'] = req.body.personaldescription;
    info['officedescription'] = req.body.officedescription;
    info['happinessscale'] = req.body.happinessscale;

    // console.log('about to print req.body')
    // console.log(JSON.stringify(req.body))
    // console.log('finished printing req.body');

    // add weeks
    Week.addWeek(info, function(err, info){
		if(err) throw err;

		// console.log(info)

        // add expectation realities, loop and call the /expectationreality/addbygoalid api for all of the goals in the req.body
        // Set the headers
        var headers = {
            'User-Agent':       'Super Agent/0.0.1',
            'Content-Type':     'application/x-www-form-urlencoded'
        }

        // Configure the request
        var options = {
            url: 'http://localhost:3000/expectationreality/addbygoalid',
            method: 'POST',
            headers: headers,
            form: { "goalid" : "defaultundefined", "week" : info['weekCount'], "reality" : -1 }
        }

        asyncLoop(req.body, function (member, next) {

            console.log('array member : ' + JSON.stringify(member))

            if(member.key.startsWith('goal_'))
            {
                console.log('detected goal : ' + member.key)
                console.log('printing reality : ' + member.value)

                // Start the request
                // options.form.goalid = member.split("_")[1];
                options.form.goalid = member.key;
                options.form.reality = member.value;
                console.log('options.form.goalid == ' + options.form.goalid + ', options.form.reality == ' + options.form.reality)
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
                        next(error);
                    }
                    else
                    {
                        console.log('AFTAB AFTAB AFTAB came inside the non-error scenario')
                        next();
                    }
                })
            }
            else{
                next();
            }

        }, function (err) {
            if (err)
            {
                console.error('Error: ' + err.message);
                return;
            }

            console.log('Finished!');
        });

        // res.send(info)
        req.flash('success_msg', 'Successfully tracked goals for Week '+info['weekCount']);
        res.redirect('/');
    });
    // console.log('finished adding weeks')

	// req.flash('success_msg', 'You successfully added a week');
});


router.post('/checkpostcall', function(req, res){
    // Set the headers
    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    }

// Configure the request
    var options = {
        url: 'http://localhost:3000/expectationreality/addbygoalid',
        method: 'POST',
        headers: headers,
        form: { "goalid" : "4065bc75-a26d-5ebf-e7c6-ce320dd212fc", "week" : "week 72", "reality" : 91 }
    }

// Start the request
    request(options, function (error, response, body) {
        console.log('error : ' + error)
        console.log('response : ' + JSON.stringify(response))
        console.log('body : ' + body)
        if (!error && response.statusCode == 200) {
            // Print out the response body
            res.send(response)
            console.log(body)
        }
    })
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

function getMonthDateYear()
{
    var dateObj = new Date();
    var month = dateObj.getUTCMonth() + 1; //months from 1-12
    var day = dateObj.getUTCDate();
    var year = dateObj.getUTCFullYear();

    newdate = month + "/" + day + "/" + year;
    return newdate;
}

module.exports = router;