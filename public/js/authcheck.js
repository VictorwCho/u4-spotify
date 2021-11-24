if (!localStorage.getItem('access_token')) {
    alert('Not authorized');
    window.location.href='http://localhost:8888';
}
