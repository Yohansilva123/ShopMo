if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    var addToFavButtons = document.getElementsByClassName('heart-button')
    for (var i = 0; i < addToFavButtons.length; i++) {
        var button = addToFavButtons[i]
        button.addEventListener('click', addToFavouritesClicked);

    }
    var shareFav = document.getElementsByClassName('share-fav-list')
    for (var i = 0; i < shareFav.length; i++) {
        var shareFav = shareFav[i]
        shareFav.addEventListener('click', sendEmail);
    }


    var removeFavItemButtons = document.getElementsByClassName('delete-fav')
    for (var i = 0; i < removeFavItemButtons.length; i++) {
        var button = removeFavItemButtons[i]
        button.addEventListener('click', removeCartItem)
    }
    goToFavouritesClicked();
   //textBox();
}


function addToFavouritesClicked (event) {
    console.log("fav clicked")
    var title = document.getElementsByClassName('product-title')[0].innerText;
    var price = document.getElementsByClassName('promo-item-text')[0].innerText;
    var discount = document.getElementsByClassName('promo-off')[0].innerText;
    var productId = document.getElementsByClassName('product-id')[0].innerText;
    var imageSrc = document.getElementsByClassName('card-img')[0].src;
    let favourites = [];

    if (localStorage.getItem('favourites')) {
        favourites = JSON.parse(localStorage.getItem('favourites'));
    }

    favourites.push({'title':title,'price':price,'discount':discount,'productId':productId, 'imagesrc': imageSrc});
    localStorage.setItem('favourites', JSON.stringify(favourites));

    goToFavouritesClicked();
}


function removeFavItem(event) {

    var buttonClicked = event.target
    var shopItem = buttonClicked.parentElement.parentElement.parentElement;
    var id = shopItem.getElementsByClassName('product-id')[0].innerText;
    alert(id)
    let favId = id;
    let storageProducts = JSON.parse(localStorage.getItem('favourites'));
    let favourites = storageProducts.filter(product => product.productId !== favId);
    localStorage.setItem('favourites', JSON.stringify(favourites));

    buttonClicked.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.remove()
}
function sendEmail(event) {
    var button = event.target
    var retrievedData = localStorage.getItem('favourites');
    var objectArray = JSON.parse(retrievedData);
    var favContent = '';
    objectArray.map(x => {
        favContent += "Name:" + x.title + ", " + x.price + ", " + x.discount + " || "
    })

    console.log(favContent)

    Email.send({
        Host: "smtp.gmail.com",
        Username : "testzupermart@gmail.com",
        Password : "Test@1234",
        To : 'yohanvidusha@gmail.com',
        From : "shopMo@gmail.com",
        Subject : "Wish List",
        Body : favContent,
    }).then(
        message => alert("mail sent successfully")
    );
}


function goToFavouritesClicked(){
    var retrievedData = localStorage.getItem('favourites');
    var objectArray = JSON.parse(retrievedData);
    for (var i = 0; i < objectArray.length; i++) {
        addItemsToFavourites(objectArray[i].title, objectArray[i].price, objectArray[i].discount, objectArray[i].productId, objectArray[i].imagesrc);

    }
}


function addItemsToFavourites(title, price, discount, productId, imagesrc) {
    var favRow = document.createElement('div')
    favRow.classList.add('card')
    var favItems = document.getElementsByClassName('fav-items')[0]


    var cardRowContents = `        
            <table>
                <col width="100">
                <col width="120">
                <col width="40">
                <tr>
                    <td class="product-image-td">
                        <img src="${imagesrc}" alt="Rice" style="width:100%">
                    </td>
                    <td class="product-data-td">
                        <p class="product-title"><b>${title} </b></p>
                        <p class="product-price">${price}</p>
                        <p class="promo-off">${discount}</p>
                        <div class="star-rating">

                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star checked"></span>
                            <span class="fa fa-star unchecked"></span>
                            <span class="fa fa-star unchecked"></span>
                        </div>
                        <!--<p id="product-desc"><b>400g </b></p>-->
                    </td>

                    <td class="wishlist-icons">
                        <div class="card_area">
                            <a id="heart_btn1" href="#"><i class="fas fa-heart fa-2x delete-fav"></i></a>
                            <span class="product-id">${productId}</span>
                        </div>

                    </td>
                    </td>
                </tr>
            </table>
     `
    favRow.innerHTML = cardRowContents
    favItems.append(favRow)

    favRow.getElementsByClassName('delete-fav')[0].addEventListener('click', removeFavItem)
}

