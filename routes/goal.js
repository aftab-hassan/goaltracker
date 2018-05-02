var express = require('express');
var router = express.Router();
var asyncLoop = require('node-async-loop');
var request = require('request');

Goal = require('../models/goal');
Log = require('../models/log');

router.post('/add', function(req, res){
    console.log("inside the /goal/add route")
    info = [];
    info['goal'] = req.body.goal;
    info['expectation'] = req.body.expectation;
    info['state'] = req.body.state;
    console.log(info);

    Goal.addGoal(info, function(err, info){
        if(err) throw err;

        console.log(info)

        loginfo = [];
        loginfo['goal'] = req.body.goal;
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        today = dd+'/'+mm+'/'+yyyy;
        loginfo['date'] = today;

        loginfo['operation'] = 'add';
        loginfo['expectation'] = req.body.expectation;
        Log.addLog(loginfo, function(logerror, logresult){
            if(logerror)
                throw  logerror
            console.log(logresult)
        })

        res.send(info)
    });

    req.flash('success_msg', 'You successfully added a goal');
});

//call the /goal/edit api multiple times
router.post('/editallgoals', function(req, res){

    console.log('inside the /goal/editallgoals api route')

    // console.log('req.body == ' + req.body);
    console.log('req.body == ' + JSON.stringify(req.body))

    // Set the headers
    var headers = {
        'User-Agent':       'Super Agent/0.0.1',
        'Content-Type':     'application/x-www-form-urlencoded'
    }

    // Configure the request
    var options = {
        url: 'http://localhost:3000/goal/edit',
        method: 'POST',
        headers: headers,
        form: { "goal" : "defaultundefined", "expectation" : -1 }
    }

    asyncLoop(req.body, function(member, next){
        console.log('member.key == ' + member.key + ', member.value == ' + member.value);

        if(member.key.startsWith('goal_'))
        {
            console.log('detected goal : ' + member.key)
            console.log('printing reality : ' + member.value)

            Goal.getGoalByGoalId(member.key, function(err1, info1) {
                if(err1)
                {
                    // console.log('print2')
                    // console.log('came inside the error')
                    throw err1;
                }
                else
                {
                    options.form.goal = info1.goal;
                    options.form.expectation = member.value;
                    console.log('options.form.goal == ' + options.form.goal + ', options.form.expectation == ' + options.form.expectation)
                    request(options, function (error, response, body) {
                        // // console.log('error : ' + error)
                        // // console.log('response : ' + JSON.stringify(response))
                        // console.log('body : ' + body)
                        if (error || response.statusCode != 200)
                        {
                            // Print out the response body
                            // res.send(response)
                            // console.log(body)
                            next(error);
                        }
                        else
                        {
                            next();
                        }
                    })
                }
            });
        }
    }, function (err)
        {
            if (err)
            {
                console.error('Error: ' + err.message);
                return;
            }

            console.log('Finished!');
        });

    req.flash('success_msg', 'You successfully added a goal');
    res.send(req.body)
});

// TODO : Get rid of info['state'] , don't think it's needed
// TODO : possibly have the /goal/edit route accept current and updated expectation, and proceed to perform operation only if there is an actual edit made
router.post('/edit', function(req, res){
    console.log("inside the /goal/edit route")
    info = [];
    info['goal'] = req.body.goal;
    info['expectation'] = req.body.expectation;
    info['state'] = req.body.state;
    console.log(info);

    Goal.updateGoalExpectation(info, function(err, updatedInfo){
        if(err) throw err;

        console.log(updatedInfo)

        loginfo = [];
        loginfo['goal'] = req.body.goal;
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!

        var yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        }
        if(mm<10){
            mm='0'+mm;
        }
        today = dd+'/'+mm+'/'+yyyy;
        loginfo['date'] = today;

        loginfo['operation'] = 'edit';
        loginfo['expectation'] = req.body.expectation;
        Log.addLog(loginfo, function(logerror, logresult){
            if(logerror)
                throw  logerror
            console.log(logresult)
        })

        res.send(updatedInfo)
    });

    req.flash('success_msg', 'You successfully added a goal');
});

router.get('/', function(req, res){
    Goal.getAllGoalDetails(function(err, allgoalsdetails){
        if(err) throw err;

        // res.send(allgoalsdetails)
        res.render('index', {allgoalsdetails:allgoalsdetails})
    });

    req.flash('success_msg', 'You successfully retrieved all goals');
});

router.get('/addgoalview', function(req, res, next) {
    res.render('goals/addgoal');
});

router.get('/editgoalview', function(req, res, next) {
    Goal.getAllGoalDetails(function(err, allgoalsdetails){
        if(err) throw err;

        // res.send(allgoalsdetails)
        res.render('goals/editgoal', {allgoalsdetails:allgoalsdetails})
    });
});

module.exports = router;