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
    cumulativeexpectation: {
        type: Number
    },
    reality:{
        type: Number
    },
    cumulativereality:{
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
    cumulativeexpectation = 0;
    cumulativereality = 0;
    console.log('inside models/expectationreality.js : goal == ' + goal + ', reality == ' + reality);

    ExpectationReality.getCumulativeExpectation(week-1, function(err1, info1){
        if(err1)
        {
            throw err1;
        }
        else
        {
            console.log('printing info')
            console.log(info1);
            console.log(JSON.stringify(info1))
            if(info1['cumulativeexpectation'] != null)
            {
                console.log('inside info1[\'cumulativeexpectation\'] != null')
                cumulativeexpectation = info1['cumulativeexpectation'] + expectation;
                console.log('cumulativeexpectation == ' + cumulativeexpectation)
            }
            else
            {
                console.log('inside info1[\'cumulativeexpectation\'] == null')
                cumulativeexpectation = expectation;
            }

            if(info1['cumulativereality'])
            {
                cumulativereality = info1['cumulativereality'] + reality;
            }
            else
            {
                cumulativereality = reality;
            }

            var ExpectationRealityToInsert = { week: week, goal: goal, expectation:expectation, reality:reality, cumulativeexpectation:cumulativeexpectation, cumulativereality:cumulativereality };
            console.log(ExpectationRealityToInsert);

            ExpectationReality.create(ExpectationRealityToInsert, callback)
        }
    });
}

module.exports.getCumulativeExpectation = function(week, callback){
    var query = {week: week};
    ExpectationReality.findOne(query, callback);
}

module.exports.getExpectationReality = function(callback, limit){
    ExpectationReality.find(callback).limit(limit);
}

module.exports.getAllExpectationReality = function(callback){
    ExpectationReality.find(callback);
}
