document.addEventListener("DOMContentLoaded", function() {
    // Get current page URL
    let url = window.location.href;

    // Get the last part of the URL (current page file name)
    let page = url.substring(url.lastIndexOf('/') + 1);

    // Select the corresponding navigation item and add active class
    let homeLink = document.getElementById('home-link');
    let projectLink = document.getElementById('project-link');
    let aboutLink = document.getElementById('about-link');

    if (page === 'index.php') {
        homeLink.classList.add('active-nav');
    } else if (page === 'project.php') {
        projectLink.classList.add('active-nav');
    } else if (page === 'aboutme.php') {
        aboutLink.classList.add('active-nav');
    }
});