const generateListing = require('../mockData.js');
const jsonexport = require('jsonexport');
const fs = require('fs');

// for (let i = 0; i < 5; i++) {
//     let listing = generateListing();
//     listing.id = i;
//     listing = [listing];

//     jsonexport(listing, (error, csv) => {
//         if (error) return console.error(error);
    
//         fs.appendFile('./test.csv', csv, (error) => {
//             if (error) throw error;
//         });
//     });
// }

let listing = generateListing();
listing.id = 1;
listing = [listing];

jsonexport(listing, (error, csv) => {
    if (error) return console.error(error);

    const split = csv.split('\n');

    const data = "\n" + split[1];

    fs.appendFile('./test.csv', data, 'utf8', (error) => {
        if (error) throw error;
    });
});

