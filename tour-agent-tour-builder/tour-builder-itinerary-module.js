/*
    Wherever Tours - Tour Builder
    Version: 0.1 - Beta
    Author: Kevin J. McMahon Jr.
*/

// Create Object to hold Tour Information
const tourData = {
    tourName: "",
    tourID: "",
    tourAgent:"",
    tourLead: "",
    dateRange: "",
    startDate: "",
    endDate: "",
    numberOfDays: "",
    numberOfNights: "",
    itinerary: []
}

// Create Skelton Itinerary Object for copying into Array in tourData object
const itineraryDay = {
    dayOfWeek: "",
    date: "",
    title: "",
    dayNumber: "",
    overnightCity: "",
    overnightHotel: "",
    activites: "",
    includes: ""
}

// Create Object for checking state of things
// Keeps live application information separate from tourData object
const stateCheck = {
    overview: {
        calculated: false,
    },
    itinerary:{
        initialized: false,
    }
}

// Create Object for storing HTML Elements
let guiElements ={
    calendar: jQuery(".calendar-field")[0],
    startDate: jQuery('.starting-date-display'),
    endDate: jQuery('.ending-date-display'),
    numberOfDays: jQuery(".total-days")[0],
    numberOfNights: jQuery(".total-overnights")[0],
    tourOverview: {
        container: document.querySelector('.tour-overview'),
        tableBody: jQuery('.overview-table-body')[0],
        tableRows: jQuery('.overview-day-row'),
        lockButton: document.getElementById("lock-overview"),
        createItinerary: document.getElementById("create-itinerary"),
        update: function(){
            return this.tableRows = jQuery('.overview-day-row');
        }
    },
    tourItinerary:{
        container: document.querySelector('.tour-itinerary'),
        nav: document.querySelector("#tour-itinerary-tab-nav"),
        navItems: document.querySelectorAll("#tour-itinerary-tab-nav > .tour-itinerary-tab-item"),
        //navItemsLink: this.navItems.querySelector('a'),
        //navItemsNumber: this.navItems.querySelector('.tour-itinerary-tab-day-number'),
        tabsContainer: document.querySelector("#tour-itinerary-tabs-content"),
        tabs: document.querySelectorAll("#tour-itinerary-tabs-content > .tour-itinerary-tab"),
        updateNav: function(){
            return this.navItems = jQuery("#tour-itinerary-tab-nav > .tour-itinerary-tab-item");
        },
        updateTab: function(){
            return this.tabs = jQuery("#tour-itinerary-tabs-content > .tour-itinerary-tab");
        }
    }
}

/*
guiElements.tourOverview.lockButton.addEventListener('click', readOnlyInputs(guiElements.tourOverview.container));
function readOnlyInputs(parent){
    console.log(parent);
    let inputs = parent.querySelectorAll("input");
    console.log(inputs);
    //inputs.forEach(input => input.setAttribute("readonly"));
}*/

/*
document.querySelector('#lock-overview').addEventListener("click", function(){
    let inputcontainer = document.querySelector('.tour-overview');
    let inputs = inputcontainer.querySelectorAll('input');
    if (inputs[0].readOnly){
        for (let i = 0; i < inputs.length; i++){
            inputs[i].readOnly = false;
        }
        this.innerText = "Lock Overview";
    } else {
        for (let i = 0; i < inputs.length; i++){
            inputs[i].readOnly = true;
        }
        this.innerText = "Unlock Overview";
    }
}); */

function toggleOverviewInputs(){
    let inputcontainer = document.querySelector('.tour-overview');
    let inputs = inputcontainer.querySelectorAll('input');
    if (inputs[0].readOnly){
        for (let i = 0; i < inputs.length; i++){
            inputs[i].readOnly = false;
        }
    } else {
        for (let i = 0; i < inputs.length; i++){
            inputs[i].readOnly = true;
        }
    }
}

