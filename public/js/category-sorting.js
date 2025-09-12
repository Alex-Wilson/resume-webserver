// public/js/category-sorting.js

document.addEventListener('DOMContentLoaded', () => {
  const allArticles = window.categoryArticles;
  const sortingOptions = window.sortingOptions;
  const filteringOptions = window.filteringOptions;
  const currentCategoryIdentifier = window.currentCategoryIdentifier;

  const sortByToggle = document.getElementById('sort-by-toggle');
  const articleListContainer = document.getElementById('article-list-container');

  function createArticleListItem(article) {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.href = `/${currentCategoryIdentifier}/${article.slug}`;
    
    let displayText = article.title;
    if ((currentCategoryIdentifier === 'leetcode' || currentCategoryIdentifier === 'deep-ml') && article.problemId) {
      displayText = `#${article.problemId} - ${article.title}`;
    }
    a.textContent = displayText;

    li.appendChild(a);
    return li;
  }

  function renderArticles(articlesToRender, activeSortId) {
    if (!articleListContainer) return;

    articleListContainer.innerHTML = '';

    if (!articlesToRender || articlesToRender.length === 0) {
      articleListContainer.innerHTML = '<p>No articles found for this category.</p>';
      return;
    }

    const currentSortConfig = sortingOptions[activeSortId];
    const requiresGrouping = currentSortConfig && currentSortConfig.key;

    if (requiresGrouping) {
      const groupKey = currentSortConfig.key;
      
      // Handle 'tags' grouping specifically for LeetCode/DeepML
      if (groupKey === 'tags' && (currentCategoryIdentifier === 'leetcode' || currentCategoryIdentifier === 'deep-ml')) {
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
                  
                  // Sort articles within each tag group alphabetically by title for consistency
                  const sortedTagArticles = [...new Set(tagsMap[tag])].sort((a, b) => a.title.localeCompare(b.title));
                  sortedTagArticles.forEach(article => ul.appendChild(createArticleListItem(article)));
                  articleListContainer.appendChild(ul);
              }
          });

      } else { // Standard grouping by a single key (e.g., 'group' for Math, 'level' for LeetCode/DeepML)
          // First, group by the specified key
          const grouped = articlesToRender.reduce((acc, article) => {
            const groupName = article[groupKey] || 'Uncategorized';
            acc[groupName] = acc[groupName] || [];
            acc[groupName].push(article);
            return acc;
          }, {});

          // Determine the order of groups (from manifest or alphabetical if not specified)
          const groupOrder = currentSortConfig.groupOrder || Object.keys(grouped).sort((a, b) => a.localeCompare(b));

          groupOrder.forEach(groupName => {
            if (grouped[groupName] && grouped[groupName].length > 0) {
              const h2 = document.createElement('h2');
              h2.classList.add('resource-group-title');
              h2.textContent = groupName.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
              articleListContainer.appendChild(h2);

              const ul = document.createElement('ul');
              ul.classList.add('resource-list');
              
              // *** CRITICAL FIX: DO NOT SORT WITHIN GROUP FOR MATH'S 'KNOWLEDGE AREA' ***
              // The 'articlesToRender' is already sorted correctly by the 'sortArticles' function.
              // We just need to append the articles from the 'grouped' object.
              // For Math's 'Knowledge Area', 'sortArticles' sorts by group and then by manifest order.
              grouped[groupName].forEach(article => ul.appendChild(createArticleListItem(article)));
              
              articleListContainer.appendChild(ul);
            }
          });
      }

    } else {
      // No grouping required (e.g., 'Learning from Zero' for Math, 'A - Z', 'ID#')
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
    } else if (sortId === 'learning_from_zero') { // Math's 'Learning from Zero'
      return [...allArticles]; // Simply return the original manifest order
    } else if (sortId === 'default') { // This is "Knowledge Area" for Math, "Difficulty" for LeetCode/DeepML, "Domain" for Certs
      // If the default option has a 'key' for grouping (like 'group' or 'level' or 'domain'),
      // we need to sort by that key first.
      if (sortConfig && sortConfig.key) {
        const groupKey = sortConfig.key;
        sorted.sort((a, b) => {
            const groupA = (Array.isArray(a[groupKey]) ? a[groupKey][0] : a[groupKey]) || 'Uncategorized';
            const groupB = (Array.isArray(b[groupKey]) ? b[groupKey][0] : b[groupKey]) || 'Uncategorized';

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
            // *** CRITICAL FIX: Sort within groups by original manifest order for Math ***
            // For Math's 'Knowledge Area' (which is 'default'), we want manifest order within groups.
            // For other categories' default (like difficulty), alphabetical is usually fine.
            if (currentCategoryIdentifier === 'math') {
                return allArticles.indexOf(a) - allArticles.indexOf(b);
            } else {
                return a.title.localeCompare(b.title); // Alphabetical within groups for other default sorts
            }
        });
      } else { // This should ideally not be hit if default has a key for grouping
          return [...allArticles]; // Fallback to original order
      }
    } else if (sortId === 'by_problem_id') { // LeetCode/DeepML "ID#"
        sorted.sort((a, b) => (a.problemId || Infinity) - (b.problemId || Infinity));
    } else if (sortId === 'by_vendor') { // Certs "Vendor"
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
    }
    // No other custom sort logic needed based on current manifests.
    // Ensure unknown sortIds don't break.
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