const generateListing = require('../mockDataCsv.js');
const fs = require('fs');
const jsonexport = require('jsonexport');

const writeStream = fs.createWriteStream('../mockData.csv');

writeStream.on("open", () => {
    console.log("Stream opened");
});
writeStream.on("ready", () => {
    console.log("Stream ready");
});
writeStream.on("pipe", src => {
    console.log("Pipe on");
});
writeStream.on("unpipe", src => {
    console.log("Pipe off");
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
            listing = [listing];

            jsonexport(listing, (error, csv) => {
                if (error) return console.error(error);

                if (i === 0) {
                    writer.write(csv, encoding, callback);
                } else {
                    flow = writer.write(csv, encoding);
                }
            })

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