// to change banners in homepage
let slideNum = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("slide");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideNum++;
  if (slideNum > slides.length) {slideNum = 1}    
  slides[slideNum-1].style.display = "block";  
  setTimeout(showSlides, 3000);
}


//shopping cart
// var getProducts = document.getElementsByClassName("product");
// var productsId = new Array();
// for (var i = 0; i <= productsId.length - 1; i + 1) {
//   productsId.push(getProducts[i].id);
// }
// console.log(productsId)