function initializeTourActivities(dayOfTour){
    let addActivity = document.querySelector('#tour-add-activity-to-day-' + CSS.escape(dayOfTour));
    addActivity.addEventListener('click', addNewActivity);
}

function deleteActivity(e){
    console.log(e);
    console.log("Element Test: " + e.currentTarget);
    e.currentTarget.parentElement.parentElement.parentElement.remove();
    //deleteButton.parentElement.parentElement.remove();
}

function addNewActivity(dayOfTour){
    let activitiesContainer = this.previousSibling.previousSibling;
    //let activitiesContainer = document.querySelector('#tour-itinerary-activities-day-' + CSS.escape(dayOfTour));
    let tourId = 'test';
    //let dayOfTour = 'more-test';
    let activityOrderNumber = '0';
    let randomNum = Math.floor(Math.random() * 100);
    let activityId = `${tourId}-${dayOfTour}-${activityOrderNumber}-${randomNum}` 
    let newActivity = activityTemplate(activityId);
    //newActivity.querySelector('.delete-activity').addEventListener('click', deleteActivity());
    activitiesContainer.insertAdjacentHTML('beforeend', newActivity);
    let deleteButton = activitiesContainer.lastElementChild.querySelector('.delete-activity')
    deleteButton.addEventListener('click', deleteActivity);
}

