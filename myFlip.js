'use strict';
// также перемещать и видео превью
let vw = (coef) => {
	return window.innerWidth * (coef/100);
}
let vh = (coef) => window.innerHeight * (coef/100);


// наверное, не работает
window.addEventListener('resize', function(){
	vw = (coef) => window.innerWidth * (coef/100);
	vh = (coef) => window.innerHeight * (coef/100);
});
window.addEventListener('deviceorientation', function(){
	vw = (coef) => window.innerWidth * (coef/100);
	vh = (coef) => window.innerHeight * (coef/100);
});
//

console.log(vw(100))
const body = document.querySelector("body");
const container = document.querySelector(".container");


const leftCard = document.querySelector(".left-card");
const rightCard = document.querySelector(".right-card");
const left = document.querySelector(".left");
const right = document.querySelector(".right");


let qrLeft = document.querySelector(".left2__qr");
let qrRight = document.querySelector(".right2__qr");




const preview = document.querySelector(".preview");
const leftText = document.querySelector(".left-description__text");



gsap.to(left, {x: vw(-100), duration: 0});
gsap.to(right, {x: vw(100), duration: 0});

window.addEventListener('resize', function(){
	gsap.to(".left, .container, .right", 
	{
		width: vw(100), 
		height: vh(100)
	});
});

// показать превью
leftText.addEventListener("click", () => {
	gsap.to(preview, {
		duration: 1, 
		scale: 1,
		y: 0,
		opacity: 1
	});
})
preview.addEventListener("click", () => {
	gsap.to(preview, {
		duration: 1, 
		scale: 1,
		y: vh(100),
		opacity: 1
	});
})


// левая карточка
leftCard.addEventListener("click", () => {
	gsap.from(".left", 
	{
		scale: 0.7,
		duration: 0.7,
	})
	gsap.to(".left, .container, .right", 
	{
		scale: 1, 
		duration: 0.7,
		x: '+=100%'
	});
	gsap.to(".container", 
	{
		scale: 0.7,
		duration: 0.7,
	})
	qrCode.append(qrLeft);

	window.addEventListener('resize', function(){
		let qrCanvasLeft = qrLeft.querySelector("canvas");
		qrCanvasLeft.setAttribute("style",`width:${vw(23.4375)}px`);
	});
	window.addEventListener('deviceorientation', function(){
		let qrCanvasLeft = qrLeft.querySelector("canvas");
		qrCanvasLeft.setAttribute("style",`width:${vw(23.4375)}px`);
	});
})


// правая карточка
rightCard.addEventListener("click", () => {
	gsap.from(".right", 
	{
		scale: 0.7,
		duration: 0.7,
	})
	gsap.to(".left, .container, .right", 
	{
		scale: 1, 
		duration: 0.7,
		x: '-=100%'
	});
	gsap.to(".container", 
	{
		scale: 0.7,
		duration: 0.7,
	})

	qrCode.append(qrRight);

	window.addEventListener('resize', function(){
		let qrCanvasRight = qrRight.querySelector("canvas");
		qrCanvasRight.setAttribute("style",`width:${vw(23.4375)}px`);
	});
	window.addEventListener('deviceorientation', function(){
		let qrCanvasRight = qrRight.querySelector("canvas");
		qrCanvasRight.setAttribute("style",`width:${vw(23.4375)}px`);
	});
})

let returnLeft = document.querySelector(".left2__return");
let returnRight = document.querySelector(".right2__return");


returnLeft.addEventListener("click", () => {
	gsap.from(".container", 
	{
		scale: 0.7,
		duration: 0.7,
	})
	gsap.to(".left, .container, .right", 
	{
		scale: 1, 
		duration: 0.7,
		x: '-=100%'
	});
	gsap.to(".left", 
	{
		scale: 0.7,
		duration: 0.7,
	})
})

returnRight.addEventListener("click", () => {
	gsap.from(".container", 
	{
		scale: 0.7,
		duration: 0.7,
	})
	gsap.to(".left, .container, .right", 
	{
		scale: 1, 
		duration: 0.7,
		x: '+=100%'
	});
	gsap.to(".right", 
	{
		scale: 0.7,
		duration: 0.7,
	})
	
})



// let input = prompt("Введите номер салона сотовой связи")
let input = '6';
console.log(input);


// настройки QR кода
const qrCode = new QRCodeStyling({
	width: vw(23.4375),
	height: vw(23.4375),
	type: "canvas",
	data: `https://kion.ru/test?utm_source=SALON&utm_medium=SALON-${input}`,

	dotsOptions: {
		color: "#C32F77",
		type: "rounded"
	},
	cornersSquareOptions: {
		color: "#C32F77",
		type: "extra-rounded"
	},
	cornersDotOptions: {
		color: "#C32F77",
		// type: "rounded"
	},
	backgroundOptions: {
		color: "transparent",
	},
	imageOptions: {
		crossOrigin: "anonymous",
		margin: 0
	}
});


let inactivityTime = function () {
	let time;
	window.onload = resetTimer;
	document.onmousemove = resetTimer;
	document.onkeypress = resetTimer;
	function logout() {
	  console.log("You are now logged out.")

	  gsap.to(preview, {
		duration: 1, 
		scale: 1,
		x: 0,
		opacity: 1
	});
	}
	function resetTimer() {
	  clearTimeout(time);
	  time = setTimeout(logout, 60000)
	}
  };
  inactivityTime();
  console.log('Please wait...');
