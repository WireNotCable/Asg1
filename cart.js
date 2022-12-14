// get data from local storage
let itemsData = []
  if (localStorage.getItem("itemsData") !== null) {
    itemsData = JSON.parse(localStorage.getItem("itemsData"));
  }

// add selected items into cart page
for (let item of itemsData){
    addItemToCart(item.title, item.price, item.imageSrc, item.quantity)


    function addItemToCart(title, price, imageSrc, quantity){
    var itemContainer = document.createElement('div')
    itemContainer.classList.add('item-container')
    var cartItems = document.querySelector('.cart-items')

    var contents = `
    <div class="item">
        <div class="cart-description" src="">
        <img class="picture" src="${imageSrc}" width="100" height="100">
        <span class="cart-title">${title}</span>
        </div>
        <span class="cart-price">${price}</span>
        <div class="lastpart">
        <input class="cart-quantity" type="number" value="${quantity}">
        <button class="remove-btn" type="button">REMOVE</button>
        </div>
    </div>
    `
    
    itemContainer.innerHTML = contents
    cartItems.append(itemContainer)
    }
}
updateTotal()

// remove cart items, update total amount and local storage
var removeCartItemButtons = document.querySelectorAll(".remove-btn")
for (var i = 0; i<removeCartItemButtons.length; i++){
    var button = removeCartItemButtons[i]
    button.addEventListener('click',function(event){
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.parentElement.remove()
        updateTotal()
        updateStorage()
    })
}

var quantityInputs = document.querySelectorAll(".cart-quantity")
for (var i = 0; i <quantityInputs.length;i++){
    var input = quantityInputs[i]
    input.addEventListener("change",quantityChanged)  
}

// update total amount and local storage when a cart item's quantity is changed
function quantityChanged(event){
    var input = event.target
    if (input.value <= 0){
        input.value = 1
    }
    updateTotal()
    updateStorage()
}

// calculate total amount to pay
function updateTotal(){
    var total = 0
    var cartItems = document.querySelector('.cart-items')
    var cartContainers = cartItems.querySelectorAll('.item-container')
    for (var i = 0; i < cartContainers.length; i++){
        var itemContainer = cartContainers[i]
        var priceElement = itemContainer.querySelector('.cart-price')
        var quantityElement = itemContainer.querySelector('.cart-quantity')
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total = parseFloat((total + (price * quantity)).toFixed(2))
    }
    document.querySelector('.cart-total-price').innerText = `$ ${total}`
    localStorage.setItem("quantityData", JSON.stringify(total));
}

// clear local storage and add existing items back 
function updateStorage(){
    localStorage.clear()
    var itemElement = document.querySelectorAll(".item")
    console.log(itemElement)
    let itemsData = []
    for (var i = 0; i < itemElement.length; i++){
        var title = itemElement[i].querySelector('.cart-title').innerText
        var price = itemElement[i].querySelector('.cart-price').innerText
        var imageSrc = itemElement[i].querySelector('.picture').src
        var quantity = itemElement[i].querySelector('.cart-quantity').value
        console.log(quantity)

        let newData = new Data(title, price, imageSrc, quantity);
        itemsData.push(newData);
    }
    localStorage.setItem("itemsData", JSON.stringify(itemsData));
    
}

function Data(title, price, imageSrc, quantity) {
    this.title = title;
    this.price = price;
    this.imageSrc = imageSrc;
    this.quantity = quantity;
  }

