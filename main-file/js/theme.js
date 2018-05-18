/*	
	Theme Name: Prince - One Page Bootstrap 3 Portfolio HTML5 Template	
	Author: Mohammad Al Amin	
	Version: 1.0
*/

(function ($) {
	"use strict";	
	$(document).on('ready', function(){
		
		/* -------------------- Responsive Video Iframe Class Activation Start -------------------- */
		
		$(".video-bg").fitVids();
		
		/* -------------------- Responsive Video Iframe Class Activation End -------------------- */
		
		/* -------------------- Preloader Script Start -------------------- */
		 		
		$(window).on('load', function() {
		   $(".loader").delay(1000).fadeOut("slow");
		   $(".preloader").delay(1000).fadeOut("slow");	
		});
		
		/* -------------------- Preloader Script End -------------------- */
		
		/* -------------------- Prevent default anchor click behavior and Smooth Scroll Start -------------------- */
		
		$("a[href^='#']").on('click' ,function(e) {
		   e.preventDefault();
		   $('html,body').animate( { 
				scrollTop: $(this.hash).offset().top 
			} , 1000);
		});	

		/* -------------------- Prevent default anchor click behavior and Smooth Scroll End -------------------- */
		
		/* -------------------- Scrolling Display Script Start -------------------- */
		
		$(window).on('scroll' ,function() {
			if ($(this).scrollTop() >= 100) {        
				$('#scroll-top-area').fadeIn(600);    
				$('#header').addClass('sticky-header');    
			} else {
				$('#scroll-top-area').fadeOut(600);   
				$('#header').removeClass('sticky-header');   
			}
		});
		
		/* -------------------- Scrolling Display Script End -------------------- */
		
		/* -------------------- Top Slider Activation Start -------------------- */
		
		var homepageSlides = $( '.top-slide-list' );
		
		homepageSlides.owlCarousel({
			loop: true,
			margin: 0,
			navText: ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
			responsiveClass: true,
			lazyLoad: true,
			autoplay: true,
			autoplayTimeout: 5000,
			dots : true,
			nav : true,
			items: 1			
		});
		
		homepageSlides.on('translate.owl.carousel', function(event) {
			$('.single-top-slide-inner-cell h1').removeClass('animated bounceIn');
			$('.single-top-slide-inner-cell h3').removeClass('animated jackInTheBox');
			$('.single-top-slide-inner-cell a').removeClass('animated bounceInLeft');
		});

		homepageSlides.on('translated.owl.carousel', function(event) {
			$('.single-top-slide-inner-cell h1').addClass('animated bounceIn');
			$('.single-top-slide-inner-cell h3').addClass('animated jackInTheBox');
			$('.single-top-slide-inner-cell a').addClass('animated bounceInLeft');
		});
		
		$( ".single-top-slide" ).each(function() {
			
			var attr = $(this).attr('data-image');

			if (typeof attr !== typeof undefined && attr !== false) {
				$(this).css('background-image', 'url('+attr+')');			  
			}

		});
		
		/* -------------------- Top Slider Activation End -------------------- */

		/* -------------------- Skill Progress Bar Start -------------------- */
		
		$('.single-skill').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
			if (visible) {
				$.each($('div.progress-bar'),function(){
					$(this).css('width', $(this).attr('aria-valuenow')+'%');
				});
				$(this).unbind('inview');
			}
		});
		
		/* -------------------- Skill Progress Bar End -------------------- */
		
		/* -------------------- Project Statistics Counter Start -------------------- */
		
		$('.single-statistics-item').bind('inview', function(event, visible, visiblePartX, visiblePartY) {
			if (visible) {
				$('.timer').countTo();
				$(this).unbind('inview');
			}
		});        
		
		/* -------------------- Project Statistics Counter End -------------------- */
		
		/* -------------------- Our Work Prettyphoto Activation Start -------------------- */
		
		$("[data-rel^='prettyPhoto']").prettyPhoto({
			social_tools: false,
			deeplinking: false
		});
		
		/* -------------------- Our Work Prettyphoto Activation End -------------------- */
		
		/* -------------------- Portfolio Masonry script Start -------------------- */

		var pm_masonry = $('.portfolio-filter-action');
		// Our Work Filtering
		$('.portfolio-filter ul li').on('click',function(){
			$('.portfolio-filter ul li').removeClass('active');
			$(this).addClass('active');
			var selector = $(this).attr('data-filter');
			pm_masonry.isotope({ filter: selector });		
			return false;
		});
		
		if (pm_masonry.length > 0) {
			pm_masonry.each(function () {
				
				var pm_masonry = $(this),
					pm_item = pm_masonry.children('.mix'),
					pm_item_d_width = pm_masonry.children('.mix.mix-width2'),
					pm_item_d_height = pm_masonry.children('.mix.mix-double-height'),
					pm_item_h_height = pm_masonry.children('.mix.mix-half-height'),
					pm_item_dh_height = pm_masonry.children('.mix.mix-twothird-height'),

					// Data Attribute 
					pm_gutter_horizontal = pm_masonry.data('items-gap-horizontal'),
					pm_gutter_vertical = pm_masonry.data('items-gap-vertical'),
					pm_gutter_horizontal = pm_gutter_horizontal != undefined ? pm_gutter_horizontal / 2 : 0,
					pm_gutter_vertical = pm_gutter_vertical != undefined ? pm_gutter_vertical / 2 : 0,
					pm_colomns = pm_masonry.data('items-columns'),
					pm_colomns = pm_colomns != undefined ? pm_colomns : 4,
					pm_itemHeight = pm_masonry.data('items-height'),
					pm_itemHeight = pm_itemHeight != undefined ? pm_itemHeight : "grid";

			// Items Wrapper Margin 
				pm_masonry.wrap("<div class='masonry-wrapper'/>");
				pm_masonry.css({
					'margin': -pm_gutter_horizontal + 'px'
				});

				// If Item Height Auto 
				if (pm_itemHeight == "auto") {

					// Item Inner Wrapper Style
					pm_item.wrapInner("<div class='item-inner-wrapper' />");
					pm_masonry.find('.item-inner-wrapper').css({
						'margin-top': pm_gutter_vertical,
						'margin-bottom': pm_gutter_vertical,
						'margin-left': pm_gutter_horizontal,
						'margin-right': pm_gutter_horizontal
					});
					masonryAutoItemSizes();

					$(window).resize(masonryAutoItemSizes);
				}
				// If Item Height Grid Or undefined 
				else if (pm_itemHeight == "grid") {

					// Item Inner Wrapper Style
					pm_item.wrapInner("<div class='item-inner-wrapper' />");
					pm_masonry.find('.item-inner-wrapper').css({
						'position': 'absolute',
						'top': pm_gutter_vertical,
						'bottom': pm_gutter_vertical,
						'left': pm_gutter_horizontal,
						'right': pm_gutter_horizontal
					});

					masonryItemSizes();

					$(window).resize(masonryItemSizes);
				};



				// Masonry Auto Height Item Size
				function masonryAutoItemSizes() {
					var pm_window = $(window).width();
					if (pm_window <= 767) {
						pm_colomns = 1;
					} else {
						pm_colomns = pm_masonry.data('items-columns'),
						pm_colomns = pm_colomns != undefined ? pm_colomns : 3;
					};
					pm_item.width(pm_masonry.width() / pm_colomns);
					
				};

			  
				// Masonry Grid Style Item Size
				function masonryItemSizes() {
					var pm_window = $(window).width();
					if (pm_window <= 767) {
						pm_colomns = 1;
					} else {
						pm_colomns = pm_masonry.data('items-columns'),
						pm_colomns = pm_colomns != undefined ? pm_colomns : 3;
					};
					pm_item.width(pm_masonry.width() / pm_colomns);
					pm_item.height(pm_item.width() * 4 / 5);
					pm_item_d_height.height(pm_item.width() * 7 / 5);
					pm_item_dh_height.height(pm_item.width() * 5 / 5);
					pm_item_h_height.height(pm_item.width() * 2 / 5);
					pm_item_d_width.width(pm_masonry.width() / pm_colomns * 2);

				};

				// Isotope Usage 
				function masonry() {
					pm_masonry.isotope({
						itemSelector: '.mix',
						masonry: { 
							columnWidth: pm_masonry.width() / pm_colomns 
						}
					});
				};
				masonry()

				// Update Masonry On Resize 
				$(window).on("resize", function () {
					masonry();
				});

			});
			
			// Isotope Load more button
			
			var initShow = 7; // number of items loaded on init & onclick load more button
			var counter = initShow; // counter for load more button
			var iso = pm_masonry.data('isotope'); // get Isotope instance

			loadMore(initShow); // execute function onload

			function loadMore(toShow) {
				
				pm_masonry.find(".hidden").removeClass("hidden");

				var hiddenElems = iso.filteredItems.slice(toShow, iso.filteredItems.length).map(function(item) {
					return item.element;
				});
				$(hiddenElems).addClass('hidden');
				pm_masonry.isotope('layout');

				// when no more to load, hide show more button
				if (hiddenElems.length == 0) {
					$("#load-more").hide();
				} else {
					$("#load-more").show();
				};

			}

			// append load more button
			pm_masonry.after('<a id="load-more">Load More</a>');			

			// when load more button clicked
			$("#load-more").on('click' ,function() {

				counter = counter + initShow;

				loadMore(counter);
				
			});

			// when filter button clicked
			$("#filters").on('click' ,function() {
				
				$(this).data('clicked', true);

				loadMore(initShow);
				
			});
		};
		
		/* -------------------- Portfolio Masonry script End -------------------- */
		
		/* -------------------- Testimonial Slider Activation Start -------------------- */
        
		$(".testimonial").owlCarousel({	 
			  autoplay: true,
			  autoplayTimeout: 5000,
			  dots : true,
			  nav : false,
			  items : 1,
			  loop: true	 
		});
		
		/* -------------------- Testimonial Slider Activation End -------------------- */

		/* -------------------- Contact Form Validation Start -------------------- */

		$('#contactForm').bootstrapValidator({
			trigger: 'blur',
			fields: {
				name: {
					validators: {
						notEmpty: {
							message: 'Your name is required'
						},
						regexp: {
							regexp: /^[a-zA-Z ]+$/,
							message: 'Your name cannot have numbers or symbols'
						}
					}
				},
				email: {
					validators: {
						notEmpty: {
							message: 'The email is required'
						},
						emailAddress: {
							message: 'The input is not a valid email address'
						}
					}
				},				
				message: {
					validators: {
						notEmpty: {
							message: 'The message is required'
						}
					}
				}
			}
		})
		.on('success.form.bv', function(e) {

            e.preventDefault();
            var $form = $(e.target);
            var bv = $form.data('bootstrapValidator');
			
			/* -------------------- Initiate Variables With Form Content Start -------------------- */
			
			var name = $("#name").val();
			var email = $("#email").val();
			var subject = $("#subject").val();
			var message = $("#message").val();
			
			/* -------------------- Initiate Variables With Form Content End -------------------- */

            /* -------------------- Use Ajax to submit form data Start -------------------- */
			
            $.ajax({
				type: "POST",
				url: "mail/sendmail.php",
				data: "name=" + name + "&email=" + email + "&subject=" + subject + "&message=" + message,
				success : function(text){
					if (text == "success"){
						formSuccess();
					} else {
						formError();
					}
				}
			});
			
			/* -------------------- Use Ajax to submit form data End -------------------- */
			
        });

		function formSuccess(){
			$("#contactForm")[0].reset();
			$('#success-message').slideDown({ opacity: "show" }, "slow").delay(5000).fadeOut();
		}

		function formError(){
			$("#contactForm")[0].reset();
			$('#error-message').slideDown({ opacity: "show" }, "slow").delay(5000).fadeOut();
		}		
		
		/* -------------------- Contact Form Validation End -------------------- */
		
		/* -------------------- Google-map Data Start -------------------- */
		
		function initializemap(obj) {
			var lat = $('#'+obj).attr("data-lat");
			var lng = $('#'+obj).attr("data-lng");
			var contentString = $('#'+obj).attr("data-string");
			var myLatlng = new google.maps.LatLng(lat,lng);
			var map, marker;
			var zoomLevel = parseInt($('#'+obj).attr("data-zoom") ,10);
			var mapOptions = {
				zoom: zoomLevel,
				disableDefaultUI: false,
				center: myLatlng,
				scrollwheel: false
			}		
			map = new google.maps.Map(document.getElementById(obj), mapOptions); 	    
			marker = new google.maps.Marker({
				position: myLatlng,
				map: map
			});
		}
		
		/* -------------------- Google-map Activation Start -------------------- */
		 
		if($('#map').length==1){
			initializemap('map')
		}
		
		/* -------------------- Google-map Activation End -------------------- */
		
		/* -------------------- Google-map Data End -------------------- */				
		
		/* -------------------- Client Logo Slider Activation Start -------------------- */
		 
		$(".clients").owlCarousel({	 
			autoplay: true,
			autoplayTimeout: 3500,
			dots : false,
			nav : false,
			responsiveClass:true,
			loop : true,
			responsive:{
				0:{
					items: 1
				},
				550:{
					items: 2
				},
				900:{
					items: 3
				},
				1100:{
					items: 6
				}
			}	 
		});	
		
		/* -------------------- Client Logo Slider Activation End -------------------- */
		
	});		
	
})(jQuery);