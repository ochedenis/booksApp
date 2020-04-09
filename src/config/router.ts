import * as express from 'express';
import * as http from 'http';
import BooksRouter from '../components/Books/router';

export class AppRouter {
    private app: express.Application;

    private router: express.Router;

    constructor(app: express.Application) {
        this.app = app;
        this.router = express.Router();
    }

    public init(): void {
        /**
         * Forwards any requests to the /v1/books URI to BooksRouter.
         * @name /v1/books
         * @function
         * @inner
         * @param {string} path - Express path
         * @param {callback} middleware - Express middleware.
         */
        this.app.use('/v1/books', BooksRouter);

        /**
         * @description No results returned mean the object is not found
         * @function
         * @inner
         * @param {callback} middleware - Express middleware.
         */
        this.app.use((req: express.Request, res: express.Response): void => {
            res.status(404).send(http.STATUS_CODES[404]);
        });

        /**
         * @function
         * @inner
         * @param {express.Router}
         */
        this.app.use(this.router);
    }
}
