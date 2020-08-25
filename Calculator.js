const displayHistory = document.getElementById('display-history')
const display = document.getElementById('display')
const numericButtons = document.getElementsByClassName('numeric-button')
const operators = document.getElementsByClassName('operator')
const squareButtons = document.getElementsByClassName('square-button')
const cButtons = document.getElementsByClassName('c-button')
const mButtons = document.getElementsByClassName('m-button')
const percentButton = document.getElementById('%')
const plusMinusButton = document.getElementById('+/-')
const dotButton = document.getElementById('.')
const modal = document.getElementById('modal')
const modalBox = document.getElementById('modal-box')
const modalBoxSlots = document.getElementsByClassName('modal__box')
const buttonOpenModal = document.getElementById('m▼')

var operatorIsFirstTime = true 
var isOperatorWasLastEvent
var isEqualWasLastEvent
var operatorString = '' 
var operatorCalculation
var operatorResult
var previousOperator
var secondPreviousOperator
var sqaureIsFirstTime = true
var squareNumber 
var percentIsFirtTime = true
var percentId
var percentNumber
var isMButtonPressed
var isMButtonsDisabled = []
var memoryBox = []
display.innerHTML = 0

function oneDivideBy(num){
    return 1/num
}
function squarePower(num){
    return num*num
}
function sqaureRoot(num){
   return Math.sqrt(num)
}
function percentage(num1, num2, id){
    if (id === '+' || id === '-'){
        num2 = num2/100
        return num1 * num2
    }else{
        return num2/100
    }
}
function addMemoryToMenu (memory){
    var node = document.createElement('h3')
    node.id = 'memorySlot'
    var textnode = document.createTextNode(memory)     
    node.appendChild(textnode)
    modalBox.prepend(node)
}
function editMemoryMenu (memory){
    var node = document.getElementById('memorySlot')
    node.childNodes[0].nodeValue = memory  
}
function clearMemoryMenu(){
    var node = modalBox.childNodes[0]
    modalBox.removeChild(node)
}
function changeFontSize(){
    var length = display.innerHTML.length
    if (length < 10){
        length = 10
    }else if (length > 21) {
        length = 21
    }
    switch(length){
        case 10: display.style = 'font-size: 3rem'; break
        case 11: display.style = 'font-size: 2.7rem ; padding-top: 7px'; break
        case 13: display.style = 'font-size: 2.5rem ; padding-top: 10px'; break
        case 14: display.style = 'font-size: 2.4rem ; padding-top: 12px'; break
        case 15: display.style = 'font-size: 2.2rem ; padding-top: 15px'; break
        case 16: display.style = 'font-size: 2.1rem ; padding-top: 17px'; break
        case 17: display.style = 'font-size: 2rem ; padding-top: 20px'; break
        case 18: display.style = 'font-size: 1.9rem ; padding-top: 23px'; break
        case 19: display.style = 'font-size: 1.8rem ; padding-top: 26px'; break
        case 20: display.style = 'font-size: 1.6rem ; padding-top: 28px'; break
        case 21: display.style = 'font-size: 1.5rem ; padding-top: 30px'; break
    }
} 
function disableButtons(){
    for (let operator of operators){
        if (operator.id !== '='){
           operator.disabled = operator.disabled ? false : true
        }
    }
    for (let square of squareButtons){
        square.disabled = square.disabled ? false : true
    }
    if (!(mButtons[0].disabled === true && mButtons[1].disabled === true && mButtons[2].disabled === true && mButtons[3].disabled === true && mButtons[4].disabled === true)){
        for (let i = 0; i<=4; i++){
            isMButtonsDisabled[i] = mButtons[i].disabled
        }   
    }
    if (mButtons[0].disabled === true && mButtons[1].disabled === true && mButtons[2].disabled === true && mButtons[3].disabled === true && mButtons[4].disabled === true){
        for (let i = 0; i<=4; i++){
            mButtons[i].disabled = isMButtonsDisabled[i]
        }   
    } else {
        for (let i = 0; i<=4; i++){
            mButtons[i].disabled = true  
        }
    } 
    dotButton.disabled = dotButton.disabled ? false : true
    percentButton.disabled = percentButton.disabled ? false : true
    plusMinusButton.disabled = plusMinusButton.disabled ? false : true
}
function addCommas(number){
    if (String(number).includes('.')){
        return number
    }
    var n = parseFloat(number)
    var value = n.toLocaleString('en')
    return value
}
function removeCommas(number){
    if (String(number).includes('.')){
        return number
    }
    return Number(number.replace(/,/g,''))
}
function scrollWin() {
    displayHistory.scrollBy(10000, 0);
}

