if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else {
    ready()
}

var totalPoints = 0 ;
function ready() {

    if(totalPoints!=0){
        retrieveTotalPoints();
    }
}

// var coins = JSON.parse(localStorage.getItem('coins'));
var coins = "";
var newCoins = 0;

let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
scanner.addListener('scan', function (content) {
    alert(content);
    $("#redeemedCoins").html(content);

    var redeemedCoins = document.getElementById("redeemedCoins").innerHTML;

    newCoins = redeemedCoins;
    coins = coins + newCoins;

    if(redeemedCoins!=null){
        let points = [];

        if (localStorage.getItem('points')) {
            points = JSON.parse(localStorage.getItem('points'));
        }
        points.push({'redeemedCoins': redeemedCoins});
        localStorage.setItem('points', JSON.stringify(points));


    }
    redeemCoins();
});

Instascan.Camera.getCameras().then(function (cameras) {
    if (cameras.length > 0) {
        scanner.start(cameras[0]);
    } else {
        console.error('No cameras found.');
    }
}).catch(function (e) {
    console.error(e);
});

function redeemCoins(){
    var retrievedData = localStorage.getItem('points');
    var total = 0;
    var objectArray = JSON.parse(retrievedData);
    for (var i = 0; i < objectArray.length; i++) {

        var addedcoins = parseFloat(objectArray[i].redeemedCoins);
        total = total + addedcoins;
            console.log("coin totalsssssss => "+ total);

    }
    sendTotalToStorage(total);

}

function sendTotalToStorage(total){
    let totalPoints = [];

    if (localStorage.getItem('totalPoints')) {
        totalPoints = JSON.parse(localStorage.getItem('totalPoints'));
    }
    totalPoints.push({'totalPoints': total});
    localStorage.setItem('totalPoints', JSON.stringify(totalPoints));
    alert(JSON.stringify(totalPoints))

}


function retrieveTotalPoints() {
   alert("reacheddddddd")
    var retrievedData = localStorage.getItem('totalPoints');
    var objectArray = JSON.parse(retrievedData);
        for (var i = 0; i <objectArray.length; i++) {
            totalPoints =  objectArray[i].totalPoints;
        }
        alert("totalPoints"+totalPoints)

        $("#total-points").append(`<span> ${totalPoints}</span>`);
    $(".point_discount").append(`<span> LKR ${totalPoints}</span>`);

}