function activityTemplate(activityId){
    return `
<div class="tour-itinerary-activity" id="tour-activity-${activityId}">
<div class="tour-activity-header">
    <h4>Activity</h4>
    <div class="tour-activity-summary">
        <p>Type: Time: Location: Description: Transportation:</p>
    </div>
    <div class="tour-activity-ui-actions">
        <button class="delete-activity btn-danger"><i class="fas fa-trash-alt"></i> Delete</button>
        <button class="expand-activity btn-success"><i class="fas fa-expand-alt"></i> Expand</button>
    </div>
</div>
<div class="activity-main-information">
    <h5>Essential Activity Information</h5>
    <div class="tour-activity-select">
        <label for="select-activity-${activityId}">Activity Type</label>
        <select name="activity-type" id="select-activity-${activityId}">
        <option value="" disabled selected>Choose an activity</option>
        <option value="meal">Meal</option>
        <option value="sightseeing">Sightseeing</option>
        <option value="routeStop">Route Stop</option>
        <option value="leisureTime">Leisure Time</option>
        <option value="transfer">Transfer</option>
        </select>
    </div>
    <div class="tour-meal-activity-specifics">
        <label for="meal-type-${activityId}">Meal Type</label>
        <select name="meal-type-${activityId}" id="meal-type-${activityId}">
        <option value="" disabled selected>Choose a meal</option>
        <optgroup label="Full Meals">
            <option value="breakfast">Breakfast</option>
            <option value="brunch">Brunch</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
        </optgroup>
        <optgroup label="Parial Meals">
            <option value="snack">Snack</option>
            <option value="wineTasting">Wine Tasting</option>
        </optgroup>
        </select>
        <label for="meal-location-${activityId}">Meal Location</label>
        <select name="meal-location-${activityId}" id="meal-location${activityId}">
        <option value="" disabled selected>Choose a location</option>
        <option value="localRestaurant">Local Restaurant</option>
        <option value="hotelRestaurant">Hotel Restaurant</option>
        <option value="other">Other</option>
        </select>
    </div>
    <div class="tour-activity-time">
        <label for="activity-time-${activityId}">Activity Time</label>
        <select name="activity-time-${activityId}" id=activity-time-${activityId}">
            <option value="" disabled selected>Choose Time Of Day</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="evening">Evening</option>
        </select>
        <div>
            <input type="checkbox" name="add-activity-duration-${activityId}" id="add-activity-duration-${activityId}">
            <label for="add-activity-duration-${activityId}">Add Estimated Duration</label>
        </div>
        <div>
            <label for="tour-activity-duration-${activityId}">Duration</label><br>
            <input type="text" name="tour-activity-duration-${activityId}" id="tour-activity-duration-${activityId}" placeholder="HH:MM">
        </div>
        <div>
            <input type="checkbox" name="add-activity-actual-time-${activityId}" id="add-activity-actual-time-${activityId}">
            <label for="add-activity-actual-time-${activityId}">Add Actual Time</label>
        </div>
        <div>
        <label for="tour-activity-actual-start-time-${activityId}">Actual Start Time</label>
            <input type="text" name="tour-activity-actual-start-time-${activityId}" id="tour-activity-actual-start-time-${activityId}" placeholder="HH:MM">
        </div>
    </div>
    <div class="tour-activity-location">
        <div>
            <label for="tour-activity-location-${activityId}">Location</label><br>
            <input type="text" name="tour-activity-location-${activityId}" id="tour-activity-location-${activityId}" placeholder="City, Country">
        </div>
    </div>
    <div class="tour-activity-description">
        <div>
            <label for="tour-activity-description-${activityId}">Description</label><br>
            <input type="text" name="tour-description-location-${activityId}" id="tour-activity-description-${activityId}" placeholder="Breif activity description">
        </div>
    </div>
    <div class="tour-activity-transportation">
        <div>
            <input type="checkbox" name="tour-activity-transportation-required-${activityId}" id="tour-activity-transportation-required-${activityId}">
            <label for="tour-activity-transportation-required-${activityId}">Transporation Required</label>
        </div>
        <select name="activity-transportation-type" id="acitivity-transportation-type-${activityId}">
        <option value="" disabled selected>Choose a transporation</option>
        <option value="tourCoach">Tour Coach</option>
        <option value="loaclCoach">Local Coach</option>
        <option value="loaclCoach">Local Coach</option>
        <option value="ata">Airport to Airport</option>
        <option value="ath">Airport to Hotel</option>
        <option value="hta">Hotel to Airport</option>
        <option value="ferry">Ferry</option>
        <option value="train">Train</option>
        <option value="taxi">Taxi</option>
        <option value="other">Other</option>
        </select>
    </div>
</div>
<div class="activity-additional-information">
    <h5>Additional Activity Information</h5>
    <div class="tour-activity-sight-requirements">
        <div>
            <input type="checkbox" name="tour-activity-sight-entrance-fees" id="tour-activity-sight-entrance-fees">
            <label for="tour-activity-sight-entrance-fees">Entrance Fee</label>
        </div>
        <div>
            <input type="checkbox" name="tour-activity-sight-parking-fees" id="tour-activity-sight-parking-fees">
            <label for="tour-activity-sight-parking-fees">Parking Fee</label>
        </div>
        <div>
            <input type="checkbox" name="tour-activity-sight-permit-fees" id="tour-activity-sight-permit-fees">
            <label for="tour-activity-sight-permit-fees">Permit Fee</label>
        </div>
    </div>
    <div class="tour-activity-guide">
        <div>
            <input type="checkbox" name="tour-activity-guide-required" id="tour-activity-guide-required">
            <label for="tour-activity-guide-required">Guide Required</label>
        </div>
        <div>
            <label for="tour-activity-guide-type">Guide's Specialty</label><br>
            <input type="text" name="tour-activity-guide-type" id="tour-activity-guide-type" placeholder="Brief description of guide's purpose">
        </div>
        <div>
            <label for="tour-activity-preferred-guide">Preferred Guide</label><br>
            <input type="text" name="tour-activity-preferred-guide" id="tour-activity-preferred-guide" placeholder="Enter a preferred guide's name">
        </div>
    </div>
    <div class="tour-activity-notes">
        <div>
            <input type="checkbox" name="tour-activity-add-notes-${activityId}" id="tour-activity-add-notes-${activityId}">
            <label for="tour-activity-add-notes-${activityId}">Add Notes</label>
        </div>
        <textarea id="tour-activity-note-${activityId}" name="tour-activity-add-note-${activityId}" placeholder="Please add any additional information that isn't already accounted for." rows="4" cols="40"></textarea>
    </div>
    <div class="tour-activity-optional">
        <div>
            <input type="radio" name="activity-optional-${activityId}" id="acitivity-optional-included-${activityId}" value="included">
            <label for="activity-optional-${activityId}">Included</label>
            <input type="radio" name="activity-optional-${activityId}" id="acitivity-optional-optional-${activityId}" value="optional">
            <label for="activity-optional-${activityId}">Optional</label>
        </div>
    </div>
</div>
</div>
    `;
};

//document.addEventListener('DOMContentLoaded', initializeTourActivities);