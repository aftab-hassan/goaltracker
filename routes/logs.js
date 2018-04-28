var express = require('express');
var router = express.Router();

Log = require('../models/log');

router.get( '/', function(req, res, next)
{
    Log.getLogs( function(err, result){
        if(err)
            throw err;
        console.log(result);
        res.send(result);
    })
});

module.exports = router;