const logout = async () => {
    const response = await fetch('api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    if (response.ok) {
        document.location.replace('');//add location
    } else {
        alert(response.statusText);
    }
};

document.querySelector('').addEventListener('click', logout);//add class/id