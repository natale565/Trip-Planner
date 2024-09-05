const newItineraryHandler = async (event) => {
    event.preventDefault();

    const itineraryType = document.querySelector('').value.trim();//add class/id
    const itineraryLocation = document.querySelector('').value.trim();//add class/id
    const itineraryTime = document.querySelector('').value.trim();//add class/id
    const itineraryDesc = document.querySelector('').value.trim();//add class/id

    if(itineraryType && itineraryLocation && itineraryTime && itineraryDesc) {
        const response = await fetch('/api/itinerary', {
            method: 'POST',
            body: JSON.stringify({ itineraryType, itineraryLocation, itineraryTime, itineraryDesc }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
     if (response.ok) {
        document.location.replace('');//add location
    } else {
        alert('Failed to create itinerary');
    }
  }
};

const editItineraryHandler = async (event) => {
    event.preventDefault();

    const itineraryType = document.querySelector('').value.trim();//add class/id
    const itineraryLocation = document.querySelector('').value.trim();//add class/id
    const itineraryTime = document.querySelector('').value.trim();//add class/id
    const itineraryDesc = document.querySelector('').value.trim();//add class/id
    const itineraryId = window.location.pathname.split('').pop;//add location

    if(itineraryType && itineraryLocation && itineraryTime && itineraryDesc) {
        const response = await fetch(`/api/itinerary/${itineraryId}`, {
            method: 'POST',
            body: JSON.stringify({ itineraryType, itineraryLocation, itineraryTime, itineraryDesc }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('');//add location
        } else {
            alert('Failed to create itinerary');
        }
      }
};

const delItineraryHandler = async (event) => {
    if (event.target.hasAttribute('')) { //add data-id
        const itineraryId = event.target.getAttribute('');//add data-id
        
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
            alert(error);
        }
}
};

document
    .querySelector('')//add class/id
    .addEventListener('submit', newItineraryHandler);

document
    .querySelector('')//add class/id
    .addEventListener('submit', editItineraryHandler);

document
    .querySelector('')//add class/id
    .addEventListener('click', delItineraryHandler);