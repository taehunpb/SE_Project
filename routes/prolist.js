var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('prolist', { title: 'Express', session:req.session });
});

module.exports = router;