document.querySelector('#create-itinerary').addEventListener("click", function(){
    let overviewRows = document.querySelectorAll('.overview-day-row');
    if (overviewRows.length === tourData.numberOfDays){
        for (let days = 0; days < overviewRows.length; days++){
            //console.log(overviewRows[days]);
            let overnightCity = overviewRows[days].querySelector(".overview-overnight-city input").value;
            let overnightHotel = overviewRows[days].querySelector(".overview-overnight-hotel input").value;
            tourData.itinerary[days].overnightCity = overnightCity;
            tourData.itinerary[days].overnightHotel = overnightHotel;
        }
        if (stateCheck.itinerary.initialized === false){
            initializeItinerary();
        }
        toggleOverviewInputs();
        jQuery(guiElements.tourItinerary.container).fadeIn("slow");
    }
});

document.querySelector('#save-tour').addEventListener("click", function(){
    console.log("Make It Save");
    let itineraryMarkUp = document.querySelectorAll('#tour-itinerary-tabs-content .tour-itinerary-tab');
    itineraryMarkUp.forEach(function(dayDiv, i){
        let inputField = dayDiv.querySelectorAll('input');
        console.log(i);
        let checkedFields = [];
        inputField.forEach(function(inputField, ii){
            inputField.readOnly = true;
            if (inputField.checked){console.log(i);

            }
        })
    });
    let entireView = document.querySelector('.tb-main');
    
})

// Initialize Tour Builder Application
// Description: Hides the loader and show the Tour Builder
function initializeBuilder() {
    showTabs();
    setupDatePicker();
    hideLoaderShowBuilder();
}

// Helper function to calculate next day
function getNextDay(date){
    var nextDay = date;
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay;
}

// Helper function to calculate previous day
function getPreviousDay(date){
    var previousDay = new Date();
    previousDay.setDate(previousDay.getDate() - 1);
    return previousDay;
}

function setItinerary(){
    let currentDate = new Date(tourData.startDate);
    for (days = 1; days < tourData.numberOfDays; days++){

    }
}

// Sets the visual formatting for the Start and End Dates
// Also applies the dates to the mark up
function setVisualDates(){
    if (tourData.startDate != "" && tourData.endDate != ""){
        var visualStartingDate = flatpickr.formatDate(tourData.startDate, "l - j F, Y");
        var visualEndingDate = flatpickr.formatDate(tourData.endDate, 'l - j F, Y');
        jQuery(guiElements.startDate).text(visualStartingDate);
        jQuery(guiElements.endDate).text(visualEndingDate);
    }
}

// Calculates the number of days and nights
// Based on the Start and End Dates
// Updates the global tourData
function calculateDaysOvernights(){
    if (tourData.startDate != "" && tourData.endDate != ""){
        var startDate = tourData.startDate; //flatpickr.formatDate(tourData.startDate, "m/d/Y");
        var endDate = tourData.endDate; //flatpickr.formatDate(tourData.endDate, "m/d/Y");
        var fullStartDate = new Date(startDate).getTime();
        var fullEndDate = new Date(endDate).getTime();
        fullStartDate = eval( fullStartDate / 1000 + 3600 );
        fullEndDate = eval( fullEndDate / 1000 + 3600 );
        var numberOfNights = eval( fullEndDate - fullStartDate );
        numberOfNights = Math.round(eval( numberOfNights / 86400 ));
        var numberOfDays = eval( numberOfNights + 1 );
        tourData.numberOfDays = numberOfDays;
        tourData.numberOfNights = numberOfNights;
        jQuery(guiElements.numberOfDays).text(numberOfDays);
        jQuery(guiElements.numberOfNights).text(numberOfNights);
    }
}

// Sets the number of rows equal to the number of days
// Show Tour Overview table
/* Needs to also calculate the weekday and date of each day */
function initializeOverview(overviewDayRows, overviewTableBody){
    const initalRow = guiElements.tourOverview.tableRows[0];
    for(days = 1; days < tourData.numberOfDays; days++) {
        jQuery(initalRow).clone().appendTo(guiElements.tourOverview.tableBody);
    }
    guiElements.tourOverview.update();
    setDaysInOverview();
    jQuery(guiElements.tourOverview.container).fadeIn("slow");
}

