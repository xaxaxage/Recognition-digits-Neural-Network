const dotenv = require("dotenv")
const { Client } = require("pg")
dotenv.config()
const NeuralNetwork = require("./AI-contructor");

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'NNdataset',
  password: 'lol',
}) 

// async function conn() {
//   await client.connect(); 
//   console.log('here')
// }

// conn()

const select = async (req) => {
  try {
    await client.connect()
    const res = await client.query(req)
    await client.end()
    return res
  } catch (error) {
      console.log(error)
  } 
}

const dataset = []
const target = []

select("SELECT input, output FROM dataset")
  .then(res => {
    const body = res
    for (let i = 0; i < body.rows.length; i++) {
      dataset.push([...JSON.parse(body.rows[i].input.replace('{', '[').replace('}', ']').replaceAll('"', ''))]) 
      target.push(Number(body.rows[i].output))
      // console.log(dataset)
    }

    start()

    // console.log( Number(body.rows[0].output), typeof Number(body.rows[0].output))
  
    // for (let i of [...JSON.parse(body.rows[0].input.replace('{', '[').replace('}', ']').replaceAll('"', '')), Number(body.rows[0].output)]) {
    //   console.log(i, typeof i)
    // }
  })
  
function start() {
  const nn = new NeuralNetwork(625, 20, 10);
    
  for (let i = 0; i < 100000; i++) {
    for (let j = 0; j < dataset.length; j++) {
      const singleTarget = Array(10).fill(0)
      singleTarget[target[j]] = 1
      nn.train(dataset[j], singleTarget, 0.1);
    }
  }

  console.log(nn.feedforward([0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0])); // Output should be close to 0
  console.log('--------------------------------------------------------------------------------')
  console.log(JSON.stringify(nn.weightsIH))
  console.log('--------------------------------------------------------------------------------')
  console.log(JSON.stringify(nn.weightsHO)) 
  console.log('--------------------------------------------------------------------------------')
  console.log(JSON.stringify(nn.biasH))
  console.log('--------------------------------------------------------------------------------')
  console.log(JSON.stringify(nn.biasO))
}