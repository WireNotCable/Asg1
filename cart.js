// get data from local storage
let itemsData = []
  if (localStorage.getItem("itemsData") !== null) {
    itemsData = JSON.parse(localStorage.getItem("itemsData"));
  }

// add selected items into cart page
for (let item of itemsData){
    
    addItemToCart(item.title, item.price, item.imageSrc, item.quantity)


    function addItemToCart(title, price, imageSrc, quantity){
    var cartRow = document.createElement('div')
    cartRow.classList.add('cart-row')
    var cartItems = document.getElementsByClassName('cart-items')[0]

    var cartRowContents = `
        <div class="" src="">
        <img class="" src="${imageSrc}" width="100" height="100">
        <span class="cart-title">${title}</span>
        </div>
        <span class="cart-price">${price}</span>
        <div class="">
        <input class="cart-quantity" type="number" value="${quantity}">
        <button class="remove-btn" type="button">REMOVE</button>
        </div>
    `
    cartRow.innerHTML = cartRowContents
    cartItems.append(cartRow)
    }
}
updateTotal()

var removeCartItemButtons = document.getElementsByClassName("remove-btn")
for (var i = 0; i<removeCartItemButtons.length; i++){
    var button = removeCartItemButtons[i]
    button.addEventListener('click',function(event){
        var buttonClicked = event.target
        buttonClicked.parentElement.parentElement.remove()
        updateTotal()
    })
}

var quantityInputs = document.getElementsByClassName("cart-quantity-input")
for (var i = 0; i <quantityInputs.length;i++){
    var input = quantityInputs[i]
    input.addEventListener("change",quantityChanged)
}
function quantityChanged(event){
    var input = event.target
    if (input.value <= 0){
        input.value = 1
    }
    updateTotal()
}

function updateTotal(){
    var total = 0
    var cartItems = document.querySelector('.cart-items')
    var cartRows = cartItems.getElementsByClassName('cart-row')
    for (var i = 0; i < cartRows.length; i++){
        var cartRow = cartRows[i]
        var priceElement = cartRow.getElementsByClassName('cart-price')[0]
        var quantityElement = cartRow.getElementsByClassName('cart-quantity')[0]
        var price = parseFloat(priceElement.innerText.replace('$',''))
        var quantity = quantityElement.value
        total = total + (price * quantity)
    }
    document.getElementsByClassName('cart-total-price')[0].innerText = `$ ${total}`
}