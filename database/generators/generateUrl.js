const faker = require('faker');
const fs = require('fs');

const urls = [];

for (let i = 1; i <= 1000; i++) {
    urls.push(`"https://sdc-airdnd.s3-us-west-2.amazonaws.com/host${i}.jpg"`);
};

fs.writeFile('./mockUrl.js', urls, (error) => {
    if (error) throw error;

    console.log('URLs generated and saved!');
});