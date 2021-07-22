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
            USA Departure Date: ${formatDisplayDate(tourData.departureDate)}<br>
            Tour Start Date: ${formatDisplayDate(tourData.startDate)}<br>
            Tour End Date: ${formatDisplayDate(tourData.endDate)}<br>
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
                <p><b>Date: ${formatDisplayDate(tourData.itinerary[itineraryDay].date)} | End of Tour - Return Home</b></p>
                <ul class="activites">`;
        } else {
            tourSummaryItinerary += `
            <li>
                <p><b>Date: ${formatDisplayDate(tourData.itinerary[itineraryDay].date)} | City: ${tourData.itinerary[itineraryDay].overnightCity} | Hotel: ${tourData.itinerary[itineraryDay].overnightHotel}</b></p>
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