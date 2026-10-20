import express from 'express'
import pg from 'pg'

const app = express()
const port = 3000
const { Pool } = pg

app.use(express.json())
app.use(
    express.urlencoded({
        extended: true,
    })
)
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mahasiswa',
    password: 'Rachel18',
    port: 5432,
})
app.get('/biodata', (req, res) => {
    console.log("TEST DATA GET ALL :");
    pool.query('SELECT * FROM biodata ORDER BY id ASC')
        .then(result => {
            res.send(result.rows);
        })
        .catch(err => { ... });
});