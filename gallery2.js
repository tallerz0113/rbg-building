let galleryImg = document.querySelectorAll(".gallery-img2");
let getLatestOpenedImage;
let windowSize = window.innerWidth;

if(galleryImg) {
	galleryImg.forEach(function(image, index) {
		image.onclick = function() {
			let getElementsCss = window.getComputedStyle(image);
			let getFullImgsUrl = getElementsCss.getPropertyValue("background-image");
			let getImgUrlsPos = getFullImgsUrl.split("/img/pro-site/thumbnails/");
			let setNewImgsUrl = getImgUrlsPos[1].replace('")', '');

			getLatestOpenedImage = index + 1;

			let containers = document.body;
			let newImagesWindow = document.createElement("div");
			containers.appendChild(newImagesWindow);
			newImagesWindow.setAttribute("class", "image-window");
			newImagesWindow.setAttribute("onclick", "closeImage()");

			let newImage = document.createElement("img");
			newImagesWindow.appendChild(newImage);
			newImage.setAttribute("src", "assets/img/pro-site/" + setNewImgsUrl);
			newImage.setAttribute("id", "current-image");

		newImage.onload = function() {
			let imageWidth = this.width;
			let calcImageToEdge = ((windowSize - imageWidth) / 2) - 80;

			let newNextsBtn	= document.createElement("a");
			let btnNextsText = document.createTextNode("Next");
			newNextsBtn.appendChild(btnNextsText);
			containers.appendChild(newNextsBtn);
			newNextsBtn.setAttribute("class", "img-btn-next");
			newNextsBtn.setAttribute("onclick", "changeImage(1)");
			newNextsBtn.style.cssText = "right: " + calcImageToEdge + "px;";

			let newPrevsBtn	= document.createElement("a");
			let btnPrevsText = document.createTextNode("Prev");
			newPrevsBtn.appendChild(btnPrevsText);
			containers.appendChild(newPrevsBtn);
			newPrevsBtn.setAttribute("class", "img-btn-prev");
			newPrevsBtn.setAttribute("onclick", "changeImage(0)");
			newPrevsBtn.style.cssText = "left: " + calcImageToEdge + "px;";
			}
			
		}
	});
}

function closeImage() {
	document.querySelector(".image-window").remove();
	document.querySelector(".img-btn-next").remove();
	document.querySelector(".img-btn-prev").remove();
}

function changeImage(changeDir) {
	document.querySelector("#current-image").remove();

	let getImageWindow = document.querySelector(".image-window");
	let newImage = document.createElement("img");
	getImageWindow.appendChild(newImage);

	let calcNewImage;
	if(changeDir === 1) {
		calcNewImage = getLatestOpenedImage + 1;
		if(calcNewImage > galleryImg.length) {
			calcNewImage = 1;
		}
	}
	else if (changeDir === 0) {
		calcNewImage = getLatestOpenedImage - 1;
		if(calcNewImage < 1) {
			calcNewImage = galleryImg.length;
	}
 }

	newImage.setAttribute("src", "assets/img/pro-site/img" + calcNewImage + ".png");
	newImage.setAttribute("id", "current-image");


	getLatestOpenedImage = calcNewImage;



	newImage.onload = function() {
		let imageWidth = this.width;
		let calcImageToEdge = ((windowSize - imageWidth) / 2) - 80;

		let nextBtn = document.querySelector(".img-btn-next");
		nextBtn.style.cssText = "right: " + calcImageToEdge + "px;";

		let prevBtn = document.querySelector(".img-btn-prev");
		prevBtn.style.cssText = "left: " + calcImageToEdge + "px;";
	}
}