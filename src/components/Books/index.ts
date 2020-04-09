import { Request, Response, NextFunction } from 'express';
import BooksService from './service';

/* eslint-disable class-methods-use-this */
class BooksMiddleware {
    /**
    * @function
    * @param {express.Request} req
    * @param {express.Response} res
    * @param {express.NextFunction} next
    * @returns {Promise < void >}
    */
    public async chart(req: Request, res: Response, next: NextFunction):
    Promise < Response | void > {
        try {
            return res.status(200).json({
                data: await BooksService.getChartData(),
            });
        } catch (error) {
            res.status(500).json({
                message: error.name,
                details: error.message,
            });

            return next(error);
        }
    }
}

export default new BooksMiddleware();
