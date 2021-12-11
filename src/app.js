import cors from 'cors';
import logger from 'morgan';
import express from 'express';
import compression from 'compression';
import { logErrors, clientError, serverError } from './errorHandlers';
import './connect';
import * as routers from './routes'
import socketController from './controllers/socket'

const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT
// express
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors('*'));
app.use(compression());
app.use(routers.userRouter)
app.use(routers.conversationRouter)
app.use(routers.oAuthRouter)

// errors
app.use(logErrors);
app.use(clientError);
app.use(serverError);

// socket
const server = http.createServer(app)
const io = socketIo(server, {
    cors: {
      origin: '*',
    }
});

io.on("connection", (socket) => {
    socket.on("getmessages", socketController);
});

server.listen(port, () => console.log(`Listening on port ${port}`));

export default app;
