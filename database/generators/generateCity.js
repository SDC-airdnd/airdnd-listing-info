const faker = require('faker');
const fs = require('fs');

const cities = [];

for (let i = 0; i < 1000; i++) {
    cities.push(`"${faker.address.city()}"`);
};

fs.writeFile('./mockCity.js', cities, (error) => {
    if (error) throw error;

    console.log('Cities generated and saved!');
});
