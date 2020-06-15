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
router.get('/', function(req, res) {
    pool.getConnection(function (err, connection) {
        var sqlForSelectList = "SELECT email, username, address, phone FROM board";
        connection.query(sqlForSelectList, function (err, rows) {
            if(err) console.error("err : " + err);
            console.log("rows : " + JSON.stringify(rows));
    
            res.render('userinfo', {title: '고객관리', rows: rows});
            connection.release();
        });
     });
    ////
 
});

module.exports = router;