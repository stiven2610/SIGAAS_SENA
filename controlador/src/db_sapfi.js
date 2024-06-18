const { Pool } = require('pg');
const { db_sapfpi } = require('./config.js');

const pool_sapfpi = new Pool({
    user: db_sapfpi.user,
    password: db_sapfpi.password,
    host: db_sapfpi.host,
    port: db_sapfpi.port,
    database: db_sapfpi.database,
});

module.exports = pool_sapfpi;
