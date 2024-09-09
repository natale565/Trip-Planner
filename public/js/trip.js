// Event handler for deleting a trip
document.addEventListener('click', (event) => {
    if (event.target && event.target.matches('.delete-trip-btn')) {
        const tripId = event.target.getAttribute('data-id');
        delTripHandler(tripId);
    }
});

const delTripHandler = async (tripId) => {
    try {
        const response = await fetch(`/api/trip/${tripId}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.reload();
        } else {
            const data = await response.json();
            console.error('Failed to delete trip:', data.message);
            alert('Failed to delete trip: ' + data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred: ' + error.message);
    }
};
