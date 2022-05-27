"use strict";
var $portfolio_filter,$grid_selectors,$blog,$port_filter;
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};


/*==============================================================
 owl slider
 ==============================================================*/

$(document).ready(function () {

    shrink_navigation();
    resizefullscreen();

    var isMobile = false;
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        isMobile = true;
    }
    
    $('.owl-slider-full').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        items: 3,
        paginationSpeed: 400,
        autoPlay: 5000,
        singleItem: true,
        navigationText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>']
    });
    
    $('.owl-slider-style2').owlCarousel({
        navigation: true, // Show next and prev buttons
        slideSpeed: 300,
        items: 1,
        itemsDesktop: [1200, 1],
        itemsTablet: [800, 1],
        itemsMobile: [700, 1],
        paginationSpeed: 400,
         navigationText: ['<i class="fas fa-long-arrow-alt-left"></i>', '<i class="fas fa-long-arrow-alt-right"></i>']
    });

    $('.testimonial-style3').owlCarousel({
        navigation: false,
        items: 3,
        itemsDesktop: [1200, 3],
        itemsTablet: [800, 2],
        itemsMobile: [700, 1]
    });

   	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false
    });

    //set equalize height
    $('.equalize').equalize();

    //fit videos
    $(".fit-videos").fitVids();


    /* ===================================
     counter number reset while scrolling
     ====================================== */
    $('.timer').removeClass('appear');
    $('.timer').appear();
    $(document.body).on('appear', '.timer', function (e) {
        // this code is executed for each appeared element
        if (!$(this).hasClass('appear')) {
            animatecounters();
            $(this).addClass('appear');
        }
    });

