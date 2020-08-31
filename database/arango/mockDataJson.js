const faker = require('faker');
const mockCities = require('./mockCities');
const mockUrls = require('./mockUrl');
//const db = require('./index.js');

let titleRandom = ['Perfectly located', 'Light & spacious garden flat', 'Private Modern Guesthouse', 'Ocean View Hideaway', 'Perfect Haven by Golden Gate', 'Private Backyard Cottage', 'Sunny Room Heart of', 'Luxury Gold Coast', 'Central Surfers Studio OceanView', 'Broken Head Bodhi Treehouse', 'Mountain tiny house', 'Blue Mountains Cottage', 'The Copa Cabana', 'The Tree House', 'Stroll Around Victoria Park', 'Entire Home with Opera House views', 'Luxury Apartment in the heart of', 'Stylish inner-city home', 'Little Paradise', 'Stunning River View' ]; 

let roomInfoRandom = ['Private room', 'Entire guesthouse', 'Entire guestsuite', 'Entire House'];

function booleanGenerator() {
    return Math.random() > 0.5;
}

function generateListing() {
    let titleRandomArray = titleRandom[Math.floor(Math.random()*titleRandom.length)];
    let roomInfoRandomArray = roomInfoRandom[Math.floor(Math.random()*roomInfoRandom.length)];

    function numberOfGuests() {
        if (roomInfoRandomArray === 'Private room') {
            return 2;
        } else {
            return 6;
        }
    }

    function numberOfBedrooms() {
        if (roomInfoRandomArray === 'Private room') {
            return 1;
        } else {
            return Math.floor(Math.random()*(5 - 2)) + 2; 
        }
    }

    function numberOfBeds() {
        if (roomInfoRandomArray === 'private room') {
            return 1;
        } else {
            return Math.floor(Math.random()*(5-2)) + 2;
        }
    }

    function numberOfBaths() {
        if (roomInfoRandomArray === 'private room') {
            return 1;
        } else {
            return Math.floor(Math.random()*(4-2)) + 2;
        }
    }

    var bedrooms = numberOfBedrooms();
    let city = mockCities[Math.floor(Math.random() * 1000)];
    let hostImage = mockUrls[Math.floor(Math.random() * 1000)];
    let listing = {
        city: city,
        title: `${titleRandomArray} ${city}`,
        hostImage: hostImage,
        roomInfo: roomInfoRandomArray,
        numberOfGuests: numberOfGuests(),
        numberOfBedrooms: bedrooms,
        numberOfBeds: numberOfBeds(),
        numberOfBaths: numberOfBaths(),
        isSuperhost: booleanGenerator(),
        isGreatLocation: booleanGenerator(),
        isSparklingClean: booleanGenerator(),
        isGreatCheckIn: booleanGenerator(),
        isSelfCheckIn: booleanGenerator(),
        description: faker.lorem.paragraph() + faker.lorem.paragraph(),
        amenities: {
            basic: {
                hasWiFi: true,
                hasEssentials: true,
                hasCable: true,
                hasLaptopSpace: true,
                hasHeating: true,
            },
            dining: {
                hasKitchen: true
            },
            bedAndBath: {
                hasPillowsBlankets: true
            },
        },
        sleepingArrangements: {
            bedroom: bedrooms
        }
    }

    return listing;
}

function generateListings() {
    let listings = [];
    for (let id=1; id <= 100; id++) {
        let listing = generateListing();
        listing.id = id;
        listings.push(listing);
    }
    return listings;
}

module.exports = generateListing;
