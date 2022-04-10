const equation = [];
let isFirstOperand = false;
let isOperator = false;
let isSecondOperand = false;
let length;
let isAppend = false;

function getLength(arr) {
    return arr.length - 1;
}

const calculator = {

    add(x, y) { return x + y; },

    subtract(x, y) { return x - y; },

    multiply(x, y) { return x * y; },

    divide(x, y) {
        if (y === 0) {
            return "ERROR"
        }
        else return x / y;
    },
}

function operate(operator, x, y) {
    if (operator === '+')
        return calculator.add(x, y);
    else if (operator === '-')
        return calculator.subtract(x, y);
    else if (operator === 'x')
        return calculator.multiply(x, y);
    else if (operator === '÷')
        return calculator.divide(x, y);
}

const screen = document.querySelector(".display");
const nums = document.querySelectorAll("button.num");
nums.forEach(num => num.addEventListener('click', addtoScreen));

function addtoScreen(e) {

    if (isAppend) { screen.textContent += e.target.textContent; }
    else {
        screen.textContent='';
        screen.textContent += e.target.textContent;
        isAppend=true;
    }
}

const clear = document.getElementById("clear");
clear.addEventListener('click', () => screen.textContent = '');

const del = document.getElementById("delete");
del.addEventListener('click', () => screen.textContent = screen.textContent.slice(0, -1));

const operators = document.querySelectorAll('button.operator');
operators.forEach(operator => operator.addEventListener('click', calculate));

function calculate(e) {

    if (isFirstOperand && isOperator && !isSecondOperand) {
        equation.push(Number(screen.textContent));
        isSecondOperand = true;
    }

    if (!isFirstOperand && !isOperator && !isSecondOperand) {
        equation.push(Number(screen.textContent));
        isFirstOperand = true;
    }
    if (isFirstOperand && !isSecondOperand) {

        equation.push(e.target.textContent);
        isOperator = true;
        isAppend=false;
    }

    if ((equation.length) % 3 === 0) {
        length = getLength(equation) + 1;
        const num = operate(equation[length - 2], equation[length - 3], equation[length - 1]);
        equation.push(num);
        screen.textContent = String(num);
        equation.push(e.target.textContent);
        isOperator = true;
        isFirstOperand = true;
        isSecondOperand = false;
        isAppend=false;
    }
}

const equals = document.querySelector('button.equals');
equals.addEventListener('click', equate);

function equate() {

}

