const cursorDot = document.createElement("div"); // Create the dot
cursorDot.classList.add("cursor-dot");
document.body.appendChild(cursorDot); // Add it to the page

let mouseX = 0, mouseY = 0;
let dotX = 0, dotY = 0;

document.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

// Function to smoothly update the dot’s position
function animateDot() {
    dotX += (mouseX - dotX) * 0.1; // Adjust the lag effect
    dotY += (mouseY - dotY) * 0.1;

    cursorDot.style.left = `${dotX}px`;    
    cursorDot.style.top = `${dotY}px`;

    requestAnimationFrame(animateDot);
}

animateDot(); // Start the animation

// Change color when hovering over text
document.querySelectorAll("p, h1, h2, h3, h4, h5, h6, a, span, div").forEach((element) => {
    element.addEventListener("mouseenter", () => {
        cursorDot.classList.add("hover");
    });
    element.addEventListener("mouseleave", () => {
        cursorDot.classList.remove("hover");
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const defaultPage = "home"; // Set the default page
    loadPage(defaultPage);
    // Ensure the homepage link is active when loading
    let homeLink = document.querySelector(`.nav-link[data-page='${defaultPage}']`);
    if (homeLink) {
        homeLink.classList.add("active");
    }
});


function loadPage(page) {
    fetch(`assets/content/${page}.html`)
        .then(response => response.text())
        .then(html => {
            // Insert the loaded HTML into the content container
            document.getElementById("contentContainer").innerHTML = html;

            // Only run typing effect if home is loaded
            if (page.includes("home")) {
                initializeTypingEffect();
            }

            // Remove "active" class from all nav links
            document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));

            // Get the nav link for this page and add "active" class
            let activeLink = document.querySelector(`.nav-link[data-page='${page}']`);
            if (activeLink) {
                activeLink.classList.add("active");
            }
        })
        .catch(error => console.error("Error loading page:", error));
}


function initializeTypingEffect() {
    const changingWord = document.getElementById("changingWord");
    
    if (!changingWord) {
        // Retry after a short delay if the element isn't found
        setTimeout(initializeTypingEffect, 500);
        return;
    }

    const words = ["TAKE OVER THE WORLD!", "BUILD STUFF THAT MAKES SENSE!!", "THE FUTURE!", "BUILD AWESOME THINGS!", "BUILD MIND-BLOWING AI!"];

    if (!changingWord) {
        // Retry after a short delay if the element isn't found
        setTimeout(initializeTypingEffect, 500);
        return;
    }
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
        const currentWord = words[wordIndex];
        if (isDeleting) {
            changingWord.textContent = currentWord.substring(0, charIndex);
            charIndex--;
            if (charIndex < 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length; // Move to next word
                setTimeout(typeEffect, 500); // Pause before typing new word
                return;
            }
        } else {
            changingWord.textContent = currentWord.substring(0, charIndex);
            charIndex++;
            if (charIndex > currentWord.length) {
                isDeleting = true;
                setTimeout(typeEffect, 1500); // Pause before deleting
                return;
            }
        }
        setTimeout(typeEffect, isDeleting ? 50 : 100);
    }

    typeEffect(); // Start typing effect
}

// Add hover effect to buttons


// document.addEventListener("DOMContentLoaded", () => {
//     fetch("assets/content/contact.html") // Load your buttons from the external HTML file
//         .then(response => response.text())
//         .then(html => {
//             console.log("Buttons loaded successfully"); // Debugging
//             document.getElementById("buttons-container").innerHTML = html; // Insert buttons
//             attachEventListeners(); // Call function to attach event listeners
//         })
//         .catch(error => console.error("Error loading buttons:", error));
// });

document.addEventListener("DOMContentLoaded", () => {
    console.log("DOM fully loaded and parsed"); // Debugging
    const container = document.getElementById("buttons-container");
    if (!container) {
        console.error("Error: #buttons-container not found in the DOM!");
        return; // Stop execution if container is missing
    }

    fetch(`assets/content/contact.html`)
        .then(response => response.text())
        .then(html => {
            console.log("Buttons loaded successfully"); // Debugging
            console.log("container --> ", container.innerHTML); // Debugging
            container.innerHTML = html; // Insert the fetched buttons
            attachEventListeners(); // Call function to attach event listeners
        })
        .catch(error => console.error("Error loading buttons:", error));
});


function attachEventListeners() {
    const buttons = document.querySelectorAll(".contact-btn");
    const hoverEffect = document.querySelector(".hover-effect");
    
    if (buttons.length === 0) {
        console.error("Buttons not found! Check HTML structure.");
        return;
    }
    else if (!hoverEffect){
        console.log("hover effect div found!"); // Debugging
        return;
    }

    buttons.forEach(button => {
        button.addEventListener("mouseenter", (e) => {
            console.log("Hovered on:", button.textContent);
            let color;
            if (button.classList.contains("linkedin")) color = "#0077b5";
            if (button.classList.contains("github")) color = "#000000";
            if (button.classList.contains("email")) color = "#ff7043";
            if (button.classList.contains("phone")) color = "#4caf50";

            hoverEffect.style.backgroundColor = color;
            hoverEffect.style.left = `${e.clientX}px`;
            hoverEffect.style.top = `${e.clientY}px`;
            hoverEffect.style.transform = "scale(50)";
            document.body.style.backgroundColor = color;
        });

        button.addEventListener("mouseleave", () => {
            console.log("Mouse left:", button.textContent);
            hoverEffect.style.transform = "scale(0)";
            document.body.style.backgroundColor = "white";
        });
    });
}