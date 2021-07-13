import express from 'express';
import basicAuth from 'express-basic-auth';
import http from 'http';
import jwt from 'jsonwebtoken';
import socketioJwt from 'socketio-jwt'
import { Server } from "socket.io";
import UserService from './services/user-service';
import cors from 'cors';

const app = express();
const server = http.createServer(app);

const userService = new UserService();

app.use(cors());

// Basic Unauthenticated Routes
app.get('/', (req, res) => {
  res.send(`<h1>Server Listening on Port:${process.env.PORT}</h1>`);
});

app.get('/test', (req, res) => {
  res.sendFile(__dirname + '/test.html');
});

// Authenticated Routes
app.post('/token', basicAuth({ authorizer: userService.VerifyUser }), (req: any, res: any) => {
  const token = jwt.sign(req.auth.user, process.env.TOKEN_SECRET);
  res.json(token);
});

const io = new Server(server,{
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  }
});

// JWT Token auth
io.use(socketioJwt.authorize({
  secret: process.env.TOKEN_SECRET,
  handshake: true,
  auth_header_required: true
}));

// Since the entire token body is just the username we can use is as is.
io.on('connection', (socket: any) => {
  const user = socket.decoded_token;
  console.log(user, 'has connected');

  // Disconnection handler
  socket.on('disconnect', () => {
    console.log(user, 'has disconnected');
  });

  // Message handler
  socket.on('message', (message: string) => {
    console.log(`${user}: ${message}`);

    // We are resending the message to all connected clients so we can use the echo to the original sender as a send receipt.
    io.emit('message', message);
  });
});

// Start the server
server.listen(process.env.PORT, () => {
  console.log(`listening on *:${process.env.PORT}`);
});

/// https://dockerize.io/guides/node-socket-giude
/// https://socket.io/docs/v3/emit-cheatsheet/index.html