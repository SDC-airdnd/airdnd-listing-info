const { Pool } = require('pg');
const urls = require('../mockUrl.js');

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
    DROP TABLE IF EXISTS imageUrl CASCADE;

    CREATE TABLE imageUrl (
        id SERIAL PRIMARY KEY,
        url TEXT
    );
`;

const insertQuery = `INSERT INTO imageUrl (url) VALUES ($1) RETURNING *;`;

const insertUrls = () => {
    for (let i = 0; i < 1000; i++) {
        let name = [urls[i]];
    
        pool.connect()
            .then((client) => {
                client.query(insertQuery, name)
                    .then((res) => {
                        //console.log("Record inserted!");
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
        console.log('ImageUrl table created!')
        client.release()
        insertUrls();
    })
    .catch((error) => {
        console.error(error);
        client.release();
    })

