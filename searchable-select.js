/**
 * Searchable Select Component
 * Converts a placeholder div into a fully functional searchable dropdown
 */
class SearchableSelect {
    /**
     * @param {string} selectorId - ID of the container element
     * @param {string} placeholder - Default text to show
     * @param {Function} onChange - Callback when value changes (value) => {}
     */
    constructor(selectorId, placeholder, onChange) {
        this.containerId = selectorId;
        this.container = document.getElementById(selectorId);
        this.placeholder = placeholder;
        this.onChangeCallback = onChange;
        this.options = [];
        this.selectedValue = null;
        this.isOpen = false;

        this.initUI();
    }

    initUI() {
        this.container.classList.add('searchable-select-container');
        this.container.innerHTML = `
            <div class="search-select-trigger disabled" id="${this.containerId}-trigger">
                <span class="trigger-text">${this.placeholder}</span>
                <svg class="trigger-arrow" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
            </div>
            <div class="search-select-dropdown" id="${this.containerId}-dropdown">
                <div class="search-input-wrapper">
                    <input type="text" class="search-select-input" placeholder="Search..." id="${this.containerId}-input">
                </div>
                <div class="search-select-options" id="${this.containerId}-options">
                    <!-- Options injected here -->
                </div>
            </div>
        `;

        this.trigger = document.getElementById(`${this.containerId}-trigger`);
        this.dropdown = document.getElementById(`${this.containerId}-dropdown`);
        this.input = document.getElementById(`${this.containerId}-input`);
        this.optionsList = document.getElementById(`${this.containerId}-options`);

        // Event Listeners
        this.trigger.addEventListener('click', () => this.toggleDropdown());
        this.input.addEventListener('input', (e) => this.filterOptions(e.target.value));

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.container.contains(e.target)) {
                this.closeDropdown();
            }
        });
    }

    setOptions(optionsData) {
        this.options = optionsData; // Array of strings matching the API format
        this.renderOptions(this.options);
        this.enable();
    }

    renderOptions(data) {
        this.optionsList.innerHTML = '';
        if (data.length === 0) {
            this.optionsList.innerHTML = '<div class="search-option" style="color: #6B7280; cursor: default;">No results found</div>';
            return;
        }

        data.forEach(optValue => {
            const div = document.createElement('div');
            div.className = 'search-option';
            if (optValue === this.selectedValue) div.classList.add('selected');
            div.textContent = optValue;
            div.onclick = () => this.selectValue(optValue);
            this.optionsList.appendChild(div);
        });
    }

    filterOptions(query) {
        const lowerQuery = query.toLowerCase();
        const filtered = this.options.filter(opt => opt.toLowerCase().includes(lowerQuery));
        this.renderOptions(filtered);
    }

    selectValue(value) {
        this.selectedValue = value;
        this.trigger.querySelector('.trigger-text').textContent = value;
        this.trigger.querySelector('.trigger-text').style.color = '#F3F4F6';
        this.closeDropdown();

        if (this.onChangeCallback) {
            this.onChangeCallback(value);
        }
    }

    toggleDropdown() {
        if (this.trigger.classList.contains('disabled')) return;
        this.isOpen ? this.closeDropdown() : this.openDropdown();
    }

    openDropdown() {
        this.isOpen = true;
        this.dropdown.classList.add('open');
        this.trigger.classList.add('active');
        this.input.value = ''; // Reset search
        this.filterOptions(''); // Reset filter
        setTimeout(() => this.input.focus(), 100);
    }

    closeDropdown() {
        this.isOpen = false;
        this.dropdown.classList.remove('open');
        this.trigger.classList.remove('active');
    }

    enable() {
        this.trigger.classList.remove('disabled');
    }

    disable() {
        this.trigger.classList.add('disabled');
        this.selectedValue = null;
        this.trigger.querySelector('.trigger-text').textContent = this.placeholder;
    }

    reset() {
        this.disable();
        this.options = [];
    }
}
