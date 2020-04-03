const BooksModel = require('./model');

/**
 * @method getChartData
 * @param {any}
 * @returns {any}
 */
function getChartData() {
    return BooksModel.find().exec();
}

module.exports = {
    getChartData,
};
