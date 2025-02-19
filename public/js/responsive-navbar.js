document.addEventListener("DOMContentLoaded", function () {
    const dropdowns = document.querySelectorAll(".dropdown");
  
    dropdowns.forEach((dropdown) => {
      const button = dropdown.querySelector(".dropbtn");
      const content = dropdown.querySelector(".dropdown-content");
  
      button.addEventListener("click", function (event) {
        event.stopPropagation(); // Prevent clicks from closing immediately
  
        // Close other open dropdowns
        document.querySelectorAll(".dropdown-content").forEach((openDropdown) => {
          if (openDropdown !== content) {
            openDropdown.style.display = "none";
          }
        });
  
        // Toggle this dropdown
        content.style.display = content.style.display === "block" ? "none" : "block";
      });
    });
  
    // Close dropdown when clicking outside
    document.addEventListener("click", function () {
      document.querySelectorAll(".dropdown-content").forEach((content) => {
        content.style.display = "none";
      });
    });
  });  