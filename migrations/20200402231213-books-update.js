const jsonFile = require('jsonfile');
const date = new Date();

module.exports = {
    async up(db) {
        try {
            const dbClient = db.collection('booksModel');

            await dbClient.find()
                          .forEach(async(obj) => {
                              const { _id, title } = obj;

                              await dbClient.updateOne({ _id }, { $set: { 
                                  updatedAt: date,
                                  titleLength: title.length,
                              } });
                          });
        } catch(error) {
            throw error;
        }

        try {
            const dateArr = date.toString()
                                .split(' ');
            const file = `dbDump_booksModel_${dateArr[1]}-${dateArr[2]}-${dateArr[3]}.json`; // dateArr[1] - month, dateArr[2] - day, dateArr[2] - year

            const data = await db.collection('booksModel')
                                  .find()
                                  .toArray();

            jsonFile.writeFileSync(file, data); // write all data from db to json file
        } catch(error) {
            throw error;
        }
    },

    async down(db) {
        try {
            const dbClient = db.collection('booksModel');
            const data = jsonFile.readFileSync('dbDump_booksModel_Apr-02-2020.json');

            await dbClient.drop();

            await data.forEach(async(obj) => {
                await dbClient.insertOne(obj);
            }); // pull collection to previous state
        } catch(error) {
            throw error;
        }
    }
};
