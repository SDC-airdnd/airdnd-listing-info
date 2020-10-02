const { Database } = require('arangojs');
require('dotenv').config();

// create handle
const db = new Database({
    url: `http://${process.env.DB_IP}:8529`,
    database: "listingInfo",
    auth: { username: "root", password: `${process.env.DB_PW}`}
});

module.exports = db;
