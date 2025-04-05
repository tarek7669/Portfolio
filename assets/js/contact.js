// document.addEventListener("DOMContentLoaded", () => {
//     console.log("DOM fully loaded and parsed"); // Debugging
//     const container = document.getElementById("buttons-container");
//     if (!container) {
//         console.error("Error: #buttons-container not found in the DOM!");
//         return; // Stop execution if container is missing
//     }

//     fetch(`assets/content/contact.html`)
//         .then(response => response.text())
//         .then(html => {
//             console.log("Buttons loaded successfully"); // Debugging
//             console.log("container --> ", container.innerHTML); // Debugging
//             container.innerHTML = html; // Insert the fetched buttons
//             attachEventListeners(); // Call function to attach event listeners
//         })
//         .catch(error => console.error("Error loading buttons:", error));
// });


// function attachEventListeners() {
//     const buttons = document.querySelectorAll(".contact-btn");
//     const hoverEffect = document.querySelector(".hover-effect");
    
//     if (buttons.length === 0) {
//         console.error("Buttons not found! Check HTML structure.");
//         return;
//     }
//     else if (!hoverEffect){
//         console.log("hover effect div found!"); // Debugging
//         return;
//     }

//     buttons.forEach(button => {
//         button.addEventListener("mouseenter", (e) => {
//             console.log("Hovered on:", button.textContent);
//             let color;
//             if (button.classList.contains("linkedin")) color = "#0077b5";
//             if (button.classList.contains("github")) color = "#000000";
//             if (button.classList.contains("email")) color = "#ff7043";
//             if (button.classList.contains("phone")) color = "#4caf50";

//             hoverEffect.style.backgroundColor = color;
//             hoverEffect.style.left = `${e.clientX}px`;
//             hoverEffect.style.top = `${e.clientY}px`;
//             hoverEffect.style.transform = "scale(50)";
//             document.body.style.backgroundColor = color;
//         });

//         button.addEventListener("mouseleave", () => {
//             console.log("Mouse left:", button.textContent);
//             hoverEffect.style.transform = "scale(0)";
//             document.body.style.backgroundColor = "white";
//         });
//     });
// }