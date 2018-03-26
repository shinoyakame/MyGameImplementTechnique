var express = require('express');
var app = express();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost', 
    user:'root', 
    password:'123456',
    database:'game1'
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
        res.end(result);
    });
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

