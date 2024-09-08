const newTripHandler = async (event) => {
    event.preventDefault();

    const tripLocation = document.querySelector('#enter-trip-dest').value.trim();

    if (tripLocation) {
        const response = await fetch('/api/trip', {
            method: 'POST',
            body: JSON.stringify({ location: tripLocation }), 
            headers: {
                'Content-Type': 'application/json',
            },
        });
        

        if (response.ok) {
            const newTrip = await response.json();
            document.location.replace(`/trip/${newTrip.id}`); 
        } else {
            alert('Failed to create trip');
        }
    } else {
        alert('Please enter a location');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document
        .querySelector('#new-trip-form')
        .addEventListener('submit', newTripHandler);
});