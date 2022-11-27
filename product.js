var addToCartButtons = document.getElementsByClassName("add-to-cart-btn")
for (var i = 0; i < addToCartButtons.length; i++){
  var button = addToCartButtons[i]
  button.addEventListener('click',addToCartClicked)
}

// add data of selected items to local storage after user clicked on add to cart button
function addToCartClicked(event){
  var button = event.target
  var shopItem = button.parentElement
  var title = shopItem.getElementsByClassName('product-description')[0].innerText
  var price = shopItem.getElementsByClassName('price')[0].innerText
  var imageSrc = shopItem.getElementsByClassName('picture')[0].src
  var quantity = 1
  console.log(title, price, imageSrc, quantity)
  //addItemToCart(title,price,imageSrc)
  let itemsData = []
  
  if (localStorage.getItem("itemsData") !== null) {
    itemsData = JSON.parse(localStorage.getItem("itemsData"));
  }

  let newData = new Data(title, price, imageSrc, quantity);



  // var cartItemNames = []
 
  // for (var i = 0; itemsData.length; i++){
  //   cartItemNames.push(itemsData[i].title)
  // }
  
  // for (var i = 0; i<cartItemNames.length ;i++){
  //   if (cartItemNames[i].innerText == title){
  //     alert('item added')
  //     return
  //   }
  //   else{
  //     itemsData.push(newData);
  //     return
  //   }
  // }
  
  itemsData.push(newData);
  localStorage.setItem("itemsData", JSON.stringify(itemsData));
}

function Data(title, price, imageSrc, quantity) {
  this.title = title;
  this.price = price;
  this.imageSrc = imageSrc;
  this.quantity = quantity;
}
// function addItemToCart(title, price, imageSrc){
//   var cartRow = document.createElement('div')
//   cartRow.classList.add('cart-row')
//   var cartItems = document.getElementsByClassName('cart-items')[0]
//   var cartItemNames = cartItems.getElementsByClassName('cart-description')
//   for (var i = 0; i < cartItemNames.length; i++){
//     if (cartItemNames[i].innerText == title){
//       alert('This item is already added to the cart')
//       return
//     }


