document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".dropdown");

    dropdowns.forEach((dropdown) => {
        const button = dropdown.querySelector(".dropbtn");
        const content = dropdown.querySelector(".dropdown-content");
        let timeout; // Variable to track closing delay

        // Click event: Keep open until clicking outside
        button.addEventListener("click", function (event) {
            event.stopPropagation(); // Prevent closing on click

            // If this dropdown is already open, close it
            if (dropdown.classList.contains("active")) {
                closeAllDropdowns();
            } else {
                closeAllDropdowns();
                dropdown.classList.add("active");
                content.style.display = "block";
            }
        });

        // Hover event: Close other dropdowns when hovering over a new one
        dropdown.addEventListener("mouseenter", function () {
            if (window.innerWidth >= 769) {
                clearTimeout(timeout); // Prevent accidental closing
                closeAllDropdowns();
                dropdown.classList.add("active");
                content.style.display = "block";
            }
        });

        // ✅ Close dropdown when mouse leaves (with delay to prevent accidental closures)
        dropdown.addEventListener("mouseleave", function () {
            if (window.innerWidth >= 769) {
                timeout = setTimeout(() => {
                    dropdown.classList.remove("active");
                    content.style.display = "none";
                }, 200); // Adjust delay if needed
            }
        });

        // Prevent accidental closing when clicking inside dropdown
        content.addEventListener("click", function (event) {
            event.stopPropagation();
        });
    });

    // Function to close all dropdowns
    function closeAllDropdowns() {
        document.querySelectorAll(".dropdown").forEach((dropdown) => {
            dropdown.classList.remove("active");
            dropdown.querySelector(".dropdown-content").style.display = "none";
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener("click", function () {
        closeAllDropdowns();
    });
});
