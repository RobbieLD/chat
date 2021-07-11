"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_basic_auth_1 = __importDefault(require("express-basic-auth"));
const http_1 = __importDefault(require("http"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const socket_io_1 = require("socket.io");
const app = express_1.default();
const server = http_1.default.createServer(app);
const users = {};
// TODO: Make this come from a database
const auth = express_basic_auth_1.default({
    authorizer: (username, password) => {
        const userMatches = express_basic_auth_1.default.safeCompare(username, 'admin');
        const passwordMatches = express_basic_auth_1.default.safeCompare(password, 'password');
        return userMatches && passwordMatches;
    }
});
// Basic Unauthenticated Routes
app.get('/', (req, res) => {
    res.send(`<h1>Server Listening on Port:${process.env.PORT}</h1>`);
});
app.get('/test', (req, res) => {
    res.sendFile(__dirname + '/test.html');
});
// Authenticated Routes
app.post('/token', auth, (req, res) => {
    const token = jsonwebtoken_1.default.sign(req.auth.user, process.env.TOKEN_SECRET, { expiresIn: process.env.TOKEN_TIMEOUT });
    res.json(token);
});
const io = new socket_io_1.Server(server);
// Socket Handlers - TODO: Add in JWT auth to socket connections
io.on('connection', (socket) => {
    console.log(`Socket: ${socket.id} has connected`);
    socket.on('identify', (name) => {
        console.log(`Socket: ${socket.id} has identified them self as ${name}`);
        users[socket.id] = name;
    });
    // Disconnect handler
    socket.on('disconnect', () => {
        console.log(`Socket: ${socket.id} identifying as ${users[socket.id]} has disconnected`);
    });
    // Message handler
    socket.on('message', (message) => {
        console.log(`${users[socket.id]}: ${message}`);
        // We are resending the message to all connected clients so we can use the echo to the original sender
        // as a send receipt.
        io.emit('message', message);
    });
});
// Start the server
server.listen(process.env.PORT, () => {
    console.log(`listening on *:${process.env.PORT}`);
});
/// https://dockerize.io/guides/node-socket-giude
/// https://socket.io/docs/v3/emit-cheatsheet/index.html
//# sourceMappingURL=server.js.map