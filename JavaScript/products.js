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

    // var addToCartButton = document.getElementById("cart_icon");
    // addToCartButton.onclick = goToCartClicked;
    goToCartClicked();
    //textBox();
}


function addToCartClicked(event) {
//alert("thanks")
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = shopItem.getElementsByClassName('product-title')[0].innerText
    var price = shopItem.getElementsByClassName('promo-item-text')[0].innerText
    var imageSrc = shopItem.getElementsByClassName('card-img')[0].src
    var quantity = shopItem.getElementsByClassName('product-qty')[0].innerText
    // addItemToCart(title, price, imageSrc)
    // updateCartTotal()

    let products = [];

    if(localStorage.getItem('products')){
        products = JSON.parse(localStorage.getItem('products'));
    }

    products.push({'productId' : 3, 'title' : title, 'price' : price, 'imagesrc' : imageSrc, 'quantity' : quantity});

    localStorage.setItem('products', JSON.stringify(products));


    // $('#Remove').click(function(){
    //     let productId = 3;
    //     let storageProducts = JSON.parse(localStorage.getItem('products'));
    //   let products = storageProducts.filter(product => product.productId !== productId );
    //   localStorage.setItem('products', JSON.stringify(products));
    // });
}

function goToCartClicked() {
    var retrievedData = localStorage.getItem('products');
    // console.log( JSON.parse(retrievedData))

    var objectArray = JSON.parse(retrievedData);
     console.log(objectArray.length)
    for (var i = 0; i < objectArray.length; i++) {
        addItemsToCart(objectArray[i].title, objectArray[i].price, objectArray[i].imagesrc, objectArray[i].quantity)
        console.log(objectArray[i].title, objectArray[i].price, objectArray[i].imagesrc, objectArray[i].quantity)
    }
}

function addItemsToCart (title, price, url, quantity) {

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
                        <i class="fa fa-trash del" id="deletebtn1"></i>
                        <p class="product-qty"> Quantity: ${quantity} </p>
                    </td>
                    </td>
                </tr>
            </table>
     `
            cartRow.innerHTML = cardRowContents
            cartItems.append(cartRow)

}

// function retrieveData (){
//
//         $(document).ready(function(){
//
//             var retrievedData = localStorage.getItem('products');
//             var objectArray = JSON.parse(retrievedData);
//             alert(objectArray);
//             $.each(objectArray, function (i) {
//                 var templateString = '<article class="card"><h2>' + objectArray[i].title + '</h2><p>' + objectArray[i].price + '</p><p>' +
//                     objectArray[i].imagesrc + '</p><button id="tes">Start</button></article>';
//                 $('#test12').append(templateString);
//             })
//
//             $("#test12").on("click", function () {
//                 alert("test");
//             });
//         });
// }

$(document).ready(function(){
    if($(".c1:visible")){
        $(".btn").click(function(){
            $(".c1").hide("slow");
        });
    }

    else if($(".c1:hidden")){
        $(".btn").click(function(){
            $(".c1").show("slow");
        });
    }
});