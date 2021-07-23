<?php
/**
 * @package WTTourBuilderPlugin
 */
/*
Plugin Name: Tour Agent Tour Builder
Plugin URI:
Description:
Version: 0.8.7 Beta
Author: Kevin J. McMahon Jr.
Author URI:
License:GPLv2
Text Domain: wt-tour-builder-plugin
*/

if ( ! defined( 'ABSPATH' ) ) {
	die; // Exit if accessed directly
}


/* --------------------- Custom Post Type and User Roles -------------------- */

class TourBuilder
{
    function __construct(){
        add_action( 'init', array( $this, 'create_tour_builds_cpt'));
        add_action( 'init', array( $this, 'add_tour_build_capabilities'));
        //add_action( 'add_meta_boxes', array( $this, 'add_tour_build_meta_boxes'));
    }
    function activate(){
        $this->create_tour_builds_cpt();
        flush_rewrite_rules();
    }
    function deactivate(){
        function test_admin_notice__success(){
            printf('<div class="notice notice-success is-dismissible"><p>Something Happened!</p></div>');
        }
        add_action('admin_notices', 'test_admin_notice__success');
        flush_rewrite_rules();
    }

    function create_tour_builds_cpt() {
        $labels = [
            'name'                     => __( 'Tour Builds', 'wherever-tours-textdomain' ),
            'singular_name'            => __( 'Tour Build', 'wherever-tours-textdomain' ),
            'add_new'                  => __( 'Add New Tour Build', 'wherever-tours-textdomain' ),
            'add_new_item'             => __( 'Add New Tour Build', 'wherever-tours-textdomain' ),
            'edit_item'                => __( 'Edit Tour Build', 'wherever-tours-textdomain' ),
            'new_item'                 => __( 'New Tour Build', 'wherever-tours-textdomain' ),
            'view_item'                => __( 'View Tour Build', 'wherever-tours-textdomain' ),
            'view_items'               => __( 'View Tour Builds', 'wherever-tours-textdomain' ),
            'search_items'             => __( 'Search Tour Builds', 'wherever-tours-textdomain' ),
            'not_found'                => __( 'No Tour Builds Found', 'wherever-tours-textdomain' ),
            'not_found_in_trash'       => __( 'No Tour Builds Found in Trash', 'wherever-tours-textdomain' ),
            'parent_item_colon'        => __( 'Parent Tour Build Tour:', 'wherever-tours-textdomain' ),
            'all_items'                => __( 'All Tour Builds', 'wherever-tours-textdomain' ),
            'archives'                 => __( 'Tour Build Archives', 'wherever-tours-textdomain' ),
            'attributes'               => __( 'Tour Build Attributes', 'wherever-tours-textdomain' ),
            'insert_into_item'         => __( 'Insert Into Tour Build', 'wherever-tours-textdomain' ),
            'uploaded_to_this_item'    => __( 'Uploaded to this Tour Build', 'wherever-tours-textdomain' ),
            'featured_image'           => __( 'Tour Build Featured Image', 'wherever-tours-textdomain' ),
            'set_featured_image'       => __( 'Set Tour Build Featured Image', 'wherever-tours-textdomain' ),
            'remove_featured_image'    => __( 'Remove featured image', 'wherever-tours-textdomain' ),
            'use_featured_image'       => __( 'Use as featured image', 'wherever-tours-textdomain' ),
            'menu_name'                => __( 'Tour Builds', 'wherever-tours-textdomain' ),
            'filter_items_list'        => __( 'Filter Tour Builds list', 'wherever-tours-textdomain' ),
            'items_list_navigation'    => __( 'Tour Build list navigation', 'wherever-tours-textdomain' ),
            'items_list'               => __( 'Tour Build list', 'wherever-tours-textdomain' ),
            'item_published'           => __( 'Tour Build Confirmed and Active', 'wherever-tours-textdomain' ),
            'item_published_privately' => __( 'Tour Build Submitted', 'wherever-tours-textdomain' ),
            'item_reverted_to_draft'   => __( 'Tour Build reverted to draft', 'wherever-tours-textdomain' ),
            'item_scheduled'           => __( 'Tour Build Scheduled For Release', 'wherever-tours-textdomain' ),
            'item_updated'             => __( 'Tour Build updated', 'wherever-tours-textdomain' ),
        ];
        
        $caps = [
            // Meta Capabilities
            'edit_post'             => 'edit_tour_build',
            'read_post'             => 'read_tour_build',
            'delete_post'           => 'delete_tour_build',

            // Primitive/Meta Capabilities
            'create_posts'          => 'create_tour_build',

            // Primitive Capabilities used outside of map_meta_cap()
            'edit_posts'            => 'edit_tour_builds', 
            'edit_others_posts'     => 'edit_others_tour_builds',
            'publish_posts'         => 'publish_tour_builds',
            'read_private_posts'    => 'read_private_tour_builds',

            // Primitive Capabilities used inside of map_meta_cap()
            'read'                  => 'read',
            'delete_posts'          => 'delete_tour_builds',
            'delete_private_posts'  => 'delete_private_tour_builds',
            'delete_others_posts'   => 'delete_others_tour_builds',
            'edit_private_posts'    => 'edit_private_tour_builds',
            'edit_published_posts'  => 'edit_published_tour_builds'
        ];

        $args = [
            'label'               => __( 'Tour Builds', 'wherever-tours-textdomain' ),
            'labels'              => $labels,
            'description'         => 'Tour Builds are tours that are in the process of being built by custom request.',
            'public'              => true,
            'hierarchical'        => false,
            'exclude_from_search' => false,
            'publicly_queryable'  => true,
            'show_ui'             => true,
            'show_in_nav_menus'   => true,
            'show_in_admin_bar'   => true,
            'show_in_rest'        => true,
            'menu_position'       => null,
            'query_var'           => true,
            'can_export'          => true,
            'delete_with_user'    => false,
            'has_archive'         => true,
            'rest_base'           => '',
            'show_in_menu'        => true,
            'menu_icon'           => 'dashicons-hammer',
            'capability_type'     => array('tour_build', 'tour_builds'),
            'map_meta_cap'        => true,
            'supports'            => ['title', 'editor', 'author'],
            //'taxonomies'          => [],
            // 'rewrite'             => [
            //     // 'slug' => 'tour-builds',
            //    'with_front' => true,
            // ],
        ];
        register_post_type( 'tour_builds', $args );
    }


