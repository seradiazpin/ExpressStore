$(document).ready(function () {
    //Initialize tooltips
    $('.error1').hide();
    $('.error2').hide();
    $('.nav-tabs > li a[title]').tooltip();

    //Wizard
    $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {

        var $target = $(e.target);

        if ($target.parent().hasClass('disabled')) {
            return false;
        }
    });

    $(".next-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        $active.next().removeClass('disabled');
        nextTab($active);

    });
    $(".next-stepData").click(function (e) {

        if(validateStair()){
            var $active = $('.wizard .nav-tabs li.active');
            $active.next().removeClass('disabled');
            nextTab($active);
        }
        else {
            console.log("LOL");
        }

    });

    $(".prev-step").click(function (e) {

        var $active = $('.wizard .nav-tabs li.active');
        prevTab($active);

    });
    $('#formId').on('change', function() {
        if($('#formId').val() === "R"){
            $('#formCondition').hide();
        }else{
            $('#formCondition').show();
        }
    });




});

function validateStair() {
    var formStai = $('#formId').val();
    var ancho = $('#ancho').val();
    var alto = $('#alto').val();
    var largo = $('#largo').val();
    var constL = 280/170;
    if(formStai === "R") {
        if(ancho/alto < constL){
            $('.error1').show();
            return false;
        }else{
            $('.error1').hide();
            return true;
        }
    }
    if(formStai === "U"){
        var calc = (ancho - (largo/2))/(alto/2);
        if(calc < constL){
            $('.error2').show();
            return false;
        }else {
            $('.error2').hide();
            return true;
        }
    }


}

function nextTab(elem) {
    $(elem).next().find('a[data-toggle="tab"]').click();
}
function prevTab(elem) {
    $(elem).prev().find('a[data-toggle="tab"]').click();
}
