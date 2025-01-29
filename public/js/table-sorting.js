document.addEventListener("DOMContentLoaded", () => {
  const table = document.querySelector("#certifications-table");

  if (!table) {
    console.error("Error: Table element not found.");
    return;
  }

  const getCellValue = (row, columnIndex) => {
    const cell = row.children[columnIndex];
    if (!cell) return "";

    if (columnIndex === 2) { // Certification Name column (contains the hyperlink)
      const link = cell.querySelector("a");
      return link ? link.textContent.trim() : cell.textContent.trim();
    }

    if (columnIndex === 4) { // Price column
      return parseFloat(cell.textContent.replace(/[^0-9.-]+/g, "")) || 0;
    }

    return cell.textContent.trim();
  };

  const compareValues = (a, b, ascending) => {
    if (a < b) return ascending ? -1 : 1;
    if (a > b) return ascending ? 1 : -1;
    return 0;
  };

  const sortTable = (columnIndex, ascending) => {
    const rows = Array.from(table.querySelector("tbody").rows);

    rows.sort((rowA, rowB) => {
      const valueA = getCellValue(rowA, columnIndex);
      const valueB = getCellValue(rowB, columnIndex);

      return compareValues(valueA, valueB, ascending);
    });

    rows.forEach((row) => table.querySelector("tbody").appendChild(row));
  };

  const headers = table.querySelectorAll("thead th");

  headers.forEach((header, index) => {
    let ascending = true;

    header.addEventListener("click", () => {
      sortTable(index, ascending);
      ascending = !ascending; // Toggle sorting order
    });
  });
});
