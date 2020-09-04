const { Database } = require('arangojs');

// create handle
const db = new Database();

module.exports = db;
