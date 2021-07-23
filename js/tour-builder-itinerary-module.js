/*
    Wherever Tours - Tour Builder
    Author: Kevin J. McMahon Jr.
*/

// Create Object to hold Tour Information
let tourData = {
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
    create: {
        new: null,
        loadSave: null,
    },
    calendar: {
        first: true,
    },
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
    calendar: document.querySelector('.general-information .calendar-field'),
    departureDate: document.querySelector('.general-information .departure-date-display'),
    startDate: document.querySelector('.general-information .starting-date-display'),
    endDate: document.querySelector('.general-information .ending-date-display'),
    numberOfDays: document.querySelector('.general-information .total-days'),
    numberOfNights: document.querySelector('.general-information .total-overnights'),
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
        if ( stateCheck.itinerary.initialized === false ){ 
            initializeItinerary();
        }
        toggleOverviewInputs();
        guiElements.tourItinerary.container.classList.add('initiated');
        //jQuery(guiElements.tourItinerary.container).fadeIn("slow");
    }
});

let saveButtons = document.querySelectorAll('.save-tour-buttons');
saveButtons.forEach( function(button){
    button.addEventListener("click", saveTourBuild);
});
function saveTourBuild(){

    if (tourData.tourTitle === "" || tourData.tourTitle === undefined || tourData.tourTitle === null){
        tourData.tourTitle = guiElements.tourTitle.value;
        if (tourData.tourTitle === "" || tourData.tourTitle === undefined || tourData.tourTitle === null){
            alert("You must enter a Tour Title to save or submit your tour build.");
            return;
        }
    }

    if (this.id === 'save-tour-submit'){
        let answer = confirm("By submitting the tour, it will be locked until a Wherever Tour representative reviews it. Are you sure you're ready to submit?");
        if (answer == false) return;
    }
    
    let saveType = 'draft';
    if (this.id === 'save-tour-update'){
        saveType = 'update';
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
    tourDataSubmit.append( 'post_id' , WP_Variables.post_id);
    tourDataSubmit.append( 'tour_title', tourData.tourTitle);
    tourDataSubmit.append( 'tour_id', tourData.tourId);
    tourDataSubmit.append( 'tour_data', JSON.stringify(tourData));
    tourDataSubmit.append( 'tour_summary', tourSummary);
    tourDataSubmit.append( 'save_type', saveType);
    
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
                document.querySelector('.tour-save-result').insertAdjacentHTML('beforeend', '<p class="save-success-message">Success! Your Tour Build has been submitted! Here\'s your summary below.</p>');
                document.querySelector('.tour-save-result').insertAdjacentHTML('beforeend', tourSummary);
                document.querySelector('.loader').remove();
                document.querySelector('.tour-save-result').classList.toggle('success');
            } else {
                console.log('Error');
            }
        });
}

// Initialize Tour Builder Application
// Description: Hides the loader and show the Tour Builder
function initializeBuilder() {
    if (WP_Variables.tour_data === null || WP_Variables.tour_data === ""){
        stateCheck.create.new = true;
        showTabs();
        setupDatePicker();
        hideLoaderShowBuilder();
    } else {
        tourData = JSON.parse(WP_Variables.tour_data);
        stateCheck.create.new = false;
        stateCheck.create.loadSave = true;
        stateCheck.overview.calculated = true;
        showTabs();
        loadDatePicker();
        toggleCalendarLock();
        hideLoaderShowBuilder();
    }
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
        let visualStartingDate = formatDisplayDate(tourData.startDate);
        let visualEndingDate = formatDisplayDate(tourData.endDate);
        let visualDepartureDate = formatDisplayDate(tourData.departureDate);
        jQuery(guiElements.departureDate).text(visualDepartureDate);
        jQuery(guiElements.startDate).text(visualStartingDate);
        jQuery(guiElements.endDate).text(visualEndingDate);
    }
}

function loadVisualDates(){
    let visualStartingDate = formatDisplayDate(tourData.startDate);
    let visualEndingDate = formatDisplayDate(tourData.endDate);
    let visualDepartureDate = formatDisplayDate(tourData.departureDate);

    jQuery(guiElements.departureDate).text(visualDepartureDate);
    jQuery(guiElements.startDate).text(visualStartingDate);
    jQuery(guiElements.endDate).text(visualEndingDate);
}

function formatDisplayDate(string){
    let date = new Date(string);
    const weekName = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let formatted = weekName[date.getDay()] + " - " + date.getDate() + " " + monthName[date.getMonth()] + " " + date.getFullYear();
    return formatted;
}

