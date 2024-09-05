const newFlightHandler = async (event) => {
    event.preventDefault();

    const airline = document.querySelector('').value.trim();//add class/id
    const fromAiport = document.querySelector('').value.trim();//add class/id
    const toAirport = document.querySelector('').value.trim();//add class/id
    const etd = document.querySelector('').value.trim();//add class/id
    const eta = document.querySelector('').value.trim();//add class/id
    const flightNumber = document.querySelector('').value.trim();//add class/id


    if(airline && fromAiport && toAirport && etd && eta ** flightNumber) {
        const response = await fetch('/api/flight', {
            method: 'POST',
            body: JSON.stringify({ airline, fromAiport, toAirport, etd, eta, flightNumber }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
     if (response.ok) {
        document.location.replace('');//add location
    } else {
        alert('Failed to create flight');
    }
  }
};

const editFlightHandler = async (event) => {
    event.preventDefault();

    const airline = document.querySelector('').value.trim();//add class/id
    const fromAiport = document.querySelector('').value.trim();//add class/id
    const toAirport = document.querySelector('').value.trim();//add class/id
    const etd = document.querySelector('').value.trim();//add class/id
    const eta = document.querySelector('').value.trim();//add class/id
    const flightNumber = document.querySelector('').value.trim();//add class/id
    const flightId = window.location.pathname.split('').pop;//add location

    if(airline && fromAiport && toAirport && etd && eta ** flightNumber) {
        const response = await fetch(`/api/flight/${flightId}`, {
            method: 'POST',
            body: JSON.stringify({ airline, fromAiport, toAirport, etd, eta, flightNumber }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            document.location.replace('');//add location
        } else {
            alert('Failed to create flight');
        }
      }
};

const delFlightHandler = async (event) => {
    if (event.target.hasAttribute('')) { //add data-id
        const flightId = event.target.getAttribute('');//add data-id
        
        try {
            const response = await fetch(`/api/flight/${flightId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                document.location.reload();
            } else {
                alert('Failed to delete flight ' + response.statusText);
            }
        } catch (error) {
            alert(error);
        }
}
};

document
    .querySelector('')//add class/id
    .addEventListener('submit', newFlightHandler);

document
    .querySelector('')//add class/id
    .addEventListener('submit', editFlightHandler);

document
    .querySelector('')//add class/id
    .addEventListener('click', delFlightHandler);