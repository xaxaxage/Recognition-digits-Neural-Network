const divs = document.querySelectorAll('.painter>div')
const clearButton = document.querySelector('#clear-button')
const painter = document.getElementsByClassName('painter')[0]

let isButtonPressed = false

document.body.onmousedown = (e) => {
   isButtonPressed = true
   e.preventDefault()
}

document.body.onmouseup = (e) => {
   isButtonPressed = false
   e.preventDefault()
}

painter.addEventListener('touchmove', (e) => {
   let xPos = e.touches[0].clientX
   let yPos = e.touches[0].clientY
   const elem = document.elementFromPoint(xPos, yPos)
   
   elem.classList.add(elem.parentElement.className === 'painter' ? 'active' : '')
})

for (let div of divs) {
   div.onmouseenter = () => {
      if (isButtonPressed) {
         div.classList.add('active')
      }
   }
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

document.body.addEventListener('touchstart', function(e){ e.preventDefault();});