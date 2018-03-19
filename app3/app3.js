var express = require('express');
var app = express();
var mysql = require('mysql');

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

