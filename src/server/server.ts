import * as express from 'express';
import { Middleware } from '../config/middleware';
import { AppRouter } from '../config/router';

class Server {
    private app: express.Application;

    constructor() {
        this.app = express();
    }

    public init(): express.Application {
        /**
        * @description express.Application Middleware
        */
        new Middleware(this.app).init();

        /**
        * @description express.Application Routes
        */
        new AppRouter(this.app).init();

        /**
        * @description sets port 3000 to default or unless otherwise specified in the environment
        */
        this.app.set('port', process.env.PORT || 3000);

        return this.app;
    }
}

export default new Server().init();
