function submenu(){
    /* submenues should be displayed in 2 columns*/
    $('#portal-globalnav ul.submenu').each(function(p_index){
        // add wrapper element for every submenu
        $(this).wrap('<div class="submenu" id="submenu_' + p_index + '" />');
        sm_id= '#submenu_' + p_index;
        childs = $(this).children('li').length;
        // find up rounded middle
        split = Math.ceil(childs/2);
        //Split the list & append new lists
        var $submenuList = $(this), group;
        while((group = $submenuList.find('li:lt(' + split + ')').remove()).length){
            $('<ul class="submenu_col"/>').append(group).appendTo(sm_id);
        }
        //cleanup
        $(sm_id + ' ul.submenu').remove();

    });
    // add helper classes
    $('div.submenu').each(function(){
        $(this).children('.submenu_col:first').addClass('first');
        $(this).children('.submenu_col:last').addClass('last');
    });
}

$(document).ready(function() {

    /* add extra class to last element of global & top navigation*/
    $('#portal-globalnav > li:last').addClass('last');
    $('#topnavi > li:last').addClass('last');

    /*Initiate Submenu helper*/
    submenu();

});
/* bind window resize event */
$(window).resize(function () { 
        $('.carousel').resizeCarousel();
    });