function formatOverviewDate(string){
    let date = new Date(string);
    const weekName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    let formatted = weekName[date.getDay()] + "-" + date.getDate() + "-" + monthName[date.getMonth()] + "-" + date.getFullYear();
    return formatted;
}

// Calculates the number of days and nights
// Based on the Start and End Dates
// Updates the global tourData
function calculateDaysOvernights(dateRange){
    let startDate = dateRange[0];
    let endDate = dateRange[1];
    //if (tourData.startDate != "" && tourData.endDate != ""){
        //var startDate = tourData.startDate; //flatpickr.formatDate(tourData.startDate, "m/d/Y");
        //var endDate = tourData.endDate; //flatpickr.formatDate(tourData.endDate, "m/d/Y");
        let fullStartDate = new Date(startDate).getTime();
        let fullEndDate = new Date(endDate).getTime();
        fullStartDate = eval( fullStartDate / 1000 + 3600 );
        fullEndDate = eval( fullEndDate / 1000 + 3600 );
        let numberOfNights = eval( fullEndDate - fullStartDate );
        numberOfNights = Math.round(eval( numberOfNights / 86400 ));
        let numberOfDays = eval( numberOfNights + 1 );
        //tourData.numberOfDays = numberOfDays;
        //tourData.numberOfNights = numberOfNights;
        //jQuery(guiElements.numberOfDays).text(numberOfDays);
        //jQuery(guiElements.numberOfNights).text(numberOfNights);
    //}
    return {days: numberOfDays, nights: numberOfNights};
}

function setDaysOvernights(daysOvernights){
    let numberOfDays = daysOvernights.days;
    let numberOfNights = daysOvernights.nights;
    tourData.numberOfDays = numberOfDays;
    tourData.numberOfNights = numberOfNights;
    jQuery(guiElements.numberOfDays).text(numberOfDays);
    jQuery(guiElements.numberOfNights).text(numberOfNights);
}

function loadDaysOvernights(){
    jQuery(guiElements.numberOfDays).text(tourData.numberOfDays);
    jQuery(guiElements.numberOfNights).text(tourData.numberOfNights);
}

// Sets the number of rows equal to the number of days
// Show Tour Overview table
/* Needs to also calculate the weekday and date of each day */
function initializeOverview(){
    //const initalRow = guiElements.tourOverview.tableRows[0];
    const tableBody = guiElements.tourOverview.tableBody;
    const tourDays = tourData.numberOfDays;
    const rowLiteralInitial = `
    <tr class="overview-day-row">
        <td class="overview-day-column overview-day-number"></td>
        <td class="overview-day-column overview-date"></td>
        <td class="overview-day-column overview-overnight-city"><input type="text" placeholder="Enter City"></td>
        <td class="overview-day-column overview-overnight-hotel"><input type="text" placeholder="Enter Hotel"></td>
        <td class="overview-day-column overview-copy"></td>
    </tr>
    `;
    const rowLiteralCopy = `
    <tr class="overview-day-row">
        <td class="overview-day-column overview-day-number"></td>
        <td class="overview-day-column overview-date"></td>
        <td class="overview-day-column overview-overnight-city"><input type="text" placeholder="Enter City"></td>
        <td class="overview-day-column overview-overnight-hotel"><input type="text" placeholder="Enter Hotel"></td>
        <td class="overview-day-column overview-copy"><button><i class="far fa-copy"></i></button></td>
    </tr>
    `;
    const lastRowLiteral = `
    <tr class="overview-day-row">
        <td class="overview-day-column overview-day-number"></td>
        <td class="overview-day-column overview-date"></td>
        <td class="overview-day-column overview-overnight-city"><input type="text" value="End of Tour - Return Home" readonly></td>
        <td class="overview-day-column overview-overnight-hotel"><input type="text" value="End of Tour - Return Home" readonly></td>
        <td class="overview-day-column overview-copy"></td>
    </tr>
    `;
    for(days = 1; days < tourDays; days++) {
        if (days === 1){
            tableBody.insertAdjacentHTML('beforeend', rowLiteralInitial);
        }
        if (days === tourDays - 1){
            tableBody.insertAdjacentHTML('beforeend', lastRowLiteral);
        }
        else {
            tableBody.insertAdjacentHTML('beforeend', rowLiteralCopy);
        }
        //jQuery(initalRow).clone().appendTo(guiElements.tourOverview.tableBody);
    }
    guiElements.tourOverview.update();
    setDaysInOverview();
    copyOverviewDay();
    jQuery(guiElements.tourOverview.container).addClass("initiated");
}

