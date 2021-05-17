<?php
if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly
}
?>

<h1 class="page-heading">Tour Builder</h1>
<div class="loader"></div>
  <main class="tb-main">
    <section class="general-information">
      <h3>General Information</h3>
      <div class="general-information-inputs">
        <div class="tour-agent-input">  
          <label for="tour-agent">Tour Agent</label>
          <input type="text" id="tour-agent" name="tour-agent" value="<?php echo $user->display_name ?>" readonly>
        </div>
        <div class="tour-id-input">
          <label for="tour-id">Tour ID</label>
          <input type="text" id="tour-id" name="tour-id" value="<?php echo 'TA-' . $user->ID . '-' . get_the_ID() ?>" readonly>
        </div>
        <!-- <p><span class="bold">Tour Agent: </span><?php /*echo $user->display_name */ ?></p>
        <p><span class="bold">Tour ID: </span> <?php /*echo 'TA-' . $user->ID . '-' . get_the_ID() */ ?></p> -->
        <div class="tour-title-input">
          <label for="tour-title">Tour Title</label>
          <input type="text" id="tour-title" name="tour-title">
          <p>Please enter a Tour Title above to give your tour a name.</p>
        </div>
      </div>
      <!--<label for="tour-name">Tour Name</label>
      <input type="text" id="tour-name" name="tour-name"><br>
      <label for="Tour Agent">Tour Agent</label>
      <input type="text" id="tour-agent" name="tour-agent"><br>-->
      <h3>Date Selection</h3>
      <div class="date-selections">
        <p>Please select the start and end dates by clicking on the calendar to set a date range.</p>
        <div class="calendar-field"></div>
        <div class="departure-date-field">
          <p><i class="fas fa-plane-departure"></i> Departure Date: <span class="departure-date-display"></span></p>
        </div>
        <div class="start-date-field">
          <p><i class="fas fa-plane-arrival"></i> Start Date: <span class="starting-date-display"></span></p>
        </div>
        <div class="end-date-field">
          <p><i class="fas fa-plane-departure"></i> End Date: <span class="ending-date-display"></span></p>
        </div>
        <div class="days-nights-field">
          <p><span class="total-days"></span> <i class="fas fa-cloud-sun"></i> Days / <span class="total-overnights"></span> <i class="fas fa-cloud-moon"></i> Nights</p>
        </div>
      </div>
    </section>
    <section class="tour-overview">
      <h3>Tour Overview</h3>
      <p>Enter the overnight information, then click create Itinerary</p>
      <table class="overview-table table table-striped">
        <thead class="overview-table-header">
          <tr>
            <td><i class="fas fa-sun"></i> Day</td>
            <td><i class="fas fa-calendar-alt"></i> Date</td>
            <td><i class="fas fa-map-marker-alt"></i> Overnight City</td>
            <td><i class="fas fa-hotel"></i> Overnight Hotel</td>
            <td>Copy Previous</td>
          </tr>
        </thead>
        <tbody class="overview-table-body">
          <!-- This needs to be updated with a Javastript literal template -->
          <tr class="overview-day-row">
            <td class="overview-day-column overview-day-number"></td>
            <td class="overview-day-column overview-date"></td>
            <td class="overview-day-column overview-overnight-city"><input type="text" placeholder="Enter City"></td>
            <td class="overview-day-column overview-overnight-hotel"><input type="text" placeholder="Enter Hotel"></td>
            <td class="overview-day-column overview-copy"><button><i class="far fa-copy"></i></button>
          </tr>
        </tbody>
      </table>
      <!--<button id="lock-overview" type="button">Lock Overview</button>-->
      <button id="create-itinerary" type="button">Create Itinerary</button>
    </section>
    <section class="tour-itinerary">
      <h3>Itinerary</h3>
      <div id="tour-itinerary-tabs">
          <ul id="tour-itinerary-tab-nav">
            <!-- Javascript inserts tab navigation template for each tab here -->
          </ul>
          <div id="tour-itinerary-tabs-content">
            <!-- Javascript inserts tab content taemplate for each tab here -->
          </div>
      </div>
    </section>
    <section class="tour-submission">
      <button id="save-tour" type="button">Save and Submit Tour</button>
      <!-- form button below, keep commented out for now, take out when saving method using eventlistener decided on -->
      <!-- <form id="save-tour-hidden-form">
        <input type="hidden" name="action" value="tour_builder_save_tour">
      </form> -->
    </section>
    <section class="tour-save-result">
</section>
  </main>