function initializeItinerary(){
    function createTabNavItem(actualDay){
        let newNavItem = `<li class="tour-itinerary-tab-item"><a href="#tour-itinerary-tabs-${actualDay}">Day ${actualDay}</a></li>`
        guiElements.tourItinerary.nav.insertAdjacentHTML('beforeend', newNavItem);
    }

    function createTabContent(actualDay, days){
        let newTab = itineraryTemplate(actualDay, days);
        guiElements.tourItinerary.tabsContainer.insertAdjacentHTML('beforeend', newTab);
    }

    for (days = 0; days < tourData.numberOfDays; days++){
        let actualDay = days + 1;
        createTabNavItem(actualDay, days);
        createTabContent(actualDay, days);
        jQuery('#tour-itinerary-tabs').tabs("refresh");
        jQuery('#tour-itinerary-tabs').tabs("option", "active", 0);
    }
    stateCheck.itinerary.initialized = true;
}

function setDaysOfItinieray(){
    let currentDate = new Date(tourData.startDate);
    //console.log("Start Date: before loop " + currentDate);
    let duration = tourData.numberOfDays;

    for (let days = 0; days < duration; days++){
        let actualDay = days + 1;
        tourData.itinerary.push({dayNumber: actualDay, date: new Date(currentDate)});
        currentDate = getNextDay(currentDate);
    }

    //console.log("Start Date: after loop " + currentDate);
    //console.log(tourData.itinerary);
}

function setDaysInOverview(){
    const overviewDayRow = guiElements.tourOverview.tableRows;
    if (overviewDayRow.length === tourData.numberOfDays){
        for (days = 0; days < overviewDayRow.length; days++){
            overviewDayRow[days].querySelector(".overview-day-number").innerHTML = tourData.itinerary[days].dayNumber;
            overviewDayRow[days].querySelector(".overview-date").innerHTML = flatpickr.formatDate(tourData.itinerary[days].date, "D-d-M-Y");
            //console.log("Object: " + tourData.itinerary[days].date);
        }
    }
    else{
        console.log('Days Do Not Match');
    }
}

function calculateOverview(){
    //var startDate = flatpickr.formatDate(dates[0], "m/d/Y");
    //var endDate = flatpickr.formatDate(dates[1], "m/d/Y");
    var overviewDayRows = guiElements.tourOverview.tableRows;
    var overviewTableBody = guiElements.tourOverview.tableBody;
    
    if (stateCheck.overview.calculated === false){
        initializeOverview(overviewDayRows, overviewTableBody);
        stateCheck.overview.calculated = true;
    }
    var currentDate = new Date(tourData.startDate);
    var endDate = new Date(tourData.endDate);
}

// Set up calendar GUI
// Have calendar update fields
function setupDatePicker(){
    guiElements.calendar.flatpickr({
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "m-d-Y",
        inline: true,
        mode: "range",
        onChange: function(dateRange){
            if (dateRange.length == 2){
                showTabs();
                tourData.dateRange = dateRange;
                tourData.startDate = dateRange[0];
                tourData.endDate = dateRange[1];
                setVisualDates();
                calculateDaysOvernights();
                setDaysOfItinieray();
                calculateOverview();
                document.querySelector('.flatpickr-calendar').classList.add('disabled');
            }
        }
    });
}

// Hides the loader element, shows the app, removes the loader element
function hideLoaderShowBuilder() {
    setTimeout(function(){
        jQuery('.loader').fadeOut("slow");
        setTimeout(function(){
            jQuery('.tb-main').fadeIn("slow");
            jQuery('.loader').remove();
        }, 500);
    }, 2500)
}
/*$(".overview-table-body").sortable({
    containment: "parent"
});*/
// Generate the Itinerary Tabs
function showTabs(){
    jQuery( function() {
        jQuery( "#tour-itinerary-tabs" ).tabs();
        //console.log("Tabs Should Show");
  });
}

