const generateListing = require('./mockDataCsv.js');
const fs = require('fs');
const path = require('path');
const jsonexport = require('jsonexport');

const dataPath = path.join(__dirname, '../datasets/mockData.csv')

const writeStream = fs.createWriteStream(dataPath);

writeStream.on("open", () => {
    console.log("Stream opened");
});
writeStream.on("ready", () => {
    console.log("Stream ready");
});
writeStream.on("finish", () => {
    console.log("Stream finished");
});

const repeatTenMil = (writer, encoding, callback) => {
    let i = 10000000;
    let id = 1;

    const writeFirstRecord = () => { // needs to write first record to set up headers
        let listing = generateListing();
        listing.id = 1;
        listing = [listing];

        jsonexport(listing, (error, csv) => {
            if (error) return console.error(error);

            writer.write(csv, encoding);
        })
    }

    const write = () => { // write the rest of the records
        let flow = true;

        do {
            i -= 1;
            id += 1;

            let listing = generateListing();
            listing.id = id;
            listing = [listing];

            jsonexport(listing, (error, csv) => {
                if (error) return console.error(error);

                // remove headers from each listing and pass on only data
                const split = csv.split('\n');
                const data = "\n" + split[1];

                if (i === 0) {
                    writer.write(data, encoding, callback);
                } else {
                    flow = writer.write(data, encoding);
                }
            })

        } while (i > 0 && flow);

        if (i > 0) {
            writer.once('drain', write);
        }
    };

    writeFirstRecord();
    write();
}

repeatTenMil(writeStream, 'utf-8', () => {
    writeStream.end();
})