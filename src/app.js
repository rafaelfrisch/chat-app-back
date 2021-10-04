import cors from 'cors';
import logger from 'morgan';
import express from 'express';
import compression from 'compression';
import { logErrors, clientError, serverError } from './errorHandlers';
import './connect';
const routers = require('./routes/index')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors('*'));
app.use(compression());
app.use(routers)

app.use(logErrors);
app.use(clientError);
app.use(serverError);

export default app;