// After document has loaded initalize the app
jQuery(document).ready(initializeBuilder);
//flatpickr.formatDate(tourData.startDate, "l - j F, Y")

function itineraryTemplate(actualDay, i) {
return `
<div id="tour-itinerary-tabs-${actualDay}" class="tour-itinerary-tab">
    <div class="overview">
      <h4>Overview</h4>
      <p class="tour-day-number"><b>Tour Day:</b> ${actualDay}</p>
      <p class="tour-day-date"><b>Tour Date:</b> ${flatpickr.formatDate(tourData.itinerary[i].date, "l - j F, Y")}</p>
      <p class="overnight-city"><b>Overnight City:</b> ${tourData.itinerary[i].overnightCity}</p>
      <p class="overnight-hotel"><b>Overnight Hotel:</b> ${tourData.itinerary[i].overnightHotel}</p>
    </div>
    <div class="included-meals">
      <h4>Included Meals</h4>
      <input type="checkbox" id="breakfast-included-day-${actualDay}" name="breakfast-included-day-${actualDay}" value="breakfast">
      <label for="breakfast-included-day-${actualDay}">Breakfast</label>
      <input type="checkbox" id="lunch-included-day-${actualDay}" name="lunch-included-day-${actualDay}" value="lunch">
      <label for="lunch-check-ti-tab-${actualDay}">Lunch</label>
      <input type="checkbox" id="dinner-included-day-${actualDay}" name="dinner-included-day-${actualDay}" value="dinner">
      <label for="dinner-check-ti-tab-${actualDay}">Dinner</label>
    </div>
    <div class="activities">
      <h4>Activities</h4>
      <div class="morning">
        <p>Morning Activities</p>
        <input type="checkbox" id="eat-breakfast-day-${actualDay}" name="eat-breakfast-day-${actualDay}" value="eat-breakfast-day-${actualDay}">
        <label for="eat-breakfast-day-${actualDay}">Have Breakfast</label><br>
        <input type="checkbox" id="hotel-checkout-day-${actualDay}" name="hotel-checkout-day-${actualDay}" value="hotel-checkout-day-${actualDay}">
        <label for="hotel-checkout-day-${actualDay}">Hotel Checkout</label><br>
        <input type="checkbox" id="morning-leisure-time-day-${actualDay}" name="morning-leisure-time-day-${actualDay}" value="morning-leisure-time-day-${actualDay}">
        <label for="morning-leisure-time-day-${actualDay}">Leisure Time</label><br>
        <input type="checkbox" id="morning-included-activity-day-${actualDay}" name="morning-included-activity-day-${actualDay}" value="morning-included-activity-day-${actualDay}">
        <label for="morning-included-activity-day-${actualDay}">Included Activity</label><br>
        <input type="checkbox" id="morning-optional-activity-day-${actualDay}" name="morning-optional-activity-day-${actualDay}" value="morning-optional-activity-day-${actualDay}">
        <label for="morning-optional-activity-day-${actualDay}">Optional Activity</label><br>
      </div>
      <div class="lunchtime">
        <p>Lunchtime Activities</p>
        <input type="checkbox" id="eat-lunch-day-${actualDay}" name="eat-lunch-day-${actualDay}" value="eat-lunch">
        <label for="eat-lunch-day-${actualDay}">Have Lunch</label><br>
        <input type="checkbox" id="continue-morning-activity-day-${actualDay}" name="continue-morning-activity-day-${actualDay}" value="continue-morning-activity-day-${actualDay}">
        <label for="continue-morning-activity-day-${actualDay}">Continue Morning Activity</label><br>
        <input type="checkbox" id="lunch-leisure-time-day-${actualDay}" name="lunch-leisure-time-day-${actualDay}" value="lunch-leisure-time-day-${actualDay}">
        <label for="lunch-leisure-time-day-${actualDay}">Leisure Time</label><br>
        <input type="checkbox" id="lunch-included-activity-day-${actualDay}" name="lunch-included-activity-day-${actualDay}" value="lunch-included-activity-day-${actualDay}">
        <label for="lunch-included-activity-day-${actualDay}">Included Activity</label><br>
        <input type="checkbox" id="lunch-optional-activity-day-${actualDay}" name="lunch-optional-activity-day-${actualDay}" value="lunch-optional-activity-day-${actualDay}">
        <label for="lunch-optional-activity-day-${actualDay}">Optional Activity</label><br>
      </div>
      <div class="afternoon">
        <p>Afternoon Activities</p>
        <input type="checkbox" id="hotel-checkin-day-${actualDay}" name="hotel-checkin-day-${actualDay}" value="hotel-checkin-day-${actualDay}">
        <label for="hotel-checkin-day-${actualDay}">Hotel Checkin</label><br>
        <input type="checkbox" id="continue-morning-activity-${actualDay}" name="continue-morning-activity-${actualDay}" value="continue-morning-activity">
        <label for="continue-morning-activity-${actualDay}">Continue Morning Activity</label><br>
        <input type="checkbox" id="afternoon-leisure-time-day-${actualDay}" name="afternoon-leisure-time-day-${actualDay}" value="afternoon-leisure-time-day-${actualDay}">
        <label for="afternoon-leisure-time-day-${actualDay}">Leisure Time</label><br>
        <input type="checkbox" id="afternoon-included-activity-day-${actualDay}" name="afternoon-included-activity-day-${actualDay}" value="afternoon-included-activity-day-${actualDay}">
        <label for="afternoon-included-activity-day-${actualDay}">Included Activity</label><br>
        <input type="checkbox" id="afternoon-optional-activity-day-${actualDay}" name="afternoon-optional-activity-day-${actualDay}" value="afternoon-optional-activity-day-${actualDay}">
        <label for="afternoon-optional-activity-day-${actualDay}">Optional Activity</label><br>
      </div>
      <div class="dinnertime">
        <p>Dinnertime Activities</p>
        <input type="checkbox" id="eat-dinner-day-${actualDay}" name="eat-dinner-day-${actualDay}" value="eat-dinner-day-${actualDay}">
        <label for="eat-dinner-day-${actualDay}">Have Dinner</label><br>
        <input type="checkbox" id="dinner-leisure-time-day-${actualDay}" name="dinner-leisure-time-day-${actualDay}" value="dinner-leisure-time-day-${actualDay}">
        <label for="dinner-leisure-time-day-${actualDay}">Leisure Time</label><br>
        <input type="checkbox" id="dinner-included-activity-day-${actualDay}" name="dinner-included-activity-day-${actualDay}" value="dinner-included-activity-day-${actualDay}">
        <label for="dinner-included-activity-day-${actualDay}">Included Activity</label><br>
        <input type="checkbox" id="dinner-optional-activity-day-${actualDay}" name="dinner-optional-activity-day-${actualDay}" value="dinner-optional-activity-day-${actualDay}">
        <label for="dinner-optional-activity-day-${actualDay}">Optional Activity</label><br>
      </div>
      <div class="evening">
        <p>Evening Activities</p>
        <input type="checkbox" id="evening-leisure-time-day-${actualDay}" name="evening-leisure-time-day-${actualDay}" value="evening-leisure-time-day-${actualDay}">
        <label for="evening-leisure-time-day-${actualDay}">Leisure Time</label><br>
        <input type="checkbox" id="evening-included-activity-day-${actualDay}" name="evening-included-activity-day-${actualDay}" value="evening-included-activity-day-${actualDay}">
        <label for="evening-included-activity-day-${actualDay}">Included Activity</label><br>
        <input type="checkbox" id="evening-optional-activity-day-${actualDay}" name="evening-optional-activity-day-${actualDay}" value="evening-optional-activity-day-${actualDay}">
        <label for="evening-optional-activity-day-${actualDay}">Optional Activity</label><br>
      </div>
    </div>
</div>
`;
}