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
        const [results] = await pool.execute(`SELECT * FROM servers INNER JOIN hosting on servers.hostingId = hosting.hostingId;`);
        if (results.length) {
            res.send(results)
        } else {
            res
                .status(404)
                .send('could notf ind servers in the database')
        }
    } catch (e) {
        res
            .status(500)
            .send('something has gone wrong!')
    }
});

router.put('/:id',
    async (req, res) => {
        const {status} = req.body;
        const {id} = req.params;
        try {
            const [results] = await pool.execute(`UPDATE servers SET status = '${status}' WHERE id = ?`, [id]);
            res.send(`server ${req.params.id} turned off`);
        } catch (error) {
            res
                .send(`server ${req.params.id} not found`)
        }
    });

router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const [results] = await pool.execute(`DELETE FROM servers WHERE id = ?`, [id]);
        res.send(`server ${id} has been deleted`);
    } catch (error) {
        res
            .status(404)
            .send(`server ${id} doesn't exist`);
    }
});

router.post('/', async (req, res) => {
    const {alias, ip, status, hostingId} = req.body;
    if (!alias) {
        res
            .status(400)
            .send('expected alias in request');
    }
    const [results] = await pool.execute(`INSERT INTO servers (alias,ip,status,hostingId) VALUES ('${alias}','${ip}','${status}','${hostingId}')`);
    if (results.insertId) {
        res.send({id: results.insertId});
    } else {
        res
            .status(500)
            .send('something went wrong');
    }

});


module.exports = router;