/**
 * Created by Guozheng on 7/6/2016.
 */
var express = require('express');
var app = express();
var fs = require("fs");

var bodyParser = require('body-parser');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/index.htm', function (req, res) {
    res.sendFile( __dirname + "/FileUploadByReader.html" );
});

app.post('/file_upload', function (req, res) {
    var filePathname = __dirname + "/UploadedFiles/" + Date.now() + '.dat';
    var fileExist = false;
    req.on('readable', function() {
        var data = req.read();
        if(fileExist) {
            fs.appendFile(filePathname, data, function (err) {
                if (err) {
                    //console.log("Load file failed.");
                    //res.end("Load file failed. ");
                }
                else {
                    //console.log("Load file success.");
                    //res.end("Load file success. ");
                }
            });
        }
        else {
            fs.writeFile(filePathname, data, function (err) {
                if (err) {
                    //console.log("Load file failed.");
                    res.end("Load file failed. ");
                }
                else {
                    //console.log("Load file success.");
                    //res.end("Load file success. ");
                }
            });
            fileExist = true;
        }
    });
    res.end("success");
});

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
});