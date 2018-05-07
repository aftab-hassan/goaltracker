// https://bl.ocks.org/mbostock/3884955
//

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('inside /visualize')

    // res.render('visualize/googlecharts6')
    // res.render('visualize/googlecharts6_option1_doesnotworkinterpolation', {datafromapi : {
    //         "cols": [
    //             {"id":"","label":"Topping","pattern":"","type":"string"},
    //             {"id":"","label":"Slices","pattern":"","type":"number"}
    //         ],
    //         "rows": [
    //             {"c":[{"v":"Mushrooms","f":null},{"v":3,"f":null}]},
    //             {"c":[{"v":"Onions","f":null},{"v":1,"f":null}]},
    //             {"c":[{"v":"Olives","f":null},{"v":2,"f":null}]},
    //             {"c":[{"v":"Zucchini","f":null},{"v":1,"f":null}]},
    //             {"c":[{"v":"Pepperoni","f":null},{"v":2,"f":null}]}
    //         ]
    //     }
    // })
    res.render('visualize/googlecharts8_option3')

    req.flash('success_msg', 'You successfully retrieved all goals');
});

module.exports = router;