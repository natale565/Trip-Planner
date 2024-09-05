const signUpFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('').value.trim();//add class/id
    const firstName = document.querySelector('').value.trim();//add class/id
    const lastName = document.querySelector('').value.trim();//add class/id
    const email = document.querySelector('').value.trim();//add class/id
    const password = document.querySelector('').value.trim();//add class/id
    
    if (username && firstName && lastName && email && password) {
        const response = await fetch('api/user/', {
            method: 'POST', 
            body: JSON.stringify({ username, firstName, lastName, email, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('');//add location
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('')//add class/id
    .addEventListener('submit', signUpFormHandler);