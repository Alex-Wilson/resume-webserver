// filters.js

/**
 * Utility function to insert an element after another element
 */
function insertAfter(newNode, referenceNode) {
    referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
}

/**
 * Creates a range input filter (X≤A≤Z)
 */
function createRangeInput(id, label, min = 0, max = 9999) {
    const container = document.createElement('div');
    container.className = 'filter-group range-filter';
    container.id = `${id}-container`;

    const labelElement = document.createElement('label');
    labelElement.textContent = label;
    container.appendChild(labelElement);

    const rangeContainer = document.createElement('div');
    rangeContainer.className = 'range-inputs';

    // Min input
    const minInput = document.createElement('input');
    minInput.type = 'number';
    minInput.id = `${id}-min`;
    minInput.min = min;
    minInput.max = max;
    minInput.placeholder = 'Min';
    
    // Max input
    const maxInput = document.createElement('input');
    maxInput.type = 'number';
    maxInput.id = `${id}-max`;
    maxInput.min = min;
    maxInput.max = max;
    maxInput.placeholder = 'Max';

    rangeContainer.appendChild(minInput);
    rangeContainer.appendChild(document.createTextNode('≤'));
    rangeContainer.appendChild(document.createElement('span')).textContent = label.split(' ')[0];
    rangeContainer.appendChild(document.createTextNode('≤'));
    rangeContainer.appendChild(maxInput);

    container.appendChild(rangeContainer);
    return container;
}

/**
 * Creates a checkbox filter
 */
function createCheckboxFilter(id, label) {
    const container = document.createElement('div');
    container.className = 'filter-group checkbox-filter';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = id;
    
    const labelElement = document.createElement('label');
    labelElement.htmlFor = id;
    labelElement.textContent = label;
    
    container.appendChild(checkbox);
    container.appendChild(labelElement);
    
    return container;
}

/**
 * Creates the link arrows multi-select filter
 */
function createLinkArrowsFilter() {
    const container = document.createElement('div');
    container.className = 'filter-group link-arrows-filter';
    container.id = 'link-arrows-container';

    const label = document.createElement('label');
    label.textContent = 'Link Arrows';
    container.appendChild(label);

    const arrowsGrid = document.createElement('div');
    arrowsGrid.className = 'link-arrows-grid';

    // Define the arrow positions in a 3x3 grid
    const arrowPositions = [
        { value: 'top-left', label: '↖', class: 'arrow-top-left' },
        { value: 'top', label: '↑', class: 'arrow-top' },
        { value: 'top-right', label: '↗', class: 'arrow-top-right' },
        { value: 'left', label: '←', class: 'arrow-left' },
        { value: '', label: '', class: 'arrow-center' },
        { value: 'right', label: '→', class: 'arrow-right' },
        { value: 'bottom-left', label: '↙', class: 'arrow-bottom-left' },
        { value: 'bottom', label: '↓', class: 'arrow-bottom' },
        { value: 'bottom-right', label: '↘', class: 'arrow-bottom-right' }
    ];

    arrowsGrid.style.gridTemplateColumns = 'repeat(3, 1fr)';

    arrowPositions.forEach(position => {
        const cell = document.createElement('div');
        cell.className = `arrow-cell ${position.class}`;
        
        if (position.value) {  // Skip the empty center cell
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `link-arrow-${position.value}`;
            checkbox.value = position.value;
            checkbox.className = 'link-arrow-checkbox';
            
            const arrowLabel = document.createElement('label');
            arrowLabel.htmlFor = checkbox.id;
            arrowLabel.className = 'arrow-label';
            arrowLabel.textContent = position.label;
            
            cell.appendChild(checkbox);
            cell.appendChild(arrowLabel);
        }
        
        arrowsGrid.appendChild(cell);
    });

    container.appendChild(arrowsGrid);
    return container;
}

/**
 * Creates a standard select filter element
 */
function createFilterElement(config) {
    const container = document.createElement('div');
    container.className = 'filter-group';
    container.id = `${config.id}-container`;
    
    const label = document.createElement('label');
    label.textContent = config.label;
    label.htmlFor = config.id;
    
    const select = document.createElement('select');
    select.id = config.id;
    select.name = config.id;
    
    config.options.forEach(option => {
        const optionElement = document.createElement('option');
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        select.appendChild(optionElement);
    });
    
    container.appendChild(label);
    container.appendChild(select);
    
    return container;
}

