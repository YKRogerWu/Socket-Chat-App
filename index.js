// setup socket.io
const express = require('express')
const app = express()

// setup socket.io
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors:{ origin: "*"}})

// setup EJS view engine
app.set('view engine', 'ejs')

// setup route
app.get("/", (req, res)=>{
    res.redirect("/home")
})

app.get("/home", (req, res)=>{
    res.render('home');
})

// start the server
server.listen(3001, ()=>{
    console.log("Server Start 🚀");
})

io.on('connection', (socket)=>{
    console.log("User connected: " + socket.id) //display unique id of the user
    
    // send a message to all clients
    socket.send("Hello from server!")

    // When a 'msgSent' (1st arg from the "sendMessage" const) 
    //  match, broadcast the second argument of 'sendMessage()' 
    //  (which is 'data') to everyone (except for the sender)
    socket.on("msgSent", (data)=>{
        socket.broadcast.emit("message", data)
    })
})