/* Configure DB */
require("dotenv").config();
const mysql = require("mysql");

module.exports = {
    HOST:process.env.DB_HOST,
    USER:process.env.DB_USER,
    PASSWORD:process.env.DB_PASS,
    DATABASE:process.env.DB_NAME,
};

//creates an sql conneciton
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'spotify',
});


// /* Create connection to the database */
// const connection = mysql.createConnection({
//     host: dbConfig.HOST,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DATABASE,
//
// });


module.exports = connection;