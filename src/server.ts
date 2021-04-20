import http from 'http';
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import helmet from 'helmet';
import logger from 'morgan';

import { onListening, onError } from './utils/server.utils';
import { errorHandler } from './middlewares/error.middleware';
import BaseRouter from './routes';

dotenv.config();
const app = express();

app.use(logger('tiny'));
app.use(
	cors({
		origin: true,
	})
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());

app.use('/api', BaseRouter);

app.use(errorHandler);

const port = Number(process.env.PORT || 4000);
app.set('port', port);

const server = http.createServer(app);

server.listen(port);
server.on('error', (err) => onError(err, port));
server.on('listening', (): void => onListening(port));
