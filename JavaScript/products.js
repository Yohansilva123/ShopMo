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