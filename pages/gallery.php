<div class="grid-accordion-gallery" id="grid-accordion-gallery">
	<?php foreach( $SLIDES as $index => $slide ) { ?>
		<?php if( $slide['type'] == "photo" ) { ?>
			<img src="<?php echo $slide['src']; ?>" width="<?php echo $slide['width']; ?>" height="<?php echo $slide['height']; ?>" thumb="<?php echo $slide['thumb']; ?>" index="<?php echo $slide['index']; ?>" content-id="<?php echo $slide['content-id']; ?>" />
		<?php } elseif( $slide['type'] == "video" ) { ?>
			<video src="<?php echo $slide['src']; ?>" width="<?php echo $slide['width']; ?>" height="<?php echo $slide['height']; ?>" thumb="<?php echo $slide['thumb']; ?>" index="<?php echo $slide['index']; ?>" content-id="<?php echo $slide['content-id']; ?>"></video>
		<?php } ?>
	<?php } ?>
	<!-- invalid slide elements, will be automatically removed -->
	<div></div>
	<p></p>
	<span></span>
	<table></table>
	<form></form>
</div>

<!-- content boxes -->
<div class="content-boxes">
	<?php foreach( $SLIDES as $index => $slide ) { ?>
		<div class="box-content <?php echo $index; ?>-content" id="<?php echo $index; ?>-content">
			<?php if( $index == 1 ) { ?>
				<div class="box-content-heading">
					<h2 class="box-content-heading-left yellow left">Photo Gallery</h2>
					<a href="#" class="box-content-heading-right left box-content-heading-cta launch-gallery">Launch Fullscreen Slideshow</a>
					<a href="#" class="box-content-heading-right right box-content-heading-cta close-content-box">Close box <?php echo $index; ?></a>
					<div class="clear"></div>
				</div>
				<div class="grid-content-scrollable">
					<div class="box-content-content box-content-content-transparent box-content-gallery-thumbs">
						<?php $t_i = 0; ?>
						<?php for( $n = 1; $n <= 12; $n++ ) { ?>
							<div class="box-gallery-thumbnail-block left">
								<a href="#" class="load-full-screen-gallery" image="<?php echo $DOCUMENT_ROOT; ?>images/gallery-images/image-<?php echo $n; ?>.jpg" index="<?php echo $t_i; ?>">
									<img src="<?php echo $DOCUMENT_ROOT; ?>images/gallery-images/image-<?php echo $n; ?>-thumb.jpg" width="220" />
								</a>
							</div>
							<?php $t_i++; ?>
						<?php } ?>
						<div class="clear"></div>
					</div>
				</div>
			<?php } else { ?>
				<div class="box-content-heading">
					<h2 class="box-content-heading-left yellow left">Box <?php echo $index; ?> heading</h2>
					<a href="#" class="box-content-heading-right right box-content-heading-cta close-content-box">Close box <?php echo $index; ?></a>
					<div class="clear"></div>
				</div>
				<!--
				<div class="grid-content-scrollable">
					<div class="box-content-content">
						<p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam eros ante, imperdiet sit amet ultricies nec, interdum in justo. Vivamus non sapien et erat pulvinar aliquet. Vivamus nunc metus, egestas vel congue ac, varius in lacus. Vestibulum dignissim lectus sed lacus pharetra auctor. Maecenas egestas dictum ullamcorper. Sed dolor lacus, hendrerit et sagittis sit amet, placerat ut dolor. Curabitur ultricies consequat pharetra. Vivamus mi tortor, fringilla sed posuere sagittis, sodales sit amet massa. Cras ligula enim, vulputate eu laoreet sit amet, tempor ut nisl. Etiam non erat justo, ac aliquet dolor. Sed nunc est, facilisis at cursus sed, porttitor ut justo. Ut iaculis, risus vitae porttitor fermentum, diam justo ultrices purus, sed varius sapien orci nec libero. In in sem turpis. Nam placerat quam at tellus euismod non ultrices nisi lobortis.</p>
						<p>In consequat, arcu eget dapibus molestie, augue ligula posuere mi, id aliquet lorem neque ac purus. Quisque dictum tellus a arcu lacinia sed fermentum quam blandit. In scelerisque quam sit amet ante aliquet scelerisque. Donec sed mauris erat. Quisque nec dapibus nisl. Integer nunc risus, vestibulum viverra bibendum eget, malesuada non diam. Nullam massa eros, gravida et feugiat nec, auctor dignissim felis. Praesent venenatis nibh at est ornare molestie sed at enim. Praesent at est sed justo rhoncus mattis. Donec sit amet mauris sed odio sagittis fermentum vitae vel neque.</p>
						<p>Aenean imperdiet augue sit amet erat blandit vel commodo mauris iaculis. Mauris posuere gravida tellus, ac eleifend neque congue vel. Maecenas bibendum tristique felis, ac venenatis lectus tincidunt eget. Aenean non justo metus. Aliquam a arcu non turpis elementum pellentesque ut scelerisque enim. Nam libero nisl, sagittis sed viverra in, cursus at nibh. In quis lorem justo, nec ullamcorper nibh. Sed nisl arcu, tincidunt vel tincidunt id, adipiscing dictum quam. Fusce ac tellus enim, nec volutpat elit. Nunc nisl est, auctor tristique pretium ut, volutpat vitae neque. Vivamus in tortor sed nunc cursus mollis eu nec nibh. Vestibulum diam massa, fringilla nec scelerisque sed, imperdiet vel tellus. Curabitur sit amet mauris urna. Sed accumsan sollicitudin blandit. Vivamus massa ante, lobortis id facilisis sit amet, tincidunt molestie urna. Curabitur libero tortor, placerat in mollis ac, interdum sit amet neque.</p>
					</div>
				</div>
				-->
			<?php } ?>
		</div>
	<?php } ?>
</div>

<div class="photo-gallery" id="photo-gallery">
	<div class="gallery-close"></div>
	<div class="gallery-nav gallery-prev" id="gallery-prev"></div>
	<div class="gallery-nav gallery-next" id="gallery-next"></div>
	<div class="gallery-overlay"></div>
</div>