var mysql = require('mysql');

function createDBConnection() {
    return mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'payfast',
        port: 3306
    });
}

module.exports = function () {
    return createDBConnection;
}

//     con.connect(function (err) {
//         if (err) throw err;
//         console.log("----[LOG] Conectado ao banco...");
//     });

// return con;
// }

    

 