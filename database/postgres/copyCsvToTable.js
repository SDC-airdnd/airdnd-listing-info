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
    COPY listinginfo 
    FROM '/Users/daniel/Documents/HackReactor/ghrsea11-sdc/airdnd-listing-info/database/datasets/mockData.csv'
    DELIMITER ',' CSV HEADER;
`;

pool.connect()
    .then((client) => {
        client.query(tableQuery)
        console.log('Importing CSV to table!')
        client.release()
    })
    .catch((error) => {
        console.error(error);
        client.release();
    })