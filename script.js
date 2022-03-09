function changeTheme() {
	const toggleButton = document.querySelector(".header-panel__theme--btn");
	const html = document.getElementsByTagName("html")[0];
	// console.log(toggleButton);
	console.log(html);

	let currentTheme;
	if (toggleButton.classList.contains("theme--0")) currentTheme = 0;
	else if (toggleButton.classList.contains("theme--1")) currentTheme = 1;
	else if (toggleButton.classList.contains("theme--2")) currentTheme = 2;

	let position = getComputedStyle(toggleButton, "::after").left;
	console.log(position);

	toggleButton.classList.remove(`theme--${currentTheme}`);
	toggleButton.classList.add(`theme--${(currentTheme + 1) % 3}`);
	html.classList.remove(`theme--${currentTheme}`);
	html.classList.add(`theme--${(currentTheme + 1) % 3}`);
}
/*const toggleButton = document.getElementsByClassName(
	"header-panel__theme--btn"
)[0];
let position = getComputedStyle(toggleButton).color;
console.log(position);*/
