const {createPool} = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "mamun",
    password: "add",
    database: "node_db_auth",
    connectionLimit: 10
});


module.exports = pool;