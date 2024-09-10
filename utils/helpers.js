const formatDateTimeForDisplay = (dateString) => {
    const date = new Date(dateString);
    const options = {
        weekday: 'short', // 'long' for full weekday name
        month: 'short', // 'long' for full month name
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true // Use 12-hour clock with AM/PM
    };
    return date.toLocaleString('en-US', options);
};



module.exports = { formatDateTimeForDisplay };