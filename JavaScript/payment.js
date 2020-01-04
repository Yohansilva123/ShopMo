if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

function ready() {

    var paymentButtons = document.getElementsByClassName('payment-proceed');
    for (var i = 0; i < paymentButtons.length; i++) {
        var button = paymentButtons[i];
        button.addEventListener('click', paymentProceed)
    }
    retriveCost();
}


function paymentProceed(event) {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var cost = shopItem.getElementsByClassName('final-total')[0].innerText;
    var subTotal = shopItem.getElementsByClassName('sub-total')[0].innerText;

    var finalCost = parseFloat(cost.replace('LKR', ''));
    let prices = [];

    if (localStorage.getItem('prices')) {
        prices = JSON.parse(localStorage.getItem('prices'));
    }
    prices.push({'cost': finalCost});
    localStorage.setItem('prices', JSON.stringify(prices));
    // goToCartClicked();
}

var cost;
function retriveCost() {
    var retrievedData = localStorage.getItem('prices');
    var objectArray = JSON.parse(retrievedData);

    for (var i = 0; i < objectArray.length; i++) {
        console.log("parsed cost " + objectArray[i].cost)
        cost = objectArray[i].cost;
    }


        $("#total-price").append(`<span> LKR ${cost}</span>`);
}

function displayTotal(){

}

jQuery(function($) {
    var $form = $('#frmBooking');
    var handler = StripeCheckout.configure({
        key:'pk_test_cp21BcECf4kMMUbSlRlZlsMo', token : function(token) {
            if (token.id) {
                $("#thankyouPayment").html("Thank you") } } })

    $('#visa_icon').on('click', function(e) {
        handler.open({
            name : 'ShopMo Card Payment', currency: 'LKR', amount: cost*100 }); $(window).on('popstate', function(){ handler.close();
        });
    });
});