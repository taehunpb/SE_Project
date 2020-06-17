var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('purchase_list', { title: 'ICS', session:req.session });
});

module.exports = router;
