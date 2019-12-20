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

//Slide show
$(document).ready(function () {
    $("#myCarousel").on("slide.bs.carousel", function (e) {
        var $e = $(e.relatedTarget);
        var idx = $e.index();
        var itemsPerSlide = 3;
        var totalItems = $(".carousel-item").length;

        if (idx >= totalItems - (itemsPerSlide - 1)) {
            var it = itemsPerSlide - (totalItems - idx);
            for (var i = 0; i < it; i++) {
// append slides to end
                if (e.direction == "left") {
                    $(".carousel-item")
                        .eq(i)
                        .appendTo(".carousel-inner");
                } else {
                    $(".carousel-item")
                        .eq(0)
                        .appendTo($(this).find(".carousel-inner"));
                }
            }
        }
    });
});

//Timer for FLash sales
// Set the date
var countDownDate = new Date("Jan 1, 2020 12:00:00").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

    // today date and time
    var now = new Date().getTime();

    // Find the distance between now and the count down date
    var distance = countDownDate - now;

    // Time cal for days, hours, minutes and seconds
    var days = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    document.getElementById("countDown").innerHTML = days + "d " + hours + "h "
        + minutes + "m " + seconds + "s ";

    // If the count down is over, write some text
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countDown").innerHTML = "EXPIRED";
    }
}, 1000);

//Delete Cart Items
$(document).ready(function(){
    $("#deletebtn1").click(function(){
        $("#c1").hide("slow");
    });

    $("#deletebtn2").click(function(){
        $("#c2").hide("slow");
    });

    $("#deletebtn3").click(function(){
        $("#c3").hide("slow");
    });
});

//Image Uploader
$("#profileImage").click(function (e) {
    $("#imageUpload").click();
});

function fasterPreview(uploader) {
    if (uploader.files && uploader.files[0]) {
        $('#profileImage').attr('src',
            window.URL.createObjectURL(uploader.files[0]));
    }
}

$("#imageUpload").change(function () {
    fasterPreview(this);
});

//Go Back Function
function goBack() {
    window.history.back();
}

//category overlay
function openNav() {
    document.getElementById("myNav").style.width = "100%";
}

function closeNav() {
    document.getElementById("myNav").style.width = "0%";
}