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

/* -------------------- Create User Roles and Capabilites ------------------- */

// function create_tour_agent_role(){
//     $customer_capabilites = get_role('customer')->capabilities;
//     $add_capabilities = [
//         'create_'
//     ]
//     $tour_agent_capabilites;
//     add_role('tour_agent', 'Tour Agent', $tour_agent_capabilites);
// }
// add_action('after_setup_theme', 'create_tour_agent_role');

// $admin_caps = get_role('administrator')->capabilities;
// $tour_agent_caps = get_role('customer')->capabilities;

// echo '<pre>';
// print_r($admin_caps);
// print_r($tour_agent_caps);
// echo '</pre>';
// die();


/* ---------------------------- Ajax To Save Form --------------------------- */

function process_save_tour(){
    $html_blob = $_POST['html_blob'];
    $tour_title = sanitize_text_field( $_POST['tour_title'] );

    $tour_builder_post = array(
        'post_type'     => 'tour-builder-tour',
        'post_status'   => 'publish',
        'post_title'    => $tour_title,
        'post_content'  => $html_blob
    );
    wp_insert_post( $tour_builder_post );
    wp_send_json_success( $tour_builder_post );

    wp_die();
}

add_action('wp_ajax_tour_builder_save_tour', 'process_save_tour' );


/* -------------- Load styles and scripts for Tour builder page ------------- */
function tour_builder_enqueue() {
    if (is_page('tour-builder')) {
        wp_enqueue_style( 'jquery-ui-css', plugins_url('jquery-ui.min.css', __FILE__) );
        wp_enqueue_style( 'flatpickr-css', 'https://cdn.jsdelivr.net/npm/flatpickr/dist/flatpickr.min.css');
        wp_enqueue_style( 'tour-builder-css', plugins_url('tour-builder-itinerary-module.css', __FILE__) );
        wp_enqueue_style( 'tour-builder-activity-css', plugins_url('tour-builder-activity-module.css', __FILE__) );
        wp_enqueue_script('flatpickr', plugins_url('flatpickr.min.js', __FILE__ ), array( 'jquery' ), '', true);
        wp_enqueue_script('flatpickr-date-range', plugins_url('flatpickr-date-range-plugin.js', __FILE__), array( 'flatpickr' ), '', true);
        wp_enqueue_script('tour-builder-module', plugins_url('tour-builder-itinerary-module.js', __FILE__), array( 'flatpickr', 'flatpickr-date-range', 'jquery-ui-core', 'jquery-ui-tabs' ), '', true);
        wp_enqueue_script('tour-builder-activity-module', plugins_url('tour-builder-activity-module.js', __FILE__), array( 'tour-builder-module' ), '', true);
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
    $roles = array( 'administrator', 'site-manager', 'tour_agent' );
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