/**
 * Filter configuration object
 */
const filterConfig = {
    staticFilters: {
        rarity: {
            id: 'rarity',
            label: 'Card Rarity',
            options: [
                { value: '', label: 'All Rarities' },
                { value: 'common', label: 'Common' },
                { value: 'rare', label: 'Rare' },
                { value: 'super-rare', label: 'Super Rare' },
                { value: 'ultra-rare', label: 'Ultra Rare' },
                { value: 'secret-rare', label: 'Secret Rare' },
                { value: 'ultimate-rare', label: 'Ultimate Rare' },
                { value: 'ghost-rare', label: 'Ghost Rare' },
                { value: 'platinum-rare', label: 'Platinum Rare' },
                { value: 'gold-rare', label: 'Gold Rare' },
                { value: 'collectors-rare', label: "Collector's Rare" },
                { value: 'starlight-rare', label: 'Starlight Rare' },
                { value: 'prismatic-secret-rare', label: 'Prismatic Secret Rare' }
            ]
        },
        cardType: {
            id: 'card-type',
            label: 'Card Type',
            options: [
                { value: '', label: 'All Card Types' },
                { value: 'monster', label: 'Monster' },
                { value: 'spell', label: 'Spell' },
                { value: 'trap', label: 'Trap' }
            ]
        }
    },
    dynamicFilters: {
        monster: {
            type: {
                id: 'monster-type',
                label: 'Monster Type',
                options: [
                    { value: '', label: 'All Monster Types' },
                    { value: 'normal', label: 'Normal Monster' },
                    { value: 'effect', label: 'Effect Monster' },
                    { value: 'ritual', label: 'Ritual Monster' },
                    { value: 'fusion', label: 'Fusion Monster' },
                    { value: 'synchro', label: 'Synchro Monster' },
                    { value: 'xyz', label: 'XYZ Monster' },
                    { value: 'pendulum', label: 'Pendulum Monster' },
                    { value: 'link', label: 'Link Monster' },
                    { value: 'token', label: 'Token' }
                ]
            }
        },
        spell: {
            subType: {
                id: 'spell-sub-type',
                label: 'Spell Sub-Type',
                options: [
                    { value: '', label: 'All Spell Types' },
                    { value: 'normal', label: 'Normal' },
                    { value: 'field', label: 'Field' },
                    { value: 'equip', label: 'Equip' },
                    { value: 'continuous', label: 'Continuous' },
                    { value: 'quick-play', label: 'Quick-Play' },
                    { value: 'ritual', label: 'Ritual' }
                ]
            }
        },
        trap: {
            subType: {
                id: 'trap-sub-type',
                label: 'Trap Sub-Type',
                options: [
                    { value: '', label: 'All Trap Types' },
                    { value: 'normal', label: 'Normal' },
                    { value: 'continuous', label: 'Continuous' },
                    { value: 'counter', label: 'Counter' }
                ]
            }
        }
    }
};

/**
 * Updates dynamic filters based on card type and monster type selections
 */
