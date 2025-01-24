document.addEventListener("DOMContentLoaded", () => {
    const table = document.querySelector("#certifications-table");
    const headers = document.querySelectorAll(".sort-btn");
    let sortDirection = {}; // Keeps track of the sort direction for each column
  
    // Attach click event listeners to each sort button
    headers.forEach((header) => {
      const column = header.dataset.column;
  
      sortDirection[column] = 1; // Initialize as ascending
  
      header.addEventListener("click", () => {
        const rows = Array.from(table.querySelectorAll("tbody tr"));
  
        // Sort rows based on the column data
        rows.sort((a, b) => {
          const aText = a.querySelector(`td:nth-child(${getColumnIndex(column)})`).textContent.trim();
          const bText = b.querySelector(`td:nth-child(${getColumnIndex(column)})`).textContent.trim();
  
          // Convert to number if the column is Price
          const aValue = column === "price" ? parseFloat(aText.replace("$", "")) : aText.toLowerCase();
          const bValue = column === "price" ? parseFloat(bText.replace("$", "")) : bText.toLowerCase();
  
          if (aValue < bValue) return -1 * sortDirection[column];
          if (aValue > bValue) return 1 * sortDirection[column];
          return 0;
        });
  
        // Toggle sort direction
        sortDirection[column] *= -1;
  
        // Reorder the rows in the DOM
        const tbody = table.querySelector("tbody");
        tbody.innerHTML = ""; // Clear current rows
        rows.forEach((row) => tbody.appendChild(row));
      });
    });
  
    // Get the column index for sorting
    function getColumnIndex(column) {
      const headerCells = Array.from(table.querySelectorAll("thead th"));
      return headerCells.findIndex((th) => th.textContent.trim().toLowerCase().includes(column.toLowerCase())) + 1;
    }
  });
  