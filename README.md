grid-gallery
================

jQuery based grid photo gallery.<br />
Highly customizable grid style photo gallery with a wide assortment of options.<br />
Definitely in BETA and maybe kinda buggy, and use the v2 of the code please.<br />
It may also have too many options, and too many ways to customize, but hey go wild right?<br />
There are also some gallery overlay content limitations noted below.

FEATURES:
=========
* Accordion style photo gallery
* Maintains aspect ratios
* Full Screen/Specific size gallery
* Video support (.flv only at the moment)
* Main elements easily stylable through CSS
* Custom content per box, scrollable

DEMO:
=====
http://one-off.textures-tones.com/grid/

CREDITS:
========
CSS Reset: http://meyerweb.com/eric/tools/css/reset/<br />
jScrollPane (jQuery Mousewheel): http://jscrollpane.kelvinluck.com/<br />
jQuery Mousewheel: https://github.com/brandonaaron/jquery-mousewheel<br />
jPlayer: http://www.jplayer.org/

HOW TO USE:
===========

Include the JS files:<br />
```
<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo $DOCUMENT_ROOT; ?>js/jquery.jplayer.min.js"></script>
<script type="text/javascript" src="<?php echo $DOCUMENT_ROOT; ?>js/jquery.mousewheel.js"></script>
<script type="text/javascript" src="<?php echo $DOCUMENT_ROOT; ?>js/jquery.jscrollpane.min.js"></script>
<script type="text/javascript" src="<?php echo $DOCUMENT_ROOT; ?>js/grid.accordion.gallery.v2.js"></script>
```

Include the CSS files:<br />
```
<link rel="stylesheet" type="text/css" media="all" href="<?php echo $DOCUMENT_ROOT; ?>css/reset.css" />
<link rel="stylesheet" type="text/css" media="all" href="<?php echo $DOCUMENT_ROOT; ?>css/jquery.jscrollpane.css" />
```

Generate the markup:<br />
```
<div class="grid-accordion-gallery" id="grid-accordion-gallery">
	<img src="[PATH/TO/IMAGE]" width="[IMAGE WIDTH]" height="[IMAGE HEIGHT]" thumb="[PATH/TO/IMAGE/THUMBNAIL]" index="[IMAGE INDEX # (0 INDEXED, INCREMENTED)]" content-id="[ID OF CONTENT TO DISPLAY]" />
	<video src="[PATH/TO/VIDEO]" width="[VIDEO WIDTH]" height="[VIDEO HEIGHT]" thumb="[PATH/TO/VIDEO/THUMBNAIL]" index="[VIDEO INDEX # (0 INDEXED, INCREMENTED)]" content-id="[ID OF CONTENT TO DISPLAY]"></video>
	<!-- AS MANY AS YOU LIKE, REPEAT AD NAUSEUM, ETC. -->
</div>

<div id="[MATCHING "content-id" PAREMETER]">
	<div class="WHATEVER-CONTENT-HEADING-CLASS-YOU-WANT">
		...
	</div>
	<div class="grid-content-scrollable">
		<div class="WHAT-EVER-CONTENT-CLASS-YOU-WANT">
			...
		</div>
		...
	</div>
</div>

<!-- PSEUDO CODE EXAMPLE -->
<img [...] content-id="ID-TO-CONTENT" />
<div id="ID-TO-CONTENT">
	<div class="WHATEVER-CONTENT-HEADING-CLASS-YOU-WANT">
		...
	</div>
	<div class="grid-content-scrollable">
		<div class="WHAT-EVER-CONTENT-CLASS-YOU-WANT">
			...
		</div>
		...
	</div>
</div>
```

Run the Javascript:<br />
```
$(document).ready(function() {
	//	at minimum, no extra options
	grid_accordion_options.init();
	
	//	demo options
	grid_accordion_options = {
		auto: false,
		full_screen: true,
		target: $("#grid-accordion-gallery"),
		expanded_width: 3.5, 
		expanded_height: 2.5,
		swf_source: DOCUMENT_ROOT + "swf",
		num_rows: 3,
		num_columns: 4,
		resize_inactive_box: false,
		animate_internal_images_on_return: false,
		box_content_scroll_top_offset: 118,
		click: true
	}
	
	//	auto options w/ hover instead of click
	grid_accordion_options = {
		auto: true,
		delay: 5000,
		full_screen: true,
		target: $("#grid-accordion-gallery"),
		expanded_width: 3.5, 
		expanded_height: 2.5,
		swf_source: DOCUMENT_ROOT + "swf",
		num_rows: 3,
		num_columns: 4,
		resize_inactive_box: false,
		animate_internal_images_on_return: false,
		box_content_scroll_top_offset: 118,
		click: false
	}
	
	//	initialize with options
	grid_accordion.init(grid_accordion_options);
});
```

Gallery options:<br />
(You can find these in the included grid.accordion.gallery.v2.js file)
```
DEFAULT/SETTABLE OPTIONS:
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
```

NOTES:
======
By default, some styling is REQUIRED to get everything working properly.<br />
At its base, this plugin is designed to be highly customizable.<br />
It should be pretty straightforward to figure out how to customize the styling to get everything displaying properly.<br />
For inspiration, see the demo (http://one-off.textures-tones.com/grid/) and go through the source or peruse through the included files in this repository.

GOTCHAS:
========
The demo also implements a customized BGStretcher gallery for a sort of gallery within a gallery thing.<br />
BGStretcher can be found here: www.ajaxblender.com<br />
There are some SERIOUS limitations regarding what the overlay content can be:
```
Custom content per box, scrollable
	wrap .grid-content-scrollable to what you want to be scrollable within the content
	LIMITATION: only ONE .grid-content-scrollable allowed per inner box content
	LIMITATION:
		Box inner content MUST have 1 HEADING content that you provide the height for in the options when initialising
		Box inner content MUST have 1 CONTENT content that's wrapped by .grid-content-scrollable
		<img [...] content-id="ID-TO-CONTENT" />
		
		<div id="ID-TO-CONTENT">
			<div class="WHATEVER-CONTENT-HEADING-CLASS-YOU-WANT">
				...
			</div>
			<div class="grid-content-scrollable">
				<div class="WHAT-EVER-CONTENT-CLASS-YOU-WANT">
					...
				</div>
				...
			</div>
		</div>
```