var mongoose = require('mongoose');

// ExpectationReality Schema
var ExpectationRealitySchema = mongoose.Schema({
    goal: {
        type: String
    },
    week: {
		type: String
	},
	expectation: {
		type: Number
	},
	reality:{
		type: Number
	}
});


var ExpectationReality = module.exports = mongoose.model('expectationrealities', ExpectationRealitySchema);

module.exports.addExpectationReality = function(info, callback) {
    // console.log("inside the model: ExpectationReality");

    week = info['week'];
    goal = info['goal']
    expectation = info['expectation']
    reality = info['reality']
    console.log('inside models/expectationreality.js : goal == ' + goal + ', reality == ' + reality);

    var ExpectationRealityToInsert = { week: week, goal: goal, expectation:expectation, reality:reality };
    // console.log(ExpectationRealityToInsert);

    ExpectationReality.create(ExpectationRealityToInsert, callback)
}

module.exports.getExpectationReality = function(callback, limit){
    ExpectationReality.find(callback).limit(limit);
}
