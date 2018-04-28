var mongoose = require('mongoose');

// Goal Schema
var GoalSchema = mongoose.Schema({
	goal: {
		type: String
	},
	expectation: {
		type: Number
	},
	state:{
		type: String
	}
});


var Goal = module.exports = mongoose.model('goaldetails', GoalSchema);

// Add Goal
module.exports.addGoal = function(info, callback) {
    console.log("inside the model: goal");

    goal = info['goal'];
    expectation = info['expectation'];
    state = info['state'];

    var goalToInsert = { goal: goal, expectation: expectation, state:state };
    console.log(goalToInsert);

    Goal.create(goalToInsert, callback)
}

// Update expectation for goal
module.exports.updateGoalExpectation = function(info, callback) {
    console.log('inside the model: goal, method: updateGoalExpectation')

    // works
    // Goal.findOne({ goal: info.goal }, function (err, doc){
    //     if(err)
    //     {
    //         console.log(err)
    //     }
    //     else
    //     {
    //         doc.expectation = info.updatedexpectation;
    //         doc.save(callback);
    //     }
    // })

    // does not work
    // var query = {'goal':info.goal};
    // info.expectation = info.updatedexpectation;
    // console.log('after update')
    // console.log(info)
    // Goal.findOneAndUpdate(query, info, {upsert:true}, callback);

    // works4
    var query = { goal: info.goal };
    Goal.findOneAndUpdate(query, { expectation: info.expectation }, {new: true}, callback)
}

module.exports.getGoalByGoalName = function(goal, callback)
{
    console.log('inside the getGoalByGoalName function')
    var query = {goal : goal}
    Goal.findOne(query, callback)
}

module.exports.getAllGoalDetails = function(callback)
{
    console.log('inside the getAllGoalDetails function')
    Goal.find(callback)
}
