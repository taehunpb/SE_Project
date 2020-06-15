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
  res.render('joinForm', { title: 'joinForm'/*, username:req.session.username, admin:req.session.admin, sale:req.session.sale*/ });
});

router.post('/', function(req,res,next){
	console.log(req.body);
	var email = req.body.email;
	var passwd = req.body.passwd;
	var username = req.body.username;
	var address = req.body.address;
	var address2 = req.body.address2;
	var phone = req.body.phone
	
	if(address2 != "") address = address+" "+address2;
	
	pool.getConnection(function (err, connection)
	{
		var sql = "SELECT * FROM board WHERE email=?";
		connection.query(sql, [email], function(err, result){
			if(err) console.error(err);
			
			if(result != ""){	// 이메일이 이미 존재하는  경우
				res.send("<script>alert('이메일이 이미 존재합니다.');history.back();</script>");
				connection.release();
			}
			else{
				pool.getConnection(function (err, connection)
				{
					var sql = "INSERT INTO board(email, passwd, username, address, phone) values(?,?,?,?,?)";
					connection.query(sql, [email, passwd, username, address, phone], function(err, result){
						if(err) console.error(err);
						
						res.send("<script>alert('회원가입 되었습니다.');window.location.href='/'</script>");
					});
				/*	sql="INSERT INTO shipaddress(email, address1) values(?,?)";
					connection.query(sql, [email, address], function(err, result){
						if(err) console.error(err);
						connection.release();
					});*/
				});
			}
		});
		
	});
});

module.exports = router;