    function add_tour_build_capabilities(){
        $admin = get_role( 'administrator');
        $admin->add_cap('edit_tour_build');
        $admin->add_cap('read_tour_build');
        $admin->add_cap('delete_tour_build');
        $admin->add_cap('create_tour_build');
        $admin->add_cap('edit_tour_builds');
        $admin->add_cap('edit_others_tour_builds');
        $admin->add_cap('publish_tour_builds');
        $admin->add_cap('read_private_tour_builds');
        $admin->add_cap('delete_tour_builds');
        $admin->add_cap('delete_others_tour_builds');
        $admin->add_cap('edit_private_tour_builds');
        $admin->add_cap('edit_published_tour_builds');
        $admin->add_cap('delete_published_tour_builds');
        $admin->add_cap('delete_private_tour_builds');

        $manager = get_role( 'site_manager');
        $manager->add_cap('edit_tour_build');
        $manager->add_cap('read_tour_build');
        $manager->add_cap('delete_tour_build');
        $manager->add_cap('create_tour_build');
        $manager->add_cap('edit_tour_builds');
        $manager->add_cap('edit_others_tour_builds');
        $manager->add_cap('publish_tour_builds');
        $manager->add_cap('read_private_tour_builds');
        $manager->add_cap('delete_tour_builds');
        $manager->add_cap('delete_others_tour_builds');
        $manager->add_cap('edit_private_tour_builds');
        $manager->add_cap('edit_published_tour_builds');

        $agent = get_role( 'tour_agent');
        $agent->add_cap('edit_tour_build');
        $agent->add_cap('read_tour_build');
        $agent->add_cap('delete_tour_build');
        $agent->add_cap('create_tour_build');
    }
}

// Instantiate the Tour Builder class
if ( class_exists('TourBuilder') ) {
    $tourBuilder = new TourBuilder();
}

// Activate
register_activation_hook( __FILE__, array( $tourBuilder, 'activate' ) );

// Deactivate
register_deactivation_hook( __FILE__, array( $tourBuilder, 'deactivate' ) );

// Set the Admin Columns for Tour Builds
function wherever_tours_tour_builds_columns($columns){
    $columns = array(
        'cb' => $columns['cb'],
        'tour_title' => "Tour Title",
        'title' => "Tour ID",
        'author' => "Tour Agent",
        'date' => "Date Created",
    );
    return $columns;
}
add_filter( 'manage_tour_builds_posts_columns', 'wherever_tours_tour_builds_columns' );


add_action( 'manage_tour_builds_posts_custom_column', 'wt_tour_builder_custom_column', 10 , 2);
function wt_tour_builder_custom_column( $column, $post_id){
    if ( $column === 'tour_title' ){
        echo get_post_meta( $post_id, 'tour_builder_tour_title', true);
    }
}

// Get Post Meta Data for Tour Builds Admin Columns
// function wherever_tours_tour_builds_custom_column( $column , $post_id ) {
//     if ( 'tour_title' === $column ){
//         $tour_title = get_post_meta( $post_id, 'tour_builder_tour_title', true);
//         echo $tour_title;
//     }
// }
// add_action( 'manage_tour_builds_posts_custom_column', 'wherever_tours_tour_builds_custom_column');



