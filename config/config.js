/**
 * if you get this error: 
 *      Client does not support authentication protocol requested by server; 
 *      consider upgrading MySQL client node
 * 
 * you have to run the following query to set a native password for root account:
 * ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password';
 * flush privileges;
 */

const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'MySQL2023$',
    database: 'delivery'
});

db.connect(function(err){
    if (err) throw err;

    console.log('DATABASE CONNETED!');
});

module.exports = db;