const generateListing = require('./mockDataJson.js');
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../datasets/mockData.jsonl');

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
    let id = 0;

    const write = () => {
        let flow = true;

        do {
            i -= 1;
            id += 1;

            let listing = generateListing();
            listing.id = id;
            listing = JSON.stringify(listing) + '\n';

            if (i === 0) {
                writer.write(listing, encoding, callback);
            } else {
                flow = writer.write(listing, encoding);
            }
        } while (i > 0 && flow);

        if (i > 0) {
            writer.once('drain', write);
        }
    };

    write();
}

repeatTenMil(writeStream, 'utf-8', () => {
    writeStream.end();
})