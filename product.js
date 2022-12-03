var addToCartButtons = document.querySelectorAll(".add-to-cart-btn")
for (var i = 0; i < addToCartButtons.length; i++){
  var button = addToCartButtons[i]
  button.addEventListener('click',addToCartClicked)
}

// add data of selected items to local storage after user clicked on add to cart button
function addToCartClicked(event){
  var button = event.target
  var shopItem = button.parentElement
  var title = shopItem.querySelector('.product-description').innerText
  var price = shopItem.querySelector('.price').innerText
  var imageSrc = shopItem.querySelector('.picture').src
  var quantity = 1
  console.log(title, price, imageSrc, quantity)
  let itemsData = []
  
  if (localStorage.getItem("itemsData") !== null) {
    itemsData = JSON.parse(localStorage.getItem("itemsData"));
  }

  if (itemsData.some((item) => item.title === title)) {
    alert("Item has been added.")
    return
  }

  let newData = new Data(title, price, imageSrc, quantity);

  // add newData to itemsData and store itemsData in local storage
  itemsData.push(newData);
  localStorage.setItem("itemsData", JSON.stringify(itemsData));
}

function Data(title, price, imageSrc, quantity) {
  this.title = title;
  this.price = price;
  this.imageSrc = imageSrc;
  this.quantity = quantity;
}


