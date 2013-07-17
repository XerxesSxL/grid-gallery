/*
	jQuery based Grid/Accordion Photo Gallery
	v1.0
	Sean X. Luo
	
	TODO:
		> works great in webkit right now...but that's about it...
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
	
	GOTCHAS:
	
	REQUIRES:
		jQuery: //ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
		jPlayer: http://www.jplayer.org/
	
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
		border_width: 0, // border width in px
		border_color: "#000000", // color of border
		swf_source: "swf", // path to jplayer swf file
		animate_return: true, // whether or not to animate the grid back to its resting state
		resize_inactive_box: true, // whether or not to resize the images in active boxes when there is an active one
		force_static_move: false, // force the grid animation to not happen
		
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
		clear_class: "grid-accordion-clear" // best not to override in options otherwise css selectors will need to be changed
	
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
		border_width: 0, // border width in px
		border_color: "#000000", // color of border
		swf_source: "swf", // path to jplayer swf file
		animate_return: true, // whether or not to animate the grid back to its resting state
		resize_inactive_box: true, // whether or not to resize the images in active boxes when there is an active one
		force_static_move: false, // force the grid animation to not happen
		
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
		clear_class: "grid-accordion-clear" // best not to override in options otherwise css selectors will need to be changed
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
		$(window).load(function() {
			if( grid_accordion.has_videos ) {
				// if there are videos, set video functionality
				grid_accordion.bind_videos();
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
		grid_accordion.loading_screen.fadeOut(500, function() {
			$("body").removeClass(grid_accordion.options.body_loading_class);	
			grid_accordion.loading_screen.remove();
		});
	},
	
	// create gallery html
	create_gallery: function() {
		// get number of boxes
		grid_accordion.num_boxes = grid_accordion.options.target.find(grid_accordion.valid_box_selector).length - 1;
		grid_accordion.active_box = grid_accordion.num_boxes;
		var n = 1;
		var c = 1;
		var r = 1;
		grid_accordion.options.target.children().each(function() {
			if( $(this).is(grid_accordion.valid_box_selector) ) {
				var grid_block_html = '';
				grid_block_html += '<div class="' + grid_accordion.options.box_class + '" index="' + grid_accordion.active_box + '">';
					grid_block_html += '<div class="' + grid_accordion.options.box_viewport_class + '">';
						if( $(this).is("img") ) {
							// if is image
							var type = "image";
							grid_block_html += '<div class="' + grid_accordion.options.box_element_class + '">';
								grid_block_html += '<img src="' + $(this).attr("thumb") + '" class="' + grid_accordion.options.box_thumbnail_class + '" />';
								grid_block_html += '<img src="' + $(this).attr("src") + '" class="' + grid_accordion.options.box_image_class + '" />';
							grid_block_html += '</div>';
						} else if( $(this).is("video") ) {
							// if is video
							var type = "video";
							grid_block_html += '<div class="' + grid_accordion.options.box_element_class + ' ' + grid_accordion.options.box_video_element_class + ' jp-video">';
								grid_block_html += '<img src="' + $(this).attr("thumb") + '" class="' + grid_accordion.options.box_thumbnail_class + '" />';
								grid_block_html += '<div class="jp-type-single">';
									grid_block_html += '<div id="jquery_jplayer_' + grid_accordion.active_box + '" class="' + grid_accordion.options.jplayer_class + '"></div>';
								grid_block_html += '</div>';
							grid_block_html += '</div>';
							// set video object variables and stores
							grid_accordion.has_videos = true;
							grid_accordion.videos[grid_accordion.active_box] = {
								id: "jquery_jplayer_" + grid_accordion.active_box,
								src: $(this).attr("src"),
								thumb: $(this).attr("thumb"),
								loaded: false
							}
						}
					grid_block_html += '</div>';
				grid_block_html += '</div>';
				grid_block_html = $(grid_block_html);
				// if there is a border specified for the grid elements
				if( grid_accordion.options.border_width > 0 ) {
					grid_block_html.css({
						border: "solid " + grid_accordion.options.border_width + "px " + grid_accordion.options.border_color
					});
					grid_accordion.options.target.css({
						"background-color": grid_accordion.options.border_color
					});
				}
				var width = $(this).attr("width");
				var height = $(this).attr("height");
				$(this).remove();
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
				// set slide object stores
				grid_accordion.boxes[grid_accordion.active_box] = {
					box: grid_block_html,
					type: type,
					width: width,
					height: height
				}
				grid_accordion.options.target.append(grid_block_html);
				if( grid_accordion.active_box%grid_accordion.options.num_columns == 0 ) {
					grid_accordion.options.target.append('<div class="' + grid_accordion.options.clear_class + '"></div>');	
				}
				if( grid_accordion.active_box > 0 ) {
					grid_accordion.active_box--;
				}
			} else {
				$(this).remove();
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
		grid_accordion.options.target.css({
			"margin-top": grid_accordion.options.fullscreen_top_offset + "px",
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
		if( grid_accordion.options.full_screen ) {
			grid_accordion.set_up_full_screen_grid_sizes(false);
			$(window).resize(function() {
				grid_accordion.set_up_full_screen_grid_sizes(false);
			});
		} else {
			grid_accordion.set_up_fixed_grid_sizes(false);
		}
		grid_accordion.set_up_grid_hovers();
	},
	
	// sets up fullscreen gallery grid
	set_up_full_screen_grid_sizes: function(animate) {
		var window_width = $(window).width();
		var window_height = $(window).height();
		var box_set_width = window_width / grid_accordion.options.num_columns;
		var box_set_height = grid_accordion.options.target.height() / grid_accordion.options.num_rows;
		if( grid_accordion.options.border_width > 0 ) {
			box_set_width -= grid_accordion.options.border_width * 2;
			box_set_height -= grid_accordion.options.border_width * 2;
		}
		grid_accordion.column_width = box_set_width;
		grid_accordion.row_height = box_set_height;
		for( box_index in grid_accordion.boxes ) {
			if( animate ) {
				grid_accordion.boxes[box_index].box.animate({
					width: box_set_width + "px",
					height: box_set_height + "px"
				}, { 
					duration: 500,
					queue: false,
					complete: function() {
						var ratio = grid_accordion.boxes[$(this).attr("index")].width / grid_accordion.boxes[$(this).attr("index")].height;
						var set_width = box_set_width;
						var set_height = set_width / ratio;
						if( set_height < box_set_height ) {
							set_height = box_set_height;
							set_width = ratio * set_height;
						}
						$(this).find("." + grid_accordion.options.box_thumbnail_class).animate({
							width: set_width + "px",
							height: set_height + "px"
						});
						$(this).find("." + grid_accordion.options.box_image_class).animate({
							width: set_width + "px",
							height: set_height + "px"
						});
					}
				});
			} else {
				var ratio = grid_accordion.boxes[box_index].width / grid_accordion.boxes[box_index].height;
				var set_width = box_set_width;
				var set_height = set_width / ratio;
				if( set_height < box_set_height ) {
					set_height = box_set_height;
					set_width = ratio * set_height;
				}
				grid_accordion.boxes[box_index].box.css({
					width: box_set_width + "px",
					height: box_set_height + "px"
				});
				grid_accordion.boxes[box_index].box.find("." + grid_accordion.options.box_thumbnail_class).css({
					width: set_width + "px",
					height: set_height + "px"
				});
				grid_accordion.boxes[box_index].box.find("." + grid_accordion.options.box_image_class).css({
					width: set_width + "px",
					height: set_height + "px"
				});
			}
			if( grid_accordion.boxes[box_index].type == "video" ) {
				$("#" + grid_accordion.videos[box_index].id).jPlayer("option", "size.width", set_width + "px");
				$("#" + grid_accordion.videos[box_index].id).jPlayer("option", "size.height", set_height + "px");
			}
		}
	},
	
	// sets up fixed size grid
	set_up_fixed_grid_sizes: function(animate) {
		var box_set_width = grid_accordion.options.target.width() / grid_accordion.options.num_columns;
		var box_set_height = grid_accordion.options.target.height() / grid_accordion.options.num_rows;
		if( grid_accordion.options.border_width > 0 ) {
			box_set_width -= grid_accordion.options.border_width * 2;
			box_set_height -= grid_accordion.options.border_width * 2;
		}
		grid_accordion.column_width = box_set_width;
		grid_accordion.row_height = box_set_height;
		for( box_index in grid_accordion.boxes ) {
			if( animate ) {
				grid_accordion.boxes[box_index].box.animate({
					width: box_set_width + "px",
					height: box_set_height + "px"
				}, { 
					duration: 500,
					queue: false,
					complete: function() {
						var ratio = grid_accordion.boxes[$(this).attr("index")].width / grid_accordion.boxes[$(this).attr("index")].height;
						var set_width = box_set_width;
						var set_height = set_width / ratio;
						if( set_height < box_set_height ) {
							set_height = box_set_height;
							set_width = ratio * set_height;
						}
						$(this).find("." + grid_accordion.options.box_thumbnail_class).animate({
							width: set_width + "px",
							height: set_height + "px"
						});
						$(this).find("." + grid_accordion.options.box_image_class).animate({
							width: set_width + "px",
							height: set_height + "px"
						});
						grid_accordion.show_box_thumbnails();
					}
				});
			} else {
				var ratio = grid_accordion.boxes[box_index].width / grid_accordion.boxes[box_index].height;
				var set_width = box_set_width;
				var set_height = set_width / ratio;
				if( set_height < box_set_height ) {
					set_height = box_set_height;
					set_width = ratio * set_height;
				}
				grid_accordion.boxes[box_index].box.css({
					width: box_set_width + "px",
					height: box_set_height + "px"
				});
				grid_accordion.boxes[box_index].box.find("." + grid_accordion.options.box_thumbnail_class).css({
					width: set_width + "px",
					height: set_height + "px"
				});
				grid_accordion.boxes[box_index].box.find("." + grid_accordion.options.box_image_class).css({
					width: set_width + "px",
					height: set_height + "px"
				});
				grid_accordion.show_box_thumbnails();
			}
			if( grid_accordion.boxes[box_index].type == "video" ) {
				$("#" + grid_accordion.boxes[box_index].id).jPlayer("option", "size.width", set_width + "px");
				$("#" + grid_accordion.boxes[box_index].id).jPlayer("option", "size.height", set_height + "px");
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
				grid_accordion.stop_videos();
				$("." + grid_accordion.options.box_class).removeClass(grid_accordion.collapsed_column_class);
				$("." + grid_accordion.options.box_class).removeClass(grid_accordion.collapsed_row_class);
				$("." + grid_accordion.options.box_class).removeClass(grid_accordion.expanded_column_class);
				$("." + grid_accordion.options.box_class).removeClass(grid_accordion.expanded_row_class);
				grid_accordion.move_boxes(true);
			}
		);
		$("." + grid_accordion.options.box_class).hover(
			function() {
				// resets on hover
				$("." + grid_accordion.options.box_class).removeClass(grid_accordion.collapsed_column_class);
				$("." + grid_accordion.options.box_class).removeClass(grid_accordion.collapsed_row_class);
				$("." + grid_accordion.options.box_class).removeClass(grid_accordion.expanded_column_class);
				$("." + grid_accordion.options.box_class).removeClass(grid_accordion.expanded_row_class);
				grid_accordion.active_box = 0;
				grid_accordion.show_box_thumbnails();
				grid_accordion.stop_videos();
				// then figure out what classes to add and where
				var column = $(this).attr("column");
				var row = $(this).attr("row");
				$("." + grid_accordion.options.box_class).not("." + grid_accordion.options.box_class + "[column=" + column + "]").addClass(grid_accordion.collapsed_column_class);
				$("." + grid_accordion.options.box_class).not("." + grid_accordion.options.box_class + "[row=" + row + "]").addClass(grid_accordion.collapsed_row_class);
				$("." + grid_accordion.options.box_class + "[column=" + column + "]").addClass(grid_accordion.expanded_column_class);
				$("." + grid_accordion.options.box_class + "[row=" + row + "]").addClass(grid_accordion.expanded_row_class);
				grid_accordion.active_box = $(this).attr("index");
				grid_accordion.process_video();
				$(this).find("." + grid_accordion.options.box_thumbnail_class).hide();
				$(this).find("." + grid_accordion.options.jplayer_class).jPlayer("play");
				// actually animate
				grid_accordion.move_boxes(false);
			},
			function() {
				// do nothing
			}
		);
	},
	
	// actual box moving function, has ability to expand a focus and collapse others, and reset to grid layout
	move_boxes: function(move_back) {
		if( move_back ) {
			if( grid_accordion.options.full_screen ) {
				grid_accordion.set_up_full_screen_grid_sizes(grid_accordion.options.animate_return);
			} else {
				grid_accordion.set_up_fixed_grid_sizes(grid_accordion.options.animate_return);
			}
		} else {
			// actual animation
			var expanded_column_width = grid_accordion.options.expanded_width * grid_accordion.column_width;
			var collapsed_column_width = grid_accordion.column_width / ( grid_accordion.options.num_columns - 1 );
			var expanded_row_height = grid_accordion.options.expanded_height * grid_accordion.row_height;
			var collapsed_row_height = grid_accordion.row_height / ( grid_accordion.options.num_rows - 1 );
			if( grid_accordion.options.force_static_move ) {
				$("." + grid_accordion.expanded_column_class).css({
					width: expanded_column_width + "px"
				});
				$("." + grid_accordion.collapsed_column_class).css({
					width: collapsed_column_width + "px"
				});
				$("." + grid_accordion.expanded_row_class).css({
					height: expanded_row_height + "px"
				});
				$("." + grid_accordion.collapsed_row_class).css({
					height: collapsed_row_height + "px"
				});
			} else {
				$("." + grid_accordion.expanded_column_class).animate({
					width: expanded_column_width + "px"
				}, { 
					duration: 500,
					queue: false,
					complete: function() {
						
					}
				});
				$("." + grid_accordion.collapsed_column_class).animate({
					width: collapsed_column_width + "px"
				}, { 
					duration: 500,
					queue: false,
					complete: function() {
						
					}
				});
				$("." + grid_accordion.expanded_row_class).animate({
					height: expanded_row_height + "px"
				}, { 
					duration: 500,
					queue: false,
					complete: function() {
						
					}
				});
				$("." + grid_accordion.collapsed_row_class).animate({
					height: collapsed_row_height + "px"
				}, { 
					duration: 500,
					queue: false,
					complete: function() {
						
					}
				});
			}
			// set sizes of images/videos
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
					width: set_width + "px",
					height: set_height + "px"
				});
				grid_accordion.boxes[box_index].box.find("." + grid_accordion.options.box_thumbnail_class).css({
					width: set_width + "px",
					height: set_height + "px"
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
				loop: true,
				swfPath: grid_accordion.options.swf_source,
				supplied: "flv",
				solution: "html, flash",
			});
		}
		// the video gets loaded after the gallery has been created already, so we need to re-size all elements appropriately
		if( grid_accordion.options.full_screen ) {
			$(window).trigger("resize");
		} else {
			grid_accordion.set_up_fixed_grid_sizes();
		}
	},
	
	// loads up a particular video slide: stops all videos, and sets the element to the video then plays (video defaults to poster)
	process_video: function() {
		grid_accordion.stop_videos();
		if( typeof grid_accordion.videos[grid_accordion.active_box] !== "undefined" ) {
			if( !grid_accordion.videos[grid_accordion.active_box].loaded ) {
				$("#" + grid_accordion.videos[grid_accordion.active_box].id).jPlayer("setMedia", {
					flv: grid_accordion.videos[grid_accordion.active_box].src
				});
				grid_accordion.videos[grid_accordion.active_box].loaded = true;
			}
			grid_accordion.boxes[grid_accordion.active_box].box.find("." + grid_accordion.options.box_thumbnail_class).hide();
			$("#" + grid_accordion.videos[grid_accordion.active_box].id).jPlayer("play");
		}
	},
	
	// stops all videos: stop video, hides video, shows poster
	stop_videos: function() {
		grid_accordion.show_box_thumbnails();
		for( i in grid_accordion.videos ) {
			$("#" + grid_accordion.videos[i].id).jPlayer("stop");
		}
	}

}