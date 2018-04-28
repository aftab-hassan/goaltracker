var express = require('express');
var router = express.Router();

var Class = require('../models/class');

//Classes Page
router.get('/', function(req, res, next) {
	Class.getClasses(function(err, classes){
		if(err) throw err;

		// hardcoding for some testing
		// classes = [{ title:'my title', description:'my description', instructor:'my instructor', _id:'my _id'},
         //    { title:'my title 2', description:'my description 2', instructor:'my instructor 2', _id:'my _id 2'}];

		res.render('classes/index', { classes: classes });
	},3);
});

// Class Details
router.get('/:id/details', function(req, res, next) {
	Class.getClassById([req.params.id],function(err, classname){
		if(err) throw err;
		res.render('classes/details', { class: classname });
	});
});

module.exports = router;
