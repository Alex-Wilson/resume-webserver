// public/js/problem-search.js

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('article-search');
  const tableBody = document.querySelector('#dynamic-content-table tbody');

  // Exit if elements are not present (e.g., on pages not using this search)
  if (!searchInput || !tableBody) {
    console.warn('Search input or table body not found for problem-search.js. Exiting.');
    return;
  }

  // --- Crucial: Check if window.categoryArticles is defined before proceeding ---
  if (typeof window.categoryArticles === 'undefined' || !Array.isArray(window.categoryArticles)) {
    console.error('window.categoryArticles is not defined or is not an array. Cannot initialize search functionality.');
    return;
  }

  // Map article slugs to their corresponding table row elements for efficient lookup
  const articleRowMap = new Map();
  tableBody.querySelectorAll('tr').forEach((row) => {
    // Assuming the link for the article is in the first <td> and contains the slug
    // We need to be careful if problemId is not always a number, like 'System Design'
    const anchor = row.querySelector('td:first-child a');
    if (anchor) {
      const hrefParts = anchor.getAttribute('href').split('/');
      const slug = hrefParts[hrefParts.length - 1];
      articleRowMap.set(slug, row);
    }
  });

  searchInput.addEventListener('keyup', (event) => {
    const rawSearchTerm = event.target.value.trim().toLowerCase();

    // If search term is empty, show all rows and exit
    if (!rawSearchTerm) {
      articleRowMap.forEach((row) => (row.style.display = ''));
      return;
    }

    // Determine the search type and value
    let searchType = 'title'; // Default search type
    let searchValue = rawSearchTerm;

    if (rawSearchTerm.startsWith('#')) {
      searchValue = rawSearchTerm.substring(1); // Remove '#'

      // Check if it's an ID search (e.g., #123)
      // We need to be careful here, as problemId can also be 'System Design'
      // The `isNaN` check works best for numerical IDs.
      // For string IDs like "System Design", we'll just treat it as a direct string match.
      if (!isNaN(parseInt(searchValue, 10)) && String(parseInt(searchValue, 10)) === searchValue) {
        searchType = 'id';
      } else {
        // Otherwise, it's a tag search (e.g., #array)
        searchType = 'tag';
      }
    }

    // Filter articles based on the parsed search term
    window.categoryArticles.forEach((article) => {
      const row = articleRowMap.get(article.slug);
      if (!row) {
        console.warn(`Row for slug "${article.slug}" not found in articleRowMap.`);
        return; // Skip if the row isn't found (should ideally not happen)
      }

      let isMatch = false;

      switch (searchType) {
        case 'id':
          // Check if article.problemId exists and matches the searchValue (case-insensitive for string IDs)
          isMatch = String(article.problemId).toLowerCase() === searchValue;
          break;
        case 'tag':
          isMatch =
            Array.isArray(article.tags) &&
            article.tags.some((tag) => tag.toLowerCase().includes(searchValue));
          break;
        case 'title':
        default:
          isMatch = article.title.toLowerCase().includes(searchValue);
          break;
      }

      // Show or hide the row
      row.style.display = isMatch ? '' : 'none';
    });
  });
});