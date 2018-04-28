var express = require('express');
var router = express.Router();

ExpectationReality = require('../models/expectationreality');
Goal = require('../models/goal')

router.post('/add', function(req, res){
    console.log("inside the /expectationreality/add route")
    info = [];
    info['goal'] = req.body.goal;
    info['week'] = req.body.week;
    info['reality'] = req.body.reality;
    console.log(info);

    Goal.getGoalByGoalName(info.goal, function(err1, info1) {
        if(err1)
        {
            throw err1;
        }
        else
        {
            console.log('results from the getGoalByGoalName api : ' + JSON.stringify(info1))
            info['expectation'] = info1.expectation
            console.log('info1 after adding expectation : ' + JSON.stringify(info))
            ExpectationReality.addExpectationReality( info, function(err2, info2) {
                if(err2)
                {
                    throw err2
                }
                else
                {
                    console.log('results from the addExpectationReality api ' + JSON.stringify(info2))
                    res.send(info2)
                }
            });
        }
    });

    req.flash('success_msg', 'You successfully added a goal');
});

module.exports = router;