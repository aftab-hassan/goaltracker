var express = require('express');
var router = express.Router();

Week = require('../models/week');

router.get('/get', function(req, res, next) {
    Week.getWeeks(function(err, weeks){
        if(err) throw err;
        res.send(weeks)
    },3);
});

router.post('/add', function(req, res){
    console.log('inside /week/add')
	info = [];
	info['weekDate'] = req.body.weekDate;
    info['weekCount'] = req.body.weekCount;
	info['personaldescription'] = req.body.personaldescription;
    info['officedescription'] = req.body.officedescription;
    info['happinessscale'] = req.body.happinessscale;
    console.log('printing info from /week/add')
    console.log(JSON.stringify(info))
    console.log(info)
    console.log('done printing')

    console.log('about to print req.body')
    console.log(JSON.stringify(req.body))
    console.log('finished printing req.body');

	Week.addWeek(info, function(err, info){
		if(err) throw err;

		console.log(info)
        res.send(info)
	});

	req.flash('success_msg', 'You successfully added a week');
});

module.exports = router;