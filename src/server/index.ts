import * as http from 'http';
import { Application } from 'express';
import server from './server';
import { Events } from './events';

const app: Application = server;
const port: number | string | boolean = app.get('port');

new Events(http.createServer(app).listen(port), port).bind();
