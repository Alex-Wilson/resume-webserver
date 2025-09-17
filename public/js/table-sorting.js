document.addEventListener('DOMContentLoaded', () => {
  console.groupCollapsed('table-sorting.js: Initializing (DOMContentLoaded)');
  console.time('table-sorting.js: Total Initialization Time');

  const table = document.getElementById('dynamic-content-table');
  const tableHead = table ? table.querySelector('thead') : null;
  const tableBody = table ? table.querySelector('tbody') : null;

  if (!tableBody || !tableHead) {
    console.error('table-sorting.js: ERROR - Table or table head/body not found. Exiting initialization. Check HTML ID/structure.');
    console.timeEnd('table-sorting.js: Total Initialization Time');
    console.groupEnd();
    return;
  }
  console.log('table-sorting.js: Initialization - Table elements found successfully.');

  if (
    typeof window.categoryArticles === 'undefined' ||
    !Array.isArray(window.categoryArticles) ||
    window.categoryArticles.length === 0
  ) {
    console.error('table-sorting.js: ERROR - window.categoryArticles is not defined or not an array/empty. Cannot initialize sort functionality. Check Pug JSON embedding/data.');
    console.timeEnd('table-sorting.js: Total Initialization Time');
    console.groupEnd();
    return;
  }
  console.log('table-sorting.js: Initialization - window.categoryArticles loaded. Count:', window.categoryArticles.length);

  const articleRowMap = new Map();
  console.time('table-sorting.js: Initialization - Map creation');
  const initialRows = Array.from(tableBody.querySelectorAll('tr'));
  
  if (initialRows.length === 0 && window.categoryArticles.length > 0) {
      console.error('table-sorting.js: CRITICAL ERROR - Pug rendered 0 TRs, but window.categoryArticles has entries! This indicates a Pug rendering problem.');
      console.timeEnd('table-sorting.js: Total Initialization Time');
      console.groupEnd();
      return; 
  }

  initialRows.forEach((row) => {
    const anchor = row.querySelector('td:nth-child(2) a'); 
    if (anchor) {
      const hrefParts = anchor.getAttribute('href').split('/');
      const slug = hrefParts[hrefParts[hrefParts.length - 1] === '' ? hrefParts.length - 2 : hrefParts.length - 1];
      if (slug) {
        articleRowMap.set(slug, row);
      }
    }
  });
  console.timeEnd('table-sorting.js: Initialization - Map creation');
  console.log('table-sorting.js: Initialization - articleRowMap created with', articleRowMap.size, 'entries. Expected:', window.categoryArticles.length);
  if (articleRowMap.size !== window.categoryArticles.length) {
      console.warn('table-sorting.js: WARNING - Mapped article count does not match categoryArticles count. Some rows might not be reordered.');
  }


  let currentSortKey = null;
  let sortDirection = 'asc';

  const difficultyOrder = ['easy', 'medium', 'hard', 'system design'];

  function sortArticles() {
    console.time('table-sorting.js: sortArticles execution');
    if (!currentSortKey) {
      console.log('table-sorting.js: sortArticles - No sort key defined, skipping actual sort.');
      console.timeEnd('table-sorting.js: sortArticles execution');
      return;
    }
    console.log(`table-sorting.js: sortArticles - Sorting by '${currentSortKey}' in '${sortDirection}' direction.`);

    window.categoryArticles.sort((a, b) => {
      let valA = a[currentSortKey];
      let valB = b[currentSortKey];

      if (currentSortKey === 'level') {
        valA = difficultyOrder.indexOf(String(valA).toLowerCase());
        valB = difficultyOrder.indexOf(String(valB).toLowerCase());
      } else if (currentSortKey === 'problemId') {
        const numA = parseInt(valA, 10);
        const numB = parseInt(valB, 10);

        if (!isNaN(numA) && !isNaN(numB)) {
            valA = numA;
            valB = numB;
        } else if (!isNaN(numA)) {
            valA = numA;
            valB = Infinity;
        } else if (!isNaN(numB)) {
            valA = Infinity;
            valB = numB;
        } else {
            valA = String(valA).toLowerCase();
            valB = String(valB).toLowerCase();
        }
      } else if (typeof valA === 'string' && typeof valB === 'string') {
        valA = valA.toLowerCase();
        valB = valB.toLowerCase();
      }

      let comparison = 0;
      if (valA > valB) {
        comparison = 1;
      } else if (valA < valB) {
        comparison = -1;
      }

      return sortDirection === 'asc' ? comparison : -comparison;
    });
    console.log(`table-sorting.js: sortArticles - Articles array sorted. First article slug now: '${window.categoryArticles[0]?.slug}'.`);
    console.timeEnd('table-sorting.js: sortArticles execution');
  }

  function reorderTable() {
    console.time('table-sorting.js: reorderTable execution (Total)');
    console.time('table-sorting.js: reorderTable - Clear innerHTML');
    tableBody.innerHTML = ''; 
    console.timeEnd('table-sorting.js: reorderTable - Clear innerHTML');
    
    const fragment = document.createDocumentFragment();
    console.time('table-sorting.js: reorderTable - Append to fragment');
    let appendedCount = 0;

    window.categoryArticles.forEach((article, index) => {
      const row = articleRowMap.get(article.slug);
      if (row) {
        fragment.appendChild(row); 
        appendedCount++;
      } else {
          console.warn(`table-sorting.js: reorderTable - Could not find row in map for article slug: '${article.slug}' (index ${index}). This row will not be re-appended. Check map creation consistency.`);
      }
    });
    console.timeEnd('table-sorting.js: reorderTable - Append to fragment');

    console.time('table-sorting.js: reorderTable - Append fragment to tbody');
    tableBody.appendChild(fragment); 
    console.timeEnd('table-sorting.js: reorderTable - Append fragment to tbody');
    console.log(`table-sorting.js: reorderTable - Table DOM reordered. Successfully appended: ${appendedCount} TRs. Final number of TRs in tableBody: ${tableBody.querySelectorAll('tr').length}.`);
    console.timeEnd('table-sorting.js: reorderTable execution (Total)');
  }

  tableHead.querySelectorAll('th').forEach((header, headerIndex) => {
    const sortKey = header.dataset.column;
    const filterIconTrigger = header.querySelector('.filter-icon-trigger');
    const headerTextSpan = header.querySelector('span:first-child'); 
    console.log(`table-sorting.js: Processing Header ${headerIndex} ('${header.textContent.trim()}'), data-column: '${sortKey}'.`);

    // Attach Sorting Listener to the HEADER TEXT SPAN (if it exists and is a sortable key)
    // CRITICAL FIX: Exclude 'tags' from sortable columns as per user's original intent
    if (sortKey && (sortKey === 'problemId' || sortKey === 'title' || sortKey === 'level')) { 
      if (headerTextSpan) { 
        headerTextSpan.style.cursor = 'pointer';
        console.log(`table-sorting.js: Header '${header.textContent.trim()}' (text span) is sortable. Attaching click listener.`);

        headerTextSpan.addEventListener('click', () => {
          console.groupCollapsed(`table-sorting.js: CLICK EVENT - Sortable header text clicked: '${header.textContent.trim()}' (SortKey: '${sortKey}')`);
          console.time('table-sorting.js: Header click processing');

          if (currentSortKey === sortKey) {
            sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
            console.log(`table-sorting.js: Header click - Toggling sort direction to: '${sortDirection}'.`);
          } else {
            console.log(`table-sorting.js: Header click - New sort key selected: '${sortKey}'. Setting direction to 'asc'.`);
            currentSortKey = sortKey;
            sortDirection = 'asc';

            tableHead.querySelectorAll('th').forEach((th) => {
                th.classList.remove('sorted-asc', 'sorted-desc'); 
                const span = th.querySelector('span:first-child');
                if (span) span.classList.remove('sorted-asc', 'sorted-desc');
            });
          }

          headerTextSpan.classList.add(`sorted-${sortDirection}`);
          headerTextSpan.classList.remove(`sorted-${sortDirection === 'asc' ? 'desc' : 'asc'}`);
          
          sortArticles();
          reorderTable();
          console.timeEnd('table-sorting.js: Header click processing');
          console.groupEnd();
        });
      } else {
          // Fallback: If no text span, attach to header directly, but this means icon clicks might also trigger
          header.style.cursor = 'pointer';
          console.warn(`table-sorting.js: Header '${header.textContent.trim()}' has no text span. Attaching sort listener directly to TH (fallback).`);
          header.addEventListener('click', () => {
              console.groupCollapsed(`table-sorting.js: CLICK EVENT - Sortable header clicked (fallback): '${header.textContent.trim()}' (SortKey: '${sortKey}')`);
              console.time('table-sorting.js: Header click processing (fallback)');

              if (currentSortKey === sortKey) {
                  sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
              } else {
                  currentSortKey = sortKey;
                  sortDirection = 'asc';
                  tableHead.querySelectorAll('th').forEach((th) => th.classList.remove('sorted-asc', 'sorted-desc'));
              }
              header.classList.add(`sorted-${sortDirection}`);
              header.classList.remove(`sorted-${sortDirection === 'asc' ? 'desc' : 'asc'}`);
              sortArticles();
              reorderTable();
              console.timeEnd('table-sorting.js: Header click processing (fallback)');
              console.groupEnd();
          });
      }
    } else {
        console.log(`table-sorting.js: Header '${header.textContent.trim()}' is NOT sortable.`);
    }

    // Attach Listener to Filter Icon Trigger (if present)
    if (filterIconTrigger) {
        filterIconTrigger.style.cursor = 'pointer';
        console.log(`table-sorting.js: Header '${header.textContent.trim()}' has filter icon. Attaching click listener to icon.`);
        filterIconTrigger.addEventListener('click', (event) => {
            event.stopPropagation(); // CRITICAL: Stop the click event from bubbling up to the TH
            console.groupCollapsed(`table-sorting.js: CLICK EVENT - Filter icon clicked: '${header.textContent.trim()}' (SortKey: '${sortKey}')`);
            console.time('table-sorting.js: Filter icon click processing'); // Time filter icon specific actions
            
            console.log('table-sorting.js: Filter icon clicked. Sorting prevented due to event.stopPropagation().');
            filterIconTrigger.classList.toggle('filter-active-indicator');
            // Your filter popup/options reveal logic would go here
            
            console.timeEnd('table-sorting.js: Filter icon click processing');
            console.groupEnd();
        });
    }
  });

  // Initial Sort and Render
  currentSortKey = 'problemId'; 
  sortDirection = 'asc';
  console.log(`table-sorting.js: Initializing - Applying initial sort by '${currentSortKey}' (${sortDirection}).`);
  sortArticles();
  reorderTable();

  const initialSortHeader = tableHead.querySelector(`th[data-column="${currentSortKey}"] span:first-child`);
  if (initialSortHeader) {
    initialSortHeader.classList.add(`sorted-${sortDirection}`);
    console.log(`table-sorting.js: Initializing - Initial sort indicator added to span for '${currentSortKey}'.`);
  } else { 
      const initialSortHeaderTh = tableHead.querySelector(`th[data-column="${currentSortKey}"]`);
      if (initialSortHeaderTh) initialSortHeaderTh.classList.add(`sorted-${sortDirection}`);
      console.warn(`table-sorting.js: Initializing - Initial sort header text span not found for '${currentSortKey}'. Applied to TH fallback.`);
  }
  console.log('table-sorting.js: Initialization finished. DOMContentLoaded handler complete.');
  console.timeEnd('table-sorting.js: Total Initialization Time');
  console.groupEnd(); // End of initial group
});