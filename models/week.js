var mongoose = require('mongoose');

// Week Schema
var WeekSchema = mongoose.Schema({
	weekDate: {
		type: String
	},
    weekCount: {
        type: Number
    },
	personaldescription: {
		type: String
	},
    officedescription: {
        type: String
    },
	happiness_scale:{
		type: Number
	}
});


var Week = module.exports = mongoose.model('weekdetails', WeekSchema);

module.exports.getWeekById = function(weekCount, callback){
    var query = {weekCount: weekCount};
    Week.findOne(query, callback);
}

// Adding week
module.exports.addWeek = function(info, callback) {
    console.log("inside the model: week");

    weekDate = info['weekDate'];
    weekCount = info['weekCount'];
    officedescription = info['officedescription']
    personaldescription = info['personaldescription'];
    happiness_scale = info['happiness_scale'];

    var weekToInsert = { weekDate: weekDate, weekCount: weekCount, officedescription: officedescription, personaldescription: personaldescription, happiness_scale:happiness_scale };
    console.log(weekToInsert);

    Week.create(weekToInsert, callback)

    // Week.create(myobj, function(err, res) {
    //     if (err) throw err;
    //     console.log("1 document inserted");
    //     db.close();
    // });
}

module.exports.getWeeksLimit = function(callback, limit){
    Week.find(callback).limit(limit);
}

module.exports.getWeeks = function(callback){
    Week.find(callback);
}