function add_tour_build_meta_boxes(){
    function tour_id_admin_markup(){

    }

    add_meta_box('tour-id', 'Tour ID', 'tour_id_admin_markup', 'tour-builds', 'normal', 'high', null);
    add_meta_box('tour-data', 'Tour Data', 'tour_data_admin_markup', 'tour-builds', 'normal', 'high', null);
}
add_action( 'add_meta_boxes', 'add_tour_build_meta_boxes');


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
    $tour_save_type = sanitize_text_field( $_POST['save_type']);
    $post_id = sanitize_text_field( $_POST['post_id'] );

    if ($tour_save_type === 'draft'){
        $tour_builder_post = array(
            'post_type'     => 'tour_builds',
            'post_status'   => 'draft',
            'post_title'    => $tour_id,
            'post_content'  => $tour_summary,
            'meta_input'    => array(
                'tour_builder_tour_title'  => $tour_title,
                'tour_builder_tour_id' => $tour_id,
                'tour_builder_tour_json' => $tour_data
            )
        );
        wp_insert_post( $tour_builder_post );
    } else if ($tour_save_type === 'submit'){
        $tour_builder_post = array(
            'post_type'     => 'tour_builds',
            'post_status'   => 'pending',
            'post_title'    => $tour_id,
            'post_content'  => $tour_summary,
            'meta_input'    => array(
                'tour_builder_tour_title'  => $tour_title,
                'tour_builder_tour_id' => $tour_id,
                'tour_builder_tour_json' => $tour_data
            )
        );
        wp_insert_post( $tour_builder_post );
    } else if ($tour_save_type === 'update'){
        $tour_builder_post = array(
            'ID'            => $post_id,
            'post_type'     => 'tour_builds',
            'post_status'   => 'draft',
            'post_title'    => $tour_id,
            'post_content'  => $tour_summary,
            'meta_input'    => array(
                'tour_builder_tour_title'  => $tour_title,
                'tour_builder_tour_id' => $tour_id,
                'tour_builder_tour_json' => $tour_data
            )
        );
        wp_update_post( $tour_builder_post );
    }

    //wp_insert_post( $tour_builder_post );
    wp_send_json_success( $current_nonce );

    wp_die();
}
add_action('wp_ajax_tour_builder_save_tour', 'process_save_tour' );


/* -------------- Load styles and scripts for Tour builder page ------------- */
function tour_builder_enqueue() {
    global $post;
    if ( is_page('tour-builder') || ($post->post_type ==='tour_builds') ) {

        $tour_data = null;
        $plugin_file = __FILE__;
        $plugin_data = get_plugin_data( $plugin_file );
        define ( 'TOUR_BUILDER_VERSION', $plugin_data["Version"] );
        if (metadata_exists('post', $post->ID, 'tour_builder_tour_json')){
            $tour_data = get_post_meta($post->ID, 'tour_builder_tour_json')[0];
        }

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
            'post_id'   => $post->ID,
            'post_type' => get_post_type( $post->ID ),
            'tour_data' => json_decode($tour_data)
        ];
        wp_localize_script('tour-builder-module', 'WP_Variables', $variable_for_javascript);
    }
}
add_action('wp_enqueue_scripts', 'tour_builder_enqueue');


/* --------- Load styles and scripts in Admin Area for tour builder --------- */
function tour_builder_admin_enqueue(){
    global $post;
    if ( !($post === null) && $post->post_type === 'tour_builds' ){
        wp_enqueue_script('tour-builder-post-statuses', plugins_url('js/tour-builder-admin-statuses.js', __FILE__), array('jquery'), filemtime( plugin_dir_path( __FILE__ ) . 'js/tour-builder-admin-statuses.js' ), true);
    }
}
add_action( 'admin_enqueue_scripts', 'tour_builder_admin_enqueue');


/* ------------- Create Shortcode to initialize the tour builder ------------ */
function initialize_tour_builder(){
    if ( ! is_user_logged_in() ){
        return "You must be logged in to access this resource.";
    }
    $user = wp_get_current_user();
    $roles = array( 'administrator', 'site_manager', 'tour_agent' );
    if ( is_user_logged_in() && ! array_intersect( $roles, $user->roles)  ){
        //print_r($user->roles);
        //echo get_userdata($current_user->ID);
        return "You're not authorized to access this page. If you believe this is an error, please contact Wherever Tours technical support.";
    }

    global $post;
    $tour_agent = $user->display_name;
    $tour_id = '';
    $tour_title = '';
    $tour_open;

    if ($post->post_type === 'tour_builds'){
        $tour_id = $post->post_title;
        $tour_title = get_post_meta($post->ID, 'tour_builder_tour_title')[0];
        $tour_open = true;
    } else {
        $tour_id = 'TA-' . $user->ID . '-' . date("ymdH") . '-' . rand(11, 99);
        $tour_open = false;
    }

    // if ( ! $post->post_author === $user->ID){
    //     $tour_agent = $post->post_author;
    // }

    //var_dump($post);
    $template = plugin_dir_path( __FILE__ ) . 'templates/tour_builder_ui_base.php';
    require $template;
}
add_shortcode( 'tour-builder', 'initialize_tour_builder' );