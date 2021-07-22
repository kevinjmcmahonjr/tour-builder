<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/* ------------------------- Create Custom Post Type ------------------------ */

class TourBuilder
{

    function __construct() {
        add_action( 'init', array( $this, 'create_tour_builds_cpt'));
    }

    function activate() {
        function test_admin_notice__success(){
            printf('<div class="notice notice-success is-dismissible"><p>Something Happened!</p></div>');
        }
        add_action('admin_notices', 'test_admin_notice__success');

        $this->create_tour_builds_cpt();
        //$this->create_tour_agent_user_role();
        //$this->add_tour_agent_capabilities();
        //$this->success_notice();
        //flush_rewrite_rules();
    }

    function deactivate() {
        flush_rewrite_rules();
    }

    function success_notice(){
        function test_admin_notice__success(){
            printf('<div class="notice notice-success is-dismissible"><p>Something Happened!</p></div>');
        }
        add_action('admin_notices', 'test_admin_notice__success');
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
            'exclude_from_search' => true,
            'publicly_queryable'  => false,
            'show_ui'             => true,
            'show_in_nav_menus'   => true,
            'show_in_admin_bar'   => true,
            'show_in_rest'        => true,
            'menu_position'       => null,
            'query_var'           => true,
            'can_export'          => true,
            'delete_with_user'    => false,
            'has_archive'         => false,
            'rest_base'           => '',
            'show_in_menu'        => true,
            'menu_icon'           => 'dashicons-hammer',
            'capability_type'     => array('tour_build', 'tour_builds'),
            'map_meta_cap'        => true,
            'capabilities'        => $caps,
            'supports'            => ['title', 'editor', 'author'],
            'taxonomies'          => [],
            'rewrite'             => [
                'with_front' => false,
            ],
        ];
        register_post_type( 'tour_builds', $args );
    }
    

    /* ----------------- Add Custom Post Statuses to Tour Build ----------------- */
    function adjust_tour_build_statuses(){
        $statuses = [
            'draft'             =>  'Draft - Saved But Not Submitted',          // Saved but not submitted
            'submitted'         =>  'Submitted - Pending Review',               // Submitted but not seen or reviewed yet
            'in_review'         =>  'Submitted - Currently In Review',          // Being Reviewed internally
            'revision_required' =>  'Reviewed - Revisions Required',            // Review found necessary changes
            'approved'          =>  'Approved - Pending Booking',               // Tour is confirmed to launch and sell
            'active'            =>  'Active - Currently Booking'                // Tour is currently available for bookings
        ];

        foreach ($statuses as $status => $label){
            $args = [
                'label'                     =>  _x( $label, 'tour_build'),
                'public'                    =>  false,
                'exclude_from_search'       =>  false,
                'show_in_admin_all_list'    =>  true,
                'show_in_admin_status_list' =>  true,
                'label_count'               =>  _n_noop( $label . ' <span class="count">(%s)</span>', $label . ' <span class="count>(%s)</span>' ),
            ];
            register_post_status( $status, $args );
        }
    }

    /* -------------------- Create User Role and Capabilities ------------------- */
    function create_tour_agent_user_role(){
        if ( ! get_option('wt_tour_agent_roles_created' ) ){
            function create_tour_agent_role(){
                if ( wp_roles()->is_role( 'traveler') ){
                    $tour_agent_inherited_capabilites = get_role('traveler')->capabilities;
                }
                else if ( wp_roles()->is_role( 'customer' ) ) {
                    $tour_agent_inherited_capabilites = get_role('customer')->capabilities;
                }
                else {
                    $tour_agent_inherited_capabilites = get_role('subscriber')->capabilities;
                }
                $add_tour_build_capabilities = [
                    'create_tour_build' => 1,
                    'read_tour_build' => 1,
                    'delete_tour_build' => 1,
                    'edit_tour_builds' => 1
                ];
                $tour_agent_capabilites = $tour_agent_inherited_capabilites + $add_tour_build_capabilities;
                add_role('tour_agent', 'Tour Agent', $tour_agent_capabilites);
            }
            add_action('after_setup_theme', 'create_tour_agent_role');
        
            update_option('wt_tour_agent_roles_created', true);
        }
    }

    function add_tour_agent_capabilities(){
        $unrestricted_roles = array('administrator', 'site_manager');
        $restricted_roles = array('tour_agent');

        $basic_caps = [
            'edit_tour_build',
            'read_tour_build',
            'delete_tour_build',
            'create_tour_build'
        ];

        $restricted_caps = [
            'edit_tour_builds',
            'edit_others_tour_builds',
            'publish_tour_builds',
            'read_private_tour_builds',
            'read',
            'delete_tour_builds',
            'delete_others_tour_builds',
            'edit_private_tour_builds',
            'edit_published_tour_builds'
        ];

        $all_caps = [
            // Meta Capabilities
            'edit_post'             => 'edit_tour_build',
            'read_post'             => 'read_tour_build',
            'delete_post'           => 'delete_tour_build',

            // Primitive/Meta Capabilities
            'create_posts'          => 'create_tour_builds',

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

        foreach ( $unrestricted_roles as $role ){
            foreach ( $basic_caps as $caps){
                $role->add_cap($caps);
            }
            foreach ( $restricted_caps as $caps){
                $role->add_cap($caps);
            }
        }

        foreach ( $restricted_roles as $role ){
            foreach ($basic_caps as $caps){
                $role->add_cap($caps);
            }
        }
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

// function tour_builder_meta_boxes(){
//     $screens = [ 'tour-build' ];
//     foreach ($screens as $screen ){
//         add_meta_box(
//             'tour_build_tour_id',
//             'Tour Id',
//         );
//     }
// }
// add_action( 'add_meta_boxes', 'tour_builder_meta_boxes' );