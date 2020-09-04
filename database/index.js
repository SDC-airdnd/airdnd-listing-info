const { Database } = require('arangojs');

// create handle
const db = new Database();

// switch to _system db
db.useDatabase('_system');

module.exports = db;
