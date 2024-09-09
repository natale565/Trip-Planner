const signUpFormHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    const username = document.querySelector('#username-signup').value.trim();

    if (username && email && password) {
        try {
            const response = await fetch('/api/user/', {
                method: 'POST',
                body: JSON.stringify({ username, email, password }),
                headers: { 'Content-Type': 'application/json' },
            });

            if (response.ok) {
                document.location.replace('/dashboard');
            } else {
                alert(response.statusText);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    } else {
        alert("Please fill out all fields.");
    }
};

document.addEventListener('DOMContentLoaded', () => {
    document
        .querySelector('.signup-form')
        .addEventListener('submit', signUpFormHandler);
});
