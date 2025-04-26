
document.addEventListener("DOMContentLoaded", function() {
    const sections = document.querySelectorAll('section');
    const navList = document.getElementById('nav-list');

    // Build the navigation bar dynamically
    sections.forEach(section => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#${section.id}" data-id="${section.dataset.section}">${section.querySelector('h1').innerText}</a>`;
        navList.appendChild(li);
    });

    const navLinks = document.querySelectorAll('nav a'); // collect links after creation

    // Smooth scrolling to sections
    navList.addEventListener('click', function(e) {
        if (e.target.tagName === 'A') {
            e.preventDefault();
            const targetId = e.target.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
        }
    });

    // Update the active section on scroll
    window.addEventListener('scroll', function() {
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
    });

    // comment submit
    const commentForm = document.getElementById("commentForm");

    commentForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const comment = document.getElementById("comment").value.trim();

        if (name && email && comment) {
            const newComment = document.createElement("div");
            newComment.classList.add("comment-box");
            newComment.innerHTML = `
                <p><em>${comment}</em></p>
                <p><strong>${name}</strong><br/>${email}</p>`;

            // Insert the new comment ABOVE the form
            const commentSection = document.getElementById("comments");
            const fieldset = commentSection.querySelector("fieldset");
            commentSection.insertBefore(newComment, fieldset);

            // Clear form
            commentForm.reset();
        } else {
            alert("Please fill in all fields.");
        }
    });
});
