/*
    Wherever Tours - Tour Builder
    Version: 0.1 - Beta
    Author: Kevin J. McMahon Jr.
*/

// Create Object to hold Tour Information
const tourData = {
    tourTitle: "",
    tourID: "",
    tourAgent:"",
    tourLead: "",
    dateRange: "",
    startDate: "",
    endDate: "",
    departureDate: "",
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
    activites: [],
    includes: ""
}

//Create Skelton Activity Object 
const dayActivity = {
    type: "",
    meal: "",
    mealLocation: "",
    time: "",
    duration: "",
    realTime: "",
    location: "",
    description: "",
    transportationRequired: "",
    fees: "",
    guideRequired: "",
    guideSpecialty: "",
    guidePreference: "",
    notes: "",
    optional: ""
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
    tourInformation:{
        container: document.querySelector('.general-information')
    },
    tourTitle: document.querySelector('#tour-title'),
    tourAgent: document.querySelector('#tour-agent'),
    tourId: document.querySelector('#tour-id'),
    calendar: jQuery(".calendar-field")[0],
    departureDate: jQuery('.departure-date-display'),
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
        tabsContainer: document.querySelector("#tour-itinerary-tabs-content"),
        tabs: document.querySelectorAll("#tour-itinerary-tabs-content > .tour-itinerary-tab"),
        updateNav: function(){
            return this.navItems = document.querySelectorAll("#tour-itinerary-tab-nav > .tour-itinerary-tab-item");
        },
        updateTab: function(){
            return this.tabs = document.querySelectorAll("#tour-itinerary-tabs-content > .tour-itinerary-tab");
        }
    },
    tourSave:{
        container: document.querySelector('.tour-submission')
    },
    tourResuts:{
        container: document.querySelector('.tour-save-results')
    }
}

function toggleAllModules(){
    let modules = [
        guiElements.tourInformation.container,
        guiElements.tourOverview.container,
        guiElements.tourItinerary.container,
        guiElements.tourSave.container
    ];
    modules.forEach( (module) => {
        module.classList.toggle('disappear');
    });
}

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
        guiElements.tourItinerary.container.classList.add('initiated');
        //jQuery(guiElements.tourItinerary.container).fadeIn("slow");
    }
});

document.querySelector('#save-tour').addEventListener("click", function(){
    if (tourData.tourTitle === "" || tourData.tourTitle === undefined || tourData.tourTitle === null){
        tourData.tourTitle = guiElements.tourTitle.value;
        if (tourData.tourTitle === "" || tourData.tourTitle === undefined || tourData.tourTitle === null){
        alert("Please Enter Tour Title");
        return;
        }
    }
    let tourSummary = createSummary();
    toggleAllModules();

    window.scroll({
        top: 0,
        behavior: 'smooth'
    });
    document.querySelector('.tb-main').insertAdjacentHTML('beforeend', '<div class="loader"></div>');
    let tourDataSubmit = new FormData();
    tourDataSubmit.append( 'action', 'tour_builder_save_tour');
    tourDataSubmit.append( 'nonce', WP_Variables.nonce);
    tourDataSubmit.append( 'is_user_logged_in', WP_Variables.is_user_logged_in);
    tourDataSubmit.append( 'tour_title', tourData.tourTitle);
    tourDataSubmit.append( 'tour_id', tourData.tourId);
    tourDataSubmit.append( 'tour_data', JSON.stringify(tourData));
    tourDataSubmit.append( 'tour_summary', tourSummary);
    
    fetch(WP_Variables.ajax_url, {
        method: 'POST',
        credentials: 'same-origin',
        body: tourDataSubmit
    }).then( result => result.json())
        .catch(error => {
            console.log("Something went wrong: " + error);
        })
        .then(response => {
            if (response.success){
                console.log("success");
                document.querySelector('.tb-main').insertAdjacentHTML('beforeend', "Success! Your Tour Build has been submitted! Here's your summary below.");
                document.querySelector('.tb-main').insertAdjacentHTML('beforeend', tourSummary);
                document.querySelector('.loader').remove();
            } else {
                console.log('Error');
            }
        });


    // fetch(WP_Variables.ajax_url, {
    //     method: 'POST',
    //     credentials: 'same-origin',
    //     body: tourDataSubmit
    // })
    // .then((response) => response.json())
    // .then((data) => {
    //     document.querySelector('.tb-main').insertAdjacentHTML('beforeend', "Success! Your Tour Build has been submitted! Here's your summary below.");
    //     document.querySelector('.tb-main').insertAdjacentHTML('beforeend', tourSummary);
    //     document.querySelector('.loader').remove();
    // })
    // .catch((error) => {
    //     console.log(error);
    // })

    // let itineraryMarkUp = document.querySelectorAll('#tour-itinerary-tabs-content .tour-itinerary-tab');
    // itineraryMarkUp.forEach(function(dayDiv, i){
    //     let inputField = dayDiv.querySelectorAll('input');
    //     console.log(i);
    //     let checkedFields = [];
    //     inputField.forEach(function(inputField, ii){
    //         inputField.readOnly = true;
    //         if (inputField.checked){console.log(i);

    //         }
    //     })
    // });
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
    var previousDay = date;
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
        let visualStartingDate = flatpickr.formatDate(tourData.startDate, "l - j F, Y");
        let visualEndingDate = flatpickr.formatDate(tourData.endDate, 'l - j F, Y');
        let visualDepartureDate = flatpickr.formatDate(tourData.departureDate, 'l - j F, Y');
        jQuery(guiElements.departureDate).text(visualDepartureDate);
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
    copyOverviewDay();
    jQuery(guiElements.tourOverview.container).addClass("initiated");
}

function copyOverviewDay(){
    let copyButtons = document.querySelectorAll('.overview-copy');
    copyButtons.forEach( function(button) {
        button.addEventListener('click', function(){
            let parEl = button.parentElement;
            let prevDayElement = parEl.previousElementSibling;
            parEl.querySelector('.overview-overnight-city input').value = prevDayElement.querySelector('.overview-overnight-city input').value;
            parEl.querySelector('.overview-overnight-hotel input').value = prevDayElement.querySelector('.overview-overnight-hotel input').value;
        });
    });
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
        initializeTourActivities(actualDay);
        jQuery('#tour-itinerary-tabs').tabs("refresh");
        jQuery('#tour-itinerary-tabs').tabs("option", "active", 0);
    }
    stateCheck.itinerary.initialized = true;
    document.querySelector('.tour-submission').classList.add('saveable');
}

