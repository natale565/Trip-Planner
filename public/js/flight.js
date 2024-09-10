const newFlightHandler = async (event) => {
    event.preventDefault();

    const airline = document.querySelector('#airline-input').value.trim();
    const flight_number = document.querySelector('#flightno-input').value.trim();
    const from_airport = document.querySelector('#depairport-input').value.trim();
    const to_airport = document.querySelector('#arrairport-input').value.trim();
    const etd = document.querySelector('#deptime-input').value.trim();
    const eta = document.querySelector('#arrtime-input').value.trim();

    const trip_id = document.querySelector('#trip-id').value || window.location.pathname.split('/')[2]; 

    if (airline && flight_number && from_airport && etd && to_airport && eta && trip_id) {
        try {
            const parsedETD = new Date(etd).toISOString();
            const parsedETA = new Date(eta).toISOString();

            const response = await fetch('/api/flight', {
                method: 'POST',
                body: JSON.stringify({
                    airline,
                    flight_number,
                    from_airport,
                    to_airport,
                    etd: parsedETD,
                    eta: parsedETA, 
                    trip_id,         
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Flight created successfully:', data);
                location.reload();
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
                alert('Failed to create flight: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the flight');
        }
    } else {
        alert('Please fill in all fields');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const saveFlightBtn = document.querySelector('#save-flight-btn');
    if (saveFlightBtn) {
        saveFlightBtn.addEventListener('click', newFlightHandler);
    } else {
        console.error('Save flight button not found');
    }
});


// Edit flight handler
const editFlightHandler = async (event) => {
    event.preventDefault();

    const flightId = document.querySelector('#edit-flight-id').value;
    const airline = document.querySelector('#edit-airline').value.trim();
    const flight_number = document.querySelector('#edit-flight-number').value.trim();
    const from_airport = document.querySelector('#edit-from-airport').value.trim();
    const to_airport = document.querySelector('#edit-to-airport').value.trim();
    const etd = document.querySelector('#edit-etd').value.trim();
    const eta = document.querySelector('#edit-eta').value.trim();

    if (airline && flight_number && from_airport && to_airport && etd && eta) {
        try {
            const parsedETD = new Date(etd).toISOString();
            const parsedETA = new Date(eta).toISOString();

            const response = await fetch(`/api/flight/${flightId}`, {
                method: 'PUT',
                body: JSON.stringify({
                    airline,
                    flight_number,
                    from_airport,
                    to_airport,
                    etd: parsedETD,
                    eta: parsedETA,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Flight updated successfully');
                location.reload(); 
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
                alert('Failed to update flight: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updating the flight');
        }
    } else {
        alert('Please fill in all fields');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const saveFlightBtn = document.querySelector('#save-flight-btn');
    if (saveFlightBtn) {
        saveFlightBtn.addEventListener('click', newFlightHandler);
    }

    const saveEditedFlightBtn = document.querySelector('#save-edited-flight');
    if (saveEditedFlightBtn) {
        saveEditedFlightBtn.addEventListener('click', () => {
            document.querySelector('#edit-flight-form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        });
    }
});

document.querySelector('#edit-flight-form').addEventListener('submit', editFlightHandler);
    

const delFlightHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const flightId = event.target.getAttribute('data-id');
        
        try {
            const response = await fetch(`/api/flight/${flightId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to delete flight: ' + response.statusText);
            }
        } catch (error) {
            alert('An error occurred: ' + error);
        }
    }
};

document.querySelectorAll('.delete-flight-btn').forEach(button => {
    button.addEventListener('click', delFlightHandler);
});

