const express = require("express")
const dotenv = require("dotenv")
const { Client } = require("pg")
dotenv.config()

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'NNdataset',
  password: 'lol',
}) 

async function conn() {
  await client.connect(); 
  console.log('here')
}

conn()

const app = express()

// app.use(express.json())

// app.use(express.urlencoded())

// app.set('view engine', 'ejs')

// app.use('/public', express.static('public'))

app.get('/paint', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
})

let count = 0

app.post('/dataset', async (req, res) => {
  console.log(req.body.input, req.body.number)

  count += 1
  console.log(count)

  try {    
    // await client.query(`TRUNCATE TABLE dataset`)
    await client.query(`INSERT INTO dataset (input, output) VALUES ($1, $2)`, [req.body.input, req.body.number]); // sends queries
    res.sendStatus(200)
    return true;
  } catch (error) {
    console.error(error.stack);
    return false;
  }

})

app.listen(3000, '192.168.1.152') 