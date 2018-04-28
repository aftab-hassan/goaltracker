var express = require('express');
var router = express.Router();

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

        res.send(allgoalsdetails)
        // res.render('currentgoals/index', {allgoalsdetails:allgoalsdetails})
    });

    req.flash('success_msg', 'You successfully retrieved all goals');
});

module.exports = router;