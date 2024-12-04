function parseDateWithTime(dateArray, hourString) {
    const months = {
        'Mon': 0, 'Tue': 1, 'Wed': 2, 'Thu': 3, 'Fri': 4, 'Sat': 5, 'Sun': 6
    };

    const year = parseInt(dateArray[0], 10); 
    const month = parseInt(dateArray[1], 10) -1 ; 
    const day = parseInt(dateArray[2], 10);

    const date = new Date(year,  month, day);
   
    
    const [hour, minute] = hourString.split(':').map(num => parseInt(num, 10));
    date.setHours(hour);
    date.setMinutes(minute);
    date.setSeconds(0);
    date.setMilliseconds(0);
    
    return date;
}

export  {
    parseDateWithTime,
}
