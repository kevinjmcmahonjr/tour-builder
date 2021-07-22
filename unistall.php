<?php
/*
*
* Uninstall the Tour Builder Plugin
*
* @package TourBuilder
*
*/

if ( ! defined( 'WP_UNINSTALL_PLUGIN' ) ){
    die;
}


delete_option('wt_tour_agent_roles_created');

// Clear database stored data
//Commented out to prevent unintentional data deletion

// $tour_builds = get_posts( array( 'post_type' => 'tour_builds', 'numberposts' => -1 ) );
// forEach( $tour_builds as $tour_build ) {
//     wp_delete_post( $tour_build->ID, true );
// }

// global $wpdb;
// $wpdb->query( "DELETE FROM wp_posts WHERE post_type = 'tour_builds'" );
// $wpdb->query( "DELETE FROM up_postmeta WHERE post_id NOT In (SELECT id FROM wp_posts)" );
// $wpdb->query( "DELETE FROM wp_term_relationships WHERE object_id NOT IN (SELECT id FROM wp_posts)" );