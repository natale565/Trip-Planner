const newTripHandler = async (event) => {
    event.preventDefault();

    const tripName = document.querySelector('').value.trim();//add class/id
    const tripLocation = document.querySelector('').value.trim();//add class/id

    if(tripName && tripLocation) {
        const response = await fetch('/api/trip', {
            method: 'POST',
            body: JSON.stringify({ tripName, tripLocation }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
     if (response.ok) {
        document.location.replace('');//add location
    } else {
        alert('Failed to create trip');
    }
  }
};

const editTripHandler = async (event) => {
    event.preventDefault();

    const tripName = document.querySelector('').value.trim();//add class/id
    const tripLocation = document.querySelector('').value.trim();//add class/id
    const tripId = window.location.pathname.split('').pop;//add location

    if(tripName && tripLocation) {
        const response = await fetch(`/api/trip/${tripId}`, {
            method: 'POST',
            body: JSON.stringify({ tripName, tripLocation }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('');//add location
        } else {
            alert('Failed to create trip');
        }
      }
};

const delTripHandler = async (event) => {
    if (event.target.hasAttribute('')) { //add data-id//
        const tripId = event.target.getAttribute('');//add data-id
        
        try {
            const response = await fetch(`/api/trip/${tripId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to delete trip: ' + response.statusText);
            }
        } catch (error) {
            alert(error);
        }
}
};

document
    .querySelector('')//add class/id
    .addEventListener('submit', newTripHandler);

document
    .querySelector('')//add class/id
    .addEventListener('submit', editTripHandler);

document
    .querySelector('')//add class/id
    .addEventListener('click', delTripHandler);