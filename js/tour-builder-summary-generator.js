function createSummary(){
    let tourSummary;
    let tourSummaryHeading;
    let tourSummaryItinerary;
    let tourSummaryFooting;

    tourSummaryHeading = `
    <div>
        <h1>${tourData.tourTitle}</h1>
        <p>Tour Agent: ${tourData.tourAgent}<br>Tour ID: ${tourData.tourId}</p>
        <h3>Overview</h3>
        <p>
            USA Departure Date: ${flatpickr.formatDate(tourData.departureDate, "l - j F, Y")}<br>
            Tour Start Date: ${flatpickr.formatDate(tourData.startDate, "l - j F, Y")}<br>
            Tour End Date: ${flatpickr.formatDate(tourData.endDate, "l - j F, Y")}<br>
            Duration: ${tourData.numberOfDays} Days / ${tourData.numberOfNights} Nights
        </p>
        <h3>Itinerary</h3>
        <ol id="summary-itinerary">
    `;

    tourSummaryItinerary = '';
    for(let itineraryDay = 0; itineraryDay < tourData.itinerary.length; itineraryDay++){
        if (itineraryDay === tourData.itinerary.length -1){
            tourSummaryItinerary += `
            <li>
                <p><b>Date: ${flatpickr.formatDate(tourData.itinerary[itineraryDay].date, "l - j F, Y")} | End of Tour - Return Home</b></p>
                <ul class="activites">`;
        } else {
            tourSummaryItinerary += `
            <li>
                <p><b>Date: ${flatpickr.formatDate(tourData.itinerary[itineraryDay].date, "l - j F, Y")} | City: ${tourData.itinerary[itineraryDay].overnightCity} | Hotel: ${tourData.itinerary[itineraryDay].overnightHotel}</b></p>
                <ul class="activites">`;
        }

        for(let activities = 0; activities < tourData.itinerary[itineraryDay].activities.length; activities++){
            tourSummaryItinerary += `<li>`;
            let activityData = tourData.itinerary[itineraryDay].activities[activities];
            for(const key in activityData){
                tourSummaryItinerary += `${key}: ${activityData[key]} | `;
            }
            tourSummaryItinerary += `</li>`;
        }

        tourSummaryItinerary += `
            </ul>
        </li>`;
    }

    tourSummaryFooting = `</ol></div>`;

    tourSummary = tourSummaryHeading + tourSummaryItinerary + tourSummaryFooting;
    
    return tourSummary;
}