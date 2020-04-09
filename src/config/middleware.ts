import {
    Application, Request, Response, NextFunction,
} from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as cors from 'cors';
import * as helmet from 'helmet';

export class Middleware {
    private app: Application;

    constructor(app: Application) {
        this.app = app;
    }

    public init(): void {
        this.app.use(
            bodyParser.urlencoded({
                extended: true,
            }),
        );
        this.app.use(bodyParser.json());
        // parse Cookie header and populate req.cookies with an object keyed by the cookie names.
        this.app.use(cookieParser());
        // returns the compression middleware
        this.app.use(compression());
        // helps you secure your Express apps by setting various HTTP headers
        this.app.use(helmet());
        // providing a Connect/Express middleware that
        // can be used to enable CORS with various options
        this.app.use(cors());
        // cors
        this.app.use((req: Request, res: Response, next: NextFunction): void => {
            res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS ');
            res.header('Access-Control-Allow-Credentials', '*');
            res.header(
                'Access-Control-Allow-Headers',
                'Origin, X-Requested-With,'
                + ' Content-Type, Accept,'
                + ' Authorization,'
                + ' Access-Control-Allow-Credentials',
            );
            next();
        });
    }
}
