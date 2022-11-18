const moment = require('moment')

export function getIsoString(value) {
    let date = new Date(value);
    return date.toISOString();
}

export function getISOMonthPeriodFromDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const startDate = moment([year, month, 1]).format("YYYY-MM-DD");
    const daysInMonth = moment(startDate).daysInMonth();
    const endDate = moment(startDate).add(daysInMonth - 1, 'days').format("YYYY-MM-DD");
    return {
        'start': new Date(startDate).toISOString(),
        'end' : new Date(endDate).toISOString()
    };
}

