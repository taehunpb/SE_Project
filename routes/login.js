var express = require('express');
var router = express.Router();
var mysql = require('mysql');


var pool = mysql.createPool({
  connectionLimit: 5,
   host: 'localhost',
   user: 'root',
   database: 'tutorial',
   password: '7918'
});


router.get('/', function(req, res, next){
  res.render('login');
});

// 로그인 DB 확인
router.post('/', function(req,res){
  
  var email = req.body.email;
  var passwd = req.body.passwd;
  var id = req.body.id;
  
  pool.getConnection(function (err, connection)
  {
     var sql = "SELECT * FROM board WHERE email=?";
     connection.query(sql, [email], function(err, result){
        if(err) console.error(err);
        
        console.log(result);
        if(result != ""){   // 이메일이 존재하는 경우

           var DB_PW = result[0].passwd;
             if(DB_PW == passwd){   // 입력한 passwd가 일치하는 경우
               if(email == 'admin@admin'){
                res.redirect('/admin');
                connection.release();
               }
               else if(email == 'seller@seller'){
                  res.redirect('/seller');
                connection.release();
               }
               else{
                res.redirect('/user');
                connection.release();
               }
              }
              else{
                 res.send("<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>");
                 connection.release();
              }
           }
           else{
              res.send("<script>alert('아이디가 존재하지 않습니다.');history.back();</script>");
              connection.release();
           }

        });
  });
  
});

module.exports = router;
