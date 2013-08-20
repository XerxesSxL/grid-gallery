<!DOCTYPE html>
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>grid</title>
		<link type="image/x-icon" href="images/favicon.ico?v=1" rel="shortcut icon" />
		<script type="text/javascript" src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
		<script type="text/javascript" src="<?php echo $DOCUMENT_ROOT; ?>js/jquery.jplayer.min.js"></script>
		<script type="text/javascript" src="<?php echo $DOCUMENT_ROOT; ?>js/jquery.mousewheel.js"></script>
		<script type="text/javascript" src="<?php echo $DOCUMENT_ROOT; ?>js/jquery.jscrollpane.min.js"></script>
		<script type="text/javascript" src="<?php echo $DOCUMENT_ROOT; ?>js/bgstretcher.custom.js"></script>
		<script type="text/javascript" src="<?php echo $DOCUMENT_ROOT; ?>js/grid.accordion.gallery.v2.js"></script>
		<script type="text/javascript">
			var DOCUMENT_ROOT = "<?php echo $DOCUMENT_ROOT; ?>";
			var IMAGES = [<?php echo substr( $IMAGES_STR, 0, -2 ); ?>];
		</script>
		<script type="text/javascript" src="<?php echo $DOCUMENT_ROOT; ?>js/source.js"></script>
		<link rel="stylesheet" type="text/css" media="all" href="<?php echo $DOCUMENT_ROOT; ?>css/reset.css" />
		<link rel="stylesheet" type="text/css" media="all" href="<?php echo $DOCUMENT_ROOT; ?>css/jquery.jscrollpane.css" />
		<link rel="stylesheet" type="text/css" media="all" href="<?php echo $DOCUMENT_ROOT; ?>css/bgstretcher.css" />
		<link rel="stylesheet" type="text/css" media="all" href="<?php echo $DOCUMENT_ROOT; ?>css/grid.accordion.gallery.css" />
		<link rel="stylesheet" type="text/css" media="all" href="http://fonts.googleapis.com/css?family=Lato:300,400,700,300italic,400italic,700italic" />
		<link rel="stylesheet" type="text/css" media="all" href="http://fonts.googleapis.com/css?family=Josefin+Slab:300,400,700,300italic,400italic,700italic" />
		<link rel="stylesheet" type="text/css" media="all" href="<?php echo $DOCUMENT_ROOT; ?>css/style.css" />
	</head>
	<body>
		<div class="container">