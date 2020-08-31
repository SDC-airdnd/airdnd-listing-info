const { Pool } = require('pg');
const cities = require('../mockCities.js');

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
    DROP TABLE IF EXISTS cities CASCADE;

    CREATE TABLE cities (
        id SERIAL PRIMARY KEY,
        name TEXT
    );
`;

const insertQuery = `INSERT INTO cities (name) VALUES ($1) RETURNING *;`;

const insertCities = () => {
    for (let i = 0; i < 1000; i++) {
        let name = [cities[i]];
    
        pool.connect()
            .then((client) => {
                client.query(insertQuery, name)
                    .then((res) => {
                        console.log("Record inserted!");
                        client.release();
                    })
                    .catch((error) => {
                        client.release();
                        console.error(error);
                    })
            })
            .catch((error) => {
                console.error(error);
            })
    }
}

pool.connect()
    .then((client) => {
        client.query(tableQuery)
        console.log('Cities table created!')
        client.release()
        insertCities();
    })
    .catch((error) => {
        console.error(error);
        client.release();
    })

