const formatDateTimeForDisplay = (dateString) => {
    const date = new Date(dateString);
    const options = {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
    };
    return date.toLocaleString('en-US', options);
};



module.exports = { formatDateTimeForDisplay } ;