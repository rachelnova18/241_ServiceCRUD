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
app.post('/biodata', (req, res) => {
    const { nama, nim, kelas } = req.body;
    pool.query(
        'INSERT INTO biodata (nama, nim, kelas) VALUES ($1, $2, $3) RETURNING *',
        [nama, nim, kelas]
    )
        .then(result => {
            res.status(201).json({ ... });
        })
        .catch(err => { ... });
});

app.put('/biodata/:id', (req, res) => {
    const { id } = req.params;
    const { nama, nim, kelas } = req.body;
    pool.query(
        'UPDATE biodata SET nama = $1, nim = $2, kelas = $3 WHERE id = $4 RETURNING *',
        [nama, nim, kelas, id]
    )
    ...