/*==============================================================
    set parallax
 ==============================================================*/

    if($('.parallax-background-img').length > 0){
        SetParallax();
    }
    
    $('.parallax-fix').each(function () {
        if ($(this).children('.parallax-background-img').length) {
            var imgSrc = jQuery(this).children('.parallax-background-img').attr('src');
            jQuery(this).css('background', 'url("' + imgSrc + '")');
            jQuery(this).children('.parallax-background-img').remove();
            $(this).css('background-position', '50% 0%');
        }

    });
    var IsParallaxGenerated = false;
    function SetParallax() {
        
        if ($(window).width() > 1030 && !IsParallaxGenerated) {
            $('.parallax1').parallax("50%", 0.1);
            $('.parallax2').parallax("50%", 0.2);
            $('.parallax3').parallax("50%", 0.3);
            $('.parallax4').parallax("50%", 0.4);
            $('.parallax5').parallax("50%", 0.5);
            $('.parallax6').parallax("50%", 0.6);
            $('.parallax7').parallax("50%", 0.7);
            $('.parallax8').parallax("50%", 0.8);
            $('.parallax9').parallax("50%", 0.05);
            $('.parallax10').parallax("50%", 0.02);
            $('.parallax11').parallax("50%", 0.01);
            $('.parallax12').parallax("50%", 0.099);
            IsParallaxGenerated = true;
        }
    }


    /*==============================================================
        full screen Height
     ==============================================================*/

    function resizefullscreen() {
        var minheight = $(window).height();
        $(".fullscreen").css('min-height', minheight);
    }
    

    $(window).resize(function () {
        resizefullscreen();
    });

    /* ===================================
     Toggle Close 
     ====================================== */
    $(document).on('click', 'ul.navbar-nav li', function (event) { 
        $('#bs-example-navbar-collapse-1').removeClass('in');
        $('#bs-example-navbar-collapse-1').addClass('collapse');
        $('.navbar-toggle').addClass('collapsed');
    });


    /* ===================================
     masonry
     ====================================== */

    $blog = $('.masonry-items');
    $blog.imagesLoaded(function () {
        $blog.isotope({
            itemSelector: 'li',
            layoutMode: 'masonry'
        });
    });

    /*==============================================================*/
    //Lightbox gallery - START CODE
    /*==============================================================*/
    
     $('.lightbox-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        closeOnContentClick: true,
        closeBtnInside: false,
        midClick: true,
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-fade',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.',
            titleSrc: function (item) {
                return item.el.attr('title');
            }
        },
        callbacks: {
                open: function () {
                    $.magnificPopup.instance.close = function() {
                        if (!isMobile){
                            $.magnificPopup.proto.close.call(this);
                        } else {
                            $(document).on('click', 'button.mfp-close', function (event) {
                               $.magnificPopup.proto.close.call(this);
                            });
                        }
                    }
                }
            }
    });

    /*==============================================================
     smooth scroll With Shrink Navigation
     ==============================================================*/

    $(window).scroll(function () {
        
        var shrink_header = $('.shrink-header').length;
        var shrink_medium_header = $('.shrink-medium-header').length;
        var shrink_transparent_header_light = $('.shrink-transparent-header-light').length;
        var shrink_transparent_header_dark = $('.shrink-transparent-header-dark').length;
        if(shrink_medium_header)
        {
            var windowsize = $(window).width();
            if(windowsize <= 991 && windowsize == 768 || windowsize <= 767)
            {
              var header_offset = -72;
            }else{
              var header_offset = -82;
            }
            
        }else if(shrink_header || shrink_transparent_header_light || shrink_transparent_header_dark){
            var windowsize = $(window).width();
            
              var header_offset = -74;
                       
        }else{
            var header_offset = 1;
        }
        $('.inner-link').smoothScroll({
            speed: 900,
            offset: header_offset
        });

        $('a.btn:not(.inner-link)').smoothScroll({
            speed: 900,
            offset: header_offset
        });
        
        if($('#sidebar-wrapper').length){
            var windowsize = $(window).width();
            if(windowsize <= 991 && windowsize == 768)
            {
              var header_sidebar_offset = -58;
            }else if(windowsize <= 767){
              var header_sidebar_offset = -60;
            }else{
              var header_sidebar_offset = 1;
            }

            $('.section-link').smoothScroll({
                speed: 900,
                offset: header_sidebar_offset
            });
        }
    });

    /* ===================================
     shrink navigation Active
     ====================================== */
    $('.navigation-menu').onePageNav({
        scrollSpeed: 750,
        scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
        scrollOffset: 79, //Height of Navigation Bar
        currentClass: 'active',
        filter: ':not(.btn-very-small)'
    });

    $('.navigation-center-menu').onePageNav({
        scrollSpeed: 750,
        scrollThreshold: 0.2, // Adjust if Navigation highlights too early or too late
        scrollOffset: 79, //Height of Navigation Bar
        currentClass: 'active',
        filter: ':not(.btn-very-small)'
    });

    /*===========================================================
     All Contact Forms 
     ============================================================ */

     /* Architecture Form */

     $('#architecture-submit').on('click', function (event) {

        event.preventDefault();
        var email_process = '';
        if ($('#email').is('[data-field="required"]')) {
            var email_val = $('#email').val();
            if (email_val != '') {
                email_val = email_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#email').addClass('msg_error');
                email_process = false;
            }
        }

        var captcha_length = $('.g-recaptcha').length;
        if (captcha_length >= 1) {
            var response = grecaptcha.getResponse();
            //recaptcha failed validation
            if (response.length == 0) {
                $('#loading').remove();
                $('#google-recaptcha-error').remove();
                $('#architecture-submit').find('.g-recaptcha').after('<span class="google-recaptcha-error" id="google-recaptcha-error">Invalid recaptcha</span>');
                email_process = false;
            } else {
                $('#google-recaptcha-error').remove();
                $('#recaptcha-error').hide();
                email_process = true;
            }
        }
            
        if(email_process) 
        {
            $.post("email_apis/architecture-contact.php", {
                data: { email:email_val},
                type: "POST",
            }, function (data) {
                if(data) 
                {
                    if(data.type == "msg_success") 
                    {
                        $('#success').remove();
                        $('#error').remove(); 
                       var output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else if (data.type == "msg_error") {
                        $('#success').remove();
                        $('#error').remove(); 
                        var output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else{
                        var output = '';
                    } 
                }

                if(output != '')
                {
                    $('form').before(output);
                }
                setTimeout(function(){
                    $('#success').fadeOut();
                    $('#success').remove();
                    $('#error').fadeOut();
                    $('#error').remove();
                    $('#architecture-submit').submit();
                 },5000);
                
            }, 'json');
        }
        
        
        $('#email').keypress(function () {
            $(this).removeClass('msg_error');
        });

        if ($('#email').is(":focus")) {
            $(this).removeClass('msg_error');
        }

    });


      /* Business Form */

    $('#business-submit').on('click', function (event) {

        event.preventDefault();
        var email_process = '';
        if ($('#name').is('[data-field="required"]')) {
            var name_val = $('#name').val();
            if (name_val != '') {
                name_val = name_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#name').addClass('msg_error');
                email_process = false;
            }
        }

        if ($('#email').is('[data-field="required"]')) {
            var email_val = $('#email').val();
            if (email_val != '') {
                email_val = email_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#email').addClass('msg_error');
                email_process = false;
            }
        }

        var captcha_length = $('.g-recaptcha').length;
        if (captcha_length >= 1) {
            var response = grecaptcha.getResponse();
            //recaptcha failed validation
            if (response.length == 0) {
                $('#loading').remove();
                $('#google-recaptcha-error').remove();
                $('#business-submit').find('.g-recaptcha').after('<span class="google-recaptcha-error" id="google-recaptcha-error">Invalid recaptcha</span>');
                email_process = false;
            } else {
                $('#google-recaptcha-error').remove();
                $('#recaptcha-error').hide();
                email_process = true;
            }
        }
            
        if(email_process) 
        {
            $.post("email_apis/business-contact.php", {
                data: { name: name_val,email:email_val},
                type: "POST",
            }, function (data) {
                if(data) 
                {
                    if(data.type == "msg_success") 
                    {
                        $('#success').remove();
                        $('#error').remove(); 
                       var output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else if (data.type == "msg_error") {
                        $('#success').remove();
                        $('#error').remove(); 
                        var output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else{
                        var output = '';
                    } 
                }
                
                if(output != '')
                {
                    $('form').before(output);
                }
                setTimeout(function(){
                    $('#success').fadeOut();
                    $('#success').remove();
                    $('#error').fadeOut();
                    $('#error').remove();
                    $('#business-submit').submit();
                 },5000);
                
            }, 'json');
        }
        
        
        $('#email').keypress(function () {
            $(this).removeClass('msg_error');
        });

        $('#name').keypress(function () {
            $(this).removeClass('msg_error');
        });

        if ($('#email').is(":focus")) {
            $(this).removeClass('msg_error');
        }

        if ($('#name').is(":focus")) {
            $(this).removeClass('msg_error');
        }
    });


    /* Event Form */

     $('#event-submit').on('click', function (event) {

        event.preventDefault();
        var email_process = '';
        if ($('#email').is('[data-field="required"]')) {
            var email_val = $('#email').val();
            if (email_val != '') {
                email_val = email_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#email').addClass('msg_error');
                email_process = false;
            }
        }

        var captcha_length = $('.g-recaptcha').length;
        if (captcha_length >= 1) {
            var response = grecaptcha.getResponse();
            //recaptcha failed validation
            if (response.length == 0) {
                $('#loading').remove();
                $('#google-recaptcha-error').remove();
                $('#event-submit').find('.g-recaptcha').after('<span class="google-recaptcha-error" id="google-recaptcha-error">Invalid recaptcha</span>');
                email_process = false;
            } else {
                $('#google-recaptcha-error').remove();
                $('#recaptcha-error').hide();
                email_process = true;
            }
        }
            
        if(email_process) 
        {
            $.post("email_apis/event-contact.php", {
                data: { email:email_val},
                type: "POST",
            }, function (data) {
                if(data) 
                {
                    if(data.type == "msg_success") 
                    {
                        $('#success').remove();
                        $('#error').remove(); 
                       var output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else if (data.type == "msg_error") {
                        $('#success').remove();
                        $('#error').remove(); 
                        var output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else{
                        var output = '';
                    } 
                }

                if(output != '')
                {
                    $('form').before(output);
                }
                setTimeout(function(){
                    $('#success').fadeOut();
                    $('#success').remove();
                    $('#error').fadeOut();
                    $('#error').remove();
                    $('#event-submit').submit();
                 },5000);
                
            }, 'json');
        }
        
        
        $('#email').keypress(function () {
            $(this).removeClass('msg_error');
        });

        if ($('#email').is(":focus")) {
            $(this).removeClass('msg_error');
        }

    });


     /* Gym Form */

     $('#gym-submit').on('click', function (event) {

        event.preventDefault();
        var email_process = '';
        if ($('#email').is('[data-field="required"]')) {
            var email_val = $('#email').val();
            if (email_val != '') {
                email_val = email_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#email').addClass('msg_error');
                email_process = false;
            }
        }

        var captcha_length = $('.g-recaptcha').length;
        if (captcha_length >= 1) {
            var response = grecaptcha.getResponse();
            //recaptcha failed validation
            if (response.length == 0) {
                $('#loading').remove();
                $('#google-recaptcha-error').remove();
                $('#gym-submit').find('.g-recaptcha').after('<span class="google-recaptcha-error" id="google-recaptcha-error">Invalid recaptcha</span>');
                email_process = false;
            } else {
                $('#google-recaptcha-error').remove();
                $('#recaptcha-error').hide();
                email_process = true;
            }
        }
            
        if(email_process) 
        {
            $.post("email_apis/gym-contact.php", {
                data: { email:email_val},
                type: "POST",
            }, function (data) {
                if(data) 
                {
                    if(data.type == "msg_success") 
                    {
                        $('#success').remove();
                        $('#error').remove(); 
                       var output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else if (data.type == "msg_error") {
                        $('#success').remove();
                        $('#error').remove(); 
                        var output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else{
                        var output = '';
                    } 
                }

                if(output != '')
                {
                    $('form').before(output);
                }
                setTimeout(function(){
                    $('#success').fadeOut();
                    $('#success').remove();
                    $('#error').fadeOut();
                    $('#error').remove();
                    $('#gym-submit').submit();
                 },5000);
                
            }, 'json');
        }
        
        
        $('#email').keypress(function () {
            $(this).removeClass('msg_error');
        });

        if ($('#email').is(":focus")) {
            $(this).removeClass('msg_error');
        }

    });


      /* Photography Form */

     $('#photography-submit').on('click', function (event) {

        event.preventDefault();
        var email_process = '';
        if ($('#email').is('[data-field="required"]')) {
            var email_val = $('#email').val();
            if (email_val != '') {
                email_val = email_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#email').addClass('msg_error');
                email_process = false;
            }
        }

        var captcha_length = $('.g-recaptcha').length;
        if (captcha_length >= 1) {
            var response = grecaptcha.getResponse();
            //recaptcha failed validation
            if (response.length == 0) {
                $('#loading').remove();
                $('#google-recaptcha-error').remove();
                $('#photography-submit').find('.g-recaptcha').after('<span class="google-recaptcha-error" id="google-recaptcha-error">Invalid recaptcha</span>');
                email_process = false;
            } else {
                $('#google-recaptcha-error').remove();
                $('#recaptcha-error').hide();
                email_process = true;
            }
        }
            
        if(email_process) 
        {
            $.post("email_apis/photography-contact.php", {
                data: { email:email_val},
                type: "POST",
            }, function (data) {
                if(data) 
                {
                    if(data.type == "msg_success") 
                    {
                        $('#success').remove();
                        $('#error').remove(); 
                       var output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else if (data.type == "msg_error") {
                        $('#success').remove();
                        $('#error').remove(); 
                        var output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else{
                        var output = '';
                    } 
                }

                if(output != '')
                {
                    $('form').before(output);
                }
                setTimeout(function(){
                    $('#success').fadeOut();
                    $('#success').remove();
                    $('#error').fadeOut();
                    $('#error').remove();
                    $('#photography-submit').submit();
                 },5000);
                
            }, 'json');
        }
        
        
        $('#email').keypress(function () {
            $(this).removeClass('msg_error');
        });

        if ($('#email').is(":focus")) {
            $(this).removeClass('msg_error');
        }

    });


     /* Restaurant Form */

    $('#restaurant-submit').on('click', function (event) {

        event.preventDefault();
        var email_process = '';
        if ($('#name').is('[data-field="required"]')) {
            var name_val = $('#name').val();
            if (name_val != '') {
                name_val = name_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#name').addClass('msg_error');
                email_process = false;
            }
        }

        if ($('#email').is('[data-field="required"]')) {
            var email_val = $('#email').val();
            if (email_val != '') {
                email_val = email_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#email').addClass('msg_error');
                email_process = false;
            }
        }

        if ($('#phone_num').is('[data-field="required"]')) {
            var phone_num = $('#phone_num').val();
            if (phone_num != '') {
                phone_num = phone_num;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#phone_num').addClass('msg_error');
                email_process = false;
            }
        }

        if ($('#comment').is('[data-field="required"]')) {
            var comment = $('#comment').val();
            if (comment != '') {
                comment = comment;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#comment').addClass('msg_error');
                email_process = false;
            }
        }

        var captcha_length = $('.g-recaptcha').length;
        if (captcha_length >= 1) {
            var response = grecaptcha.getResponse();
            //recaptcha failed validation
            if (response.length == 0) {
                $('#loading').remove();
                $('#google-recaptcha-error').remove();
                $('#restaurant-submit').find('.g-recaptcha').after('<span class="google-recaptcha-error" id="google-recaptcha-error">Invalid recaptcha</span>');
                email_process = false;
            } else {
                $('#google-recaptcha-error').remove();
                $('#recaptcha-error').hide();
                email_process = true;
            }
        }
            
        if(email_process) 
        {
            $.post("email_apis/restaurant-contact.php", {
                data: { name: name_val,email:email_val,comment:comment,phone_num:phone_num},
                type: "POST",
            }, function (data) {
                if(data) 
                {
                    if(data.type == "msg_success") 
                    {
                        $('#success').remove();
                        $('#error').remove(); 
                       var output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else if (data.type == "msg_error") {
                        $('#success').remove();
                        $('#error').remove(); 
                        var output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else{
                        var output = '';
                    } 
                }

                if(output != '')
                {
                    $('form').before(output);
                }
                setTimeout(function(){
                    $('#success').fadeOut();
                    $('#success').remove();
                    $('#error').fadeOut();
                    $('#error').remove();
                    $('#restaurant-submit').submit();
                 },5000);
                
            }, 'json');
        }
        
        
        $('#email').keypress(function () {
            $(this).removeClass('msg_error');
        });

        $('#name').keypress(function () {
            $(this).removeClass('msg_error');
        });

        $('#comment').keypress(function () {
            $(this).removeClass('msg_error');
        });

        $('#phone_num').keypress(function () {
            $(this).removeClass('msg_error');
        });

        if ($('#email').is(":focus")) {
            $(this).removeClass('msg_error');
        }

        if ($('#name').is(":focus")) {
            $(this).removeClass('msg_error');
        }

        if ($('#comment').is(":focus")) {
            $(this).removeClass('msg_error');
        }

        if ($('#phone_num').is(":focus")) {
            $(this).removeClass('msg_error');
        }
    });

        

      /* Portfolio Form */

    $('#portfolio-submit').on('click', function (event) {

        event.preventDefault();
        var email_process = '';
        if ($('#email').is('[data-field="required"]')) {
            var email_val = $('#email').val();
            if (email_val != '') {
                email_val = email_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#email').addClass('msg_error');
                email_process = false;
            }
        }

        var captcha_length = $('.g-recaptcha').length;
        if (captcha_length >= 1) {
            var response = grecaptcha.getResponse();
            //recaptcha failed validation
            if (response.length == 0) {
                $('#loading').remove();
                $('#google-recaptcha-error').remove();
                $('#portfolio-submit').find('.g-recaptcha').after('<span class="google-recaptcha-error" id="google-recaptcha-error">Invalid recaptcha</span>');
                email_process = false;
            } else {
                $('#google-recaptcha-error').remove();
                $('#recaptcha-error').hide();
                email_process = true;
            }
        }
            
        if(email_process) 
        {
            $.post("email_apis/portfolio-contact.php", {
                data: {email:email_val},
                type: "POST",
            }, function (data) {
                if(data) 
                {
                    if(data.type == "msg_success") 
                    {
                        $('#success').remove();
                        $('#error').remove(); 
                       var output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else if (data.type == "msg_error") {
                        $('#success').remove();
                        $('#error').remove(); 
                        var output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else{
                        var output = '';
                    } 
                }

                if(output != '')
                {
                    $('form').before(output);
                }
                setTimeout(function(){
                    $('#success').fadeOut();
                    $('#success').remove();
                    $('#error').fadeOut();
                    $('#error').remove();
                    $('#portfolio-submit').submit();
                 },5000);
                
            }, 'json');
        }
        
        
        $('#email').keypress(function () {
            $(this).removeClass('msg_error');
        });

        if ($('#email').is(":focus")) {
            $(this).removeClass('msg_error');
        }

    });


    /* Simple Sign Up Form */

    $('#signup-submit').on('click', function (event) {

        event.preventDefault();
        var email_process = '';
        if ($('#name').is('[data-field="required"]')) {
            var name_val = $('#name').val();
            if (name_val != '') {
                name_val = name_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#name').addClass('msg_error');
                email_process = false;
            }
        }

        if ($('#email').is('[data-field="required"]')) {
            var email_val = $('#email').val();
            if (email_val != '') {
                email_val = email_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#email').addClass('msg_error');
                email_process = false;
            }
        }

        var comment = $('#comment').val();        

        var captcha_length = $('.g-recaptcha').length;
        if (captcha_length >= 1) {
            var response = grecaptcha.getResponse();
            //recaptcha failed validation
            if (response.length == 0) {
                $('#loading').remove();
                $('#google-recaptcha-error').remove();
                $('#signup-submit').find('.g-recaptcha').after('<span class="google-recaptcha-error" id="google-recaptcha-error">Invalid recaptcha</span>');
                email_process = false;
            } else {
                $('#google-recaptcha-error').remove();
                $('#recaptcha-error').hide();
                email_process = true;
            }
        }
            
        if(email_process) 
        {
            $.post("email_apis/signup-contact.php", {
                data: { name: name_val,email:email_val,comment:comment},
                type: "POST",
            }, function (data) {
                if(data) 
                {
                    if(data.type == "msg_success") 
                    {
                        $('#success').remove();
                        $('#error').remove(); 
                       var output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else if (data.type == "msg_error") {
                        $('#success').remove();
                        $('#error').remove(); 
                        var output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else{
                        var output = '';
                    } 
                }

                if(output != '')
                {
                    $('form').before(output);
                }
                setTimeout(function(){
                    $('#success').fadeOut();
                    $('#success').remove();
                    $('#error').fadeOut();
                    $('#error').remove();
                    $('#signup-submit').submit();
                 },5000);
                
            }, 'json');
        }
        
        
        $('#email').keypress(function () {
            $(this).removeClass('msg_error');
        });

        $('#name').keypress(function () {
            $(this).removeClass('msg_error');
        });

        if ($('#email').is(":focus")) {
            $(this).removeClass('msg_error');
        }

        if ($('#name').is(":focus")) {
            $(this).removeClass('msg_error');
        }
    });

    /* Spa Form */

    $('#spa-submit').on('click', function (event) {

        event.preventDefault();
        var email_process = '';
        if ($('#name').is('[data-field="required"]')) {
            var name_val = $('#name').val();
            if (name_val != '') {
                name_val = name_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#name').addClass('msg_error');
                email_process = false;
            }
        }

        if ($('#email').is('[data-field="required"]')) {
            var email_val = $('#email').val();
            if (email_val != '') {
                email_val = email_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#email').addClass('msg_error');
                email_process = false;
            }
        }

        var comment = $('#comment').val();        

        var captcha_length = $('.g-recaptcha').length;
        if (captcha_length >= 1) {
            var response = grecaptcha.getResponse();
            //recaptcha failed validation
            if (response.length == 0) {
                $('#loading').remove();
                $('#google-recaptcha-error').remove();
                $('#spa-submit').find('.g-recaptcha').after('<span class="google-recaptcha-error" id="google-recaptcha-error">Invalid recaptcha</span>');
                email_process = false;
            } else {
                $('#google-recaptcha-error').remove();
                $('#recaptcha-error').hide();
                email_process = true;
            }
        }
            
        if(email_process) 
        {
            $.post("email_apis/spa-contact.php", {
                data: { name: name_val,email:email_val,comment:comment},
                type: "POST",
            }, function (data) {
                if(data) 
                {
                    if(data.type == "msg_success") 
                    {
                        $('#success').remove();
                        $('#error').remove(); 
                       var output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else if (data.type == "msg_error") {
                        $('#success').remove();
                        $('#error').remove(); 
                        var output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else{
                        var output = '';
                    } 
                }

                if(output != '')
                {
                    $('form').before(output);
                }
                setTimeout(function(){
                    $('#success').fadeOut();
                    $('#success').remove();
                    $('#error').fadeOut();
                    $('#error').remove();
                    $('#spa-submit').submit();
                 },5000);
                
            }, 'json');
        }
        
        
        $('#email').keypress(function () {
            $(this).removeClass('msg_error');
        });

        $('#name').keypress(function () {
            $(this).removeClass('msg_error');
        });

        if ($('#email').is(":focus")) {
            $(this).removeClass('msg_error');
        }

        if ($('#name').is(":focus")) {
            $(this).removeClass('msg_error');
        }
    });

        /* Travel Form */

     $('#travel-submit').on('click', function (event) {

        event.preventDefault();
        var email_process = '';
        if ($('#email').is('[data-field="required"]')) {
            var email_val = $('#email').val();
            if (email_val != '') {
                email_val = email_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#email').addClass('msg_error');
                email_process = false;
            }
        }

        var captcha_length = $('.g-recaptcha').length;
        if (captcha_length >= 1) {
            var response = grecaptcha.getResponse();
            //recaptcha failed validation
            if (response.length == 0) {
                $('#loading').remove();
                $('#google-recaptcha-error').remove();
                $('#travel-submit').find('.g-recaptcha').after('<span class="google-recaptcha-error" id="google-recaptcha-error">Invalid recaptcha</span>');
                email_process = false;
            } else {
                $('#google-recaptcha-error').remove();
                $('#recaptcha-error').hide();
                email_process = true;
            }
        }
            
        if(email_process) 
        {
            $.post("email_apis/travel-contact.php", {
                data: { email:email_val},
                type: "POST",
            }, function (data) {
                if(data) 
                {
                    if(data.type == "msg_success") 
                    {
                        $('#success').remove();
                        $('#error').remove(); 
                       var output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else if (data.type == "msg_error") {
                        $('#success').remove();
                        $('#error').remove(); 
                        var output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else{
                        var output = '';
                    } 
                }

                if(output != '')
                {
                    $('form').before(output);
                }
                setTimeout(function(){
                    $('#success').fadeOut();
                    $('#success').remove();
                    $('#error').fadeOut();
                    $('#error').remove();
                    $('#travel-submit').submit();
                 },5000);
                
            }, 'json');
        }
        
        
        $('#email').keypress(function () {
            $(this).removeClass('msg_error');
        });

        if ($('#email').is(":focus")) {
            $(this).removeClass('msg_error');
        }

    });

     /* Weding Planner Form */

    $('#wedplan-submit').on('click', function (event) {

        event.preventDefault();
        var email_process = '';
        if ($('#name').is('[data-field="required"]')) {
            var name_val = $('#name').val();
            if (name_val != '') {
                name_val = name_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#name').addClass('msg_error');
                email_process = false;
            }
        }

        if ($('#email').is('[data-field="required"]')) {
            var email_val = $('#email').val();
            if (email_val != '') {
                email_val = email_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#email').addClass('msg_error');
                email_process = false;
            }
        }

        var comment = $('#comment').val();        

        var captcha_length = $('.g-recaptcha').length;
        if (captcha_length >= 1) {
            var response = grecaptcha.getResponse();
            //recaptcha failed validation
            if (response.length == 0) {
                $('#loading').remove();
                $('#google-recaptcha-error').remove();
                $('#wedplan-submit').find('.g-recaptcha').after('<span class="google-recaptcha-error" id="google-recaptcha-error">Invalid recaptcha</span>');
                email_process = false;
            } else {
                $('#google-recaptcha-error').remove();
                $('#recaptcha-error').hide();
                email_process = true;
            }
        }
            
        if(email_process) 
        {
            $.post("email_apis/weplan-contact.php", {
                data: { name: name_val,email:email_val,comment:comment},
                type: "POST",
            }, function (data) {
                if(data) 
                {
                    if(data.type == "msg_success") 
                    {
                        $('#success').remove();
                        $('#error').remove(); 
                       var output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else if (data.type == "msg_error") {
                        $('#success').remove();
                        $('#error').remove(); 
                        var output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else{
                        var output = '';
                    } 
                }

                if(output != '')
                {
                    $('form').before(output);
                }
                setTimeout(function(){
                    $('#success').fadeOut();
                    $('#success').remove();
                    $('#error').fadeOut();
                    $('#error').remove();
                    $('#wedplan-submit').submit();
                 },5000);
                
            }, 'json');
        }
        
        
        $('#email').keypress(function () {
            $(this).removeClass('msg_error');
        });

        $('#name').keypress(function () {
            $(this).removeClass('msg_error');
        });

        if ($('#email').is(":focus")) {
            $(this).removeClass('msg_error');
        }

        if ($('#name').is(":focus")) {
            $(this).removeClass('msg_error');
        }
    });

     /* Coming Soon Style1 Form */

    $('#coming-soon-style1-submit').on('click', function (event) {

        event.preventDefault();
        var email_process = '';
        if ($('#email').is('[data-field="required"]')) {
            var email_val = $('#email').val();
            if (email_val != '') {
                email_val = email_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#email').addClass('msg_error');
                email_process = false;
            }
        }

        var captcha_length = $('.g-recaptcha').length;
        if (captcha_length >= 1) {
            var response = grecaptcha.getResponse();
            //recaptcha failed validation
            if (response.length == 0) {
                $('#loading').remove();
                $('#google-recaptcha-error').remove();
                $('#coming-soon-style1-submit').find('.g-recaptcha').after('<span class="google-recaptcha-error" id="google-recaptcha-error">Invalid recaptcha</span>');
                email_process = false;
            } else {
                $('#google-recaptcha-error').remove();
                $('#recaptcha-error').hide();
                email_process = true;
            }
        }
            
        if(email_process) 
        {
            $.post("email_apis/coming-soon-style1-contact.php", {
                data: {email:email_val},
                type: "POST",
            }, function (data) {
                if(data) 
                {
                    if(data.type == "msg_success") 
                    {
                        $('#success').remove();
                        $('#error').remove(); 
                       var output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else if (data.type == "msg_error") {
                        $('#success').remove();
                        $('#error').remove(); 
                        var output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else{
                        var output = '';
                    } 
                }

                if(output != '')
                {
                    $('form').before(output);
                }
                setTimeout(function(){
                    $('#success').fadeOut();
                    $('#success').remove();
                    $('#error').fadeOut();
                    $('#error').remove();
                    $('#coming-soon-style1-submit').submit();
                 },5000);
                
            }, 'json');
        }
        
        
        $('#email').keypress(function () {
            $(this).removeClass('msg_error');
        });

        if ($('#email').is(":focus")) {
            $(this).removeClass('msg_error');
        }

    });

     /* Coming Soon Style2 Form */

    $('#coming-soon-style2-submit').on('click', function (event) {

        event.preventDefault();
        var email_process = '';
        if ($('#email').is('[data-field="required"]')) {
            var email_val = $('#email').val();
            if (email_val != '') {
                email_val = email_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#email').addClass('msg_error');
                email_process = false;
            }
        }

        var captcha_length = $('.g-recaptcha').length;
        if (captcha_length >= 1) {
            var response = grecaptcha.getResponse();
            //recaptcha failed validation
            if (response.length == 0) {
                $('#loading').remove();
                $('#google-recaptcha-error').remove();
                $('#coming-soon-style2-submit').find('.g-recaptcha').after('<span class="google-recaptcha-error" id="google-recaptcha-error">Invalid recaptcha</span>');
                email_process = false;
            } else {
                $('#google-recaptcha-error').remove();
                $('#recaptcha-error').hide();
                email_process = true;
            }
        }
            
        if(email_process) 
        {
            $.post("email_apis/coming-soon-style2-contact.php", {
                data: {email:email_val},
                type: "POST",
            }, function (data) {
                if(data) 
                {
                    if(data.type == "msg_success") 
                    {
                        $('#success').remove();
                        $('#error').remove(); 
                       var output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else if (data.type == "msg_error") {
                        $('#success').remove();
                        $('#error').remove(); 
                        var output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else{
                        var output = '';
                    } 
                }

                if(output != '')
                {
                   $('form').before(output);
                }
                setTimeout(function(){
                    $('#success').fadeOut();
                    $('#success').remove();
                    $('#error').fadeOut();
                    $('#error').remove();
                    $('#coming-soon-style2-submit').submit();
                 },5000);
                
            }, 'json');
        }
        
        
        $('#email').keypress(function () {
            $(this).removeClass('msg_error');
        });

        if ($('#email').is(":focus")) {
            $(this).removeClass('msg_error');
        }

    });


     /* Coming Soon Style3 Form */

    $('#coming-soon-style3-submit').on('click', function (event) {

        event.preventDefault();
        var email_process = '';
        if ($('#email').is('[data-field="required"]')) {
            var email_val = $('#email').val();
            if (email_val != '') {
                email_val = email_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#email').addClass('msg_error');
                email_process = false;
            }
        }

        var captcha_length = $('.g-recaptcha').length;
        if (captcha_length >= 1) {
            var response = grecaptcha.getResponse();
            //recaptcha failed validation
            if (response.length == 0) {
                $('#loading').remove();
                $('#google-recaptcha-error').remove();
                $('#coming-soon-style3-submit').find('.g-recaptcha').after('<span class="google-recaptcha-error" id="google-recaptcha-error">Invalid recaptcha</span>');
                email_process = false;
            } else {
                $('#google-recaptcha-error').remove();
                $('#recaptcha-error').hide();
                email_process = true;
            }
        }
            
        if(email_process) 
        {
            $.post("email_apis/coming-soon-style3-contact.php", {
                data: {email:email_val},
                type: "POST",
            }, function (data) {
                if(data) 
                {
                    if(data.type == "msg_success") 
                    {
                        $('#success').remove();
                        $('#error').remove(); 
                       var output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else if (data.type == "msg_error") {
                        $('#success').remove();
                        $('#error').remove(); 
                        var output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else{
                        var output = '';
                    } 
                }

                if(output != '')
                {
                    $('form').before(output);
                }
                setTimeout(function(){
                    $('#success').fadeOut();
                    $('#success').remove();
                    $('#error').fadeOut();
                    $('#error').remove();
                    $('#coming-soon-style3-submit').submit();
                 },5000);
                
            }, 'json');
        }
        
        
        $('#email').keypress(function () {
            $(this).removeClass('msg_error');
        });

        if ($('#email').is(":focus")) {
            $(this).removeClass('msg_error');
        }

    });

     /* Coming Soon Style4 Form */

    $('#coming-soon-style4-submit').on('click', function (event) {

        event.preventDefault();
        var email_process = '';
        if ($('#email').is('[data-field="required"]')) {
            var email_val = $('#email').val();
            if (email_val != '') {
                email_val = email_val;
                email_process = true;
            } else {
                $('#loading').remove();
                $('#email').addClass('msg_error');
                email_process = false;
            }
        }

        var captcha_length = $('.g-recaptcha').length;
        if (captcha_length >= 1) {
            var response = grecaptcha.getResponse();
            //recaptcha failed validation
            if (response.length == 0) {
                $('#loading').remove();
                $('#google-recaptcha-error').remove();
                $('#coming-soon-style4-submit').find('.g-recaptcha').after('<span class="google-recaptcha-error" id="google-recaptcha-error">Invalid recaptcha</span>');
                email_process = false;
            } else {
                $('#google-recaptcha-error').remove();
                $('#recaptcha-error').hide();
                email_process = true;
            }
        }
            
        if(email_process) 
        {
            $.post("email_apis/coming-soon-style4-contact.php", {
                data: {email:email_val},
                type: "POST",
            }, function (data) {
                if(data) 
                {
                    if(data.type == "msg_success") 
                    {
                        $('#success').remove();
                        $('#error').remove(); 
                       var output = '<div id="success" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else if (data.type == "msg_error") {
                        $('#success').remove();
                        $('#error').remove(); 
                        var output = '<div id="error" class="no-margin-lr alt-font">'+data.text+'</div>';
                    }else{
                        var output = '';
                    } 
                }

                if(output != '')
                {
                    $('form').before(output);
                }
                setTimeout(function(){
                    $('#success').fadeOut();
                    $('#success').remove();
                    $('#error').fadeOut();
                    $('#error').remove();
                    $('#coming-soon-style4-submit').submit();
                 },5000);
                
            }, 'json');
        }
        
        
        $('#email').keypress(function () {
            $(this).removeClass('msg_error');
        });

        if ($('#email').is(":focus")) {
            $(this).removeClass('msg_error');
        }

    });

});

/* ===================================
 shrink navigation
 ====================================== */
$(window).scroll(function () {
    shrink_navigation();
});

function shrink_navigation() {
    if ($('nav').hasClass('shrink-header')) {
        $('.shrink-header').addClass('shrink-nav');
    } else if ($('nav').hasClass('shrink-big-header')) {
        $('.shrink-big-header').addClass('shrink-nav');
    } else if ($('nav').hasClass('shrink-medium-header')) {
        $('.shrink-medium-header').addClass('shrink-nav');
    } else if ($('nav').hasClass('shrink-transparent-header-dark')) {
        $('.shrink-transparent-header-dark').addClass('shrink-nav');
    } else if ($('nav').hasClass('shrink-transparent-header-light')) {
        $('.shrink-transparent-header-light').addClass('shrink-nav');
    } else {
        $('.shrink-header').removeClass('shrink-nav');
    }

    if ($(window).scrollTop() > 10) {
        $('nav').addClass('shrink');
    } else {
        $('nav').removeClass('shrink');
    }
}

setTimeout(function () {
    $(window).scroll();
}, 500);


/*==============================================================
 portfolio-filter
 ==============================================================*/

$portfolio_filter = $('.grid');
$portfolio_filter.imagesLoaded(function () {
    $portfolio_filter.isotope({
        itemSelector: 'li',
        layoutMode: 'masonry'
    });
});

$grid_selectors = $('.portfolio-filter > li > a');
$grid_selectors.on('click', function ()
{
    $portfolio_filter = $('.grid');
    $('.portfolio-filter > li').removeClass('active');
    $(this).parent().addClass('active');

    var selector = $(this).attr('data-filter');
    $portfolio_filter.imagesLoaded(function () {
        $portfolio_filter.isotope({
            filter: selector,
            itemSelector: 'li',
            layoutMode: 'masonry'

        });
    });
    return false;
});

$(window).resize(function () {
    setTimeout(function () {
        $portfolio_filter.isotope('layout');
        //set equalize height
        if (!isMobile.any()) {
            $(window).unbind('equalize');
            $('.equalize').equalize({reset: true});
        }
    }, 500);
});

$(window).on("orientationchange", function () {
    if (isMobile.any()) {
        $(window).unbind('equalize');
        setTimeout(function () {
            $('.equalize').equalize();
        }, 500);
    }
});

$(window).load(function () {
    //set equalize height
    $('.equalize').equalize();
});

/*==============================================================
 countdown timer
 ==============================================================*/

$('#counter-event').countdown($('#counter-event').attr("data-enddate")).on('update.countdown', function (event) {
    var $this = $(this).html(event.strftime('' + '<div class="counter-container"><div class="counter-box first"><div class="number">%-D</div><span>Day%!d</span></div>' + '<div class="counter-box"><div class="number">%H</div><span>Hours</span></div>' + '<div class="counter-box"><div class="number">%M</div><span>Minutes</span></div>' + '<div class="counter-box last"><div class="number">%S</div><span>Seconds</span></div></div>'))
});

/*==============================================================
 counter
 ==============================================================*/

jQuery(function ($) {
    // start all the timers
    animatecounters();
});

function animatecounters() {
    $('.timer').each(count);
    function count(options) {
        var $this = $(this);
        options = $.extend({}, options || {}, $this.data('countToOptions') || {});
        $this.countTo(options);
    }

}

/*==============================================================
 wow animation - on scroll
 ==============================================================*/

var wow = new WOW({
    boxClass: 'wow',
    animateClass: 'animated',
    offset: 90,
    mobile: false,
    live: true
});
wow.init();

/*==============================================================
 Background Animations
 ==============================================================*/
 
if(document.getElementById('particles'))
{
    document.addEventListener('DOMContentLoaded', function () {
        particleground(document.getElementById('particles'), {
            dotColor: '#fff',
            lineColor: '#fff'
        });
        var intro = document.getElementById('intro');
        intro.style.marginTop = - intro.offsetHeight / 2 + 'px';
    }, false);
}