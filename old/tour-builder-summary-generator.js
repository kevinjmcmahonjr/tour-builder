function createSummary(){
    let tourSummary;
    let tourSummaryHeading;
    let tourSummaryItinerary;
    let tourSummaryFooting;

    tourSummaryHeading = `
    <div>
        <h1>${tourData.tourTitle}</h1>
        <p>Tour Agent: ${tourData.tourAgent} | Tour ID: ${tourData.tourId}</p>
        <p>Departure Date: ${tourData.departureDate} | Start Date: ${tourData.startDate} | End Date: ${tourData.endDate} | Duration: ${tourData.numberOfDays} Days / ${tourData.numberOfNights} Nights</p>
        <h3>Itinerary</h3>
        <ol id="summary-itinerary">
        `;

    for(let itineraryDay = 0; itineraryDay < tourData.itinerary.length; itineraryDay++){
        tourSummaryItinerary += `
        <li>
            <h4>Date: ${tourData.itinerary[itineraryDay].date} | City: ${tourData.itinerary[itineraryDay].overnightCity} | Hotel: ${tourData.itinerary[itineraryDay].overnightHotel}</h4>
            <ul class="activites">`;
        
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