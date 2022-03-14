function changeTheme() {
	const toggleButton = document.querySelector(".header-panel__theme--btn");
	const html = document.getElementsByTagName("html")[0];
	// console.log(toggleButton);
	// console.log(html);

	let currentTheme;
	if (toggleButton.classList.contains("theme--0")) currentTheme = 0;
	else if (toggleButton.classList.contains("theme--1")) currentTheme = 1;
	else if (toggleButton.classList.contains("theme--2")) currentTheme = 2;

	let position = getComputedStyle(toggleButton, "::after").left;
	// console.log(position);

	toggleButton.classList.remove(`theme--${currentTheme}`);
	toggleButton.classList.add(`theme--${(currentTheme + 1) % 3}`);
	html.classList.remove(`theme--${currentTheme}`);
	html.classList.add(`theme--${(currentTheme + 1) % 3}`);
}

const numberKey = [...document.querySelectorAll(".keys-panel__key--number")];
const signKey = [...document.querySelectorAll(".keys-panel__key--sign")];
const resetKey = document.querySelector(".keys-panel__key--reset");
const delKey = document.querySelector(".keys-panel__key--del");
const ctaKey = document.querySelector(".keys-panel__key--cta");
const dotKey = document.querySelector(".keys-panel__key--dot");
const primaryDisplay = document.querySelector(".display-panel__number");
const secondaryDisplay = document.querySelector(".display-panel__number--secondary");

let currentNumber = primaryDisplay.textContent;
let previousNumber;
let secondaryNumber;
let sign;
let wasCalculated = false;
let wasChained = false;

const displayNumber = function (number) {
	if (number > Number.MAX_SAFE_INTEGER) {
		primaryDisplay.textContent = "Your number is too big, sorry!";
		resetAll();
		setTimeout(() => displayNumber(currentNumber), 5000);
	} else primaryDisplay.textContent = number;
};

const displaySecondaryNumber = function (number) {
	secondaryDisplay.style.opacity = "100";
	secondaryDisplay.textContent = number;
};

const calculate = function (currNum, sign, prevNum) {
	if (sign === "+") return Number.parseFloat(prevNum) + Number.parseFloat(currNum);
	else if (sign === "-") return Number.parseFloat(prevNum) - Number.parseFloat(currNum);
	else if (sign === "x") {
		console.log(Number.parseFloat(prevNum));
		console.log(Number.parseFloat(currNum));
		console.log(sign);
		return Number.parseFloat(prevNum) * Number.parseFloat(currNum);
	} else if (sign === "/")
		return Number.parseFloat(
			(Number.parseFloat(prevNum) / Number.parseFloat(currNum)).toFixed(20)
		);
};

const resetAll = function () {
	currentNumber = "0";
	sign = "";
	previousNumber = "";
	secondaryNumber = "";
	secondaryDisplay.style.opacity = "0";
	wasCalculated = false;
	wasChained = false;
};

/// Event Listerers

numberKey.forEach(function (key) {
	key.addEventListener("click", function () {
		if (wasCalculated) {
			resetAll();
		}

		currentNumber === "0"
			? (currentNumber = this.textContent)
			: (currentNumber += this.textContent);
		displayNumber(currentNumber);
	});
});

signKey.forEach(function (key) {
	key.addEventListener("click", function () {
		if (key.textContent === "-" && currentNumber === "0") {
			currentNumber = "-";
			console.log("siema");
			displayNumber(currentNumber);
		} else if (!wasCalculated && sign) {
			secondaryNumber += " " + currentNumber + " " + key.textContent;
			displaySecondaryNumber(secondaryNumber);

			currentNumber = calculate(currentNumber, sign, previousNumber);
			displayNumber(currentNumber);

			sign = key.textContent;
			previousNumber = currentNumber;
			currentNumber = "0";
		} else {
			wasCalculated = false;

			previousNumber = currentNumber;

			sign = key.textContent;
			secondaryNumber = currentNumber + " " + sign;
			displaySecondaryNumber(secondaryNumber);
			currentNumber = "0";
		}
	});
});

dotKey.addEventListener("click", function () {
	currentNumber += this.textContent;
	displayNumber(currentNumber);
});

resetKey.addEventListener("click", function () {
	resetAll();
	displayNumber(currentNumber);
});

delKey.addEventListener("click", function () {
	currentNumber = "0";
	displayNumber(currentNumber);
});

ctaKey.addEventListener("click", function () {
	wasChained = false;
	if (wasCalculated) {
		secondaryNumber = `${currentNumber} ${sign} ${previousNumber} =`;
		[currentNumber, previousNumber] = [previousNumber, currentNumber];
	} else {
		secondaryNumber += " " + currentNumber + " =";
	}
	displaySecondaryNumber(secondaryNumber);

	let helpNumber = currentNumber;
	currentNumber = calculate(currentNumber, sign, previousNumber);
	displayNumber(currentNumber);
	previousNumber = helpNumber;

	wasCalculated = true;
});
