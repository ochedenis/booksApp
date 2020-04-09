const convert = require('csvtojson');
const jsonFile = require('jsonfile');
const date = new Date();

async function addBooksToDb(dbClient) {
    try {
        const objArray = await convert().fromFile('./books.csv'); // convert csv rows to objects

        await objArray.forEach(async(obj) => {
            obj.createdAt = date;
            obj.updatedAt = date;

            await dbClient.insertOne(obj);
        });
    } catch(error) {
        throw error;
    }
}

async function dumpDbToJson(dbClient) {
    try {
            const dateArr = date.toString()
                                .split(' ');
            const file = `dbDump_booksModel_${dateArr[1]}-${dateArr[2]}-${dateArr[3]}.json`; // dateArr[1] - month, dateArr[2] - day, dateArr[2] - year

            const data = await dbClient
                                  .find()
                                  .toArray();

            jsonFile.writeFileSync(file, data); // write all data from db to json file
    } catch(error) {
        throw error;
    }
}

module.exports = {
    async up(db) {
        const dbClient = db.collection('booksModel');

        addBooksToDb(dbClient);
        dumpDbToJson(dbClient);
    },

    async down(db) {
        try {
            await db.collection('booksModel').drop(); // Removes 'booksModel' collection
        } catch(error) {
            throw error;
        }
    }
};
