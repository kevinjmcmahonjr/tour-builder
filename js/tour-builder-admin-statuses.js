jQuery(document).ready(function($){
    $("select#post_status").append("<option value=\"draft\">Draft</option>");
    $("select#post_status").append("<option value=\"submitted\">Submitted - Pending Review</option>");
    $("select#post_status").append("<option value=\"in_review\">Submitted - Currently In Review</option>");
    $("select#post_status").append("<option value=\"revision_required\">Reviewed - Revisions Required</option>");
    $("select#post_status").append("<option value=\"approved\">Approved - Pending Booking</option>");
    $("select#post_status").append("<option value=\"active\">Active - Currently Booking</option>");
});