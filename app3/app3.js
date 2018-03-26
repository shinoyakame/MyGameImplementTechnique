var express = require('express');
var app = express();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'cgmgameserver.cl9n0qwnzmby.ap-south-1.rds.amazonaws.com', 
    user:'admin', 
    password:'*********',
    database:'cgmgameserver'
});

connection.connect(function (err) { //async
    if (err) {
        console.log('Error Connecting', err.stack);
        return;
    }
    console.log('Connected as id', connection.threadId);
});

app.get('/users', function (req, res) { //localhost:8081/users
    //res.end('hello it\'s me');
    queryAllUser(function(err,result){
        res.end('fff');
    });
});

app.get('user/add/user', function(req,res){

    var name = req.query.name;
    var pass = req.query.pass;

    //var user = [[name,password];

    var user = [
        ['Aa','456789'],
        ['Bb','456789'],
        ['Cc','456789']
    ];
    InsertUser(user, function(err,result){
        res.end(result);
    });

    res.end(name + pass);
});

app.get('/user/:name', function (req, res) { //localhost:8081/users
    var name = req.params.name;
    //console.log(name);
    queryUser(function(err,result){
        res.end(result);
    }, name);
});

var server = app.listen(8081, function () {
    console.log('Server: Running');
});

function queryAllUser(callback) {
    var json = '';
    connection.query('SELECT * FROM user',
        function (err, rows, fields) {
            if (err) throw err;

            json = JSON.stringify(rows);

            callback(null, json); //err, result
        });
}

function queryUser(callback, name) {
    var json = '';
    connection.query("SELECT * FROM user WHERE name=?",name,
        function (err, rows, fields) {
            if (err) throw err;

            json = JSON.stringify(rows);

            callback(null, json); //err, result
        });
}

function InsertUser(user,callback) {
    var sql = 'INSERT INTO user(name, password) values ?';

    connection.query(sql,[user],
        function (err, rows, fields) {

            var res = '[{"success":"true"}]';

            if (err) {
                res = '[{"success":"false"}]';
                throw err;
            }

            callback(null, res);
        });
}


