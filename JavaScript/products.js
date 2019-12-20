if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    var addToCartButtons = document.getElementsByClassName('shop-item-button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    var removeCartItemButtons = document.getElementsByClassName('del-item-button')
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
     goToCartClicked();
}


function addToCartClicked(event) {

    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('product-title')[0].innerText
    var price = shopItem.getElementsByClassName('promo-item-text')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('card-img')[0].src
    var quantityElement = shopItem.getElementsByClassName('input-text qty')[0]
    // var quantity = shopItem.getElementsByClassName('product-qty')[0].innerText
    // var productId = shopItem.getElementsByClassName('product-id')[0].innerText
    var quantity = quantityElement.value
    let products = [];

    if (localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));
    }
    products.push({'productId': 3, 'title': title, 'price': price, 'imagesrc': imageSrc, 'quantity': quantity});
    localStorage.setItem('products', JSON.stringify(products));

    goToCartClicked()
    // $('#Remove').click(function(){
    //     let productId = 3;
    //     let storageProducts = JSON.parse(localStorage.getItem('products'));
    //   let products = storageProducts.filter(product => product.productId !== productId );
    //   localStorage.setItem('products', JSON.stringify(products));
    // });
}

function removeCartItem(event) {

    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.remove()
}

function goToCartClicked() {
    var retrievedData = localStorage.getItem('products');

    var total = 0
    var objectArray = JSON.parse(retrievedData);
    for (var i = 0; i < objectArray.length; i++) {
        addItemsToCart(objectArray[i].title, objectArray[i].price, objectArray[i].imagesrc, objectArray[i].quantity)


        var cost = parseFloat(objectArray[i].price.replace('LKR', ''))
        total = total + (cost * objectArray[i].quantity)
        document.getElementsByClassName('sub-total')[0].innerText = "LKR " + total;
        document.getElementsByClassName('final-total')[0].innerText = "LKR " + total;
        console.log("total : " + total)
        // updateCartTotal(objectArray[i].price,objectArray[i].quantity)
    }

}

function addItemsToCart(title, price, url, quantity) {

    var cartRow = document.createElement('div')
    cartRow.classList.add('card')
    var cartItems = document.getElementsByClassName('cart-items')[0]


    var cardRowContents = `
            <table>
                <col width="80">
                <col width="80">
                <col width="80">
                <tr>
                    <td class="product-image-td">
                        <img class="img" src="${url}" alt="Rice" style="width:100%">
                    </td>
                    <td class="product-data-td">
                        <p class="product-title"><b>${title}</b></p>
                        <p class="product-price">${price}</p>
                        <!--<p id="product-desc"><b>400g </b></p>-->
                    </td>

                    <td class="product-extra-td">
                      
                        <i class="fa fa-trash del-item-button" id="deletebtn1"></i>
                        <p class="product-qty"> Quantity: ${quantity} </p>
                    </td>
                    </td>
                </tr>
            </table>
`
    cartRow.innerHTML = cardRowContents
    cartItems.append(cartRow)

    cartRow.getElementsByClassName('del-item-button')[0].addEventListener('click', removeCartItem)

}


$(document).ready(function () {
    if ($(".c1:visible")) {
        $(".btn").click(function () {
            $(".c1").hide("slow");
        });
    }

    else if ($(".c1:hidden")) {
        $(".btn").click(function () {
            $(".c1").show("slow");
        });
    }
});