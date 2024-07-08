const express = require("express");
const app = express();
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const server = http.createServer(app);
const io = socketio(server);

// Set the view engine to EJS
app.set("view engine", "ejs");

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")));

// Socket.io connection handling
io.on("connection", function (socket) {
    // Handle "send-location" event
    socket.on("send-location", function (data) {
        io.emit("receive-location", { id: socket.id, ...data });
    });

    // Handle "disconnect" event
    socket.on("disconnect", function () {
        io.emit("user-disconnected", socket.id);
    });
});

// Route for rendering the index page
app.get("/", function (req, res) {
    res.render("index");
});

// Start the server on port 3000
server.listen(3000, function () {
    console.log("Server is running on http://localhost:3000");
});
