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
    var button = event.target
    var shopItem = button.parentElement.parentElement
    var title = document.getElementsByClassName('product-title')[0].innerText
    var price = document.getElementsByClassName('promo-item-text')[0].innerText
    var discount = document.getElementsByClassName('discount')[0].innerText

    let favourites = [];

    if (localStorage.getItem('favourites')) {
        favourites = JSON.parse(localStorage.getItem('favourites'));
    }

    favourites.push({'title':title,'price':price,'discount':discount});
    localStorage.setItem('favourites', JSON.stringify(favourites));

    goToFavouritesClicked();
}


function removeFavItem(event) {

    var buttonClicked = event.target
    buttonClicked.parentElement.parentElement.parentElement.parentElement.remove()
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
        To : 'shenali.2016234@iit.ac.lk',
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
        addItemsToFavourites(objectArray[i].title, objectArray[i].price, objectArray[i].discount)
    }
}


function addItemsToFavourites(title, price, discount) {

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
                        <img src="images/rice.jpg" alt="Rice" style="width:100%">
                    </td>
                    <td class="product-data-td">
                        <p class="product-title"><b>${title} </b></p>
                        <p class="product-price">${price}</p>
                        <p class="discount">${discount}</p>
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