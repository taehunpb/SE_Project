var express = require('express');
var router = express.Router();

// MySQL 로드
var mysql = require('mysql');
var pool = mysql.createPool({
	connectionLimit: 5,
	host: 'localhost',
	user: 'root',
	database: 'tutorial',
	password: '7918'
});

function leadingZeros(n, digits) {
  var zero = '';
  n = n.toString();

  if (n.length < digits) {
    for (i = 0; i < digits - n.length; i++)
      zero += '0';
  }
  return zero + n;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('deliverForm', { title: 'deliverForm'/*, username:req.session.username, admin:req.session.admin, sale:req.session.sale*/ });
});

router.post('/', function(req,res,next){
	res.redirect('/user')
    connection.release();
});

module.exports = router;