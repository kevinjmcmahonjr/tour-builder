<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}

/* ------------------------- Create Custom Post Type ------------------------ */

class TourBuilder{

    function __constructor() {
        add_action( 'init', array( $this, 'create_tour_builds_cpt'));
    }

    function activate() {
        $this->create_tour_builds_cpt();
        $this->create_tour_agent_user_role();
        flush_rewrite_rules();
    }

    function deactivate() {
        flush_rewrite_rules();
    }

    function create_tour_builds_cpt() {
        $labels = [
            'name'                     => __( 'Tour Builds', 'wherever-tours-textdomain' ),
            'singular_name'            => __( 'Tour Build', 'wherever-tours-textdomain' ),
            'add_new'                  => __( 'Add New', 'wherever-tours-textdomain' ),
            'add_new_item'             => __( 'Add New Tour Build', 'wherever-tours-textdomain' ),
            'edit_item'                => __( 'Edit Tour Build', 'wherever-tours-textdomain' ),
            'new_item'                 => __( 'New Tour Build', 'wherever-tours-textdomain' ),
            'view_item'                => __( 'View Tour Build', 'wherever-tours-textdomain' ),
            'view_items'               => __( 'View Tour Builds', 'wherever-tours-textdomain' ),
            'search_items'             => __( 'Search Tour Builds', 'wherever-tours-textdomain' ),
            'not_found'                => __( 'No tour builds found', 'wherever-tours-textdomain' ),
            'not_found_in_trash'       => __( 'No tour builds found in Trash', 'wherever-tours-textdomain' ),
            'parent_item_colon'        => __( 'Parent Tour Builder Tour:', 'wherever-tours-textdomain' ),
            'all_items'                => __( 'All Tour Builder Tours', 'wherever-tours-textdomain' ),
            'archives'                 => __( 'Tour Build Archives', 'wherever-tours-textdomain' ),
            'attributes'               => __( 'Tour Build Attributes', 'wherever-tours-textdomain' ),
            'insert_into_item'         => __( 'Insert into tour build', 'wherever-tours-textdomain' ),
            'uploaded_to_this_item'    => __( 'Uploaded to this tour build', 'wherever-tours-textdomain' ),
            'featured_image'           => __( 'Featured image', 'wherever-tours-textdomain' ),
            'set_featured_image'       => __( 'Set featured image', 'wherever-tours-textdomain' ),
            'remove_featured_image'    => __( 'Remove featured image', 'wherever-tours-textdomain' ),
            'use_featured_image'       => __( 'Use as featured image', 'wherever-tours-textdomain' ),
            'menu_name'                => __( 'Tour Builds', 'wherever-tours-textdomain' ),
            'filter_items_list'        => __( 'Filter tour builds list', 'wherever-tours-textdomain' ),
            'items_list_navigation'    => __( 'Tour builds list navigation', 'wherever-tours-textdomain' ),
            'items_list'               => __( 'Tour Builds list', 'wherever-tours-textdomain' ),
            'item_published'           => __( 'Tour Build published', 'wherever-tours-textdomain' ),
            'item_published_privately' => __( 'Tour build published privately', 'wherever-tours-textdomain' ),
            'item_reverted_to_draft'   => __( 'Tour build reverted to draft', 'wherever-tours-textdomain' ),
            'item_scheduled'           => __( 'Tour Build scheduled', 'wherever-tours-textdomain' ),
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
            'public'              => false,
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
            'capability_type'     => 'tour_build',
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
            'working_draft'     =>  'Wordking Draft',           // Saved but not submitted
            'submitted'         =>  'Submitted For Review',     // Submitted but not seen or reviewed yet
            'in_review'         =>  'In Review',                // Being Reviewed internally
            'needs_revision'    =>  'Revisions Required',       // Review found necessary changes
            'confirmed'         =>  'Confirmed',                // Tour is confirmed to launch and sell
            'active'            =>  'Active'                    // Tour is currently available for bookings
        ];
        statuses.forEach
        $args = [
            'label'                     =>  _x( 'Saved Draft', 'tour_build'),
            'public'                    =>  true,
            'exclude_from_search'       =>  false,
            'show_in_admin_all_list'    =>  true,
            'show_in_admin_status_list' =>  true,
            'label_count'               =>  _n_noop( 'Saved Draft <span class="count"(%s)</span>', 'Saved Draft <span class="count>(%s)</span>' ),
        ];
        register_post_status( 'saved_draft', $args );
    }

    /* -------------------- Create User Role and Capabilities ------------------- */
    function create_tour_agent_user_role(){
        if ( ! get_option('wt_tour_agent_roles_created' ) ){
            function create_tour_agent_role(){
                if ( wp_roles()->is_role( 'customer') ){
                    $tour_agent_inherited_capabilites = get_role('customer')->capabilities;
                }
                else if ( wp_roles()->is_role( 'traveler' ) {
                    $tour_agent_inherited_capabilites = get_role('traveler')->capabilities;
                }
                else {
                    $tour_agent_inherited_capabilites = get_role('subscriber')->capabilities;
                }
                $add_capabilities = [
                    'create_tour_build' => 1,
                    'read_tour_build' => 1,
                    'delete_tour_build' => 1,
                    'edit_tour_builds' => 1
                ];
                $tour_agent_capabilites = $tour_agent_inherited_capabilites + $add_capabilities;
                add_role('tour_agent', 'Tour Agent', $tour_agent_capabilites);
            }
            add_action('after_setup_theme', 'create_tour_agent_role');
        
            update_option('wt_tour_agent_roles_created', true);
        }
    }

}

// Instantiate the Tour Builder class
if ( class_exists 'TourBuilder ') ) {
    $tourBuilder = new TourBuilder();
}

// Activate
register_activation_hook( __FILE__, array( $tourBuilder, 'activate') );

// Deactivate
register_deactivation_hook( __FILE__, array( $tourBuilder, 'deactivate') );