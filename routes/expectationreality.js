var express = require('express');
var router = express.Router();

ExpectationReality = require('../models/expectationreality');
Goal = require('../models/goal')

router.post('/addbygoalname', function(req, res){
    // console.log("inside the /expectationreality/addbygoalname route")
    info = [];
    info['goal'] = req.body.goal;
    info['week'] = req.body.week;
    info['reality'] = req.body.reality;
    // console.log(info);

    Goal.getGoalByGoalName(info.goal, function(err1, info1) {
        if(err1)
        {
            throw err1;
        }
        else
        {
            console.log('results from the getGoalByGoalName api : ' + JSON.stringify(info1))
            info['expectation'] = info1.expectation
            // console.log('info1 after adding expectation : ' + JSON.stringify(info))
            ExpectationReality.addExpectationReality( info, function(err2, info2) {
                if(err2)
                {
                    throw err2
                }
                else
                {
                    // console.log('results from the addExpectationReality api ' + JSON.stringify(info2))
                    res.send(info2)
                }
            });
        }
    });

    req.flash('success_msg', 'You successfully added a goal');
});

router.post('/addbygoalid', function(req, res){
    // console.log("inside the /expectationreality/addbygoalid route")
    info = [];
    // console.log('printing req.body here : ' + JSON.stringify(req.body))
    info['goalid'] = req.body.goalid;
    // console.log('inside routes/expectationreality.js : goalid == ' + info['goalid'] + ', reality == ' + info['reality'])
    // console.log('print1')
    // console.log(info);

    // populate expectation and goal using goalid
    Goal.getGoalByGoalId(info['goalid'], function(err1, info1) {
        if(err1)
        {
            // console.log('print2')
            // console.log('came inside the error')
            throw err1;
        }
        else
        {
            // console.log('results from the getGoalByGoalId api : ' + JSON.stringify(info1))
            info['expectation'] = info1.expectation
            info['goal'] = info1.goal
            info['week'] = req.body.week;
            info['reality'] = req.body.reality;
            // console.log('print3')
            // console.log('reality : ' + info['reality'])
            console.log('inside routes/expectationreality.js : goalid == ' + info['goalid'] + ', goal == ' + info['goal'] + ', reality == ' + info['reality'])
            ExpectationReality.addExpectationReality( info, function(err2, info2) {
                if(err2)
                {
                    throw err2
                }
                else
                {
                    // console.log('results from the addExpectationReality api ' + JSON.stringify(info2))
                    res.send(info2)
                }
            });
        }
    });

    req.flash('success_msg', 'You successfully added a goal');
});

/* GET home page. */
router.get('/', function(req, res) {
    console.log('inside GET /expectationreality')

    ExpectationReality.getAllExpectationReality(function(err, allexpectationreality){
        if(err) throw err;

        console.log('printing all allexpectationreality')
        res.send(allexpectationreality);
    });

    req.flash('success_msg', 'You successfully retrieved all goals');

});

module.exports = router;