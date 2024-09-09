const newLodgingHandler = async (event) => {
    event.preventDefault();

    const lodging_name = document.querySelector('#lodging-name').value.trim();
    const lodging_location = document.querySelector('#lodging-location').value.trim();
    const check_in = document.querySelector('#checkin-time').value.trim();
    const check_out = document.querySelector('#checkout-time').value.trim();
    const trip_id = document.querySelector('#trip-id').value.trim() || window.location.pathname.split('/')[2];



    if(lodging_name && lodging_location && check_in && check_out && trip_id) {
        try {
            const parsedCheckin = new Date(check_in).toISOString();
            const parsedCheckout = new Date(check_out).toISOString();
        
            const response = await fetch('/api/lodging', {
            method: 'POST',
            body: JSON.stringify({ 
                lodging_name, 
                lodging_location, 
                check_in: parsedCheckin, 
                check_out: parsedCheckout,
                trip_id,
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
     if (response.ok) {
        const data = await response.json();
        console.log('Lodging created succesfully', data);
        location.reload();
    } else {
        const errorData = await response.json();
                console.error('Error:', errorData);
                alert('Failed to create lodging: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while creating the lodging');
        }
    } else {
        alert('Please fill in all fields');
    }
};

document.addEventListener('DOMContentLoaded', () => {
        const saveLodgingBtn = document.querySelector('#save-lodging-btn');
        if (saveLodgingBtn) {
            saveLodgingBtn.addEventListener('click', newLodgingHandler);
        } else {
            console.error('Save lodging button not found')
        }
});

const editLodgingHandler = async (event) => {
    event.preventDefault();

    const lodgingId = document.querySelector('#edit-lodging-id').value;
    const lodging_name = document.querySelector('#edit-lodging-name').value.trim();
    const lodging_location = document.querySelector('#edit-lodging-address').value.trim();
    const check_in = document.querySelector('#edit-checkin-time').value.trim();
    const check_out = document.querySelector('#edit-checkout-time').value.trim();

    if (lodging_name && lodging_location && check_in && check_out) {
        try {
            const parsedCheckin = new Date(check_in).toISOString();
            const parsedCheckout = new Date(check_out).toISOString();

            const response = await fetch(`/api/lodging/${lodgingId}`, {
                method: 'PUT',
                body: JSON.stringify({ 
                    lodging_name, 
                    lodging_location,
                    check_in: parsedCheckin, 
                    check_out: parsedCheckout,
                }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                alert('Lodging updated successfully');
                location.reload();
            } else {
                const errorData = await response.json();
                console.error('Error:', errorData);
                alert('Failed to update lodging: ' + errorData.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while updating the lodging');
        }
    } else {
        alert('Please fill in all fields');
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const saveEditedLodgingBtn = document.querySelector('#save-edited-lodging');
    if (saveEditedLodgingBtn) {
        saveEditedLodgingBtn.addEventListener('click', () => {
            document.querySelector('#edit-lodging-form').submit();
        });
    }
    
    document.querySelector('#edit-lodging-form').addEventListener('submit', editLodgingHandler);
});




const delLodgingHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const lodgingId = event.target.getAttribute('data-id');
        
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
            alert('An error occurred: ' + error);
        }
    }
};

document
    .querySelector('.delete-lodging-btn')
    .addEventListener('click', delLodgingHandler);