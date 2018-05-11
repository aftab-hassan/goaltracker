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

    ExpectationReality.getCumulativeExpectationAndReality(week-1, goal, function(err1, info1){
        if(err1)
        {
            throw err1;
        }
        else
        {
            if(info1 == null)
            {
                cumulativeexpectation = expectation;
                cumulativereality = reality;
            }
            else
            {
                console.log('printing info')
                console.log(info1);
                console.log(JSON.stringify(info1))
                if(info1['cumulativeexpectation'] != null)
                {
                    console.log('inside info1[\'cumulativeexpectation\'] != null')
                    console.log('cumulativeexpectation during == ' + info1['cumulativeexpectation'] + " + " + expectation + " == " + (parseInt(info1['cumulativeexpectation']) + parseInt(expectation)));
                    cumulativeexpectation = parseInt(info1['cumulativeexpectation']) + parseInt(expectation);
                    console.log('cumulativeexpectation == ' + cumulativeexpectation)
                }
                else
                {
                    console.log('inside info1[\'cumulativeexpectation\'] == null')
                    cumulativeexpectation = expectation;
                }

                if(info1['cumulativereality'])
                {
                    console.log('cumulativereality before == ' + cumulativereality)
                    console.log('cumulativereality during == ' + info1['cumulativereality'] + " + " + reality + " == " + (parseInt(info1['cumulativereality']) + parseInt(reality)));
                    cumulativereality = parseInt(info1['cumulativereality']) + parseInt(reality);
                    console.log('cumulativereality after == ' + cumulativereality)
                }
                else
                {
                    cumulativereality = reality;
                }
            }

            var ExpectationRealityToInsert = { week: week, goal: goal, expectation:expectation, reality:reality, cumulativeexpectation:cumulativeexpectation, cumulativereality:cumulativereality };
            console.log(ExpectationRealityToInsert);

            ExpectationReality.create(ExpectationRealityToInsert, callback)
        }
    });
}

module.exports.getCumulativeExpectationAndReality = function(week, goal, callback){
    var query = {week: week, goal:goal};
    ExpectationReality.findOne(query, callback);
}

module.exports.getAllExpectationReality = function(callback){
    ExpectationReality.find(callback);
}
