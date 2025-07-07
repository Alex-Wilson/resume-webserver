// ygo-editor-app.js - Yu-Gi-Oh! Card Editor Application
// Main application logic for card fetching, display, and interaction

export function initializeApp() {
    // Core Elements
    const cardGrid = document.getElementById('card-grid');
    const modal = document.getElementById('card-modal');
    const searchInput = document.getElementById('card-search');
    const cardsCountMessage = document.getElementById('cards-count-message');
    
    // Application State
    let offset = 0;
    const limit = 50;
    let isLoading = false;
    let currentSearchTerm = localStorage.getItem('searchTerm') || '';

    // Create loading indicator
    const loadingIndicator = document.createElement('div');
    loadingIndicator.className = 'loading';
    loadingIndicator.textContent = 'Loading more cards...';
    loadingIndicator.style.display = 'none';
    cardGrid.after(loadingIndicator);

    // Rarity mapping for consistent display
    const RARITY_MAP = {
        'Common': 'C',
        'Rare': 'R',
        'Super Rare': 'SR',
        'Ultra Rare': 'UR',
        'Secret Rare': 'ScR',
        'Ultimate Rare': 'UtR',
        'Ghost Rare': 'GR',
        'Gold Rare': 'GUR',
        'Starlight Rare': 'StR',
        'Collector\'s Rare': 'CR',
        'Prismatic Secret Rare': 'PScR',
        'Premium Gold Rare': 'PGR',
        'Platinum Rare': 'PlR',
        'Parallel Rare': 'PR',
        'Gold Secret Rare': 'GScR',
        'Ultra Secret Rare': 'UScR'
    };

    // Sets that can have First Edition prints
    const FIRST_ED_SETS = [
        'LOB', 'MRD', 'SRL', 'PSV', 'LON', 'LOD', 'PGD', 'MFC', 'DCR', 'IOC', 'AST',
        'SOD', 'RDS', 'FET', 'TLM', 'CRV', 'EEN', 'SOI', 'EOJ', 'POTD', 'CDIP',
        'STON', 'GLAS', 'TAEV', 'FOTB', 'LODT', 'TDGS', 'CSOC', 'CRMS', 'RGBT',
        'ANPR', 'SOVR', 'ABPF', 'TSHD', 'DREV', 'STBL', 'STOR', 'EXVC', 'GENF'
    ];

    // Main card fetching function
    async function fetchCards(isLoadMore = false) {
        if (isLoading) return;
        
        try {
            isLoading = true;
            
            if (!isLoadMore) {
                cardGrid.innerHTML = '<div class="loading">Loading cards...</div>';
                offset = 0;
            } else {
                loadingIndicator.style.display = 'block';
            }

            const queryParams = new URLSearchParams({
                offset: offset,
                limit: limit,
                term: currentSearchTerm
            });

            const response = await fetch(`/api/cards?${queryParams}`);
            if (!response.ok) throw new Error('Network response was not ok');

            const cards = await response.json();
            
            if (!isLoadMore) cardGrid.innerHTML = '';

            if (cards.length === 0) {
                if (!isLoadMore) {
                    cardGrid.innerHTML = '<div class="no-results">No cards found matching your criteria</div>';
                    updateCardsCount(0);
                }
            } else {
                appendCards(cards);
                updateCardsCount(offset + cards.length);
                offset += cards.length;
            }

        } catch (error) {
            console.error('Error fetching cards:', error);
            if (!isLoadMore) {
                cardGrid.innerHTML = '<div class="error">Error loading cards. Please try again.</div>';
            }
        } finally {
            isLoading = false;
            loadingIndicator.style.display = 'none';
        }
    }

    // Helper function to determine if a set can have First Edition
    function setCanHaveFirstEd(setCode) {
        const setPrefix = setCode.split('-')[0];
        return FIRST_ED_SETS.includes(setPrefix) && 
               !setCode.includes('-EN') && 
               !setCode.includes('-FR') && 
               !setCode.includes('-DE') && 
               !setCode.includes('-IT') && 
               !setCode.includes('-SP') && 
               !setCode.includes('-PT') && 
               !setCode.includes('-JP');
    }

    // Determine available editions for a set
    function determineEditions(setData) {
        const rarity = setData.set_rarity.toLowerCase();
        
        if (rarity.includes('limited edition')) return ['LE'];
        if (setCanHaveFirstEd(setData.set_code)) return ['1E', 'UL'];
        return ['UL'];
    }

    // Format rarity for display
    function formatRarity(rarity) {
        const baseRarity = rarity.replace(/(1st Edition|Limited Edition|Unlimited)/i, '').trim();
        return RARITY_MAP[baseRarity] || baseRarity;
    }

    // Card display functions
    function appendCards(cards) {
        cards.forEach(card => {
            if (!card.card_images || card.card_images.length === 0) return;

            card.card_images.forEach((image, imageIndex) => {
                const cardElement = document.createElement('div');
                cardElement.className = 'card';
                
                cardElement.dataset.cardId = card.id;
                cardElement.dataset.imageIndex = imageIndex;
                cardElement.dataset.name = card.name;

                cardElement.innerHTML = `
                    <div class="card-image-container">
                        <div class="card-image-placeholder"></div>
                        <img src="${image.image_url}" 
                             alt="${escapeHTML(card.name)} (Art ${imageIndex + 1})"
                             class="card-image hidden"
                             loading="lazy"
                             onload="this.classList.remove('hidden');
                                    this.previousElementSibling.style.display = 'none';"
                             onerror="this.parentElement.innerHTML = 'Error loading image'">
                    </div>
                    <div class="card-info">
                        <p class="card-name">${escapeHTML(card.name)}</p>
                        ${card.card_images.length > 1 ? 
                            `<p class="art-variant">Art ${imageIndex + 1}/${card.card_images.length}</p>` 
                            : ''}
                    </div>
                `;

                cardElement.addEventListener('click', () => showModal(card, imageIndex));
                cardGrid.appendChild(cardElement);
            });
        });
    }

    // Modal display function
    function showModal(card, selectedImageIndex = 0) {
        const modalContent = document.getElementById('card-modal-content');
        const image = card.card_images[selectedImageIndex];
        
        // Group and sort prints by edition
        const printsWithThisArt = card.card_sets || [];
        const groupedPrints = {
            '1E': [],
            'UL': [],
            'LE': []
        };

        printsWithThisArt.forEach(print => {
            const editions = determineEditions(print);
            editions.forEach(edition => {
                groupedPrints[edition].push({
                    ...print,
                    edition: edition
                });
            });
        });

        // Sort prints within each group by set code
        Object.values(groupedPrints).forEach(prints => {
            prints.sort((a, b) => a.set_code.localeCompare(b.set_code));
        });

        modalContent.innerHTML = `
            <button class="modal-close-button" aria-label="Close">&times;</button>
            <div class="modal-grid">
                <div class="modal-image-container">
                    <div class="card-image-placeholder modal-placeholder"></div>
                    <img src="${image.image_url}" 
                         alt="${escapeHTML(card.name)} (Art ${selectedImageIndex + 1})"
                         class="modal-card-image hidden"
                         onload="this.classList.remove('hidden');
                                this.previousElementSibling.style.display = 'none';">
                </div>
                
                <div class="modal-content-scroll">
                    <div class="card-info-section">
                        <h2 class="card-title">${escapeHTML(card.name)}</h2>
                        ${card.card_images.length > 1 ? 
                            `<p class="art-variant-info">Artwork ${selectedImageIndex + 1} of ${card.card_images.length}</p>` 
                            : ''}
                        
                        <div class="prints-section">
                            <h3 class="prints-header">Available Prints</h3>
                            ${Object.entries(groupedPrints).map(([edition, prints]) => 
                                prints.length ? `
                                    <div class="edition-group">
                                        <h4 class="edition-header">${
                                            edition === '1E' ? 'First Edition' :
                                            edition === 'LE' ? 'Limited Edition' :
                                            'Unlimited'
                                        }</h4>
                                        <ul class="prints-list">
                                            ${prints.map(print => `
                                                <li class="print-item">
                                                    ${escapeHTML(print.set_code)} - ${formatRarity(print.set_rarity)}
                                                </li>
                                            `).join('')}
                                        </ul>
                                    </div>
                                ` : ''
                            ).join('')}
                        </div>

                        ${card.desc ? `
                            <div class="card-description">
                                <p>${escapeHTML(card.desc)}</p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>
        `;
        
        modal.style.display = 'block';
    }

    // Event Listeners
    function setupSearchListeners() {
        let searchTimeout;
        searchInput?.addEventListener('input', (e) => {
            clearTimeout(searchTimeout);
            searchTimeout = setTimeout(() => {
                currentSearchTerm = e.target.value.trim();
                localStorage.setItem('searchTerm', currentSearchTerm);
                offset = 0;
                fetchCards(false);
            }, 300);
        });
    }

    // Modal handlers
    modal?.addEventListener('click', (e) => {
        if (e.target === modal || e.target.classList.contains('modal-close-button')) {
            modal.style.display = 'none';
        }
    });

    // Infinite scroll
    window.addEventListener('scroll', () => {
        if (!isLoading && 
            window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
            fetchCards(true);
        }
    });

    // Utility Functions
    function updateCardsCount(count) {
        if (cardsCountMessage) {
            cardsCountMessage.textContent = count > 0 
                ? `Showing ${count} card${count !== 1 ? 's' : ''}`
                : 'No cards found';
        }
    }

    function escapeHTML(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    // Initialize
    setupSearchListeners();
    if (searchInput && currentSearchTerm) searchInput.value = currentSearchTerm;
    fetchCards(false);
}