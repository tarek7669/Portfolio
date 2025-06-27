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
            // else if(page.includes("projects")){
            //     const cloneLink = document.getElementById("myCloneProject");
            //     const sidebar = document.getElementById("chatSidebar");
            //     const closeChat = document.getElementById("closeChat");

            //     if (cloneLink && sidebar) {
            //         console.log("\n\nClone link found and ready!\n\n");

            //         cloneLink.addEventListener("click", (e) => {
            //             // e.preventDefault();
            //             console.log("\n\nClone project clicked!\n\n");
            //             sidebar.classList.add("open");
            //         });
                    
            //         closeChat.addEventListener("click", (e) => {
            //             sidebar.classList.remove("open");
            //         });
            //     }
            //     else {
            //     console.warn("Clone link or sidebar not found.");
            //     }
            //     console.log("Sidebar classes:", sidebar.className);
            //     console.log("Sidebar right value:", getComputedStyle(sidebar).right);
            // }

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


// CHATBOT
const chatInput = document.getElementById('chatInput');
// Toggle sidebar
document.getElementById("chatToggle").addEventListener("click", () => {
    document.getElementById("chatSidebar").classList.add("open");
});

// document.getElementById("myCloneProject").addEventListener("click", () => {
//     document.getElementById("chatSidebar").classList.add("open");
// });
  
document.getElementById("closeChat").addEventListener("click", () => {
    document.getElementById("chatSidebar").classList.remove("open");
});
  
// Handle sending chat messages
document.getElementById("sendChat").addEventListener("click", async () => {
    await sendMessage();
});
  
chatInput.addEventListener("keydown", async function (event) {
    // Check if Enter is pressed (without Shift)
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault(); // prevent new line
      await sendMessage();     // trigger send
    }
});

async function sendMessage() {
    const input = document.getElementById("chatInput");
    const message = input.value.trim();
    if (message !== "") {
        input.value = "";

        const userMsg = document.createElement("div");
        userMsg.className = "chat-message user";
        userMsg.textContent = message;
        document.getElementById("chatBody").appendChild(userMsg);

        typingIndicator = document.createElement("div");
        typingIndicator.textContent = "typing...";
        typingIndicator.style.fontStyle = "italic";
        typingIndicator.style.color = "#19191972";
        document.getElementById("chatBody").appendChild(typingIndicator);

        // Send to FastAPI
        try {
        const response = await fetch("https://clone-k02u.onrender.com/ask", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: userMsg.textContent })
        });

        if (!response.ok) throw new Error("Network response was not ok");

        // Remove typing indicator
        if (typingIndicator) {
            document.getElementById("chatBody").removeChild(typingIndicator);
            typingIndicator = null;
        }
  
        const botMsg = document.createElement("div");
        const data = await response.json();
        botMsg.className = "chat-message bot";
        botMsg.textContent = data.response;
        document.getElementById("chatBody").appendChild(botMsg);

        document.getElementById("chatBody").scrollTop = document.getElementById("chatBody").scrollHeight;
    }
    catch (error) {
        if (typingIndicator) {
            document.getElementById("chatBody").removeChild(typingIndicator);
            typingIndicator = null;
        }
        console.error("Error sending message:", error);
        const errorMsg = document.createElement("div");
        errorMsg.className = "chat-message bot";
        errorMsg.textContent = "Error: " + error.message;
        document.getElementById("chatBody").appendChild(errorMsg);
        }
    }
}


chatInput.addEventListener('input', () => {
  chatInput.style.height = 'auto'; // reset height
  chatInput.style.height = chatInput.scrollHeight + 'px'; // set to scroll height
});

// close chatbot if clicked outside
const chatSidebar = document.getElementById("chatSidebar");
const toggleButton = document.getElementById("chatToggle");

document.addEventListener("click", function (event) {
  const isClickInsideChat = chatSidebar.contains(event.target);
  const isToggleButton = toggleButton.contains(event.target);

  // If clicked outside the chat and not the toggle button, close it
  if (!isClickInsideChat && !isToggleButton) {
    document.getElementById("chatSidebar").classList.remove("open");
  }
});


// const my_clone_project = document.getElementById("my-clone");
// document.getElementById("my-clone").addEventListener("click", () => {
//     document.getElementById("chatSidebar").classList.add("open");
// });

// function openChatbot(){
//     console.log("\n\n inside the function \n\n\n\n");
//     document.getElementById("chatSidebar").classList.add("open");
// }

// document.addEventListener("DOMContentLoaded", () => {
//     console.log("\n\n inside dom 1 \n\n\n\n");
//     const myCloneProject = document.getElementById("my-clone");
//     const chatSidebar = document.getElementById("chatSidebar");

//     if (myCloneProject && chatSidebar) {
//         console.log("\n\n inside dom 2 \n\n\n\n");
//         myCloneProject.addEventListener("click", (e) => {
//         e.preventDefault(); // prevent any default link action
//         chatSidebar.classList.add("open");
//         });
//     }
// });