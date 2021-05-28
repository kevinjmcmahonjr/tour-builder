export let itineraryTemplate = `
<div id="tour-itinerary-tabs-${actualDay}" class="tour-itinerary-tab">
    <div class="overview">
      <h6>Overview</h6>
    </div>
    <div class="included-meals">
      <h4>Included Meals</h4>
      <input type="checkbox" id="breakfast-check-ti-tab-${actualDay}" name="breakfast-check-ti-tab-${actualDay}" value="breakfast">
      <label for="breakfast-check-ti-tab-${actualDay}">Breakfast</label>
      <input type="checkbox" id="lunch-check-ti-tab-${actualDay}" name="lunch-check-ti-tab-${actualDay}" value="lunch">
      <label for="lunch-check-ti-tab-${actualDay}">Lunch</label>
      <input type="checkbox" id="dinner-check-ti-tab-${actualDay}" name="dinner-check-ti-tab-${actualDay}" value="dinner">
      <label for="dinner-check-ti-tab-${actualDay}">Dinner</label>
    </div>
    <div class="activities">
      <h4>Activities</h4>
      <div class="morning">
        <p>Morning Activities</p>
        <input type="checkbox" id="breakfast-activity-${actualDay}" name="breakfast-activity-${actualDay}" value="eat-breakfast">
        <label for="breakfast-activity-${actualDay}">Have Breakfast</label><br>
        <input type="checkbox" id="hotel-checkout-${actualDay}" name="hotel-checkout-${actualDay}" value="hotel-checkout">
        <label for="hotel-checkout-${actualDay}">Hotel Checkout</label><br>
        <input type="checkbox" id="leisure-time-${actualDay}" name="leisure-time-${actualDay}" value="leisure-time">
        <label for="leisure-time-${actualDay}">Leisure Time</label><br>
        <input type="checkbox" id="included-activity-${actualDay}" name="included-activity-${actualDay}" value="included-activity">
        <label for="included-activity-${actualDay}">Included Activity</label><br>
        <input type="checkbox" id="optional-activity-${actualDay}" name="optional-activity-${actualDay}" value="optional-activity">
        <label for="optional-activity-${actualDay}">Optional Activity</label><br>
      </div>
      <div class="lunchtime">
        <p>Lunchtime Activities</p>
        <input type="checkbox" id="lunch-activity-${actualDay}" name="lunch-activity-${actualDay}" value="eat-lunch">
        <label for="lunch-activity-${actualDay}">Have Lunch</label><br>
        <input type="checkbox" id="continue-morning-activity-${actualDay}" name="continue-morning-activity-${actualDay}" value="continue-morning-activity">
        <label for="continue-morning-activity-${actualDay}">Continue Morning Activity</label><br>
        <input type="checkbox" id="leisure-time-${actualDay}" name="leisure-time-${actualDay}" value="leisure-time">
        <label for="leisure-time-${actualDay}">Leisure Time</label><br>
        <input type="checkbox" id="included-activity-${actualDay}" name="included-activity-${actualDay}" value="included-activity">
        <label for="included-activity-${actualDay}">Included Activity</label><br>
        <input type="checkbox" id="optional-activity-${actualDay}" name="optional-activity-${actualDay}" value="optional-activity">
        <label for="optional-activity-${actualDay}">Optional Activity</label><br>
      </div>
      <div class="afternoon">
        <p>Afternoon Activities</p>
        <input type="checkbox" id="hotel-checkin-${actualDay}" name="hotel-checkin-${actualDay}" value="hotel-checkin">
        <label for="hotel-checkin-${actualDay}">Hotel Checkin</label><br>
        <input type="checkbox" id="continue-morning-activity-${actualDay}" name="continue-morning-activity-${actualDay}" value="continue-morning-activity">
        <label for="continue-morning-activity-${actualDay}">Continue Morning Activity</label><br>
        <input type="checkbox" id="leisure-time-${actualDay}" name="leisure-time-${actualDay}" value="leisure-time">
        <label for="leisure-time-${actualDay}">Leisure Time</label><br>
        <input type="checkbox" id="included-activity-${actualDay}" name="included-activity-${actualDay}" value="included-activity">
        <label for="included-activity-${actualDay}">Included Activity</label><br>
        <input type="checkbox" id="optional-activity-${actualDay}" name="optional-activity-${actualDay}" value="optional-activity">
        <label for="optional-activity-${actualDay}">Optional Activity</label><br>
      </div>
      <div class="dinnertime">
        <p>Dinnertime Activities</p>
        <input type="checkbox" id="dinner-activity-${actualDay}" name="dinner-activity-${actualDay}" value="eat-dinner">
        <label for="dinner-activity-${actualDay}">Have Dinner</label><br>
        <input type="checkbox" id="leisure-time-${actualDay}" name="leisure-time-${actualDay}" value="leisure-time">
        <label for="leisure-time-${actualDay}">Leisure Time</label><br>
        <input type="checkbox" id="included-activity-${actualDay}" name="included-activity-${actualDay}" value="included-activity">
        <label for="included-activity-${actualDay}">Included Activity</label><br>
        <input type="checkbox" id="optional-activity-${actualDay}" name="optional-activity-${actualDay}" value="optional-activity">
        <label for="optional-activity-${actualDay}">Optional Activity</label><br>
      </div>
      <div class="evening">
        <p>Evening Activities</p>
        <input type="checkbox" id="leisure-time-${actualDay}" name="leisure-time-${actualDay}" value="leisure-time">
        <label for="leisure-time-${actualDay}">Leisure Time</label><br>
        <input type="checkbox" id="included-activity-${actualDay}" name="included-activity-${actualDay}" value="included-activity">
        <label for="included-activity-${actualDay}">Included Activity</label><br>
        <input type="checkbox" id="optional-activity-${actualDay}" name="optional-activity-${actualDay}" value="optional-activity">
        <label for="optional-activity-${actualDay}">Optional Activity</label><br>
      </div>
    </div>
</div>
`;