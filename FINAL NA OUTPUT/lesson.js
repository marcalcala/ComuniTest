const exitButton = document.getElementById('exitButton');

exitButton.addEventListener('click', () => {
    // Redirect to another page or close the lesson
    // For example, redirecting to the homepage:
    window.location.href = 'index.html'; // Change 'homepage.html' to your desired exit page
    // Alternatively, to simply close the module, you can use:
    // window.close();
});
