var express = require('express');
var router = express.Router();
var path = require('path');
//var multipart = require('connect-multiparty');
//var multipartMiddleware = multipart();
var fs = require('fs');

var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 5,
    host: 'localhost',
    user: 'root',
    database: 'tutorial',
    password: '7918'
});


var multer = require('multer');
//var upload = multer({dest:'uploads'})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
var upload = multer({storage : storage});


router.get('/', function (req, res, next) {
    res.render('promodi');
});

router.post('/',  upload.single('image'),function (req, res, next) {
    res.redirect('/seller')
    connection.release();
});

module.exports = router;