function updateDynamicFilters(cardType, monsterType = '') {
    const cardTypeContainer = document.getElementById('card-type-container');
    
    // Store current values before removing filters
    const currentValues = {};
    document.querySelectorAll('.dynamic-filter select, .dynamic-filter input').forEach(element => {
        currentValues[element.id] = element.type === 'checkbox' ? element.checked : element.value;
    });
    
    // Remove existing dynamic filters
    document.querySelectorAll('.dynamic-filter').forEach(filter => {
        filter.remove();
    });
    
    if (cardType === 'monster') {
        let lastInsertedFilter = cardTypeContainer;
        
        // Add monster type filter
        const typeFilter = createFilterElement(filterConfig.dynamicFilters.monster.type);
        typeFilter.classList.add('dynamic-filter');
        insertAfter(typeFilter, lastInsertedFilter);
        lastInsertedFilter = typeFilter;

        // Create all filters but don't insert them yet
        const attackFilter = createRangeInput('monster-attack', 'Attack');
        const defenseFilter = createRangeInput('monster-defense', 'Defense');
        const tunerFilter = createCheckboxFilter('monster-tuner', 'Tuner');
        const levelFilter = createRangeInput('monster-level', 'Level', 1, 12);
        const rankFilter = createRangeInput('monster-rank', 'Rank', 1, 13);
        const scaleFilter = createRangeInput('pendulum-scale', 'Pendulum Scale', 0, 13);
        const ratingFilter = createRangeInput('link-rating', 'Link Rating', 1, 6);
        const arrowsFilter = createLinkArrowsFilter();

        // Add appropriate filters based on monster type
        switch(monsterType) {
            case 'xyz':
                [attackFilter, defenseFilter, tunerFilter, rankFilter].forEach(filter => {
                    filter.classList.add('dynamic-filter');
                    insertAfter(filter, lastInsertedFilter);
                    lastInsertedFilter = filter;
                });
                break;
                
            case 'pendulum':
                [attackFilter, defenseFilter, tunerFilter, levelFilter, scaleFilter].forEach(filter => {
                    filter.classList.add('dynamic-filter');
                    insertAfter(filter, lastInsertedFilter);
                    lastInsertedFilter = filter;
                });
                break;
                
            case 'link':
                [attackFilter, defenseFilter, tunerFilter, ratingFilter, arrowsFilter].forEach(filter => {
                    filter.classList.add('dynamic-filter');
                    insertAfter(filter, lastInsertedFilter);
                    lastInsertedFilter = filter;
                });
                break;
                
            default:
                [attackFilter, defenseFilter, tunerFilter, levelFilter].forEach(filter => {
                    filter.classList.add('dynamic-filter');
                    insertAfter(filter, lastInsertedFilter);
                    lastInsertedFilter = filter;
                });
        }

        // Restore previous values
        document.querySelectorAll('.dynamic-filter select, .dynamic-filter input').forEach(element => {
            if (currentValues[element.id] !== undefined) {
                if (element.type === 'checkbox') {
                    element.checked = currentValues[element.id];
                } else {
                    element.value = currentValues[element.id];
                }
            }
        });

        // Set monster type select value
        const monsterTypeSelect = document.getElementById('monster-type');
        if (monsterTypeSelect && monsterType) {
            monsterTypeSelect.value = monsterType;
        }
    } else if (cardType === 'spell') {
        const spellFilter = createFilterElement(filterConfig.dynamicFilters.spell.subType);
        spellFilter.classList.add('dynamic-filter');
        insertAfter(spellFilter, cardTypeContainer);

        // Restore value if exists
        if (currentValues['spell-sub-type']) {
            document.getElementById('spell-sub-type').value = currentValues['spell-sub-type'];
        }
    } else if (cardType === 'trap') {
        const trapFilter = createFilterElement(filterConfig.dynamicFilters.trap.subType);
        trapFilter.classList.add('dynamic-filter');
        insertAfter(trapFilter, cardTypeContainer);

        // Restore value if exists
        if (currentValues['trap-sub-type']) {
            document.getElementById('trap-sub-type').value = currentValues['trap-sub-type'];
        }
    }
}

/**
 * Initializes the filter interface
 */
export function initializeFilters() {
    const filterSection = document.getElementById('filter-section');
    
    // Create static filters
    Object.values(filterConfig.staticFilters).forEach(config => {
        const filterElement = createFilterElement(config);
        filterSection.appendChild(filterElement);
    });
    
    // Add event listeners for card type and monster type changes
    document.addEventListener('change', (e) => {
        if (e.target.id === 'monster-type') {
            updateDynamicFilters('monster', e.target.value);
        } else if (e.target.id === 'card-type') {
            const monsterType = document.getElementById('monster-type')?.value || '';
            updateDynamicFilters(e.target.value, monsterType);
        }
    });
    
    // Add reset button
    const resetButton = document.createElement('button');
    resetButton.textContent = 'Reset Filters';
    resetButton.className = 'reset-button';
    resetButton.addEventListener('click', () => {
        document.querySelectorAll('select').forEach(select => {
            select.value = '';
        });
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
            checkbox.checked = false;
        });
        document.querySelectorAll('input[type="number"]').forEach(input => {
            input.value = '';
        });
        updateDynamicFilters('');
    });
    
    filterSection.appendChild(resetButton);
}