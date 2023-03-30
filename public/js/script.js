const divs = document.querySelectorAll('.painter>div')
const clearButton = document.querySelector('#clear-button')

let isButtonPressed = false

document.body.addEventListener('mousedown', () => {
   isButtonPressed = true
})

document.body.addEventListener('mouseup', () => {
   isButtonPressed = false
})

for (let div of divs) {
   div.addEventListener('mouseenter', () => {
      if (isButtonPressed) {
         div.classList.add('active')
      }
   })
}

clearButton.onclick = () => {
   const input = []
   for (let div of divs) {
      input.push(div.className === 'active' ? 1 : 0)
      div.classList = []
   }
   console.log(input)
   navigator.clipboard.writeText(input.toString())
}