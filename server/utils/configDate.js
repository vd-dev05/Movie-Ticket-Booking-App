function parseDateWithTime(dateString, hourString) {
    const months = {
        'Mon': 0, 'Tue': 1, 'Wed': 2, 'Thu': 3, 'Fri': 4, 'Sat': 5, 'Sun': 6
    };
    const parts = dateString.split('-');
    const dayOfWeek = parts[0];
    const day = parseInt(parts[1], 10); 
    const year = parseInt(parts[2], 10);

    const date = new Date(year, months[dayOfWeek], day);
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
