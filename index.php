<?php

	$DOCUMENT_ROOT = str_replace( "index.php", "", $_SERVER['PHP_SELF'] );
	
	$SLIDES = array();
	$index = 0;
	for( $n = 1; $n <= 12; $n++ ) {
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
	
	$IMAGES_STR = "";
	for( $n = 1; $n <= 12; $n++ ) {
		$IMAGES_STR .= "{ src: '" . $DOCUMENT_ROOT . "images/gallery-images/image-" . $n . ".jpg', alt: 'Image " . $n . "'}, ";
	}
	
	include_once("modules/header.php");
	include_once("pages/gallery.php");
	include_once("modules/footer.php");

?>