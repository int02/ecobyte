function toggleTheme() {
    var html = document.documentElement;
    var currentTheme = html.getAttribute('data-theme') || 'light';
    var newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateFavicon(newTheme);
}

function updateFavicon(theme) {
    var favicon = document.getElementById('favicon');
    if (!favicon) return;
    var canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    var ctx = canvas.getContext('2d');
    var bgColor = theme === 'dark' ? '#4ade80' : '#1b4332';
    var img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = function() {
        ctx.fillStyle = bgColor;
        if (ctx.roundRect) {
            ctx.beginPath();
            ctx.roundRect(0, 0, 64, 64, 12);
            ctx.fill();
        } else {
            ctx.fillRect(0, 0, 64, 64);
        }
        ctx.drawImage(img, 8, 8, 48, 48);
        try {
            favicon.href = canvas.toDataURL('image/png');
        } catch (e) {}
    };
    img.onerror = function() {};
    img.src = 'img/ecobytevertical.png';
}

(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner(0);


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.fixed-top .container').addClass('shadow-sm').css('max-width', '100%');
        } else {
            $('.fixed-top .container').removeClass('shadow-sm').css('max-width', '85%');
        }
    });


    // Donation
    $('.progress').waypoint(function () {
        $('.progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 5,
        time: 2000
    });


    // Event carousel
    $(".event-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 25,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:1
            },
            992:{
                items:2
            },
            1200:{
                items:3
            }
        }
    });

    
   // Back to top button
   $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });

    // System theme change listener
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
            if (!localStorage.getItem('theme')) {
                var newTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                updateFavicon(newTheme);
            }
        });
    }

})(jQuery);

