const equation = [];
let isFirstOperand = false;
let isOperator = false;
let isSecondOperand = false;
let length;
let isConcat = false;
let isClicked = false;
let isEquated = false;

function getLength(arr) {
    return arr.length - 1;
}

const calculator = {

    add(x, y) { return x + y; },

    subtract(x, y) { return x - y; },

    multiply(x, y) {

        if (x * y === NaN || x * y === undefined)
            return "ERROR"
        else
            return x * y;
    },

    divide(x, y) {
        if (x / y === Infinity || x / y === NaN)
            return "ERROR"
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

    isClicked = true;

    if (isConcat) { screen.textContent += e.target.textContent; }
    else {
        screen.textContent = '';
        screen.textContent += e.target.textContent;
        isConcat = true;
    }
}

const clear = document.getElementById("clear");
clear.addEventListener('click', () => {
    screen.textContent = '';
    equation.length = 0;
    isConcat = false;
    isClicked = false;
    isFirstOperand = false;
    isOperator = false;
    isSecondOperand = false;
}
);

const del = document.getElementById("delete");
del.addEventListener('click', () => {

    screen.textContent = screen.textContent.slice(0, -1);
    if (isEquated) {
        isFirstOperand = false;
        isOperator = false;
        isSecondOperand = false;
        isEquated = false;
        equation.length = 0;
    }
});

const operators = document.querySelectorAll('button.operator');
operators.forEach(operator => operator.addEventListener('click', calculate));

function calculate(e) {

    if (!isClicked) {
        if (equation.length !== 0)
            equation[getLength(equation)] = e.target.textContent;
        isConcat = false;
        return;
    }

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
        isConcat = false;
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
        isConcat = false;
    }

    isClicked = false;
}

const equals = document.querySelector('button.equals');
equals.addEventListener('click', equate);

function equate(e) {
    const lastNum = Number(screen.textContent);
    equation.push(lastNum);
    length = getLength(equation) + 1;
    if (length > 2) {
        const equals = operate(equation[length - 2], equation[length - 3], equation[length - 1]);
        screen.textContent = String(equals);
        equation.push(equals);
        isConcat = false;
        isOperator = false;
    }
    isEquated = true;
}

