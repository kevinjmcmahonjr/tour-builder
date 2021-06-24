<?php
/*
Plugin Name: Tour Agent Tour Builder
Plugin URI:
Description:
Version: 0.8.4
Author: Kevin J. McMahon Jr.
Author URI:
License:GPLv2
*/
?>

<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}


/* ---------------------------- Ajax To Save Form --------------------------- */

function process_save_tour(){

    if ( ! is_user_logged_in() && ! $_POST['is_user_logged_in'] === '1' ){
        wp_send_json_error('Not logged in');
        wp_die();
    }

    if ( ! isset($_POST['nonce']) || ! wp_verify_nonce($_POST['nonce'], 'tour-builder-nonce') ){
        wp_send_json_error('Nonce Failed');
        wp_die();
    }

    $current_nonce = $_POST['nonce'];
    $tour_title = sanitize_text_field( $_POST['tour_title'] );
    $tour_id = sanitize_text_field( $_POST['tour_id']);
    $tour_summary = wp_kses_post( $_POST['tour_summary'] );
    $tour_data = json_encode( $_POST['tour_data'] );


    $tour_builder_post = array(
        'post_type'     => 'tour-builder-tour',
        'post_status'   => 'publish',
        'post_title'    => $tour_title,
        'post_content'  => $tour_summary,
        'meta_input'    => array(
            'tour_builder_tour_id'  => $tour_id,
            'tour_builder_tour_json' => $tour_data
        )
    );
    wp_insert_post( $tour_builder_post );
    wp_send_json_success( $current_nonce );

    wp_die();
}
add_action('wp_ajax_tour_builder_save_tour', 'process_save_tour' );


/* -------------- Load styles and scripts for Tour builder page ------------- */
function tour_builder_enqueue() {
    if (is_page('tour-builder')) {

        $plugin_file = __FILE__;
        $plugin_data = get_plugin_data( $plugin_file );
        define ( 'TOUR_BUILDER_VERSION', $plugin_data["Version"] );

        wp_enqueue_style( 'jquery-ui-css', plugins_url('vendors/css/jquery-ui.min.css', __FILE__) );
        wp_enqueue_style( 'flatpickr-css', plugins_url('vendors/css/flatpickr.min.css', __FILE__) );
        wp_enqueue_style( 'tour-builder-css', plugins_url('css/tour-builder-itinerary-module.css', __FILE__) , array(), filemtime( plugin_dir_path( __FILE__ ) . 'css/tour-builder-itinerary-module.css') );
        wp_enqueue_style( 'tour-builder-activity-css', plugins_url('css/tour-builder-activity-module.css', __FILE__) , array() , filemtime( plugin_dir_path( __FILE__) . 'css/tour-builder-activity-module.css') );
        wp_enqueue_script('flatpickr', plugins_url('vendors/js/flatpickr.min.js', __FILE__ ), array( 'jquery' ), '', true);
        wp_enqueue_script('flatpickr-date-range', plugins_url('vendors/js/flatpickr-date-range-plugin.js', __FILE__), array( 'flatpickr' ), '', true);
        wp_enqueue_script('cleave-input-mask', plugins_url('vendors/js/cleave.min.js', __FILE__), array( ), '', true);
        wp_enqueue_script('tour-builder-module', plugins_url('js/tour-builder-itinerary-module.js', __FILE__), array( 'flatpickr', 'flatpickr-date-range', 'jquery-ui-core', 'jquery-ui-tabs' ), filemtime( plugin_dir_path( __FILE__) . 'js/tour-builder-itinerary-module.js' ), true);
        wp_enqueue_script('tour-builder-activity-module', plugins_url('js/tour-builder-activity-module.js', __FILE__), array( 'tour-builder-module' ), filemtime( plugin_dir_path( __FILE__ ) . 'js/tour-builder-activity-module.js' ), true);
        wp_enqueue_script('tour-builder-summary-generator', plugins_url('js/tour-builder-summary-generator.js', __FILE__), array( 'tour-builder-module', 'tour-builder-activity-module' ), filemtime( plugin_dir_path( __FILE__ ) . 'js/tour-builder-summary-generator.js' ), true);
        $variable_for_javascript = [
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce' => wp_create_nonce('tour-builder-nonce'),
            'is_user_logged_in' => is_user_logged_in(),
        ];
        wp_localize_script('tour-builder-module', 'WP_Variables', $variable_for_javascript);
    }
}
add_action('wp_enqueue_scripts', 'tour_builder_enqueue');


/* ------------- Create Shortcode to initialize the tour builder ------------ */
function initialize_tour_builder(){
    if ( ! is_user_logged_in() ){
        echo "You must be logged in to access this resource.";
        return;
    }
    $user = wp_get_current_user();
    $roles = array( 'administrator', 'site_manager', 'tour_agent' );
    if ( is_user_logged_in() && ! array_intersect( $roles, $user->roles)  ){
        echo "You're not authorized to access this page. If you believe this is an error, please contact Wherever Tours technical support.";
        print_r($user->roles);
        echo get_userdata($current_user->ID);
        return;
    }

    $template = plugin_dir_path( __FILE__ ) . 'templates/tour_builder_ui_base.php';
    require $template;
}
add_shortcode( 'tour-builder', 'initialize_tour_builder' );
?>