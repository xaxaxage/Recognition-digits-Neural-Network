const inputs = []
const numbers = []

const buttons = document.getElementsByClassName('digit')
// const divs = document.querySelectorAll('.painter>div')

const pressingNumberButton = async () => {
  for (let button of buttons) {
    button.addEventListener('click', () => {
      const input = []
  
      for (let div of divs) {
        input.push(div.className === 'active' ? 1 : 0)
        div.classList = []
      }

      inputs.push(input)
      numbers.push(button.getAttribute('data'))

      sendData(input, button.getAttribute('data'))
        .then(res => console.log(res))
    })
  } 
}

const sendData = async (input, number) => {
  try {
    await fetch("/dataset", {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({input: input, number: number})
    })
  } catch(err) {
    console.log(err.message)
  }
}

pressingNumberButton()