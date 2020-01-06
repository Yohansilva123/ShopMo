if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

var totalPoints = 0;

function ready() {

    var addToCartButtons = document.getElementsByClassName('shop-item-button');
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked)
    }

    var removeCartItemButtons = document.getElementsByClassName('del-item-button');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem)
    }

    var applyPromoButton = document.getElementsByClassName('apply-promo-btn');
    for (var i = 0; i < applyPromoButton.length; i++) {
        var button = applyPromoButton[i];
        button.addEventListener('click', applyPromoCode)
    }

    if (totalPoints != 0) {
        retrieveTotalPoints();
    }
    updateCartTotal();
    goToCartClicked();
}


function addToCartClicked(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var title = shopItem.getElementsByClassName('product-title')[0].innerText;
    var price = shopItem.getElementsByClassName('promo-item-text')[0].innerText;
    var imageSrc = shopItem.getElementsByClassName('card-img')[0].src;
    var quantityElement = shopItem.getElementsByClassName('input-text qty')[0];
    var productId = shopItem.getElementsByClassName('product-id')[0].innerText;
    var quantity = quantityElement.value
    let products = [];

    if (localStorage.getItem('products')) {
        products = JSON.parse(localStorage.getItem('products'));
    }
    products.push({'productId': productId, 'title': title, 'price': price, 'imagesrc': imageSrc, 'quantity': quantity});
    localStorage.setItem('products', JSON.stringify(products));
    alert("Item added to cart !!!")
    goToCartClicked();
}

function removeCartItem(event) {
    var buttonClicked = event.target;
    var shopItem = buttonClicked.parentElement;
    var id = shopItem.getElementsByClassName('product-id')[0].innerText;
    let productId = id;
    let storageProducts = JSON.parse(localStorage.getItem('products'));
    let products = storageProducts.filter(product => product.productId !== productId);
    localStorage.setItem('products', JSON.stringify(products));
    buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.remove();
    updateCartTotal();
}

function goToCartClicked() {
    var retrievedData = localStorage.getItem('products');
    var objectArray = JSON.parse(retrievedData);
    for (var i = 0; i < objectArray.length; i++) {
        addItemsToCart(objectArray[i].title, objectArray[i].price, objectArray[i].imagesrc, objectArray[i].quantity, objectArray[i].productId)
    }
    updateCartTotal();

}

function addItemsToCart(title, price, url, quantity, productId) {

    var cartRow = document.createElement('div');
    cartRow.classList.add('card');
    var cartItems = document.getElementsByClassName('cart-items')[0];

    var cardRowContents = `
            <table>
                <col width="80">
                <col width="120">
                <col width="60">
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
                        <span class="product-id">${productId}</span>
                        <p class="product-qty"> Qty: ${quantity} </p>
                    </td>
                    </td>
                </tr>
            </table>
`
    cartRow.innerHTML = cardRowContents;
    cartItems.append(cartRow);

    cartRow.getElementsByClassName('del-item-button')[0].addEventListener('click', removeCartItem)

}
var promocode;
function applyPromoCode(event){
   alert("apply clicked")
    promocode= document.getElementsByClassName('promo-code')[0].value;
    var expectedPromo = 'SM105'
    var n = promocode.localeCompare(expectedPromo);

    if( n==0 ){
        $(".code_discount").append(`<span> LKR 100</span>`);
    }
}


function retrieveTotalPoints() {
    var retrievedData = localStorage.getItem('totalPoints');
    var objectArray = JSON.parse(retrievedData);
    for (var i = 0; i < objectArray.length; i++) {
        totalPoints = objectArray[i].totalPoints;
    }
    $("#total-points").append(`<span> ${totalPoints}</span>`);
    $(".point_discount").append(`<span> LKR ${totalPoints}</span>`);

}

function updateCartTotal() {
    var retrievedData = localStorage.getItem('products');

    console.log(totalPoints);
    var total = 0

    var objectArray = JSON.parse(retrievedData);
    for (var i = 0; i < objectArray.length; i++) {
        var cost = parseFloat(objectArray[i].price.replace('LKR', ''));
        total = total + (cost * objectArray[i].quantity);
        document.getElementsByClassName('sub-total')[0].innerText = "LKR " + total;

        if(total >= totalPoints) {
            console.log(totalPoints)
            document.getElementsByClassName('final-total')[0].innerText = "LKR " + (total-totalPoints);
        } else {
            document.getElementsByClassName('final-total')[0].innerText = "LKR " + total;
        }

        if(promocode !=null && total>100){
            document.getElementsByClassName('final-total')[0].innerText = "LKR " + total;
        }


        console.log("total : " + total);
    }

}
