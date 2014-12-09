// JavaScript Document

var GALLERY = null;

$(document).ready(function() {

	/*
		GRID ACCORDION OPTIONS
			width: 1024, // set to view port width if not full screen
			height: 768, // set to view port height if not full screen
			full_screen: false, // full screen gallery mode
			fullscreen_top_offset: 0, // offset in px of top to move gallery for fullscreen
			fullscreen_bottom_offset: 0, // offset in px of bottom to change height for fullscreen
			auto: false, // auto slideshow
			delay: 5000, // delay in ms for auto slideshow
			expanded_width: 3, // width of the expanded grid element in # of column widths
			expanded_height: 2, // height of the expanded grid element in # of row heights
			num_rows: 3, // number of rows in the grid
			num_columns: 4, // number of columns in the grid
			swf_source: "swf", // path to jplayer swf file
			animate_return: true, // whether or not to animate the grid back to its resting state
			resize_inactive_box: true, // whether or not to resize the images in active boxes when there is an active one
			force_static_move: false, // force the grid animation to not happen
			internal_animation_duration: 500, // speed of internal animations
			animate_internal_images_on_return: true, // whether or not to animate the return of the internal images
			box_content_scroll_top_offset: 0, // amount of top offset the inner box content scrollable class has
			has_image_thumbnails: true, // whether or not the application has thumbnails for hover for images, thumbnails are REQUIRED for videos
			click: false, // whether or not to use a click instead of a hover effect
			close_class: "close-content-box", // class to manually close the boxes
			
			// try not to modify the following options as that'll mean the default css selectors won't work anymore
			// they are user settable in case you absolutely NEED to override them for some reason...
			target: $("#grid-accordion-gallery"), // feel free to change, but at least leave the class selector the same to maintain existing css definitions
			loading_class: "grid-accordion-gallery-loading", // best not to override in options otherwise css selectors will need to be changed
			body_loading_class: "body-grid-accordion-gallery-loading", // best not to override in options otherwise css selectors will need to be changed
			body_full_screen_class: "full-screen-grid-accordion-gallery", // best not to override in options otherwise css selectors will need to be changed
			body_view_port_class: "view-port-grid-accordion-gallery", // best not to override in options otherwise css selectors will need to be changed
			box_class: "grid-block", // best not to override in options otherwise css selectors will need to be changed
			box_viewport_class: "grid-block-viewport", // best not to override in options otherwise css selectors will need to be changed
			box_element_class: "grid-element", // best not to override in options otherwise css selectors will need to be changed
			box_video_element_class: "grid-video-element", // best not to override in options otherwise css selectors will need to be changed
			box_thumbnail_class: "grid-element-thumbnail", // best not to override in options otherwise css selectors will need to be changed
			box_image_class: "grid-element-image", // best not to override in options otherwise css selectors will need to be changed
			box_content_clone_class: "grid-content-clone", // best not to override in options otherwise css selectors will need to be changed
			box_content_scroll_class: "grid-content-scrollable" // best not to override in options otherwise css selectors will need to be changed
	*/
	
	grid_accordion_options = {
		auto: false,
		delay: 5000,
		full_screen: true,
		target: $("#grid-accordion-gallery"),
		expanded_width: 5.5, 
		expanded_height: 5.5,
		swf_source: DOCUMENT_ROOT + "swf",
		num_rows: 7,
		num_columns: 7,
		resize_inactive_box: false,
		animate_internal_images_on_return: false,
		box_content_scroll_top_offset: 118,
		click: true
	}
	
	grid_accordion.init(grid_accordion_options);
	
	GALLERY = $("#photo-gallery");
	hidePhotos();
	setGallery();
	$(document).on("click", ".load-full-screen-gallery", function(event) {
		event.preventDefault();
		var index = $(this).attr("index");
		goToGallery(index);
		showPhotos();
	});
	$(".gallery-close").click(function() {
		hidePhotos();
	});
	$(document).on("click", ".gallery-close", function() {
		hidePhotos();
	});
	$(document).on("click", ".launch-gallery", function(event) {
		event.preventDefault();
		showPhotos();
	});

});

function resizePhotos() {
	GALLERY.css({
		height: $(window).height() + "px"
	});
}

function showPhotos() {
	GALLERY.fadeIn(500, function() {
		$(window).trigger("resize");
	});
}

function hidePhotos() {
	GALLERY.hide();
}

function pauseGallery() {
	GALLERY.bgStretcher.pause();
}

function goToGallery(index) {
	GALLERY.bgStretcher.goto(index);
}

function setGallery() {
	GALLERY.bgStretcher({
		images: IMAGES,
		slideShow: false,
		buttonPrev: "#gallery-prev",
		buttonNext: "#gallery-next",
		imageWidth: 1600,
		imageHeight: 1071,
		anchoring: "center center",
		anchoringImg: "center center"
	});
	pauseGallery();
}