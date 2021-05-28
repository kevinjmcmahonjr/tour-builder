function initializeTourActivities(dayOfTour){
    let addActivity = document.querySelector('#tour-add-activity-to-day-' + CSS.escape(dayOfTour));
    addActivity.addEventListener('click', addNewActivity);
}

function checkActivityClick(e){
    if( e.toElement.classList.contains('delete-activity')){
        deleteActivity(e);
    }
    // if(e.toElement.classList.contains('tour-activity-type-select')){
    //     console.log("Thingy");
    //     setActivityType(e);
    // }
}

// Not currently using this function, using event listener change in addNewActivity instead
function setActivityType(e){
    let itineraryDay = e.target.closest('.tour-itinerary-activity').dataset.itineraryDay - 1;
    let dayActivity = e.target.closest('.tour-itinerary-activity').dataset.activityCount - 1;
    let activityType = e.target.querySelector('select[name="activity-type"]');
    console.log(itineraryDay);
    console.log(dayActivity);
    console.log(activityType);
    console.log(e.target);
    if( activityType.value !== undefined || activityType.value !== null || activityType.value !== ''){
        tourData.itinerary[itineraryDay].activities[dayActivity].activityType = activityType.value;
    }

}

function deleteActivity(e){
    let deleting = e.target.closest('.tour-itinerary-activity');
    let itineraryKey = deleting.dataset.itineraryDay - 1;
    let activityKey = deleting.dataset.activityCount - 1;
    deleting.classList.add('deleting');
    setTimeout( function(){
        deleting.remove();
    }, 350);
    tourData.itinerary[itineraryKey].activities.splice(activityKey, 1);
}

function pushActivityToItinerary(){

}

