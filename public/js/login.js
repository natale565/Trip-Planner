const loginFormHandler = async (event) => {
    event.preventDefault()
    
    const username = document.querySelector('').value.trim(); // add class/id
    const password = document.querySelector('').value.trim(); // add class/id

    if(username && password) {
        const response = await fetch('api/user/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace(''); //add replace location
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('') //add class/id
    .addEventListener('submit', loginFormHandler);



