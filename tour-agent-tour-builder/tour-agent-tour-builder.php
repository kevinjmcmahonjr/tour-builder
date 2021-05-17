<?php
/*
Plugin Name: Tour Agent Tour Builder
Plugin URI:
Description:
Version: 1.0
Author: Kevin J. McMahon Jr.
Author URI:
License:GPLv2
*/
?>
<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

add_action('wp_enqueue_scripts', 'tour_builder_enqueue');
function tour_builder_enqueue() {
    if (is_page('tour-builder')) {
        wp_enqueue_style( 'jquery-ui-css', plugin_url('jquery-ui.theme.min.css', __FILE__) );
        wp_enqueue_script('flatpickr', plugin_url('flatpickr.min.js', __FILE__ ), array( 'jquery' ), '', true);
        wp_enqueue_script('flatpickr-date-range', plugin_url('flatpickr-date-range-plugin.js', __FILE__), array( 'flatpickr' ), '', true);
        wp_enqueue_script('tour-builder-module', plugin_url('tour-builder-itinerary-module.js', __FILE__), array( 'flatpickr', 'flatpickr-date-range' ), '', true);
    }
}
?>