for (let number of numericButtons){
    number.addEventListener('click',()=>{
        if (display.innerHTML.length <= 20){
            changeFontSize()
            if (isMButtonPressed){
                display.innerHTML = ''
                isMButtonPressed = false
            }
            if (display.innerHTML.includes('Cannot')){
                display.innerHTML = ""
                disableButtons()
            }
            if (isOperatorWasLastEvent){
                display.innerHTML = ""
            }
            if (displayHistory.innerHTML.includes('=')){
                displayHistory.innerHTML = ""
            }
            if (display.innerHTML === '0'){
                display.innerHTML = number.id
            }else{
                display.innerHTML += number.id
                display.innerHTML = addCommas(removeCommas(display.innerHTML))
                display.innerHTML === '10,000,000,000,000,000' ? display.innerHTML = '9,999,999,999,999,999' : display.innerHTML = display.innerHTML
            }
        }
        isOperatorWasLastEvent = false
    })
}

for (let cButton of cButtons){
    cButton.addEventListener('click',()=>{
        if (display.innerHTML.includes('Cannot')){
            display.innerHTML = "0"
            disableButtons()
        }
        switch (cButton.id){
            case '<<': display.innerHTML = display.innerHTML.length !== 1 ? removeCommas(display.innerHTML.slice(0,-1)) : '0'
                       display.innerHTML = addCommas(display.innerHTML);
                break
            case 'c': displayHistory.innerHTML = ""
            case 'ce': display.innerHTML = '0' ; operatorString = ""; operatorResult = undefined; operatorCalculation = undefined; operatorIsFirstTime = true ; sqaureIsFirstTime = true ; percentIsFirtTime = true;
                break
        }
        isOperatorWasLastEvent = false
        changeFontSize()
    })
}

dotButton.addEventListener('click',()=>{
    if (display.innerHTML.indexOf('.') === -1){
        display.innerHTML += '.'
    }
})

plusMinusButton.addEventListener('click',()=>{
    display.innerHTML = addCommas((-parseFloat(removeCommas(display.innerHTML))))
})

for (let operator of operators){
    operator.addEventListener('click', ()=>{
        if (display.innerHTML.includes('Cannot')){
                display.innerHTML = "0"
                disableButtons()
        }
        if (isOperatorWasLastEvent && !isEqualWasLastEvent){
            operatorString = operatorString.slice (0,-1) + operator.id
            displayHistory.innerHTML = operatorString
            previousOperator === '=' ? previousOperator = previousOperator : secondPreviousOperator = previousOperator
            previousOperator = operator.id
        } else {
            if (operatorIsFirstTime){
                operatorResult = removeCommas(display.innerHTML)
                previousOperator = operator.id
                operatorIsFirstTime = false
            } else {
                operatorCalculation = Number(removeCommas(display.innerHTML))
                operatorResult = eval(operatorResult+previousOperator+operatorCalculation)
                previousOperator === '=' ? previousOperator = previousOperator : secondPreviousOperator = previousOperator
                previousOperator = operator.id    
            }
            operatorString += removeCommas(display.innerHTML) + operator.id              
            display.innerHTML = addCommas(operatorResult)
            displayHistory.innerHTML = operatorString
        }
        if (operatorString.includes ('=')){
            if (isEqualWasLastEvent){
                operatorString = operatorResult + secondPreviousOperator + operatorCalculation + operator.id
                displayHistory.innerHTML = operatorString
                operatorResult = eval(operatorResult + secondPreviousOperator + operatorCalculation)
                display.innerHTML = operatorResult
            } else {
                operatorResult = 0
                operatorString = ''
            }
            operatorIsFirstTime = true
            isEqualWasLastEvent = true
        } else {

            isEqualWasLastEvent = false
        }
        operator.id === '=' ? isEqualWasLastEvent = true : isEqualWasLastEvent = false
        isOperatorWasLastEvent = true
        changeFontSize()
        scrollWin()
    })
}

