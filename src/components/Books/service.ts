import { Document } from 'mongoose';
import BooksModel from './model';

/* eslint-disable class-methods-use-this */
class BooksService {
    /**
    * @method getChartData
    * @param {any}
    * @returns {any}
    */
    public getChartData(): Promise< Document[] > {
        return BooksModel.find().exec();
    }
}

export default new BooksService();
