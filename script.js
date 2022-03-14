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
const primaryDisplay = document.querySelector(".display-panel__number");
const secondaryDisplay = document.querySelector(
	".display-panel__number--secondary"
);

let currentNumber = primaryDisplay.innerHTML;
let previousNumber;
let secondaryNumber;
let sign;
let wasCalculated = false;

const displayNumber = function (number) {
	primaryDisplay.innerHTML = number;
};

const displaySecondaryNumber = function (number) {
	secondaryDisplay.style.opacity = "100";
	secondaryDisplay.innerHTML = number;
};

const calculate = function (currNum, sign, prevNum) {
	if (sign === "+")
		return Number.parseFloat(currNum) + Number.parseFloat(prevNum);
	else if (sign === "-")
		return Number.parseFloat(currNum) - Number.parseFloat(prevNum);
	else if (sign === "*")
		return Number.parseFloat(currNum) * Number.parseFloat(prevNum);
	else if (sign === "/")
		return Number.parseFloat(currNum) / Number.parseFloat(prevNum);
};

const resetAll = function () {
	currentNumber = "0";
	sign = "";
	previousNumber = "";
	secondaryNumber = "";
	secondaryDisplay.style.opacity = "0";
	wasCalculated = false;
};

/// Event Listerers

numberKey.forEach(function (key) {
	key.addEventListener("click", function () {
		if (wasCalculated) {
			resetAll();
		}

		currentNumber === "0"
			? (currentNumber = this.innerHTML)
			: (currentNumber += this.innerHTML);
		displayNumber(currentNumber);
	});
});

signKey.forEach(function (key) {
	key.addEventListener("click", function () {
		wasCalculated = false;
		sign = key.innerHTML;

		previousNumber = currentNumber;
		secondaryNumber = currentNumber + " " + sign;
		displaySecondaryNumber(secondaryNumber);

		currentNumber = "0";
	});
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
	if (wasCalculated) {
		secondaryNumber = `${currentNumber} + ${previousNumber} =`;
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