for (let square of squareButtons){
    square.addEventListener('click',()=>{
        if(sqaureIsFirstTime){
            squareNumber = removeCommas(display.innerHTML)
            sqaureIsFirstTime = false
        }else{
            squareNumber = displayHistory.innerHTML
        }
        switch (square.id){
            case 'x²':
                if (display.innerHTML.includes('∞')){
                    display.innerHTML = '0'
                    displayHistory.innerHTML = ''
                } else{
                    displayHistory.innerHTML = `sqr(${squareNumber})`
                    display.innerHTML = addCommas(squarePower(removeCommas(display.innerHTML)))
                }
                break
            case '²√x':
                displayHistory.innerHTML = `²√(${squareNumber})`
                display.innerHTML = Math.sqrt(removeCommas(display.innerHTML))
                break
            case '1/x':
                 if (display.innerHTML === '0'){
                    display.style = 'font-size: 1.8rem ; padding-top: 26px'
                    display.innerHTML = 'Cannot divide by zero'
                    disableButtons()
                }else{
                    displayHistory.innerHTML = `1/(${squareNumber})` 
                    display.innerHTML = addCommas(oneDivideBy(removeCommas(display.innerHTML))) 
                }
                break       
        }
        scrollWin()
        changeFontSize()
    })
}

percentButton.addEventListener('click',()=>{
    if (displayHistory.innerHTML !== ""){
        if (percentIsFirtTime){
            percentId = displayHistory.innerHTML.slice(displayHistory.innerHTML.length-1)
            percentNumber = parseFloat(displayHistory.innerHTML.slice(0,-1))
            percentIsFirtTime = false
        }
        let percentNumber2 = display.innerHTML
        if (!percentIsFirtTime && (!displayHistory.innerHTML.includes('+') || !displayHistory.innerHTML.includes('-'))){
            display.innerHTML = percentage (percentNumber, percentNumber2, percentId)
            displayHistory.innerHTML = percentNumber + percentId + display.innerHTML
        }
    }
})

for (let mButton of mButtons){
    mButton.addEventListener('click',()=>{
        switch (mButton.id){
            case 'ms': memoryBox.unshift(display.innerHTML); mButtons[0].disabled = false; mButtons[1].disabled = false; mButtons[5].disabled = false;
                        addMemoryToMenu(memoryBox[0]); isMButtonPressed = true; break
            case 'm+': if (memoryBox.length === 0){
                             addMemoryToMenu(memoryBox[0])
                        }
                        mButtons[0].disabled === true ? memoryBox.unshift(display.innerHTML) : memoryBox[0] = eval(Number(memoryBox[0]) + Number(display.innerHTML)); mButtons[0].disabled = false; mButtons[1].disabled = false; mButtons[5].disabled = false;
                        editMemoryMenu(memoryBox[0]); isMButtonPressed = true; break
            case 'm-':  if (memoryBox.length === 0){
                            addMemoryToMenu(memoryBox[0])
                        }
                        mButtons[0].disabled === true ? memoryBox.unshift(-display.innerHTML) : memoryBox[0] = eval(Number(memoryBox[0]) - Number(display.innerHTML)); mButtons[0].disabled = false; mButtons[1].disabled = false; mButtons[5].disabled = false;
                        editMemoryMenu(memoryBox[0]); isMButtonPressed = true; break
            case 'mr':  display.innerHTML = memoryBox[0]; break
            case 'mc':  mButtons[0].disabled = true; mButtons[1].disabled = true; mButtons[5].disabled = true;
                        for (let i = memoryBox.length ; i>=0 ; i--){
                        memoryBox.shift(); clearMemoryMenu()
                        }; break
            case 'm▼':  modal.className === 'none' ? modal.className = 'modal' : modal.className = 'none';
                        for (let i = 0 ; i<=4 ; i++){
                            mButtons[i].disabled = mButtons[i].disabled === true ? false : true
                        }; break
        }
    })
}