function addNewActivity(){
    // Get the Activities Container
    let activitiesContainer = this.previousSibling.previousSibling;
    
    // Get the Itinerary Day the Activity belongs to
    let itineraryDay = activitiesContainer.closest('.tour-itinerary-tab').dataset.itineraryDay;

    // Adjust Itinerary Day to match tourData nested array key
    let itineraryKey = itineraryDay - 1;

    // Get the number of activities currently in activities container
    let activityCount = activitiesContainer.childElementCount;
    
    // Adjust Activity to match tourData array key
    let activityKey = activityCount;

    // Increment the activity count by 1
    activityCount = activityCount + 1;

    // Make a Random Number Just Because
    let randomNum = Math.floor(Math.random() * 100);

    // Make the Activity ID
    let activityId = `${itineraryDay}-${activityCount}-${randomNum}`;
    
    // Create a new Activity using the template
    let newActivity = activityTemplate(itineraryDay, activityCount, activityId);

    // Add the new Activity to the DOM
    activitiesContainer.insertAdjacentHTML('beforeend', newActivity);

    // Create a string to use as the selector of the Activity just added to the DOM
    let selectorString = `#tour-activity-${activityId}`;

    // Get the Activity just created in the DOM
    let addedActivity = activitiesContainer.querySelector(selectorString);
    
    // Add an event listener to the Activity just created
    addedActivity.addEventListener('click', checkActivityClick);

    // Add Activity to tourData
    tourData.itinerary[itineraryKey].activities.push({activity: activityCount});
    

    addedActivity.querySelector('select[name="activity-type"]').addEventListener('change', function(e){
        tourData.itinerary[itineraryKey].activities[activityKey].activityType = e.target.value;
    });

    addedActivity.querySelector('select[name="meal-type"]').addEventListener('change', function(e){
        tourData.itinerary[itineraryKey].activities[activityKey].mealType = e.target.value;
    });

    addedActivity.querySelector('select[name="meal-location"]').addEventListener('change', function(e){
        tourData.itinerary[itineraryKey].activities[activityKey].mealLocation = e.target.value;
    });

    addedActivity.querySelector('select[name="activity-part-of-day"]').addEventListener('change', function(e){
        tourData.itinerary[itineraryKey].activities[activityKey].partOfDay = e.target.value;
    });

    addedActivity.querySelector('input[name="activity-duration"]').addEventListener('change', function(e){
        tourData.itinerary[itineraryKey].activities[activityKey].duration = e.target.value;
    });

    addedActivity.querySelector('input[name="activity-start-time"]').addEventListener('change', function(e){
        tourData.itinerary[itineraryKey].activities[activityKey].startTime = e.target.value;
    });

    addedActivity.querySelector('input[name="activity-location"]').addEventListener('change', function(e){
        tourData.itinerary[itineraryKey].activities[activityKey].location = e.target.value;
    });

    addedActivity.querySelector('input[name="activity-description"]').addEventListener('change', function(e){
        tourData.itinerary[itineraryKey].activities[activityKey].description = e.target.value;
    });

    addedActivity.querySelector('[name="activity-transportation-required"]').addEventListener('change', function(e){
        tourData.itinerary[itineraryKey].activities[activityKey].transportationRequired = e.target.checked;
    });

    addedActivity.querySelector('select[name="activity-transportation-type"]').addEventListener('change', function(e){
        tourData.itinerary[itineraryKey].activities[activityKey].transportationType = e.target.value;
    });

    addedActivity.querySelector('[name="activity-entrance-fee"]').addEventListener('change', function(e){
        tourData.itinerary[itineraryKey].activities[activityKey].entranceFee = e.target.checked;
    });
    addedActivity.querySelector('[name="activity-parking-fee"]').addEventListener('change', function(e){
        tourData.itinerary[itineraryKey].activities[activityKey].parkingFee = e.target.checked;
    });
    addedActivity.querySelector('[name="activity-permit-fee"]').addEventListener('change', function(e){
        tourData.itinerary[itineraryKey].activities[activityKey].permitFee = e.target.checked;
    });
    addedActivity.querySelector('[name="activity-guide-required"]').addEventListener('change', function(e){
        tourData.itinerary[itineraryKey].activities[activityKey].guideRequired = e.target.checked;
    });
    addedActivity.querySelector('input[name="activity-guide-purpose"]').addEventListener('change', function(e){
        tourData.itinerary[itineraryKey].activities[activityKey].guidePurpose = e.target.value;
    });
    addedActivity.querySelector('input[name="activity-preferred-guide"]').addEventListener('change', function(e){
        tourData.itinerary[itineraryKey].activities[activityKey].preferredGuide = e.target.value;
    });
    addedActivity.querySelector('textarea[name="activity-notes"]').addEventListener('change', function(e){
        tourData.itinerary[itineraryKey].activities[activityKey].notes = e.target.value;
    });
    addedActivity.querySelector('input[name="activity-optional"]').addEventListener('change', function(e){
        tourData.itinerary[itineraryKey].activities[activityKey].optional = e.target.checked;
    });

    // let cleaveClassDur = `.cleave-activity-duration${activityId}`;
    // let cleaveDuration = new Cleave(`.cleave-activity-duration${activityId}`,{
    //     time: true,
    //     timePattern: ['h','m']
    // });
    // let cleaveStartTime = new Cleave(`.cleave-activity-start-time${activityId}`,{
    //     time: true,
    //     timeFormat: '12',
    //     timePattern: ['h','m']
    // });
    // This is old code below, using a bubbling method to track all click now
    /* let deleteButton = activitiesContainer.lastElementChild.querySelector('.delete-activity')
    deleteButton.addEventListener('click', deleteActivity); */
}

