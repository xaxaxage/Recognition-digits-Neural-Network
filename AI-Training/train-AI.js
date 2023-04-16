const dotenv = require("dotenv")
const { Client } = require("pg")
dotenv.config()
const Neural_Network = require("./AI-constructor");

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
    }

    start()

    // console.log( Number(body.rows[0].output), typeof Number(body.rows[0].output))
  
    // for (let i of [...JSON.parse(body.rows[0].input.replace('{', '[').replace('}', ']').replaceAll('"', '')), Number(body.rows[0].output)]) {
    //   console.log(i, typeof i)
    // }
  })
  
function start() {

  const nn = new Neural_Network(625, 2, 10, [20, 20]);
    
  const finalTargets = []
  for (let i = 0; i < target.length; i++) {
    const singleTarget = Array(10).fill(0)
    singleTarget[target[i]] = 1
    finalTargets.push(singleTarget)
  }

  const nnAccuracy = nn.train(dataset, finalTargets, 100000)

  console.log(nnAccuracy)

  console.log(nn.predict(JSON.parse('["0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","1","0","0","0","0","0","0","0","0","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","0","0","0","0","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","1","1","1","1","1","1","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0","0"]'.replaceAll('"', '')))); // 2
  console.log('--------------------------------------------------------------------------------')
  console.log(JSON.stringify(nn.weights.input_layer))
  console.log('--------------------------------------------------------------------------------')
  console.log(JSON.stringify(nn.weights.hidden_layers.layer0)) 
  console.log('--------------------------------------------------------------------------------')
  console.log(JSON.stringify(nn.weights.hidden_layers.layer1)) 
  console.log('--------------------------------------------------------------------------------')
  console.log(JSON.stringify(nn.weights.hidden_layers.layer2)) 
  console.log('--------------------------------------------------------------------------------')
  console.log(JSON.stringify(nn.weights.biases.bias0))
  console.log('--------------------------------------------------------------------------------')
  console.log(JSON.stringify(nn.weights.biases.bias1))
  console.log('--------------------------------------------------------------------------------')
  console.log(JSON.stringify(nn.weights.biases.bias2))
  console.log('--------------------------------------------------------------------------------')
  console.log(JSON.stringify(nn.weights.biases.bias_last))
}