/*
	jQuery based Grid/Accordion Photo Gallery
	v2.0
	Sean X. Luo
	
	TODO:
		> multiple galleries
		> image/video anchoring:
			- give options for anchoring like BGStretcher?
			- CSS background position type options:
				1) top left
				2) top center
				3) top right
				4) center left
				5) center center
				6) center right
				7) bottom left
				8) bottom center
				9) bottom right
		> extend support for multiple video types
	
	FEATURES:
		Accordion style photo gallery
		Maintains aspect ratios
		Full Screen/Specific size gallery
		Video support (.flv only at the moment)
		Main elements easily stylable through CSS
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
	
	GOTCHAS:
	
	REQUIRES:
		jQuery: //ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
		jPlayer: http://www.jplayer.org/
		jScrollPane (jQuery Mousewheel): http://jscrollpane.kelvinluck.com/
	
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
		box_content_scroll_class: "grid-content-scrollable", // best not to override in options otherwise css selectors will need to be changed
		enable_box_content_fancy_scroll: true // whether or not to use jscrollpane for box content scrollable content
	
	EXAMPLES:
		None
*/

var grid_accordion = {

	// variables
	
	// local non-user settable variables
	valid_box_selector: "img, video", // selector of valid child types when generating grid accordion gallery
	column_width: 0,
	row_height: 0,
	num_boxes: 0, // number of boxes in the gallery
	active_box: 0, // current active box index, 0 indexed
	boxes: {}, // object store of all boxes for reference
	has_videos: false, // if the gallery has videos in it
	videos: {}, // object store of all videos for reference
	loading_screen: null, // loading screen jquery object
	image_focused: false, // whether or not we've focused on a specific image
	jplayer_class: "jp-player", // jplayer reference class
	collapsed_column_class: "collapsed-collumn", // collapsed grid column class
	collapsed_row_class: "collapsed-row", // collapsed grid row class
	expanded_column_class: "expanded-column", // expanded grid column class
	expanded_row_class: "expanded-row", // expanded grid row class
	slideshow_interval: null, // slideshow interval
	
	// user settable options
	options: {
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
		box_content_scroll_class: "grid-content-scrollable", // best not to override in options otherwise css selectors will need to be changed
		enable_box_content_fancy_scroll: true // whether or not to use jscrollpane for box content scrollable content
	},
	
	// initialize
	init: function(options) {
		// set all options
		grid_accordion.set_options(options);
		// apply relevant classes to body
		if( grid_accordion.options.full_screen ) {
			$("body").addClass(grid_accordion.options.body_full_screen_class);
		} else {
			$("body").addClass(grid_accordion.options.body_view_port_class);
		}
		// create loading screen overlay
		grid_accordion.create_loading_screen();
		// generate gallery html based on provided html
		grid_accordion.create_gallery();
		// hide all content box references
		grid_accordion.hide_content_boxes();
		$(window).load(function() {
			if( grid_accordion.has_videos ) {
				// if there are videos, set video functionality
				grid_accordion.bind_videos();
			}
			if( grid_accordion.options.auto ) {
				grid_accordion.set_slideshow();
			}
		});
	},
	
	// parses through provided options and overrides defaults
	set_options: function(options) {
		for( i in options ) {
			if( typeof grid_accordion.options[i] !== "undefined" ) {
				grid_accordion.options[i] = options[i];
			}
		}
	},
	
	// function wrapper to run callbacks
	run_callback: function(f, options) {
		f(options);
	},
	
	// first step in creating the loading screen: set body classes, create element in memory, add to html document
	create_loading_screen: function() {
		$("body").addClass(grid_accordion.options.body_loading_class);
		grid_accordion.loading_screen = $('<div class="' + grid_accordion.options.loading_class + '" id="' + grid_accordion.options.loading_class + '"></div>');
		grid_accordion.add_loading_screen();
	},
	
	// seond set in creating the loading screen: actually displays it
	add_loading_screen: function() {
		$("body").append(grid_accordion.loading_screen);
		grid_accordion.set_loading_screen();
		$(window).load(function() {
			// when everything's loaded, remove loading screen
			grid_accordion.hide_loading_screen();
			grid_accordion.options.target.show();
		});
	},
	
	// sets dimensions of loading screen
	set_loading_screen: function() {
		grid_accordion.loading_screen.css({
			width: $(window).width() + "px",
			height: $(window).height() + "px"
		});
		$(window).resize(function() {
			grid_accordion.loading_screen.css({
				width: $(window).width() + "px",
				height: $(window).height() + "px"
			});
		});
	},
	
	// remove loading screen, remove loading screen body classes
	hide_loading_screen: function() {
		grid_accordion.loading_screen.fadeOut(grid_accordion.options.internal_animation_duration, function() {
			$("body").removeClass(grid_accordion.options.body_loading_class);	
			grid_accordion.loading_screen.remove();
		});
	},
	
	// create gallery html
	create_gallery: function() {
		// get number of boxes
		grid_accordion.num_boxes = grid_accordion.options.target.find(grid_accordion.valid_box_selector).length - 1;
		grid_accordion.active_box = 0;
		var n = 1;
		var c = 1;
		var r = 1;
		// generate html
		var html = '<table><tr>';
		grid_accordion.options.target.children().each(function() {
			if( $(this).is(grid_accordion.valid_box_selector) ) {
				if( $(this).is("img") ) {
					var type = "image";
				} else if( $(this).is("video") ) {
					var type = "video";
				}
				html += '<td type="' + type + '" index="' + grid_accordion.active_box + '" src="' + $(this).attr("src") + '" thumb="' + $(this).attr("thumb") + '" width="' + $(this).attr("width") + '" height="' + $(this).attr("height") + '" content-id="' + $(this).attr("content-id") + '">';
					html += '<div class="' + grid_accordion.options.box_class + '" index="' + grid_accordion.active_box + '">';
						html += '<div class="' + grid_accordion.options.box_viewport_class + '">';
							if( $(this).is("img") ) {
								// if is image
								html += '<div class="' + grid_accordion.options.box_element_class + '">';
									if( grid_accordion.options.has_image_thumbnails ) {
										html += '<img src="' + $(this).attr("thumb") + '" class="' + grid_accordion.options.box_thumbnail_class + '" />';
									}
									html += '<img src="' + $(this).attr("src") + '" class="' + grid_accordion.options.box_image_class + '" />';
								html += '</div>';
							} else if( $(this).is("video") ) {
								// if is video
								html += '<div class="' + grid_accordion.options.box_element_class + ' ' + grid_accordion.options.box_video_element_class + ' jp-video">';
									//html += '<div style="background:url(' + $(this).attr("thumb") + ') center center no-repeat; position:absolute; width:100%; height:100%; top:0; left:0;" class="' + grid_accordion.options.box_thumbnail_class + '"></div>';
									html += '<img src="' + $(this).attr("thumb") + '" class="' + grid_accordion.options.box_thumbnail_class + '" />';
									html += '<div class="jp-type-single">';
										html += '<div id="jquery_jplayer_' + grid_accordion.active_box + '" class="' + grid_accordion.options.jplayer_class + '"></div>';
									html += '</div>';
								html += '</div>';
							}
						html += '</div>';
					html += '</div>';
				html += '</td>';
				if( n%grid_accordion.options.num_columns == 0 && grid_accordion.active_box < grid_accordion.num_boxes ) {
					html += '</tr><tr>';
				}
				n++;
				if( grid_accordion.active_box < grid_accordion.num_boxes ) {
					grid_accordion.active_box++;
				}
			}
		});
		html += '</tr></table>';
		grid_accordion.options.target.html(html);
		grid_accordion.active_box = 0;
		// set js stores
		var n = 1;
		var c = 1;
		var r = 1;
		$("." + grid_accordion.options.box_class).each(function() {
			var grid_block_html = $(this);
			var type = grid_block_html.parent().attr("type");
			if( type == "video" ) {
				// if is video
				// set video object variables and stores
				grid_accordion.has_videos = true;
				grid_accordion.videos[grid_block_html.parent().attr("index")] = {
					id: "jquery_jplayer_" + grid_block_html.parent().attr("index"),
					src: grid_block_html.parent().attr("src"),
					thumb: grid_block_html.parent().attr("thumb"),
					loaded: false
				}
			}
			var width = grid_block_html.parent().attr("width");
			var height = grid_block_html.parent().attr("height");
			// set column/row numbers
			grid_block_html.attr("column", c);
			grid_block_html.attr("row", r);
			if( n%grid_accordion.options.num_columns == 0 ) {
				c = 1;
			} else {
				c++;
			}
			if( n%grid_accordion.options.num_columns == 0 ) {
				r++;
			}
			n++;
			// set box object stores
			grid_accordion.boxes[grid_block_html.parent().attr("index")] = {
				box: grid_block_html,
				type: type,
				width: width,
				height: height,
				content_loaded: false,
				content_reference: $("#" + grid_block_html.parent().attr("content-id")),
				content_clone: null,
				scroll_loaded: false
			}
		});
		// depending on whether full screen is enabled or not, set box dimensions appropriately
		if( grid_accordion.options.full_screen ) {
			grid_accordion.set_full_size_gallery();
			$(window).resize(function() {
				grid_accordion.set_full_size_gallery();
			});
		} else {
			grid_accordion.set_fixed_gallery();
		}
		// set up actual grid functionality
		grid_accordion.set_up_grid();
	},
	
	// we're generating a full screen gallery
	set_full_size_gallery: function() {
		// clear scroll_loaded status
		grid_accordion.reset_scroll_loaded();
		grid_accordion.options.target.css({
			"margin-top": grid_accordion.options.fullscreen_top_offset + "px",
			width: $(window).width() + "px",
			height: $(window).height() - grid_accordion.options.fullscreen_top_offset - grid_accordion.options.fullscreen_bottom_offset + "px"
		});
		grid_accordion.options.target.find("table").css({
			width: $(window).width() + "px",
			height: $(window).height() - grid_accordion.options.fullscreen_top_offset - grid_accordion.options.fullscreen_bottom_offset + "px"
		});
	},
	
	// we're generating a fixed size gallery
	set_fixed_gallery: function() {
		grid_accordion.options.target.css({
			width: grid_accordion.options.width + "px",
			height: grid_accordion.options.height + "px"
		});
	},
	
	// initializes grid
	set_up_grid: function() {
		// stop videos
		grid_accordion.stop_videos();
		// set up grid
		if( grid_accordion.options.full_screen ) {
			grid_accordion.set_up_full_screen_grid_sizes(false);
			$(window).resize(function() {
				grid_accordion.set_up_full_screen_grid_sizes(false);
			});
		} else {
			grid_accordion.set_up_fixed_grid_sizes(false);
		}
		// set grid hovers or clicks
		if( grid_accordion.options.click ) {
			grid_accordion.set_up_grid_clicks();
		} else {
			grid_accordion.set_up_grid_hovers();
		}
	},
	
	// sets up fullscreen gallery grid
	set_up_full_screen_grid_sizes: function(animate) {
		var window_width = $(window).width();
		var window_height = $(window).height();
		var box_set_width = window_width / grid_accordion.options.num_columns;
		var box_set_height = grid_accordion.options.target.height() / grid_accordion.options.num_rows;
		grid_accordion.column_width = box_set_width;
		grid_accordion.row_height = box_set_height;
		// run set grid function with sizes we want
		grid_accordion.set_grid(animate, box_set_width, box_set_height);
	},
	
	// sets up fixed size grid
	set_up_fixed_grid_sizes: function(animate) {
		var box_set_width = grid_accordion.options.target.width() / grid_accordion.options.num_columns;
		var box_set_height = grid_accordion.options.target.height() / grid_accordion.options.num_rows;
		grid_accordion.column_width = box_set_width;
		grid_accordion.row_height = box_set_height;
		// run set grid function with sizes we want
		grid_accordion.set_grid(animate, box_set_width, box_set_height);
	},
	
	// actual set grid function
	set_grid: function(animate, box_set_width, box_set_height) {
		for( box_index in grid_accordion.boxes ) {
			if( animate ) {
				// we want to animate our grid
				grid_accordion.boxes[box_index].box.parent().stop(true, false).animate({
					width: box_set_width + "px",
					height: box_set_height + "px"
				}, {
					duration: grid_accordion.options.internal_animation_duration / 2,
					queue: false, 
					complete: function() {
						
					}
				});
				grid_accordion.boxes[box_index].box.stop(true, false).animate({
					width: box_set_width + "px",
					height: box_set_height + "px"
				}, { 
					duration: grid_accordion.options.internal_animation_duration / 2,
					queue: false, 
					complete: function() {
						var this_index = $(this).attr("index");
						var box_ratio = THUMBNAIL_WIDTH / THUMBNAIL_HEIGHT;
						var set_height = box_set_height;
						var set_width = box_ratio * set_height;
						if( set_width < box_set_width ) {
							set_width = box_set_width;
							set_height = box_ratio / set_width;
						}
						if( grid_accordion.options.animate_internal_images_on_return ) {
							$(this).find("." + grid_accordion.options.box_thumbnail_class).stop(true, true).animate({
								width: set_width + "px"
							}, {
								duration: grid_accordion.options.internal_animation_duration / 4,
								queue: false, 
								complete: function() {
									
								}
							});
							$(this).find("." + grid_accordion.options.box_image_class).stop(true, true).animate({
								width: set_width + "px"
							}, {
								duration: grid_accordion.options.internal_animation_duration / 4,
								queue: false, 
								complete: function() {
									
								}
							});
						} else {
							$(this).find("." + grid_accordion.options.box_thumbnail_class).css({
								width: set_width + "px"
							});
							$(this).find("." + grid_accordion.options.box_image_class).css({
								width: set_width + "px"
							});
						}
					}
				});
			} else {
				// we don't want to animate our grid
				var box_ratio = THUMBNAIL_WIDTH / THUMBNAIL_HEIGHT;
				var set_height = box_set_height;
				var set_width = box_ratio * set_height;
				if( set_width < box_set_width ) {
					set_width = box_set_width;
					set_height = box_ratio / set_width;
				}
				grid_accordion.boxes[box_index].box.parent().css({
					width: box_set_width + "px",
					height: box_set_height + "px"
				});
				grid_accordion.boxes[box_index].box.css({
					width: box_set_width + "px",
					height: box_set_height + "px"
				});
				grid_accordion.boxes[box_index].box.find("." + grid_accordion.options.box_thumbnail_class).css({
					width: set_width + "px"
				});
				grid_accordion.boxes[box_index].box.find("." + grid_accordion.options.box_image_class).css({
					width: set_width + "px"
				});
			}
			if( grid_accordion.boxes[box_index].type == "video" ) {
				$("#" + grid_accordion.videos[box_index].id).jPlayer("option", "size.width", set_width + "px");
				$("#" + grid_accordion.videos[box_index].id).jPlayer("option", "size.height", set_height + "px");
			}
		}
	},
	
	// grid hovers
	set_up_grid_hovers: function() {
		grid_accordion.options.target.hover(
			function() {
				// do nothing
			}, 
			function() {
				if( grid_accordion.active_box < grid_accordion.num_boxes ) {
					grid_accordion.active_box++;
				} else {
					grid_accordion.active_box = 0;
				}
				// clear all box classes
				grid_accordion.clear_box_classes();
				// show all box thumbnails
				grid_accordion.show_box_thumbnails();
				// hide all generated box content
				grid_accordion.hide_generated_content_boxes();
				// stop videos
				grid_accordion.stop_videos();
				// set classes based on what's active
				grid_accordion.set_box_classes(grid_accordion.active_box);
				// move everything back
				grid_accordion.move_boxes(true);
				// restart slideshow if needed
				if( grid_accordion.options.auto ) {
					grid_accordion.set_slideshow();
				}
			}
		);
		$("." + grid_accordion.options.box_class).hover(
			function() {
				var this_index = $(this).attr("index");
				// clear slide show if present
				if( grid_accordion.options.auto ) {
					grid_accordion.clear_slideshow();
				}
				// show all thumbnails
				grid_accordion.show_box_thumbnails();
				// figure out what classes to add and where
				grid_accordion.set_box_classes(this_index);
				// actually animate
				grid_accordion.move_boxes(false);
				// hide content
				grid_accordion.hide_generated_content_boxes();
				// set content
				grid_accordion.set_grid_box_content(this_index);
				// hide this box's thumbnail
				$(this).find("." + grid_accordion.options.box_thumbnail_class).hide();
				if( grid_accordion.boxes[this_index].type == "video" ) {
					// process video if needed
					grid_accordion.process_video();
					$(this).find("." + grid_accordion.options.jplayer_class).jPlayer("play");
				}
			},
			function() {
				// do nothing
			}
		);
	},
	
	// grid clicks
	set_up_grid_clicks: function() {
		$("." + grid_accordion.options.box_thumbnail_class).css({
			cursor: "pointer"
		});
		$("." + grid_accordion.options.box_class).click(function() {
			var this_index = $(this).attr("index");
			// clear slide show if present
			if( grid_accordion.options.auto ) {
				grid_accordion.clear_slideshow();
			}
			// show all thumbnails
			grid_accordion.show_box_thumbnails();
			//	stop all videos
			grid_accordion.stop_videos();
			// figure out what classes to add and where
			grid_accordion.set_box_classes(this_index);
			// actually animate
			grid_accordion.move_boxes(false);
			// hide content
			grid_accordion.hide_generated_content_boxes();
			// set content
			grid_accordion.set_grid_box_content(this_index);
			// hide this box's thumbnail
			$(this).find("." + grid_accordion.options.box_thumbnail_class).hide();
			if( grid_accordion.boxes[this_index].type == "video" ) {
				// process video if needed
				grid_accordion.process_video();
				$(this).find("." + grid_accordion.options.jplayer_class).jPlayer("play");
			}
		});
		$(document).on("click", "." + grid_accordion.options.close_class, function(event) {
			event.preventDefault();
			if( grid_accordion.active_box < grid_accordion.num_boxes ) {
				grid_accordion.active_box++;
			} else {
				grid_accordion.active_box = 0;
			}
			// clear all box classes
			grid_accordion.clear_box_classes();
			// show all box thumbnails
			grid_accordion.show_box_thumbnails();
			//	stop all videos
			grid_accordion.stop_videos();
			// hide all generated box content
			grid_accordion.hide_generated_content_boxes();
			// stop videos
			grid_accordion.stop_videos();
			// set classes based on what's active
			grid_accordion.set_box_classes(grid_accordion.active_box);
			// move everything back
			grid_accordion.move_boxes(true);
			// restart slideshow if needed
			if( grid_accordion.options.auto ) {
				grid_accordion.set_slideshow();
			}
		});
	},
	
	// set box classes based on columns/rows/what's active
	set_box_classes: function(active_box) {
		// resets on hover
		grid_accordion.clear_box_classes();
		// set up
		var column = grid_accordion.boxes[active_box].box.attr("column");
		var row = grid_accordion.boxes[active_box].box.attr("row");
		$("." + grid_accordion.options.box_class).not("." + grid_accordion.options.box_class + "[column=" + column + "]").addClass(grid_accordion.collapsed_column_class);
		$("." + grid_accordion.options.box_class).not("." + grid_accordion.options.box_class + "[row=" + row + "]").addClass(grid_accordion.collapsed_row_class);
		$("." + grid_accordion.options.box_class + "[column=" + column + "]").addClass(grid_accordion.expanded_column_class);
		$("." + grid_accordion.options.box_class + "[row=" + row + "]").addClass(grid_accordion.expanded_row_class);
		grid_accordion.active_box = active_box;
	},
	
	// clears box classes
	clear_box_classes: function() {
		$("." + grid_accordion.options.box_class).removeClass(grid_accordion.collapsed_column_class);
		$("." + grid_accordion.options.box_class).removeClass(grid_accordion.collapsed_row_class);
		$("." + grid_accordion.options.box_class).removeClass(grid_accordion.expanded_column_class);
		$("." + grid_accordion.options.box_class).removeClass(grid_accordion.expanded_row_class);
	},
	
	// actual box moving function, has ability to expand a focus and collapse others, and reset to grid layout
	move_boxes: function(move_back) {
		if( move_back ) {
			// we're resetting to the grid layout
			if( grid_accordion.options.full_screen ) {
				grid_accordion.set_up_full_screen_grid_sizes(grid_accordion.options.animate_return);
			} else {
				grid_accordion.set_up_fixed_grid_sizes(grid_accordion.options.animate_return);
			}
		} else {
			// actual animation to expand one box
			var expanded_column_width = grid_accordion.options.expanded_width * grid_accordion.column_width;
			var collapsed_column_width = ( ( grid_accordion.options.num_columns - grid_accordion.options.expanded_width ) / ( grid_accordion.options.num_columns - 1 ) ) * grid_accordion.column_width;
			var expanded_row_height = grid_accordion.options.expanded_height * grid_accordion.row_height;
			var collapsed_row_height = ( ( grid_accordion.options.num_rows - grid_accordion.options.expanded_height ) / ( grid_accordion.options.num_rows - 1 ) ) * grid_accordion.row_height;
			if( grid_accordion.options.force_static_move ) {
				// static move option without animation
				$("." + grid_accordion.expanded_column_class).parent().css({
					width: expanded_column_width + "px"
				});
				$("." + grid_accordion.expanded_column_class).css({
					width: expanded_column_width + "px"
				});
				$("." + grid_accordion.collapsed_column_class).parent().css({
					width: collapsed_column_width + "px"
				});
				$("." + grid_accordion.collapsed_column_class).css({
					width: collapsed_column_width + "px"
				});
				$("." + grid_accordion.expanded_row_class).parent().css({
					height: expanded_row_height + "px"
				});
				$("." + grid_accordion.expanded_row_class).css({
					height: expanded_row_height + "px"
				});
				$("." + grid_accordion.collapsed_row_class).css({
					height: collapsed_row_height + "px"
				});
				$("." + grid_accordion.collapsed_row_class).parent().css({
					height: collapsed_row_height + "px"
				});
			} else {
				// animation option
				$("." + grid_accordion.expanded_column_class).parent().animate({
					width: expanded_column_width + "px"
				}, { 
					duration: grid_accordion.options.internal_animation_duration,
					queue: false, 
					complete: function() {
						
					}
				});
				$("." + grid_accordion.expanded_column_class).animate({
					width: expanded_column_width + "px"
				}, { 
					duration: grid_accordion.options.internal_animation_duration,
					queue: false, 
					complete: function() {
						
					}
				});
				$("." + grid_accordion.collapsed_column_class).parent().animate({
					width: collapsed_column_width + "px"
				}, { 
					duration: grid_accordion.options.internal_animation_duration,
					queue: false, 
					complete: function() {
						
					}
				});
				$("." + grid_accordion.collapsed_column_class).animate({
					width: collapsed_column_width + "px"
				}, { 
					duration: grid_accordion.options.internal_animation_duration,
					queue: false, 
					complete: function() {
						
					}
				});
				$("." + grid_accordion.expanded_row_class).parent().animate({
					height: expanded_row_height + "px"
				}, { 
					duration: grid_accordion.options.internal_animation_duration,
					queue: false, 
					complete: function() {
						
					}
				});
				$("." + grid_accordion.expanded_row_class).animate({
					height: expanded_row_height + "px"
				}, { 
					duration: grid_accordion.options.internal_animation_duration,
					queue: false, 
					complete: function() {
						
					}
				});
				$("." + grid_accordion.collapsed_row_class).parent().animate({
					height: collapsed_row_height + "px"
				}, { 
					duration: grid_accordion.options.internal_animation_duration,
					queue: false, 
					complete: function() {
						
					}
				});
				$("." + grid_accordion.collapsed_row_class).animate({
					height: collapsed_row_height + "px"
				}, { 
					duration: grid_accordion.options.internal_animation_duration,
					queue: false, 
					complete: function() {
						
					}
				});
			}
			// set sizes of images/videos within each boxes
			for( box_index in grid_accordion.boxes ) {
				var ratio = grid_accordion.boxes[box_index].width / grid_accordion.boxes[box_index].height;
				var set_width = expanded_column_width;
				if( grid_accordion.options.resize_inactive_box ) {
					if( grid_accordion.boxes[box_index].box.hasClass(grid_accordion.collapsed_column_class) ) {
						set_width = collapsed_column_width;
					}
				}
				var set_height = set_width / ratio;
				if( grid_accordion.boxes[box_index].box.hasClass(grid_accordion.expanded_row_class) ) {
					if( set_height < expanded_row_height ) {
						set_height = expanded_row_height;
						set_width = ratio * set_height;
					}
				} else {
					if( set_height < collapsed_row_height ) {
						set_height = collapsed_row_height;
						set_width = ratio * set_height;
					}
				}
				grid_accordion.boxes[box_index].box.find("." + grid_accordion.options.box_image_class).css({
					width: set_width + "px"
				});
				grid_accordion.boxes[box_index].box.find("." + grid_accordion.options.box_thumbnail_class).css({
					width: set_width + "px"
				});
				if( grid_accordion.boxes[box_index].type == "video" ) {
					grid_accordion.boxes[box_index].box.find("." + grid_accordion.options.jplayer_class).jPlayer("option", "size.width", set_width + "px");
					grid_accordion.boxes[box_index].box.find("." + grid_accordion.options.jplayer_class).jPlayer("option", "size.height", set_height + "px");
				}
			}
		}
	},
	
	// helper function to show all thumbnails
	show_box_thumbnails: function() {
		$("." + grid_accordion.options.box_thumbnail_class).show();
	},
	
	// helper function to hide all thumbnails
	hide_box_thumbnails: function() {
		$("." + grid_accordion.options.box_thumbnail_class).hide();
	},
	
	// sets up all the videos
	bind_videos: function() {
		for( i in grid_accordion.videos ) {
			$("#" + grid_accordion.videos[i].id).jPlayer({
				loop: false,
				swfPath: grid_accordion.options.swf_source,
				supplied: "m4v",
				ended: function() {
					grid_accordion.stop_videos();
				}
			});
		}
		// the video gets loaded after the gallery has been created already, so we need to resize all elements appropriately once to trigger the resize
		if( grid_accordion.options.full_screen ) {
			$(window).trigger("resize");
		} else {
			grid_accordion.set_up_fixed_grid_sizes();
		}
	},
	
	// loads up a particular video box
	process_video: function() {
		// stop all videos
		grid_accordion.stop_videos();
		// sets the active video
		if( typeof grid_accordion.videos[grid_accordion.active_box] !== "undefined" ) {
			if( !grid_accordion.videos[grid_accordion.active_box].loaded ) {
				$("#" + grid_accordion.videos[grid_accordion.active_box].id).jPlayer("setMedia", {
					m4v: grid_accordion.videos[grid_accordion.active_box].src
				});
				grid_accordion.videos[grid_accordion.active_box].loaded = true;
			}
			grid_accordion.boxes[grid_accordion.active_box].box.find("." + grid_accordion.options.box_thumbnail_class).hide();
			$("#" + grid_accordion.videos[grid_accordion.active_box].id).jPlayer("play");
		}
	},
	
	// stops all videos
	stop_videos: function() {
		// shows all thumbnails
		grid_accordion.show_box_thumbnails();
		// stops all videos
		for( i in grid_accordion.videos ) {
			$("#" + grid_accordion.videos[i].id).jPlayer("stop");
		}
	},
	
	// sets the auto slideshow
	set_slideshow: function() {
		grid_accordion.clear_slideshow();
		grid_accordion.slideshow_interval = setInterval(function() {
			grid_accordion.set_slideshow_interval();
		}, grid_accordion.options.delay);
	},
	
	// sets the auto slideshow
	set_slideshow_interval: function() {
		// sets to active slide classes
		grid_accordion.set_box_classes(grid_accordion.active_box);
		// shows all thumbnails
		grid_accordion.show_box_thumbnails();
		// stop all videos
		grid_accordion.stop_videos();
		// hide all generated content boxes
		grid_accordion.hide_generated_content_boxes();
		// sets active box content
		grid_accordion.set_grid_box_content(grid_accordion.active_box);
		// animates to expand to active box
		grid_accordion.move_boxes(false);
		// hides active box's thumbnail
		grid_accordion.boxes[grid_accordion.active_box].box.find("." + grid_accordion.options.box_thumbnail_class).hide();
		// sets video if there is one
		if( grid_accordion.boxes[grid_accordion.active_box].type == "video" ) {
			grid_accordion.process_video();
			grid_accordion.boxes[grid_accordion.active_box].box.find("." + grid_accordion.options.jplayer_class).jPlayer("play");
		}
		// increment active box appropriately
		if( grid_accordion.active_box < grid_accordion.num_boxes ) {
			grid_accordion.active_box++;
		} else {
			grid_accordion.active_box = 0;
		}
	},
	
	// clears the slideshow
	clear_slideshow: function() {
		// clear slideshow interval
		clearInterval(grid_accordion.slideshow_interval);
		// clears all box classes
		grid_accordion.clear_box_classes();
		// shows all thumbnails
		grid_accordion.show_box_thumbnails();
		// stops all videos
		grid_accordion.stop_videos();
	},
	
	// hide all grid box content, these are the original html elements that we are cloning from
	hide_content_boxes: function() {
		for( box_index in grid_accordion.boxes ) {
			grid_accordion.boxes[box_index].content_reference.hide();
		}
	},
	
	// hide all generated grid box content, these are the cloned ones
	hide_generated_content_boxes: function() {
		for( box_index in grid_accordion.boxes ) {
			if( grid_accordion.boxes[box_index].content_clone != null && grid_accordion.boxes[box_index].content_loaded ) {
				grid_accordion.boxes[box_index].content_clone.hide();
			}
		}
	},
	
	// set grid box content
	set_grid_box_content: function(box_index) {
		// if we've not loaded up this box's content before, clone it, add appropriate classes, show it
		if( !grid_accordion.boxes[box_index].content_loaded && grid_accordion.boxes[box_index].content_clone == null ) {
			grid_accordion.boxes[box_index].content_clone = grid_accordion.boxes[box_index].content_reference.clone().removeAttr("id").addClass(grid_accordion.options.box_content_clone_class);
			grid_accordion.boxes[box_index].box.append(grid_accordion.boxes[box_index].content_clone);
			grid_accordion.boxes[box_index].content_loaded = true;
		} else {
			grid_accordion.boxes[box_index].box.append(grid_accordion.boxes[box_index].content_clone);
		}
		grid_accordion.boxes[box_index].content_clone.show();
		// determine if there's anything scrollable within the content box, and if so, set up jscrollpane
		if( grid_accordion.options.enable_box_content_fancy_scroll ) {
			var content_scrollable = grid_accordion.boxes[box_index].content_clone.find("." + grid_accordion.options.box_content_scroll_class);
			if( content_scrollable.length && !grid_accordion.boxes[box_index].scroll_loaded ) {
				var expanded_column_width = grid_accordion.options.expanded_width * grid_accordion.column_width;
				var expanded_row_height = grid_accordion.options.expanded_height * grid_accordion.row_height;
				content_scrollable.css({
					width: expanded_column_width + "px",
					height: expanded_row_height - grid_accordion.options.box_content_scroll_top_offset + "px"
				});
				content_scrollable.jScrollPane({
					autoReinitialise: true
				});
				grid_accordion.boxes[box_index].scroll_loaded = true;
			}
		}
	},
	
	// resets scroll loaded statuses
	reset_scroll_loaded: function() {
		for( box_index in grid_accordion.boxes ) {
			grid_accordion.boxes[box_index].scroll_loaded = false;
		}
		grid_accordion.hide_generated_content_boxes();
	}

}