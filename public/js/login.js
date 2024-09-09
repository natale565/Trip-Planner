const loginFormHandler = async (event) => {
    event.preventDefault();
    
    const email = document.querySelector('#email-login').value.trim(); 
    const password = document.querySelector('#password-login').value.trim();

    if(email && password) {
        try {
        const response = await fetch('/api/user/login/', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            document.location.replace('/home');
        } else {
            alert(response.statusText);
        } 
    } catch (error) {
        console.error("Network error", error);
    }
    } else {
        alert("Please fill out all fields.");
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document
    .querySelector('.login-form')
    .addEventListener('submit', loginFormHandler);
});


