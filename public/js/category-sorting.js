// public/js/category-sorting.js

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Get Data from the Server-Rendered Page ---
  const allArticles = window.categoryArticles; // The raw, unsorted array of articles
  const sortingOptions = window.sortingOptions;
  const filteringOptions = window.filteringOptions;
  const currentCategoryIdentifier = window.currentCategoryIdentifier;

  // --- 2. Get DOM Elements ---
  const sortByToggle = document.getElementById('sort-by-toggle');
  const articleListContainer = document.getElementById('article-list-container');

  // --- 3. Helper Functions for Sorting and Rendering ---

  /**
   * Creates an <li> element for a given article,
   * conditionally formatting the title for LeetCode/DeepML problems.
   * @param {Object} article - The article data.
   * @returns {HTMLElement} The created <li> element.
   */
  function createArticleListItem(article) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `/${currentCategoryIdentifier}/${article.slug}`;
    
    // CRITICAL FIX: Conditionally add problemId to title for LeetCode OR DeepML
    let displayText = article.title;
    if ((currentCategoryIdentifier === 'leetcode' || currentCategoryIdentifier === 'deep-ml') && article.problemId) {
      displayText = `#${article.problemId} - ${article.title}`;
    }
    a.textContent = displayText;

    li.appendChild(a);
    return li;
  }

  /**
   * Renders the articles into the container based on the current sorted/grouped state.
   * (No changes needed here, as it calls createArticleListItem now)
   */
  function renderArticles(articlesToRender, activeSortId) {
    if (!articleListContainer) return;

    articleListContainer.innerHTML = ''; // Clear existing content

    if (!articlesToRender || articlesToRender.length === 0) {
      articleListContainer.innerHTML = '<p>No articles found for this category.</p>';
      return;
    }

    const currentSortConfig = sortingOptions[activeSortId];
    const requiresGrouping = currentSortConfig && currentSortConfig.key; // Fixed grouping condition

    if (requiresGrouping) {
      const groupKey = currentSortConfig.key;
      
      if (groupKey === 'tags') {
          const tagsMap = {};
          articlesToRender.forEach(article => {
              if (article.tags && article.tags.length > 0) {
                  article.tags.forEach(tag => {
                      tagsMap[tag] = tagsMap[tag] || [];
                      tagsMap[tag].push(article);
                  });
              } else {
                  tagsMap['Uncategorized Tags'] = tagsMap['Uncategorized Tags'] || [];
                  tagsMap['Uncategorized Tags'].push(article);
              }
          });

          const sortedTags = Object.keys(tagsMap).sort((a, b) => a.localeCompare(b));

          sortedTags.forEach(tag => {
              if (tagsMap[tag].length > 0) {
                  const h2 = document.createElement('h2');
                  h2.classList.add('resource-group-title');
                  h2.textContent = tag;
                  articleListContainer.appendChild(h2);

                  const ul = document.createElement('ul');
                  ul.classList.add('resource-list');
                  
                  const sortedTagArticles = [...new Set(tagsMap[tag])].sort((a, b) => a.title.localeCompare(b.title));
                  sortedTagArticles.forEach(article => ul.appendChild(createArticleListItem(article)));
                  articleListContainer.appendChild(ul);
              }
          });

      } else { // Standard grouping by a single key (e.g., 'group' or 'level')
          const grouped = articlesToRender.reduce((acc, article) => {
            const groupName = article[groupKey] || 'Uncategorized';
            acc[groupName] = acc[groupName] || [];
            acc[groupName].push(article);
            return acc;
          }, {});

          const groupOrder = currentSortConfig.groupOrder || Object.keys(grouped).sort((a, b) => a.localeCompare(b));

          groupOrder.forEach(groupName => {
            if (grouped[groupName] && grouped[groupName].length > 0) {
              const h2 = document.createElement('h2');
              h2.classList.add('resource-group-title');
              h2.textContent = groupName.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
              articleListContainer.appendChild(h2);

              const ul = document.createElement('ul');
              ul.classList.add('resource-list');
              
              const sortedGroupArticles = grouped[groupName].sort((a, b) => a.title.localeCompare(b.title));
              sortedGroupArticles.forEach(article => ul.appendChild(createArticleListItem(article)));
              articleListContainer.appendChild(ul);
            }
          });
      }

    } else {
      const ul = document.createElement('ul');
      ul.classList.add('resource-list');
      articlesToRender.forEach(article => ul.appendChild(createArticleListItem(article)));
      articleListContainer.appendChild(ul);
    }
  }

  /**
   * Sorts the array of articles based on the selected sorting option.
   * @param {Array} articles - The array of articles to sort.
   * @param {string} sortId - The ID of the selected sorting option.
   * @returns {Array} The sorted array of articles.
   */
  function sortArticles(articles, sortId) {
    let sorted = [...articles];
    const sortConfig = sortingOptions[sortId];

    if (sortId === 'alphabetical') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortId === 'default') { // This is "Difficulty" for LeetCode/DeepML, "Zero to One" for Math
      if (currentCategoryIdentifier === 'leetcode' || currentCategoryIdentifier === 'deep-ml') {
          // Default for LeetCode/DeepML is "Difficulty", which uses grouping
          // Sort by difficulty level, then alphabetically
          const groupKey = sortConfig.key;
          sorted.sort((a, b) => {
              const groupA = a[groupKey] || 'Uncategorized';
              const groupB = b[groupKey] || 'Uncategorized';
              const groupOrder = sortConfig.groupOrder;
              
              let compareGroups = 0;
              if (groupOrder && groupOrder.length > 0) {
                  compareGroups = groupOrder.indexOf(groupA) - groupOrder.indexOf(groupB);
              } else {
                  compareGroups = groupA.localeCompare(groupB);
              }
              if (compareGroups !== 0) {
                return compareGroups;
              }
              return a.title.localeCompare(b.title);
          });
      } else { // 'default' for math is original manifest order
          return [...allArticles];
      }
    } else if (sortId === 'grouped') { // Math's 'Knowledge Area'
      const groupKey = sortConfig.key;
      sorted.sort((a, b) => {
        const valA = a[groupKey] || 'Uncategorized';
        const valB = b[groupKey] || 'Uncategorized';
        
        const groupOrder = sortConfig.groupOrder;
        
        let compareGroups = 0;
        if (groupOrder && groupOrder.length > 0) {
            compareGroups = groupOrder.indexOf(valA) - groupOrder.indexOf(valB);
        } else {
            compareGroups = valA.localeCompare(valB);
        }
        
        if (compareGroups !== 0) {
          return compareGroups;
        }
        return a.title.localeCompare(b.title);
      });
    } else if (sortId === 'grouped_difficulty') { // LeetCode's old "By Difficulty" (now 'default')
        // This sorting option might be redundant now if 'default' handles difficulty for leetcode
        // Kept for robustness if grouped_difficulty is used elsewhere
        const groupKey = sortingOptions.grouped_difficulty.key;
        sorted.sort((a, b) => {
            const groupA = a[groupKey] || 'Uncategorized';
            const groupB = b[groupKey] || 'Uncategorized';
            const groupOrder = sortingOptions.grouped_difficulty.groupOrder;
            
            let compareGroups = 0;
            if (groupOrder && groupOrder.length > 0) {
                compareGroups = groupOrder.indexOf(groupA) - groupOrder.indexOf(groupB);
            } else {
                compareGroups = groupA.localeCompare(groupB);
            }
            if (compareGroups !== 0) {
              return compareGroups;
            }
            return a.title.localeCompare(b.title);
        });
    } else if (sortId === 'grouped_tags') { // LeetCode/DeepML "Tags"
        sorted.sort((a, b) => {
            const tagA = (a.tags && a.tags.length > 0) ? a.tags[0] : '';
            const tagB = (b.tags && b.tags.length > 0) ? b.tags[0] : '';
            const tagComparison = tagA.localeCompare(tagB);
            if (tagComparison !== 0) {
                return tagComparison;
            }
            return a.title.localeCompare(b.title);
        });
    } else if (sortId === 'by_problem_id') { // LeetCode/DeepML "ID#"
        sorted.sort((a, b) => (a.problemId || Infinity) - (b.problemId || Infinity));
    }
    
    return sorted;
  }

  // --- 4. Event Listener for Sorting Toggle ---
  if (sortByToggle) {
    sortByToggle.addEventListener('change', (event) => {
      if (event.target.name === 'sort-order') {
        const selectedSortId = event.target.value;
        const sortedArticles = sortArticles(allArticles, selectedSortId);
        renderArticles(sortedArticles, selectedSortId);
      }
    });
  }

  // --- 5. Initial Render (on page load) ---
  const initialSortInput = document.querySelector('input[name="sort-order"]:checked');
  const initialSortId = initialSortInput ? initialSortInput.value : 'default';

  const initialSortedArticles = sortArticles(allArticles, initialSortId);
  renderArticles(initialSortedArticles, initialSortId);
});