function activityTemplate(itineraryDay, activityCount, activityId){
    return `
<div class="tour-itinerary-activity" id="tour-activity-${activityId}" data-itinerary-day="${itineraryDay}" data-activity-count="${activityCount}" data-activity-id="${activityId}">
    <div class="tour-activity-header">
        <h4 class="activity-name">Activity #<span class="activity-count">${activityCount}</span></h4>
        <div class="tour-activity-summary">
            <p>Type: Time: Location: Description: Transportation:</p>
        </div>
        <div class="tour-activity-ui-actions">
            <button class="delete-activity btn-danger"><i class="fas fa-trash-alt"></i> Delete</button>
            <button class="expand-activity btn-info"><i class="fas fa-expand-alt"></i> Expand</button>
            <button class="save-activity btn-success"><i class="fas fa-save"></i> Save</button>
        </div>
    </div>
    <div class="activity-main-information">
        <h4>Essential Activity Information</h4>
        <div class="tour-activity-type-select">
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
        <div class="tour-activity-meal-specifics">
            <label for="meal-type-${activityId}">Meal Type</label>
            <select name="meal-type" id="meal-type-${activityId}">
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
            <select name="meal-location" id="meal-location${activityId}">
            <option value="" disabled selected>Choose a location</option>
            <option value="localRestaurant">Local Restaurant</option>
            <option value="hotelRestaurant">Hotel Restaurant</option>
            <option value="other">Other</option>
            </select>
        </div>
        <div class="tour-activity-time">
            <label for="activity-time-${activityId}">Activity Time</label>
            <select name="activity-part-of-day" id=activity-time-${activityId}">
                <option value="" disabled selected>Choose Part of Day</option>
                <option value="morning">Morning</option>
                <option value="afternoon">Afternoon</option>
                <option value="evening">Evening</option>
            </select>
            <div>
                <label for="tour-activity-duration-${activityId}">Duration (Hours:Minutes)</label><br>
                <input type="text" name="activity-duration" id="tour-activity-duration-${activityId}" placeholder="HH:MM" class="cleave-activity-duration-${activityId}">
            </div>
            <div>
            <label for="tour-activity-actual-start-time-${activityId}">Actual Start Time</label>
                <input type="text" name="activity-start-time" id="tour-activity-actual-start-time-${activityId}" placeholder="HH:MM" class="cleave-activity-start-time-${activityId}">
            </div>
        </div>
        <div class="tour-activity-location">
            <div>
                <label for="tour-activity-location-${activityId}">Location</label><br>
                <input type="text" name="activity-location" id="tour-activity-location-${activityId}" placeholder="City, Country">
            </div>
        </div>
        <div class="tour-activity-description">
            <div>
                <label for="tour-activity-description-${activityId}">Description</label><br>
                <input type="text" name="activity-description" id="tour-activity-description-${activityId}" placeholder="Breif activity description">
            </div>
        </div>
        <div class="tour-activity-transportation">
            <div>
                <input type="checkbox" name="activity-transportation-required" id="tour-activity-transportation-required-${activityId}">
                <label for="activity-transportation-required">Transporation Required</label>
            </div>
            <select name="activity-transportation-type" id="acitivity-transportation-type-${activityId}">
            <option value="" disabled selected>Choose a transporation</option>
            <option value="tourCoach">Tour Coach</option>
            <option value="loaclCoach">Local Coach</option>
            <option value="other">Other (Add in Notes)</option>
            </select>
        </div>
    </div>
    <div class="activity-additional-information">
        <h4>Additional Activity Information</h4>
        <div class="tour-activity-sight-requirements">
            <div>
                <input type="checkbox" name="activity-entrance-fee" id="tour-activity-sight-entrance-fees-${activityId}">
                <label for="tour-activity-sight-entrance-fees">Entrance Fee</label>
            </div>
            <div>
                <input type="checkbox" name="activity-parking-fee" id="tour-activity-sight-parking-fees-${activityId}">
                <label for="tour-activity-sight-parking-fees">Parking Fee</label>
            </div>
            <div>
                <input type="checkbox" name="activity-permit-fee" id="tour-activity-sight-permit-fees-${activityId}">
                <label for="tour-activity-sight-permit-fees">Permit Fee</label>
            </div>
        </div>
        <div class="tour-activity-guide">
            <div>
                <input type="checkbox" name="activity-guide-required" id="tour-activity-guide-required-${activityId}">
                <label for="tour-activity-guide-required-${activityId}">Guide Required</label>
            </div>
            <div>
                <label for="tour-activity-guide-type">Guide's Specialty</label><br>
                <input type="text" name="activity-guide-purpose" id="tour-activity-guide-type-${activityId}" placeholder="Brief description of guide's purpose">
            </div>
            <div>
                <label for="tour-activity-preferred-guide">Preferred Guide</label><br>
                <input type="text" name="activity-preferred-guide" id="tour-activity-preferred-guide-${activityId}" placeholder="Enter a preferred guide's name">
            </div>
        </div>
        <div class="tour-activity-notes">
            <div>
                <input type="checkbox" name="tour-activity-add-notes-${activityId}" id="tour-activity-add-notes-${activityId}">
                <label for="tour-activity-add-notes-${activityId}">Add Notes</label>
            </div>
            <textarea id="tour-activity-note-${activityId}" name="activity-notes" placeholder="Please add any additional information that isn't already accounted for." rows="4" cols="40"></textarea>
        </div>
        <div class="tour-activity-optional">
            <div>
                <input type="radio" name="activity-included" id="acitivity-optional-included-${activityId}" value="included">
                <label for="acitivity-optional-included-${activityId}">Included</label>
                <input type="radio" name="activity-optional" id="acitivity-optional-optional-${activityId}" value="optional">
                <label for="acitivity-optional-optional-${activityId}">Optional</label>
            </div>
        </div>
    </div>
</div>
    `;
};

//document.addEventListener('DOMContentLoaded', initializeTourActivities);