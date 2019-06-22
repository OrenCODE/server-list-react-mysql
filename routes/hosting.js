var express = require('express');
var router = express.Router();
const mysql = require('mysql2/promise');

let pool;
(async function initializePool() {
    pool = await mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'test3',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
    });
})();

router.get('/', async (req, res) => {
    try {
        const [results] = await pool.execute(`SELECT * FROM hosting`);
        if (results.length) {
            res.send(results)
        } else {
            res
                .status(404)
                .send('there are no movies in the database')
        }
    } catch (e) {
        res
            .status(500)
            .send('something has gone wrong!')
    }
});



module.exports = router;