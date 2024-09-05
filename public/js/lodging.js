const newLodgingHandler = async (event) => {
    event.preventDefault();

    const lodgingName = document.querySelector('').value.trim();//add class/id
    const lodgingLocation = document.querySelector('').value.trim();//add class/id
    const checkIn = document.querySelector('').value.trim();//add class/id
    const checkOut = document.querySelector('').value.trim();//add class/id



    if(lodgingName && lodgingLocation && checkIn && checkOut) {
        const response = await fetch('/api/lodging', {
            method: 'POST',
            body: JSON.stringify({ lodgingName, lodgingLocation, checkIn, checkOut }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
     if (response.ok) {
        document.location.replace('');//add location
    } else {
        alert('Failed to create lodging');
    }
  }
};

const editLodgingHandler = async (event) => {
    event.preventDefault();

    const lodgingName = document.querySelector('').value.trim();//add class/id
    const lodgingLocation = document.querySelector('').value.trim();//add class/id
    const checkIn = document.querySelector('').value.trim();//add class/id
    const checkOut = document.querySelector('').value.trim();//add class/id
    const lodgingId = window.location.pathname.split('').pop;//add location

    if(lodgingName && lodgingLocation && checkIn && checkOut) {
        const response = await fetch(`/api/lodging/${lodgingId}`, {
            method: 'POST',
            body: JSON.stringify({ lodgingName, lodgingLocation, checkIn, checkOut  }),
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

const delLodgingHandler = async (event) => {
    if (event.target.hasAttribute('')) { //add data-id
        const lodgingId = event.target.getAttribute('');//add data-id
        
        try {
            const response = await fetch(`/api/lodging/${lodgingId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to delete lodging: ' + response.statusText);
            }
        } catch (error) {
            alert(error);
        }
}
};

document
    .querySelector('')//add class/id
    .addEventListener('submit', newLodgingHandler);

document
    .querySelector('')//add class/id
    .addEventListener('submit', editLodgingHandler);

document
    .querySelector('')//add class/id
    .addEventListener('click', delLodgingHandler);