function loadOverview(){
    //const initalRow = guiElements.tourOverview.tableRows[0];
    const tableBody = guiElements.tourOverview.tableBody;
    const tourDays = tourData.numberOfDays;
    function rowLiteralInitial(days){
        return `
        <tr class="overview-day-row">
            <td class="overview-day-column overview-day-number">${tourData.itinerary[days].dayNumber}</td>
            <td class="overview-day-column overview-date">${formatOverviewDate(tourData.itinerary[days].date)}</td>
            <td class="overview-day-column overview-overnight-city"><input type="text" placeholder="Enter City" value="${tourData.itinerary[days].overnightCity}"></td>
            <td class="overview-day-column overview-overnight-hotel"><input type="text" placeholder="Enter Hotel" value="${tourData.itinerary[days].overnightHotel}"></td>
            <td class="overview-day-column overview-copy"></td>
        </tr>
        `;
    }
    function rowLiteralCopy(days){
        return `
        <tr class="overview-day-row">
            <td class="overview-day-column overview-day-number">${tourData.itinerary[days].dayNumber}</td>
            <td class="overview-day-column overview-date">${formatOverviewDate(tourData.itinerary[days].date)}</td>
            <td class="overview-day-column overview-overnight-city"><input type="text" placeholder="Enter City" value="${tourData.itinerary[days].overnightCity}"></td>
            <td class="overview-day-column overview-overnight-hotel"><input type="text" placeholder="Enter Hotel" value="${tourData.itinerary[days].overnightHotel}"></td>
            <td class="overview-day-column overview-copy"><button><i class="far fa-copy"></i></button></td>
        </tr>
        `;
    }
    function lastRowLiteral(days){
        return `
        <tr class="overview-day-row">
            <td class="overview-day-column overview-day-number">${tourData.itinerary[days].dayNumber}</td>
            <td class="overview-day-column overview-date">${formatOverviewDate(tourData.itinerary[days].date)}</td>
            <td class="overview-day-column overview-overnight-city"><input type="text" value="End of Tour - Return Home" readonly></td>
            <td class="overview-day-column overview-overnight-hotel"><input type="text" value="End of Tour - Return Home" readonly></td>
            <td class="overview-day-column overview-copy"></td>
        </tr>
        `;
    }

    for(days = 1; days < tourDays; days++) {
        if (days === 1){
            tableBody.insertAdjacentHTML('beforeend', rowLiteralInitial(days - 1));
        }
        if (days === tourDays - 1){
            tableBody.insertAdjacentHTML('beforeend', lastRowLiteral(days));
        }
        else {
            tableBody.insertAdjacentHTML('beforeend', rowLiteralCopy(days));
        }
        //jQuery(initalRow).clone().appendTo(guiElements.tourOverview.tableBody);
    }
    guiElements.tourOverview.update();
    copyOverviewDay();
    jQuery(guiElements.tourOverview.container).addClass("initiated");
}

