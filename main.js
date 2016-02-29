/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


/* global process, app, __dirname */

var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var fs = require("fs");
server.listen(process.env.PORT || 4444);

var userList = [];

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");	
});

io.sockets.on("connect", function (socket) {
    console.log("have a connection");
    
    socket.on("signUp", function (data) {
        var state = false;
        if (userList.indexOf(data) == -1) {
            userList.push(data);
            socket.un = data;
            state = true;
            console.log("sign up success user " + data);
            io.sockets.emit("sendUserList", {
                result: userList
            });
        }
        else {
            console.log("user is exist");
        }
        socket.emit("loginResult", {
            result: state
        });
    });
    
    socket.on("rcvMsg", function (data) {
		console.log(socket.un + ": " + data);
		io.sockets.emit("sendMsg", {
           result: socket.un +": " + data
       }) ;
    });
});