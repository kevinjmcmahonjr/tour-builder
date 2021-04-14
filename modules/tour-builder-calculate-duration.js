/*
    Function:
        Calculate Duration
    Purpose:
        Calculate the amount of days and nights between and including a start and end date
    Defaults:
        Gets start and end date from tourData Object if no date is passed in 
        Returns days only if no format is specified
    Options:
        Set format to days, nights or both to get the desired return
        Set startDate and endDate to false to force tourData and specify format
*/
function calculateDuration(startDate, endDate, format){
    // Check if dates were supplied, if not get dates drom global tourData Object if available
    if (!(startDate && endDate) && (tourData.startDate != "" && tourData.endDate != "")){
        startDate = tourData.startDate;
        endDate = tourData.endDate;
    } else {
        return console.log("Start and end dates not set, duration cannot be calculated");
    }

    // Calculate duration
    let fullStartDate = new Date(startDate).getTime();
    let fullEndDate = new Date(endDate).getTime();
    fullStartDate = eval( fullStartDate / 1000 + 3600 );
    fullEndDate = eval( fullEndDate / 1000 + 3600 );
    let durationNights = eval( fullEndDate - fullStartDate );
    durationNights = Math.round(eval( durationNights / 86400 ));
    let durationDays = eval( durationNights + 1 );

    switch(format){
        case "days":
            return durationDays;
        case "nights":
            return durationNights;
        case "both":
            return [durationDays, durationNights];
        default:
            return durationDays;
    }
}
/*
    Function:
        Set Duration of tour in the tourData object
    Purpose:
        Use the Calculate Duration function and then apply the calculations to the tourData object
*/
function setDuration(startDate, endDate){
    let duration = calculateDuration(startDate, endDate, both);
    tourData.numberOfDays = duration[0];
    tourData.numberOfNights = duration[1];
}
/*
    Function:
        Update Duration of tour in the tourData object
    Purpose:
        Use the Calculate Duration function and then use the calculations to update the tourData object
*/
function updateDuration(startDate, endDate){
    let duration = calculateDuration(startDate, endDate, both);
    tourData.numberOfDays = duration[0];
    tourData.numberOfNights = duration[1];
}