function updateOverview(){
    let tableRows = guiElements.tourOverview.tableRows;
    for ( row = 0; row < tableRows.length; row++){
        tableRows[row].querySelector('.overview-day-number').innerHTML = tourData.itinerary[row].dayNumber;
        tableRows[row].querySelector('.overview-date').innerHTML = formatOverviewDate(tourData.itinerary[row].date);
    }
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
        console.log("Initializing Itinerary");
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

function loadItinerary(){
    console.log("Load Itinerary");
    function createTabNavItem(actualDay){
        let newNavItem = `<li class="tour-itinerary-tab-item"><a href="#tour-itinerary-tabs-${actualDay}">Day ${actualDay}</a></li>`
        guiElements.tourItinerary.nav.insertAdjacentHTML('beforeend', newNavItem);
    }

    function createTabContent(actualDay, days){
        let newTab = itineraryTemplate(actualDay, days);
        guiElements.tourItinerary.tabsContainer.insertAdjacentHTML('beforeend', newTab);
    }

    for (days = 0; days < tourData.numberOfDays; days++){
        console.log("Initializing Itinerary");
        let actualDay = days + 1;
        createTabNavItem(actualDay, days);
        createTabContent(actualDay, days);
        initializeTourActivities(actualDay);
        //jQuery('#tour-itinerary-tabs').tabs("refresh");
        //jQuery('#tour-itinerary-tabs').tabs("option", "active", 0);
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

function resetDaysOfItinierary(){
    tourData.itinerary.length = 0;
}

function setDaysInOverview(){
    const overviewDayRow = guiElements.tourOverview.tableRows;
    if (overviewDayRow.length === tourData.numberOfDays){
        for (days = 0; days < overviewDayRow.length; days++){
            overviewDayRow[days].querySelector(".overview-day-number").innerHTML = tourData.itinerary[days].dayNumber;
            overviewDayRow[days].querySelector(".overview-date").innerHTML = formatOverviewDate(tourData.itinerary[days].date);
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
    
    if ( stateCheck.overview.calculated === false ){
        initializeOverview(overviewDayRows, overviewTableBody);
        stateCheck.overview.calculated = true;
        return;
    }

    if (stateCheck.overview.calculated === true){
        updateOverview();
        return;
    }
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

// Save Date Information to tourData
function setTourDates(dateRange){
    tourData.dateRange = dateRange;
    tourData.startDate = dateRange[0];
    tourData.endDate = dateRange[1];
    setDepartureDate();
    setVisualDates();
}

function loadTourDates(){
    loadVisualDates();
}

function toggleCalendarLock(specifyLockState){
    let calendar = document.querySelector('.flatpickr-calendar');
    let innerCalendar = calendar.querySelector('.flatpickr-innerContainer');
    if (stateCheck.calendar.first){
        addCalendarLockElement(innerCalendar);
        stateCheck.calendar.first = false;
    }
    if (specifyLockState === "lock"){
        calendar.classList.add('locked');
    } else if (specifyLockState === "unlock"){
        calendar.classList.remove('locked');
    } else {
        calendar.classList.toggle('locked');
    }
}

function addCalendarLockElement(calendar){
    calendar.insertAdjacentHTML('beforeend', '<div class="calendar-lock"><span class="calendar-lock-icon"></span></div>');
    let calendarLock = calendar.querySelector('.calendar-lock');
    calendarLock.addEventListener('click', toggleCalendarLock);
}

function compareNumberOfDays(calculatedDays){
    let setDays = tourData.numberOfDays;
    if (calculatedDays === setDays){
        return "equal";
    }
    if (calculatedDays > setDays){
        return "greater";
    }
    if (calculatedDays < setDays){
        return "less";
    }
}

function calendarChangeHandler(dateRange, calendar){
    //let calendar = flatpickr(guiElements.calendar);
    // If this is a new tour build run these functions
    if (stateCheck.create.new){
        showTabs();
        setTourDates(dateRange);
        toggleCalendarLock();
        setTourTitle();
        let daysOvernights = calculateDaysOvernights(dateRange);
        setDaysOvernights(daysOvernights);
        setDaysOfItinieray();
        calculateOverview();
    } else if (stateCheck.create.loadSave){
        // If this is a saved tour loading in run these functions
        showTabs();
        loadTourDates();
        loadDaysOvernights();
        loadOverview();
        loadItinerary();
        stateCheck.create.loadSave = false;
    }
    else {
        // If this is an update or edit on an open tour run these functions
        showTabs();
        setTourTitle();
        toggleCalendarLock();
        let daysOvernights = calculateDaysOvernights(dateRange);
        let comparedDays = compareNumberOfDays(daysOvernights.days);
        switch (comparedDays){
            case "equal":
                setTourDates(dateRange);
                resetDaysOfItinierary();
                setDaysOfItinieray();
                calculateOverview();
                break;
            case "greater":
                alert("Please Select a Date Range Equal To Original");
                calendar.setDate(tourData.dateRange);
                break;
            case "less":
                alert("Please Select a Date Range Equal To Original");
                calendar.setDate(tourData.dateRange);
                break;
        }
    }
}

// Set up calendar GUI
// Have calendar update fields
function setupDatePicker(){
    guiElements.calendar.flatpickr({
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "m-d-Y",
        inline: true,
        monthSelectorType: "dropdown",
        mode: "range",
        onChange: function(dateRange){
            let calendar = this;
            if (dateRange.length == 2){
                calendarChangeHandler(dateRange, calendar);
            }
        }
    });
}

function loadDatePicker(){
    guiElements.calendar.flatpickr({
        altInput: true,
        altFormat: "F j, Y",
        dateFormat: "m-d-Y",
        inline: true,
        monthSelectorType: "dropdown",
        mode: "range",
        //defaultDate: [new Date(tourData.startDate), new Date(tourData.endDate)]
        defaultDate: tourData.dateRange,
        onChange: function(dateRange){
            let calendar = this;
            if (dateRange.length == 2){
                calendarChangeHandler(dateRange, calendar);
            }
        },
        onReady: function(){
            calendarChangeHandler();
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
      <p class="tour-day-date"><span class="itinerary-overview-key">Tour Date:</span> ${formatDisplayDate(tourData.itinerary[i].date, "l - j F, Y")}</p>
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