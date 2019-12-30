if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    var submitRating = document.getElementsByClassName('submit-rating');
    for (var i = 0; i < submitRating.length; i++) {
        var button = submitRating[i];
        button.addEventListener('click', rateProductClicked);
    }
    goToRateProductClicked();
}


function rateProductClicked() {
    alert(starRate);
    var commentElement = document.getElementsByClassName('product-comments')[0];
    var comment = commentElement.value;

    let reviews = [];
    if (localStorage.getItem('reviews')) {
        reviews = JSON.parse(localStorage.getItem('reviews'));
    }
    reviews.push({'username': "ShopMo Customer", 'star': starRate, 'comment': comment});
    localStorage.setItem('reviews', JSON.stringify(reviews));

    //goToCartClicked();
}

var starRate;

function vote(index) {

    starRate = index;
}

function goToRateProductClicked() {
    var retrievedData = localStorage.getItem('reviews');
    var objectArray = JSON.parse(retrievedData);
    for (var i = 0; i < objectArray.length; i++) {
        displayReviews(objectArray[i].username, objectArray[i].star, objectArray[i].comment)
    }
}


function displayReviews(username, star, comment) {

    var reviewRow = document.createElement('div');
    reviewRow.classList.add('card');
    var cartItems = document.getElementsByClassName('product-reviews')[0];

    var totalStars = 5;
    let rating_str = '';
    for (let i = 0; i < star; i++) rating_str += '<span class="fa fa-star checked new-checked"></span>';


    if (star < 5) {
        for (let j = 0; j < (totalStars - star); j++) {
            rating_str += '<span class="fa fa-star unchecked new-unchecked"></span>';
            console.log(totalStars - star)
        }
    }

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;


    var cardRowContents = `
          <table  id="review-table">
                <tr>
                
                    <td colspan="2" id="customer-name">
                        <p>By ${username}</p>
                    </td>

                </tr>
                <tr>
                    <td id="star-rates">
                        <span>${rating_str}</span>
                    </td>
                    <td id="comment-date">
                        <p>${today}</p>
                    </td>
                </tr>
                <tr>
                    <td colspan="2" id="comment-text">
                        <p> ${comment} </p>
                    </td>
                </tr>
            </table>

`
    reviewRow.innerHTML = cardRowContents;
    cartItems.append(reviewRow);

}