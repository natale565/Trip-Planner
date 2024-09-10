const newItineraryHandler = async (event) => {
    event.preventDefault();

    const description = document.querySelector('#itinerary-description').value.trim();
    const itinerary_location = document.querySelector('#itinerary-location').value.trim();
    const itinerary_time = document.querySelector('#itinerary-time').value.trim();
    const notes = document.querySelector('#itinerary-notes').value.trim();
    const trip_id = document.querySelector('#trip-id').value.trim() || window.location.pathname.split('/')[2];

    if(description && itinerary_location && itinerary_time && notes && trip_id) {
        try {
            const parsedItineraryTime = new Date(itinerary_time).toISOString();
        
        const response = await fetch('/api/itinerary', {
            method: 'POST',
            body: JSON.stringify({ 
                description, 
                itinerary_location, 
                itinerary_time: parsedItineraryTime,
                notes,
                trip_id,
             }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
     if (response.ok) {
        const data = await response.json();
        console.log('Itinerary created succesfully', data)
        location.reload();
    } else {
        const errorData = await response.json();
            console.error('Error:', errorData);
            alert('Failed to create itinerary:' + errorData.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occured while creating the lodging');
    }
    } else {
        alert('Please fill out all fields')
    }
};

document.addEventListener('DOMContentLoaded', () => { 
    const saveItineraryBtn = document.querySelector('#save-itinerary-btn');
    if (saveItineraryBtn) {
        saveItineraryBtn.addEventListener('click', newItineraryHandler);
    }
});

const editItineraryHandler = async (event) => {
    event.preventDefault();

    const description = document.querySelector('#edit-itinerary-description').value.trim();
    const itinerary_location = document.querySelector('#edit-itinerary-location').value.trim();
    const itinerary_time = document.querySelector('#edit-itinerary-time').value.trim();
    const notes = document.querySelector('#edit-notes').value.trim();
    const itineraryId = document.querySelector('#edit-itinerary-id').value;


    if(description && itinerary_location && itinerary_time && notes) {
        try {
            const parsedItineraryTime = new Date((itinerary_time)).toISOString();
    
            const response = await fetch(`/api/itinerary/${itineraryId}`, {
            method: 'PUT',
            body: JSON.stringify({ 
                description,
                itinerary_location,
                itinerary_time: parsedItineraryTime,
                notes
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            alert('Itinerary updated succesfully');
            location.reload();
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData)
            alert('Failed to update itinerary: ' + errorData.message);
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occured while updating the itinerary');
      }
} else {
    alert('Please fill out all fields');
}
};

document.addEventListener('DOMContentLoaded', () => {
    const saveEditedItineraryBtn = document.querySelector('#save-edited-itinerary');
    if (saveEditedItineraryBtn) {
        saveEditedItineraryBtn.addEventListener('click', () => {
            document.querySelector('#edit-itinerary-form').dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        });
    }
    document.querySelector('#edit-itinerary-form').addEventListener('submit', editItineraryHandler);
});


const delItineraryHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const itineraryId = event.target.getAttribute('data-id');
        
        try {
            const response = await fetch(`/api/itinerary/${itineraryId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to delete itinerary ' + response.statusText);
            }
        } catch (error) {
            alert('An error occurred: ' + error);
        }
}
};

document
    .querySelector('.delete-itinerary-btn')
    .addEventListener('click', delItineraryHandler);
