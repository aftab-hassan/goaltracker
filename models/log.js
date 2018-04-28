var mongoose = require('mongoose');

// Log Schema
var LogSchema = mongoose.Schema({
	goal: {
		type: String
	},
    date : {
        type: String
    },
    operation : {
        type: String
    },
	expectation: {
		type: Number
	}
});

var Log = module.exports = mongoose.model('logs', LogSchema);

// Add Log
module.exports.addLog = function(info, callback) {
    console.log("inside the model: Log");

    goal = info['goal'];
    date = info['date'];
    operation = info['operation'];
    expectation = info['expectation'];

    var LogToInsert = { goal: goal, date: date, operation: operation, expectation: expectation };
    console.log(LogToInsert);

    Log.create(LogToInsert, callback)
}

module.exports.getLogs = function(callback)
{
    Log.find(callback)
}
