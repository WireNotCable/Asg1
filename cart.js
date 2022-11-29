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
        buttonClicked.parentElement.parentElement.parentElement.remove()
        // localStorage.removeItem()
        updateTotal()
        updateStorage()
    })
}

var quantityInputs = document.getElementsByClassName("cart-quantity")
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
    updateStorage()
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
    localStorage.setItem("quantityData", JSON.stringify(total));
}

function updateStorage(){
    localStorage.clear()
    var itemElement = document.querySelectorAll(".item")
    console.log(itemElement)
    let itemsData = []
    for (var i = 0; i < itemElement.length; i++){
        var title = itemElement[i].getElementsByClassName('cart-title')[0].innerText
        var price = itemElement[i].getElementsByClassName('cart-price')[0].innerText
        var imageSrc = itemElement[i].getElementsByClassName('picture')[0].src
        var quantity = itemElement[i].getElementsByClassName('cart-quantity')[0].value
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