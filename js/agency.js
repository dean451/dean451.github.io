/*!
 * Start Bootstrap - Agency Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Highlight the top nav as scrolling occurs
$('body').scrollspy({
    target: '.navbar-fixed-top'
})

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

$(function() {
  // Cache the window object
  var $window= $(window);
  
  // Parallax background effect
  $('header[data-type="background"]').each(function() {
    
    var $bgobj = $(this); // assigning the object
    
    $(window).scroll(function() {
      
      //scroll the background at var speed
      // the yPos is a negative value because we're scrolling it UP
      
      var yPos = -($window.scrollTop() / $bgobj.data('speed'));
      
      // Put together our final background position
      
      var coords = '50% '+ yPos + 'px';
      
      // Move the background
      
      $bgobj.css({ backgroundPosition: coords });
      
    });
  });
});