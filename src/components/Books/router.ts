import { Router } from 'express';
import BooksComponent from '../Books';

class BooksRouter {
    /**
    * Express router to mount books related functions on.
    * @type {Express.Router}
    */
    public router: Router;

    constructor() {
        this.router = Router();
    }

    /* eslint-disable @typescript-eslint/unbound-method */
    public init(): Router {
        /**
        * Route serving list of books.
        * @name /v1/books
        * @function
        * @inner
        * @param {string} path - Express path
        * @param {callback} middleware - Express middleware.
        */
        this.router.get('/', BooksComponent.chart);

        return this.router;
    }
}

export default new BooksRouter().init();
