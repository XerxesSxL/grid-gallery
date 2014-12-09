<?php

	$DOCUMENT_ROOT = str_replace( "index.php", "", $_SERVER['PHP_SELF'] );
	
	$SLIDES = array();
	$index = 0;
	for( $n = 1; $n <= 11; $n++ ) {
		$SLIDES[ $index ] = array(
			"src" => $DOCUMENT_ROOT . "images/grid-images/image-" . $n . ".jpg",
			"width" => 1600,
			"height" => 1071,
			"thumb" => $DOCUMENT_ROOT . "images/grid-images/image-" . $n . "b.jpg",
			"index" => $index,
			"type" => "photo",
			"content-id" => $index . "-content"
		);
		$index++;	
	}
	$SLIDES[11] = array(
		"src" => $DOCUMENT_ROOT . "videos/1.m4v",
		"width" => 640,
		"height" => 360,
		"thumb" => $DOCUMENT_ROOT . "videos/1.png",
		"index" => 12,
		"type" => "video",
		"content-id" =>  "12-content"
	);
	$index++;
	for( $n = 1; $n <= 11; $n++ ) {
		$SLIDES[ $index ] = array(
			"src" => $DOCUMENT_ROOT . "images/grid-images/image-" . $n . ".jpg",
			"width" => 1600,
			"height" => 1071,
			"thumb" => $DOCUMENT_ROOT . "images/grid-images/image-" . $n . "b.jpg",
			"index" => $index,
			"type" => "photo",
			"content-id" => $index . "-content"
		);
		$index++;	
	}
	$SLIDES[23] = array(
		"src" => $DOCUMENT_ROOT . "videos/1.m4v",
		"width" => 640,
		"height" => 360,
		"thumb" => $DOCUMENT_ROOT . "videos/1.png",
		"index" => 12,
		"type" => "video",
		"content-id" =>  "12-content"
	);
	$index++;
	for( $n = 1; $n <= 11; $n++ ) {
		$SLIDES[ $index ] = array(
			"src" => $DOCUMENT_ROOT . "images/grid-images/image-" . $n . ".jpg",
			"width" => 1600,
			"height" => 1071,
			"thumb" => $DOCUMENT_ROOT . "images/grid-images/image-" . $n . "b.jpg",
			"index" => $index,
			"type" => "photo",
			"content-id" => $index . "-content"
		);
		$index++;	
	}
	$SLIDES[35] = array(
		"src" => $DOCUMENT_ROOT . "videos/1.m4v",
		"width" => 640,
		"height" => 360,
		"thumb" => $DOCUMENT_ROOT . "videos/1.png",
		"index" => 12,
		"type" => "video",
		"content-id" =>  "12-content"
	);
	$index++;
	for( $n = 1; $n <= 11; $n++ ) {
		$SLIDES[ $index ] = array(
			"src" => $DOCUMENT_ROOT . "images/grid-images/image-" . $n . ".jpg",
			"width" => 1600,
			"height" => 1071,
			"thumb" => $DOCUMENT_ROOT . "images/grid-images/image-" . $n . "b.jpg",
			"index" => $index,
			"type" => "photo",
			"content-id" => $index . "-content"
		);
		$index++;	
	}
	$SLIDES[47] = array(
		"src" => $DOCUMENT_ROOT . "videos/1.m4v",
		"width" => 640,
		"height" => 360,
		"thumb" => $DOCUMENT_ROOT . "videos/1.png",
		"index" => 12,
		"type" => "video",
		"content-id" =>  "12-content"
	);
	$SLIDES[48] = array(
		"src" => $DOCUMENT_ROOT . "images/grid-images/image-1.jpg",
			"width" => 1600,
			"height" => 1071,
			"thumb" => $DOCUMENT_ROOT . "images/grid-images/image-1b.jpg",
			"index" => 48,
			"type" => "photo",
			"content-id" => "48-content"
	);
	
	$IMAGES_STR = "";
	for( $n = 1; $n <= 12; $n++ ) {
		$IMAGES_STR .= "{ src: '" . $DOCUMENT_ROOT . "images/gallery-images/image-" . $n . ".jpg', alt: 'Image " . $n . "'}, ";
	}
	
	include_once("modules/header.php");
	include_once("pages/gallery.php");
	include_once("modules/footer.php");

?>