function setDaysOfItinieray(){
    let currentDate = new Date(tourData.startDate);
    //console.log("Start Date: before loop " + currentDate);
    let duration = tourData.numberOfDays;

    for (let days = 0; days < duration; days++){
        let actualDay = days + 1;
        tourData.itinerary.push({dayNumber: actualDay, date: new Date(currentDate), activities: []});
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

function setTourTitle(){
    tourData.tourAgent = guiElements.tourAgent.value;
    tourData.tourId = guiElements.tourId.value;
    tourData.tourTitle = guiElements.tourTitle.value;
}
function setDepartureDate(){
    //Save Departure Date in Object
    let departureDate = new Date(tourData.startDate);
    getPreviousDay(departureDate);
    tourData.departureDate = departureDate;

    // Show Departure Date in Calendar
    let visualDepartureDate = document.querySelector('.date-selections .flatpickr-days .startRange');
    visualDepartureDate = visualDepartureDate.previousElementSibling;
    visualDepartureDate.classList.add('departure-date');
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
                setDepartureDate();
                setTourTitle();
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
            jQuery('.tb-main').addClass('initiated');
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
<div id="tour-itinerary-tabs-${actualDay}" class="tour-itinerary-tab" data-itinerary-day="${actualDay}">
    <div class="itinerary-day-overview">
      <h4>Day ${actualDay} Overview</h4>
      <p class="tour-day-date"><span class="itinerary-overview-key">Tour Date:</span> ${flatpickr.formatDate(tourData.itinerary[i].date, "l - j F, Y")}</p>
      <p class="overnight-city"><span class="itinerary-overview-key">Overnight City:</span> ${tourData.itinerary[i].overnightCity}</p>
      <p class="overnight-hotel"><span class="itinerary-overview-key">Overnight Hotel:</span> ${tourData.itinerary[i].overnightHotel}</p>
    </div>
    <div class="tour-itinerary-day-activities" id="tour-itinerary-activities-day-${actualDay}">
                <!-- Begin Javascript Template-->
                
                <!-- End Javascript Template-->
    </div>
    <button class="tour-add-activity-button btn-success" id="tour-add-activity-to-day-${actualDay}"><i class="fa fa-plus-circle"></i> Add An Activity</button>
</div>
`;
}