// var coins = JSON.parse(localStorage.getItem('coins'));
var coins = "";
var newCoins =0;

let scanner = new Instascan.Scanner({ video: document.getElementById('preview') });
scanner.addListener('scan', function (content) {
    alert(content);
    $("#redeemedCoins").html(content);
    $('#qrScanner').hide();
    document.getElementById("redeemedCoins").innerHTML = content;
    newCoins = content;
    coins = coins + newCoins;
    console.log("coin total => "+coins);
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

