let mysql = require('mysql');
let connection = mysql.createConnection({
    host     : 'us-cdbr-east-03.cleardb.com',
    user     : 'b0996ca10f8a1b',
    password : 'cad2f681',
    database : 'heroku_4abe3e99a6786b2'
});

connection.connect((error) => {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Connected...');
    }
});

module.exports = connection;
