const { Pool } = require('pg');

const pool = new Pool({
    user: 'daniel',
    host: 'localhost',
    database: 'test',
    port: 5432,
});

pool.on('error', (err, client) => {
    console.error('Error:', err);
});

const tableQuery = `
    DROP TABLE IF EXISTS listinginfo CASCADE;

    CREATE TABLE listinginfo (
        cityId INT,
        title TEXT,
        hostImageId INT,
        roomInfo TEXT,
        numberOfGuests INT,
        numberOfBedrooms INT,
        numberOfBeds INT,
        numberOfBaths INT,
        isSuperhost BOOLEAN,
        isGreatLocation BOOLEAN,
        isSparklingClean BOOLEAN,
        isGreatCheckIn BOOLEAN,
        isSelfCheckIn BOOLEAN,
        description TEXT,
        "amenities.basic.hasWiFi" BOOLEAN,
        "amenities.basic.hasEssentials" BOOLEAN,
        "amenities.basic.hasCable" BOOLEAN,
        "amenities.basic.hasLaptopSpace" BOOLEAN,
        "amenities.basic.hasHeating" BOOLEAN,
        "amenities.dining.hasKitchen" BOOLEAN,
        "amenities.bedAndBath.hasPillowsBlankets" BOOLEAN,
        "sleepingArrangements.bedroom" INT,
        id INT
    )
`;

pool.connect()
    .then((client) => {
        client.query(tableQuery)
        console.log('Listing table created!')
        client.release()
    })
    .catch((error) => {
        console.error(error);
        client.release();
    })
