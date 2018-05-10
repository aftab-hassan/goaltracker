var mongoose = require('mongoose');

// Goal Schema
var GoalSchema = mongoose.Schema({
	goal: {
		type: String
	},
	expectation: {
		type: Number
	},
    goalid: {
        type: String
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
    goalid = guid();
    state = info['state'];

    var goalToInsert = { goal: goal, expectation: expectation, goalid:goalid, state:state };
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

module.exports.getGoalByGoalId = function(goalid, callback)
{
    // console.log('inside the getGoalByGoalId function')
    var query = {goalid : goalid}
    Goal.findOne(query, callback)
}

module.exports.getAllGoalDetails = function(callback)
{
    console.log('inside the getAllGoalDetails function')
    Goal.find(callback)
}

module.exports.getAllGoalDetailsGreaterThanZeroExpectation = function(callback)
{
    console.log('inside the getAllGoalDetails function')
    Goal.find({expectation : { $gt: 0}}, callback)
}

function guid() {
    return 'goal_' + s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}
