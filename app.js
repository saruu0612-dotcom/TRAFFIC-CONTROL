/**
 * Pune Traffic Control System
 * Enhanced Interactive Application JavaScript
 */

// ============================================
// PUNE LOCATIONS DATABASE
// ============================================
const puneLocations = [
  { id: 'hinjewadi', name: 'Hinjewadi IT Park', area: 'Hinjewadi', type: 'IT Hub', coords: { x: 180, y: 180 }, traffic: 'heavy' },
  { id: 'fc-road', name: 'FC Road (Fergusson College Road)', area: 'Deccan', type: 'Commercial', coords: { x: 350, y: 220 }, traffic: 'moderate' },
  { id: 'jm-road', name: 'JM Road (Jangli Maharaj Road)', area: 'Shivajinagar', type: 'Commercial', coords: { x: 400, y: 200 }, traffic: 'moderate' },
  { id: 'mg-road', name: 'MG Road (Mahatma Gandhi Road)', area: 'Camp', type: 'Commercial', coords: { x: 480, y: 260 }, traffic: 'light' },
  { id: 'koregaon-park', name: 'Koregaon Park', area: 'KP', type: 'Residential', coords: { x: 520, y: 220 }, traffic: 'light' },
  { id: 'kothrud', name: 'Kothrud', area: 'West Pune', type: 'Residential', coords: { x: 280, y: 250 }, traffic: 'moderate' },
  { id: 'baner', name: 'Baner', area: 'West Pune', type: 'Residential', coords: { x: 250, y: 160 }, traffic: 'light' },
  { id: 'aundh', name: 'Aundh', area: 'North Pune', type: 'Residential', coords: { x: 300, y: 140 }, traffic: 'light' },
  { id: 'viman-nagar', name: 'Viman Nagar', area: 'East Pune', type: 'Commercial', coords: { x: 550, y: 180 }, traffic: 'light' },
  { id: 'kalyani-nagar', name: 'Kalyani Nagar', area: 'East Pune', type: 'Residential', coords: { x: 500, y: 200 }, traffic: 'light' },
  { id: 'hadapsar', name: 'Hadapsar', area: 'South East', type: 'IT Hub', coords: { x: 600, y: 300 }, traffic: 'heavy' },
  { id: 'magarpatta', name: 'Magarpatta City', area: 'Hadapsar', type: 'IT Hub', coords: { x: 580, y: 320 }, traffic: 'heavy' },
  { id: 'wakad', name: 'Wakad', area: 'Pimpri', type: 'Residential', coords: { x: 200, y: 140 }, traffic: 'moderate' },
  { id: 'pcmc', name: 'Pimpri-Chinchwad', area: 'PCMC', type: 'Industrial', coords: { x: 160, y: 120 }, traffic: 'heavy' },
  { id: 'shivaji-nagar', name: 'Shivaji Nagar', area: 'Central', type: 'Commercial', coords: { x: 400, y: 200 }, traffic: 'light' },
  { id: 'pune-station', name: 'Pune Station', area: 'Central', type: 'Transport', coords: { x: 450, y: 280 }, traffic: 'moderate' },
  { id: 'swargate', name: 'Swargate', area: 'Central', type: 'Transport', coords: { x: 420, y: 320 }, traffic: 'heavy' },
  { id: 'katraj', name: 'Katraj', area: 'South', type: 'Residential', coords: { x: 380, y: 380 }, traffic: 'moderate' },
  { id: 'chandni-chowk', name: 'Chandni Chowk', area: 'Bavdhan', type: 'Junction', coords: { x: 240, y: 200 }, traffic: 'heavy' },
  { id: 'sinhagad-road', name: 'Sinhagad Road', area: 'South West', type: 'Residential', coords: { x: 300, y: 340 }, traffic: 'moderate' },
  { id: 'law-college', name: 'Law College Road', area: 'Erandwane', type: 'Commercial', coords: { x: 320, y: 240 }, traffic: 'moderate' },
  { id: 'model-colony', name: 'Model Colony', area: 'Shivajinagar', type: 'Residential', coords: { x: 380, y: 180 }, traffic: 'light' },
  { id: 'deccan', name: 'Deccan Gymkhana', area: 'Deccan', type: 'Commercial', coords: { x: 350, y: 230 }, traffic: 'moderate' },
  { id: 'nal-stop', name: 'Nal Stop', area: 'Erandwane', type: 'Junction', coords: { x: 310, y: 250 }, traffic: 'moderate' },
  { id: 'pashan', name: 'Pashan', area: 'North West', type: 'Residential', coords: { x: 260, y: 180 }, traffic: 'light' },
  { id: 'warje', name: 'Warje', area: 'South West', type: 'Residential', coords: { x: 280, y: 300 }, traffic: 'light' },
  { id: 'kharadi', name: 'Kharadi', area: 'East', type: 'IT Hub', coords: { x: 580, y: 240 }, traffic: 'heavy' },
  { id: 'eon-it', name: 'EON IT Park', area: 'Kharadi', type: 'IT Hub', coords: { x: 590, y: 230 }, traffic: 'heavy' },
  { id: 'yerwada', name: 'Yerwada', area: 'East', type: 'Residential', coords: { x: 500, y: 180 }, traffic: 'light' },
  { id: 'airport', name: 'Pune Airport (Lohegaon)', area: 'North East', type: 'Transport', coords: { x: 560, y: 120 }, traffic: 'light' },
  { id: 'ait', name: 'AIT (Army Institute of Technology)', area: 'Dighi', type: 'Educational', coords: { x: 520, y: 140 }, traffic: 'light' },
  { id: 'coep', name: 'COEP (College of Engineering Pune)', area: 'Shivajinagar', type: 'Educational', coords: { x: 410, y: 210 }, traffic: 'light' },
  { id: 'mit', name: 'MIT Pune', area: 'Kothrud', type: 'Educational', coords: { x: 270, y: 260 }, traffic: 'light' },
  { id: 'university', name: 'Pune University', area: 'Ganeshkhind', type: 'Educational', coords: { x: 340, y: 160 }, traffic: 'light' }
];

// ============================================
// STATE MANAGEMENT
// ============================================
let appState = {
  vehicleCount: 148521,
  selectedLocation: null,
  isMapFullscreen: false,
  isRefreshing: false,
  mapZoom: 1,
  trafficDensity: { heavy: 35, moderate: 40, light: 25 },
  signals: {
    'JM Road': 'red',
    'FC Road': 'green',
    'MG Road': 'yellow',
    'Sinhagad Rd': 'green',
    'Kothrud': 'red',
    'Hinjewadi': 'green'
  },
  // New State
  userProfile: {
    photo: null,
    mobile: '+91 98765 43210',
    name: 'Traffic Officer',
    email: 'officer@punetraffic.gov.in',
    role: 'Traffic Officer',
    division: 'Pune Central',
    govtId: 'GOV-MH-2024-001'
  },
  activityLog: [],
  notifications: [
    { id: 1, title: 'High Congestion', text: 'Hinjewadi Phase 1 traffic is critical', type: 'alert', time: 'Just now', unread: true },
    { id: 2, title: 'Accident Reported', text: 'Minor collision at Nal Stop junction', type: 'warning', time: '15 min ago', unread: true },
    { id: 3, title: 'Signal Restored', text: 'FC Road signal back online', type: 'info', time: '1 hour ago', unread: true }
  ]
};

// ============================================
// DOM READY
// ============================================
document.addEventListener('DOMContentLoaded', function () {
  initializeSidebar();
  initializeSearch();
  initializeMap();
  initializeRefresh();
  initializeFullscreen();
  setActivePage();
  updateClock();
  setInterval(updateClock, 1000);

  // NEW: Load Persisted Data
  loadUserProfile();
  loadActivityLog();

  // Traffic & Analytics Init
  if (window.trafficDataManager) {
    // If not on traffic page, might just init stats, but for simplicity:
    appState.currentTrafficDate = new Date().toISOString().split('T')[0];
  }

  // Settings Page specific init
  if (window.location.pathname.includes('settings.html')) {
    initializeSettingsPage();
  }
  loadActivityLog();

  // NEW: Initialize Features
  initializeNotifications();
  initializePhotoUpload();
  renderActivityLog();
  initializePagination();

  // Start simulated activity
  setInterval(simulateActivity, 45000); // New activity every 45s

  // Load user data from localStorage
  const userName = localStorage.getItem('userName');
  if (userName) {
    const userNameElements = document.querySelectorAll('.user-name, #userName');
    userNameElements.forEach(el => el.textContent = userName);
  }
});

// ============================================
// SIDEBAR NAVIGATION
// ============================================
function initializeSidebar() {
  const menuToggle = document.querySelector('.menu-toggle');
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.querySelector('.sidebar-overlay');

  if (menuToggle && sidebar) {
    menuToggle.addEventListener('click', function () {
      sidebar.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
    });
  }

  if (overlay) {
    overlay.addEventListener('click', function () {
      sidebar.classList.remove('open');
      overlay.classList.remove('active');
    });
  }
}

// ============================================
// SEARCH WITH MAP INTERACTION
// ============================================
function initializeSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchDropdown = document.getElementById('searchDropdown');

  if (!searchInput || !searchDropdown) return;

  searchInput.addEventListener('input', function () {
    const query = this.value.toLowerCase().trim();

    if (query.length < 2) {
      searchDropdown.classList.remove('active');
      return;
    }

    const matches = puneLocations.filter(loc =>
      loc.name.toLowerCase().includes(query) ||
      loc.area.toLowerCase().includes(query) ||
      loc.type.toLowerCase().includes(query) ||
      loc.name.split(/[()]/).some(part => part.toLowerCase().includes(query))
    ).slice(0, 8);

    if (matches.length > 0) {
      searchDropdown.innerHTML = matches.map(loc => `
        <div class="search-item" onclick="selectAndZoomLocation('${loc.id}')">
          <div class="search-item-icon">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="16" height="16">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <div class="search-item-content">
            <span class="search-item-name">${highlightMatch(loc.name, query)}</span>
            <span class="search-item-area">${loc.area} • ${loc.type}</span>
          </div>
          <span class="traffic-indicator ${loc.traffic}"></span>
        </div>
      `).join('');
      searchDropdown.classList.add('active');
    } else {
      searchDropdown.innerHTML = `<div class="search-no-results"><span>No locations found in Pune</span></div>`;
      searchDropdown.classList.add('active');
    }
  });

  document.addEventListener('click', function (e) {
    if (!searchInput.contains(e.target) && !searchDropdown.contains(e.target)) {
      searchDropdown.classList.remove('active');
    }
  });

  searchInput.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') searchDropdown.classList.remove('active');
  });
}

function highlightMatch(text, query) {
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

// SELECT LOCATION AND ZOOM MAP
function selectAndZoomLocation(locationId) {
  const location = puneLocations.find(loc => loc.id === locationId);
  if (!location) return;

  const searchInput = document.getElementById('searchInput');
  const searchDropdown = document.getElementById('searchDropdown');

  searchInput.value = location.name;
  searchDropdown.classList.remove('active');

  appState.selectedLocation = location;

  // Navigate to map page if not already there
  if (!window.location.pathname.includes('traffic.html')) {
    localStorage.setItem('pendingLocation', JSON.stringify(location));
    window.location.href = 'traffic.html';
    return;
  }

  zoomToLocation(location);
}

function zoomToLocation(location) {
  const mapContainer = document.querySelector('.pune-map-container');
  const puneMap = document.querySelector('.pune-map');

  if (!puneMap) return;

  showNotification(`Zooming to ${location.name}...`, 'info');

  // Add zoom animation
  mapContainer.classList.add('map-zooming');

  // Calculate center offset for zoom
  const centerX = location.coords.x;
  const centerY = location.coords.y;

  // Apply zoom transform
  setTimeout(() => {
    puneMap.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    puneMap.style.transformOrigin = `${centerX}px ${centerY}px`;
    puneMap.style.transform = 'scale(2)';
    appState.mapZoom = 2;

    // Highlight the location
    highlightMapLocation(location);
  }, 100);

  setTimeout(() => {
    mapContainer.classList.remove('map-zooming');
    showNotification(`Now viewing: ${location.name}`, 'success');
  }, 900);
}

function highlightMapLocation(location) {
  // Remove previous highlights
  document.querySelectorAll('.map-highlight').forEach(el => el.remove());

  const puneMap = document.querySelector('.pune-map');
  if (!puneMap) return;

  // Create highlight element
  const highlight = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  highlight.classList.add('map-highlight');
  highlight.innerHTML = `
    <circle cx="${location.coords.x}" cy="${location.coords.y}" r="50" fill="none" stroke="#5CB8A8" stroke-width="4" class="highlight-pulse"/>
    <circle cx="${location.coords.x}" cy="${location.coords.y}" r="15" fill="#5CB8A8"/>
    <text x="${location.coords.x}" y="${location.coords.y - 60}" text-anchor="middle" class="highlight-label">${location.name}</text>
  `;

  puneMap.appendChild(highlight);

  // Update location cards
  updateLocationCards(location);
}

function updateLocationCards(selectedLocation) {
  const cards = document.querySelectorAll('.location-card');
  cards.forEach(card => {
    card.classList.remove('selected');
    if (card.querySelector('h4')?.textContent.includes(selectedLocation.name.split(' ')[0])) {
      card.classList.add('selected');
    }
  });
}

function resetMapZoom() {
  const puneMap = document.querySelector('.pune-map');
  if (!puneMap) return;

  puneMap.style.transition = 'transform 0.5s ease-out';
  puneMap.style.transform = 'scale(1)';
  appState.mapZoom = 1;
  appState.selectedLocation = null;

  document.querySelectorAll('.map-highlight').forEach(el => el.remove());
  document.querySelectorAll('.location-card').forEach(card => card.classList.remove('selected'));

  showNotification('Map view reset', 'info');
}

// ============================================
// INTERACTIVE MAP
// ============================================
function initializeMap() {
  // Check for pending location from search
  const pendingLocation = localStorage.getItem('pendingLocation');
  if (pendingLocation && window.location.pathname.includes('traffic.html')) {
    localStorage.removeItem('pendingLocation');
    const location = JSON.parse(pendingLocation);
    setTimeout(() => zoomToLocation(location), 500);
  }

  // Make map hotspots clickable
  document.querySelectorAll('.hotspots circle, .hotspots text').forEach(el => {
    el.style.cursor = 'pointer';
    el.addEventListener('click', function (e) {
      const text = this.tagName === 'text' ? this.textContent : this.nextElementSibling?.textContent;
      const location = puneLocations.find(l => l.name.includes(text) || text?.includes(l.name.split(' ')[0]));
      if (location) {
        zoomToLocation(location);
      }
    });
  });

  // Location card clicks
  document.querySelectorAll('.location-card').forEach(card => {
    card.addEventListener('click', function () {
      const name = this.querySelector('h4')?.textContent;
      const location = puneLocations.find(l => l.name.includes(name) || name?.includes(l.name.split(' ')[0]));
      if (location) {
        zoomToLocation(location);
      }
    });
  });
}

// ============================================
// REFRESH DATA WITH ANIMATION
// ============================================
function initializeRefresh() {
  // Add refresh functionality to all refresh buttons
  document.querySelectorAll('[onclick*="Refresh"]').forEach(btn => {
    btn.onclick = null;
    btn.addEventListener('click', refreshAllData);
  });
}

function refreshAllData() {
  if (appState.isRefreshing) return;

  appState.isRefreshing = true;

  // Show loading overlay
  showLoadingOverlay();

  // Disable refresh button
  const refreshBtns = document.querySelectorAll('.btn svg[viewBox*="4 4"]');
  refreshBtns.forEach(svg => {
    svg.closest('.btn')?.classList.add('refreshing');
    svg.style.animation = 'spin 1s linear infinite';
  });

  showNotification('Refreshing traffic data...', 'info');

  setTimeout(() => {
    // Update vehicle count with random change
    const change = Math.floor(Math.random() * 2000) - 1000;
    appState.vehicleCount += change;
    updateVehicleCountDisplay();

    // Update traffic density
    randomizeTrafficDensity();
    updatePieChart();

    // Update signal statuses
    randomizeSignals();
    updateSignalDisplays();

    // Update timestamps
    updateTimestamps();

    // Update table data
    randomizeTableData();

    // Hide loading
    hideLoadingOverlay();

    // Re-enable refresh
    refreshBtns.forEach(svg => {
      svg.closest('.btn')?.classList.remove('refreshing');
      svg.style.animation = '';
    });

    appState.isRefreshing = false;
    showNotification('Data refreshed successfully!', 'success');
  }, 1500);
}

function showLoadingOverlay() {
  let overlay = document.querySelector('.loading-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'loading-overlay';
    overlay.innerHTML = `
      <div class="loading-spinner">
        <div class="spinner"></div>
        <span>Fetching live data...</span>
      </div>
    `;
    document.body.appendChild(overlay);
  }
  overlay.classList.add('active');
}

function hideLoadingOverlay() {
  const overlay = document.querySelector('.loading-overlay');
  if (overlay) overlay.classList.remove('active');
}

function updateVehicleCountDisplay() {
  const countEl = document.getElementById('vehicleCount');
  if (countEl) {
    countEl.classList.add('count-updating');
    countEl.textContent = appState.vehicleCount.toLocaleString();
    setTimeout(() => countEl.classList.remove('count-updating'), 300);
  }
}

function randomizeTrafficDensity() {
  const total = 100;
  appState.trafficDensity.heavy = Math.floor(Math.random() * 20) + 25;
  appState.trafficDensity.moderate = Math.floor(Math.random() * 20) + 30;
  appState.trafficDensity.light = total - appState.trafficDensity.heavy - appState.trafficDensity.moderate;
}

function updatePieChart() {
  const pieSegments = document.querySelectorAll('.pie-segment');
  if (pieSegments.length < 3) return;

  const circumference = 2 * Math.PI * 40; // r=40
  const heavyDash = (appState.trafficDensity.heavy / 100) * circumference;
  const moderateDash = (appState.trafficDensity.moderate / 100) * circumference;
  const lightDash = (appState.trafficDensity.light / 100) * circumference;

  pieSegments[0].setAttribute('stroke-dasharray', `${heavyDash} ${circumference}`);
  pieSegments[1].setAttribute('stroke-dasharray', `${moderateDash} ${circumference}`);
  pieSegments[1].setAttribute('stroke-dashoffset', `-${heavyDash}`);
  pieSegments[2].setAttribute('stroke-dasharray', `${lightDash} ${circumference}`);
  pieSegments[2].setAttribute('stroke-dashoffset', `-${heavyDash + moderateDash}`);

  // Update legend
  document.querySelectorAll('.legend-item').forEach((item, i) => {
    const values = [appState.trafficDensity.heavy, appState.trafficDensity.moderate, appState.trafficDensity.light];
    const labels = ['Heavy', 'Moderate', 'Light'];
    item.querySelector('span:last-child').textContent = `${labels[i]} (${values[i]}%)`;
  });
}

function randomizeSignals() {
  const states = ['red', 'yellow', 'green'];
  Object.keys(appState.signals).forEach(signal => {
    appState.signals[signal] = states[Math.floor(Math.random() * 3)];
  });
}

function updateSignalDisplays() {
  document.querySelectorAll('.signal-card').forEach(card => {
    const name = card.querySelector('.signal-name')?.textContent;
    const state = appState.signals[name];
    if (!state) return;

    const lights = card.querySelectorAll('.signal-light');
    lights.forEach(light => light.classList.remove('active'));

    if (state === 'red') lights[0].classList.add('active');
    else if (state === 'yellow') lights[1].classList.add('active');
    else lights[2].classList.add('active');

    const statusEl = card.querySelector('.signal-status');
    if (statusEl) statusEl.textContent = state === 'red' ? 'Stop' : state === 'yellow' ? 'Caution' : 'Go';
  });
}

function updateTimestamps() {
  document.querySelectorAll('td:last-child').forEach(td => {
    const text = td.textContent;
    if (text.includes('sec') || text.includes('min')) {
      td.textContent = Math.floor(Math.random() * 30 + 1) + ' sec ago';
      td.classList.add('timestamp-updated');
      setTimeout(() => td.classList.remove('timestamp-updated'), 500);
    }
  });
}

function randomizeTableData() {
  // Target both the main data table and the Hotspots table
  document.querySelectorAll('.data-table tbody tr').forEach(row => {
    const cells = row.querySelectorAll('td');

    // Check if it's the Hotspots table by checking for specific headers or context, 
    // or just apply generic logic if columns match expected types.
    // Hotspots table: Location, Area, Vehicle Count, Avg Speed, Status, Action

    // Vehicle Count (Usually index 2 for Hotspots)
    if (cells.length > 2 && cells[2].innerText.match(/[\d,]+/)) {
      const currentCount = parseInt(cells[2].innerText.replace(/,/g, '')) || 5000;
      const change = Math.floor(Math.random() * 2000) - 1000;
      let newCount = currentCount + change;
      if (newCount < 0) newCount = 0;
      cells[2].innerText = newCount.toLocaleString();
      cells[2].classList.add('cell-updated');
      setTimeout(() => cells[2].classList.remove('cell-updated'), 500);
    }

    // Avg Speed (Index 3 for Hotspots)
    if (cells.length > 3 && cells[3].innerText.includes('km/h')) {
      const newSpeed = Math.floor(Math.random() * 40 + 10);
      cells[3].innerText = newSpeed + ' km/h';

      // Update Status based on speed (Index 4)
      if (cells.length > 4) {
        const statusBadge = cells[4].querySelector('.badge');
        if (statusBadge) {
          if (newSpeed < 20) {
            statusBadge.className = 'badge badge-danger';
            statusBadge.innerText = 'Congested';
          } else if (newSpeed < 35) {
            statusBadge.className = 'badge badge-warning';
            statusBadge.innerText = 'Heavy';
          } else {
            statusBadge.className = 'badge badge-success';
            statusBadge.innerText = 'Normal';
          }
        }
      }
    }
  });
}

// ============================================
// FULLSCREEN MAP
// ============================================
function initializeFullscreen() {
  // Check for existing fullscreen button
  const fsButton = document.querySelector('[onclick*="Fullscreen"]');
  if (fsButton) {
    fsButton.onclick = null;
    fsButton.addEventListener('click', toggleFullscreen);
  }
}

function toggleFullscreen() {
  const mapContainer = document.querySelector('.pune-map-container');
  if (!mapContainer) return;

  if (appState.isMapFullscreen) {
    exitFullscreen();
  } else {
    enterFullscreen();
  }
}

function enterFullscreen() {
  const mapContainer = document.querySelector('.pune-map-container');
  if (!mapContainer) return;

  appState.isMapFullscreen = true;

  // Create fullscreen wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'fullscreen-wrapper active';
  wrapper.innerHTML = `
    <div class="fullscreen-header">
      <h2>Pune Traffic Map - Fullscreen View</h2>
      <div class="fullscreen-controls">
        <button class="btn btn-ghost" onclick="resetMapZoom()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
          </svg>
          Reset Zoom
        </button>
        <button class="btn btn-primary" onclick="exitFullscreen()">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="18" height="18">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
          Exit Fullscreen
        </button>
      </div>
    </div>
    <div class="fullscreen-map-area"></div>
  `;

  document.body.appendChild(wrapper);
  document.body.classList.add('no-scroll');

  // Move map to fullscreen
  const mapArea = wrapper.querySelector('.fullscreen-map-area');
  const mapClone = mapContainer.cloneNode(true);
  mapClone.classList.add('fullscreen-map');
  mapArea.appendChild(mapClone);

  // Add escape key listener
  document.addEventListener('keydown', handleEscKey);

  showNotification('Press ESC to exit fullscreen', 'info');
}

function exitFullscreen() {
  appState.isMapFullscreen = false;

  const wrapper = document.querySelector('.fullscreen-wrapper');
  if (wrapper) {
    wrapper.classList.remove('active');
    setTimeout(() => wrapper.remove(), 300);
  }

  document.body.classList.remove('no-scroll');
  document.removeEventListener('keydown', handleEscKey);

  showNotification('Exited fullscreen view', 'info');
}

function handleEscKey(e) {
  if (e.key === 'Escape' && appState.isMapFullscreen) {
    exitFullscreen();
  }
}

// ============================================
// TRAFFIC SIGNAL TOGGLE
// ============================================
function toggleSignal(card, location) {
  const lights = card.querySelectorAll('.signal-light');
  const statusEl = card.querySelector('.signal-status');

  let currentActive = -1;
  lights.forEach((light, index) => {
    if (light.classList.contains('active')) {
      currentActive = index;
      light.classList.remove('active');
    }
  });

  const nextActive = (currentActive + 1) % 3;
  lights[nextActive].classList.add('active');

  const statuses = ['Stop', 'Caution', 'Go'];
  const states = ['red', 'yellow', 'green'];

  statusEl.textContent = statuses[nextActive];
  appState.signals[location] = states[nextActive];

  // Add visual feedback
  card.classList.add('signal-changed');
  setTimeout(() => card.classList.remove('signal-changed'), 500);

  showNotification(`${location} signal changed to ${statuses[nextActive]}`, 'success');
}

// ============================================
// VEHICLE COUNT UPDATE
// ============================================
function updateVehicleCount(change) {
  appState.vehicleCount += change;
  updateVehicleCountDisplay();
  showNotification(`Vehicle count updated: ${change > 0 ? '+' : ''}${change}`, 'info');
}

// ============================================
// NOTIFICATION SYSTEM
// ============================================
function showNotification(message, type = 'info') {
  const existing = document.querySelector('.notification-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `notification-toast notification-${type}`;

  const icons = {
    success: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>',
    error: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>',
    info: '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" width="20" height="20"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>'
  };

  toast.innerHTML = `${icons[type] || icons.info}<span>${message}</span><button onclick="this.parentElement.remove()">&times;</button>`;

  const colors = { success: '#5CB8A8', error: '#EF5350', info: '#6BB3D9' };
  toast.style.cssText = `
    position: fixed; bottom: 24px; right: 24px;
    display: flex; align-items: center; gap: 12px;
    padding: 16px 20px; background: ${colors[type] || colors.info};
    color: white; border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    z-index: 10000; animation: slideIn 0.3s ease;
    max-width: 400px;
  `;
  toast.querySelector('button').style.cssText = `
    background: none; border: none; color: white;
    font-size: 20px; cursor: pointer; padding: 0; line-height: 1; margin-left: 8px;
  `;

  document.body.appendChild(toast);
  setTimeout(() => {
    if (toast.parentElement) {
      toast.style.animation = 'slideOut 0.3s ease forwards';
      setTimeout(() => toast.remove(), 300);
    }
  }, 4000);
}

// ============================================
// UTILITY FUNCTIONS
// ============================================
function setActivePage() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-item').forEach(item => {
    const href = item.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

function updateClock() {
  const clockElement = document.getElementById('currentTime');
  if (clockElement) {
    clockElement.textContent = new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true
    });
  }
}

function exportReport(format) {
  showLoadingOverlay();
  showNotification(`Generating ${format.toUpperCase()} report...`, 'info');
  setTimeout(() => {
    hideLoadingOverlay();
    showNotification(`Report exported as ${format.toUpperCase()}`, 'success');
  }, 2000);
}

// ... (previous code remains)

// ============================================
// PAGINATION & DATA
// ============================================
const itemsPerPage = 7;
let currentPage = 1;
let mockZones = [];

// Generate 847 Mock Zones (Programmatic)
function generateMockZones() {
  const statuses = ['Congested', 'Heavy', 'Moderate', 'Normal'];
  const locations = [
    'Hinjewadi Phase 1', 'FC Road', 'JM Road', 'Koregaon Park', 'Magarpatta City',
    'Aundh', 'Wakad', 'Kothrud Depot', 'Swargate', 'Pune Station',
    'Viman Nagar', 'Kalyani Nagar', 'Hadapsar Gadital', 'Katraj Ghat', 'Chandni Chowk',
    'Baner Road', 'Pashan Sus Road', 'Warje Flyover', 'Sinhagad Road', 'Law College Rd'
  ];

  for (let i = 1; i <= 847; i++) {
    const locBase = locations[i % locations.length];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const speed = status === 'Congested' ? Math.floor(Math.random() * 10) + 5
      : status === 'Heavy' ? Math.floor(Math.random() * 15) + 15
        : status === 'Moderate' ? Math.floor(Math.random() * 20) + 30
          : Math.floor(Math.random() * 20) + 50;

    // Create random variation in vehicle count
    const vehicles = Math.floor(Math.random() * 15000) + 2000;

    mockZones.push({
      id: `PNE-${String(i).padStart(3, '0')}`,
      location: `${locBase} - Zone ${Math.ceil(i / 20)}`,
      vehicles: vehicles,
      speed: speed,
      status: status
    });
  }
}

// Ensure zones are generated on load
generateMockZones();


function initializePagination() {
  const table = document.querySelector('.data-table tbody');
  const paginationControls = document.querySelector('.pagination-controls');
  const showingText = document.querySelector('.pagination-info');

  if (!table || !paginationControls) return;

  function renderTable(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = mockZones.slice(start, end);

    table.innerHTML = pageData.map(zone => `
      <tr>
        <td><strong>${zone.id}</strong></td>
        <td>${zone.location}</td>
        <td>${zone.vehicles.toLocaleString()}</td>
        <td>${zone.speed} km/h</td>
        <td><span class="badge badge-${getStatusColor(zone.status)}">${zone.status}</span></td>
        <td>30 sec ago</td>
      </tr>
    `).join('');

    // Update Showing Text
    if (showingText) {
      showingText.textContent = `Showing ${start + 1} to ${Math.min(end, mockZones.length)} of ${mockZones.length} monitoring zones`;
    }

    // Update Buttons
    updatePaginationButtons();
  }

  function updatePaginationButtons() {
    const totalPages = Math.ceil(mockZones.length / itemsPerPage);
    paginationControls.innerHTML = `
      <button class="btn btn-ghost btn-sm" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>Previous</button>
      ${generatePageNumbers(totalPages)}
      <button class="btn btn-ghost btn-sm" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>Next</button>
    `;
  }

  function generatePageNumbers(total) {
    let buttons = '';
    // Show max 5 page numbers with ellipses
    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(total, startPage + maxPagesToShow - 1);

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    if (startPage > 1) {
      buttons += `<button class="page-btn" onclick="changePage(1)">1</button>`;
      if (startPage > 2) buttons += `<span class="px-2 text-gray-400">...</span>`;
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons += `<button class="page-btn ${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
    }

    if (endPage < total) {
      if (endPage < total - 1) buttons += `<span class="px-2 text-gray-400">...</span>`;
      buttons += `<button class="page-btn" onclick="changePage(${total})">${total}</button>`;
    }

    return buttons;
  }

  window.changePage = function (page) {
    const totalPages = Math.ceil(mockZones.length / itemsPerPage);
    if (page < 1 || page > totalPages) return;
    currentPage = page;
    renderTable(page);
  };

  // Initial Render
  renderTable(1);
}

function getStatusColor(status) {
  if (status === 'Congested') return 'danger';
  if (status === 'Heavy') return 'warning';
  if (status === 'Moderate') return 'primary';
  return 'success';
}

// ============================================
// EXPORT ANALYTICS
// ============================================
function showExportModal() {
  const modalHTML = `
    <div class="modal-overlay active" id="exportModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Export Traffic Data</h3>
          <button class="modal-close" onclick="closeExportModal()">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="modal-body">
          <div class="export-options">
            <button class="export-option-btn" onclick="triggerExport('pdf')">
              <div class="export-icon pdf">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <div class="export-text">
                <span class="export-title">Download PDF Report</span>
                <span class="export-subtitle">Comprehensive analysis & charts</span>
              </div>
            </button>
            <button class="export-option-btn" onclick="triggerExport('csv')">
              <div class="export-icon csv">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="8" y1="13" x2="16" y2="13"></line><line x1="8" y1="17" x2="16" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
              </div>
              <div class="export-text">
                <span class="export-title">Export as CSV</span>
                <span class="export-subtitle">Raw data for spreadsheet analysis</span>
              </div>
            </button>
            <button class="export-option-btn" onclick="triggerExport('whatsapp')">
              <div class="export-icon whatsapp">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </div>
              <div class="export-text">
                <span class="export-title">Share via WhatsApp</span>
                <span class="export-subtitle">Send report link to team</span>
              </div>
            </button>
             <button class="export-option-btn" onclick="triggerExport('email')">
              <div class="export-icon email">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              </div>
              <div class="export-text">
                <span class="export-title">Share via Email</span>
                <span class="export-subtitle">Send to office@punetraffic.gov.in</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function closeExportModal() {
  const modal = document.getElementById('exportModal');
  if (modal) {
    modal.classList.remove('active');
    setTimeout(() => modal.remove(), 300);
  }
}

function triggerExport(type) {
  closeExportModal();
  let msg = '';

  // Ensure we have data
  if (!mockZones || mockZones.length === 0) {
    showNotification('No data available to export.', 'error');
    return;
  }

  const dateStr = new Date().toISOString().slice(0, 10);

  switch (type) {

    case 'pdf':
      // PDF Export with Fallback
      if (typeof html2pdf !== 'undefined') {
        try {
          showNotification('Generating PDF report...', 'info');

          // Prepare data
          const congestedCount = mockZones.filter(z => z.status === 'Congested').length;
          const heavyCount = mockZones.filter(z => z.status === 'Heavy').length;
          const moderateCount = mockZones.filter(z => z.status === 'Moderate').length;
          const normalCount = mockZones.filter(z => z.status === 'Normal').length;

          // Create report container
          const reportContent = document.createElement('div');
          reportContent.innerHTML = `
             <div style="padding: 30px; font-family: 'Inter', sans-serif; color: #111; background: white;">
                <!-- Header -->
                <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 2px solid #1f2937; padding-bottom: 15px; margin-bottom: 20px;">
                    <div>
                        <h1 style="margin: 0; font-size: 24px; color: #1f2937;">Pune Traffic Control</h1>
                        <p style="margin: 5px 0 0; color: #6b7280; font-size: 12px;">Government of Maharashtra</p>
                    </div>
                    <div style="text-align: right;">
                        <h2 style="margin: 0; font-size: 18px; color: #374151;">Traffic Status Report</h2>
                        <p style="margin: 5px 0 0; color: #6b7280; font-size: 12px;">Generated: ${new Date().toLocaleString()}</p>
                    </div>
                </div>
                
                <!-- Executive Summary -->
                <div style="margin-bottom: 30px;">
                    <h3 style="background: #f3f4f6; padding: 10px; border-left: 4px solid #3b82f6; margin-top: 0;">Executive Summary</h3>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; font-size: 14px;">
                        <div>
                            <p><strong>Total Zones Monitored:</strong> ${mockZones.length}</p>
                            <p><strong>Total Vehicles (Est):</strong> ${mockZones.reduce((acc, z) => acc + z.vehicles, 0).toLocaleString()}</p>
                        </div>
                        <div>
                            <p><strong>Congestion Level:</strong> ${Math.round((congestedCount / mockZones.length) * 100)}% of city is congested</p>
                            <p><strong>Active Alerts:</strong> ${appState.notifications ? appState.notifications.filter(n => n.unread).length : 5} critical incidents</p>
                        </div>
                    </div>
                </div>
                
                <!-- Zone Status Distribution -->
                <div style="margin-bottom: 30px;">
                    <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">Zone Status Distribution</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 10px;">
                       <tr>
                          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; color: #dc2626;">Congested</td>
                          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; color: #d97706;">Heavy</td>
                          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; color: #2563eb;">Moderate</td>
                          <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; color: #10b981;">Normal</td>
                       </tr>
                       <tr>
                          <td style="padding: 8px; border: 1px solid #ddd;">${congestedCount} Zones</td>
                          <td style="padding: 8px; border: 1px solid #ddd;">${heavyCount} Zones</td>
                          <td style="padding: 8px; border: 1px solid #ddd;">${moderateCount} Zones</td>
                          <td style="padding: 8px; border: 1px solid #ddd;">${normalCount} Zones</td>
                       </tr>
                    </table>
                </div>

                <!-- Detailed Data Table (Top 100) -->
                <div style="margin-bottom: 20px;">
                    <h3 style="border-bottom: 1px solid #ddd; padding-bottom: 5px;">Detailed Zone Report (Top 100 Locations)</h3>
                    <p style="font-size: 10px; color: #666; margin-bottom: 10px;">* Showing first 100 zones. For full dataset, please export as CSV.</p>
                    <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
                       <thead>
                           <tr style="background: #e5e7eb;">
                              <th style="padding: 6px; border: 1px solid #ccc; text-align: left;">ID</th>
                              <th style="padding: 6px; border: 1px solid #ccc; text-align: left;">Location</th>
                              <th style="padding: 6px; border: 1px solid #ccc; text-align: right;">Vehicles</th>
                              <th style="padding: 6px; border: 1px solid #ccc; text-align: right;">Speed</th>
                              <th style="padding: 6px; border: 1px solid #ccc; text-align: center;">Status</th>
                           </tr>
                       </thead>
                       <tbody>
                           ${mockZones.slice(0, 100).map((zone, i) => `
                              <tr style="background: ${i % 2 === 0 ? '#fff' : '#f9fafb'};">
                                 <td style="padding: 5px; border: 1px solid #ddd;">${zone.id}</td>
                                 <td style="padding: 5px; border: 1px solid #ddd;">${zone.location}</td>
                                 <td style="padding: 5px; border: 1px solid #ddd; text-align: right;">${zone.vehicles.toLocaleString()}</td>
                                 <td style="padding: 5px; border: 1px solid #ddd; text-align: right;">${zone.speed} km/h</td>
                                 <td style="padding: 5px; border: 1px solid #ddd; text-align: center;">${zone.status}</td>
                              </tr>
                           `).join('')}
                       </tbody>
                    </table>
                </div>
                
                <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center; font-size: 10px; color: #999;">
                   CONFIDENTIAL DOCUMENT • FOR OFFICIAL USE ONLY • PUNE TRAFFIC CONTROL SYSTEM
                </div>
             </div>
          `;

          const opt = {
            margin: 0.3,
            filename: `Pune_Traffic_Report_${dateStr}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true }, // Added useCORS
            jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' },
            pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
          };

          html2pdf().set(opt).from(reportContent).save().then(() => {
            showNotification('PDF Report downloaded successfully!', 'success');
          }).catch(err => {
            console.error('PDF Gen Failed:', err);
            // Fallback to print
            if (confirm('PDF generation failed. Use browser print instead?')) {
              const printWindow = window.open('', '_blank');
              printWindow.document.write(reportContent.innerHTML);
              printWindow.document.close();
              printWindow.focus();
              printWindow.print();
            }
          });
        } catch (e) {
          console.error('PDF Logic Error:', e);
          showNotification('Error generating report.', 'error');
        }
      } else {
        alert('Report library missing. Please check your internet connection or try printing the page.');
      }
      break;

    case 'csv':
      // Robust CSV Export
      showNotification('Preparing CSV download...', 'info');

      setTimeout(() => {
        const headers = ['Zone ID', 'Location', 'Vehicle Count', 'Avg Speed (km/h)', 'Status', 'Last Update'];
        const escape = (val) => `"${String(val || '').replace(/"/g, '""')}"`;

        const csvRows = [
          headers.join(','),
          ...mockZones.map(z => {
            return [
              escape(z.id),
              escape(z.location),
              z.vehicles,
              z.speed,
              escape(z.status),
              escape('30 sec ago')
            ].join(',');
          })
        ];

        const csvString = csvRows.join('\n');
        // UTF-8 BOM + CSV Data
        const blob = new Blob(['\uFEFF' + csvString], { type: 'text/csv;charset=utf-8' }); // Fixed MIME
        const url = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", `Pune_Traffic_Data_${dateStr}.csv`);
        link.style.display = 'none'; // Safer than visibility hidden in some contexts
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Cleanup
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        showNotification('CSV Download started!', 'success');
      }, 500); // Slight delay to allow UI to update
      break;

    case 'whatsapp':
      const text = `Pune Traffic Report - ${new Date().toLocaleDateString()}. Total Vehicles: ${appState.vehicleCount.toLocaleString()}. Active Alerts: ${appState.notifications.filter(n => n.unread).length}. View dashboard for details.`;
      const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text)}`;
      window.open(whatsappUrl, '_blank');
      showNotification('Opening WhatsApp...', 'success');
      break;

    case 'email':
      const subject = `Traffic Report - ${new Date().toLocaleDateString()}`;
      const body = `Please find the daily traffic summary attached.\n\nTotal Vehicles: ${appState.vehicleCount.toLocaleString()}\nIncidents: ${appState.activityLog.length}\n\nGenerated by Pune Traffic Control System.`;
      const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.location.href = mailtoUrl;
      showNotification('Opening Email Client...', 'success');
      break;
  }
}

// ============================================
// MONTHLY REPORT FILTERING
// ============================================
function initializeMonthFilter() {
  const monthInput = document.getElementById('monthFilter');
  if (monthInput) {
    monthInput.addEventListener('change', function (e) {
      showNotification(`Loading data for ${new Date(this.value).toLocaleString('default', { month: 'long', year: 'numeric' })}...`, 'info');

      // Simulate Data Update
      document.querySelector('.data-table').style.opacity = '0.5';
      setTimeout(() => {
        randomizeTableData(); // existing function
        updatePieChart(); // existing function
        document.querySelector('.data-table').style.opacity = '1';
        showNotification('Report data updated', 'success');
      }, 800);
    });
  }
}


const originalInit = window.onload || function () { };
document.addEventListener('DOMContentLoaded', function () {
  initializePagination();
  initializeMonthFilter();

  // Initialize Traffic Map Controls if on Traffic Page
  // REMOVED CONFLICTING CALL: initializeTrafficPagination();
  // We rely on universally robust initializePagination() above.

  // Initialize Analytics Controls if on Reports Page
  if (window.location.pathname.includes('reports.html')) {
    initializeAnalyticsControls();
  }

  // Attach export modal to export buttons
  document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent.includes('Export')) {
      btn.onclick = (e) => {
        e.preventDefault();
        showExportModal();
      }
    }
  });

  // Make officer name clickable
  const officerName = document.querySelector('.user-name');
  if (officerName) {
    officerName.parentElement.style.cursor = 'pointer';
    officerName.parentElement.onclick = () => window.location.href = 'officer-profile.html';
  }
});


// ============================================
// NEW FEATURES IMPLEMENTATION
// ============================================

// 1. USER PROFILE & PHOTO
function loadUserProfile() {
  const savedProfile = localStorage.getItem('userProfile');
  if (savedProfile) {
    appState.userProfile = JSON.parse(savedProfile);
  }
  updateProfileUI();
}

function saveUserProfile() {
  localStorage.setItem('userProfile', JSON.stringify(appState.userProfile));
  updateProfileUI();
}

function updateProfileUI() {
  // Update Photo
  if (appState.userProfile.photo) {
    document.querySelectorAll('.user-avatar, .profile-avatar-lg').forEach(el => {
      el.style.backgroundImage = `url(${appState.userProfile.photo})`;
      el.style.backgroundSize = 'cover';
      el.style.backgroundPosition = 'center';
      el.textContent = ''; // Remove text initials
    });
  }

  // Update Text Details (Name, Role, etc across the app)
  document.querySelectorAll('.user-name, .profile-name').forEach(el => el.textContent = appState.userProfile.name);
  document.querySelectorAll('.user-role').forEach(el => el.textContent = appState.userProfile.division);
  document.querySelectorAll('.profile-id').forEach(el => el.textContent = 'ID: ' + appState.userProfile.govtId);

  // Update Mobile
  const mobileInputs = document.querySelectorAll('#mobileInput, .mobile-display');
  mobileInputs.forEach(el => {
    if (el.tagName === 'INPUT') el.value = appState.userProfile.mobile;
    else el.textContent = appState.userProfile.mobile;
  });
}

function initializeSettingsPage() {
  // Populate form with current state
  const p = appState.userProfile;
  if (document.getElementById('fullName')) document.getElementById('fullName').value = p.name;

  const form = document.getElementById('profileForm');
  if (form) {
    if (form.querySelector('input[type="email"]')) form.querySelector('input[type="email"]').value = p.email;
    if (form.querySelector('input[type="tel"]')) form.querySelector('input[type="tel"]').value = p.mobile;

    // Select Division
    const divisionSelect = form.querySelector('select');
    if (divisionSelect) {
      for (let i = 0; i < divisionSelect.options.length; i++) {
        if (divisionSelect.options[i].text === p.division) {
          divisionSelect.selectedIndex = i;
          break;
        }
      }
    }

    // Handle Save Overriding
    const saveBtn = form.querySelector('.btn-primary');
    if (saveBtn) {
      saveBtn.onclick = (e) => {
        e.preventDefault();
        saveSettingsFromForm();
      };
    }
  }

  // Quick Actions Overrides
  document.querySelectorAll('.action-btn').forEach(btn => {
    if (btn.textContent.includes('Sync Data')) btn.onclick = syncData;
    if (btn.textContent.includes('Clear Cache')) btn.onclick = clearCache;
    if (btn.textContent.includes('Backup Data')) btn.onclick = backupData;
  });
}

function syncData() {
  showNotification('Connecting to Central Server...', 'info');
  showLoadingOverlay();

  // Simulate network request
  setTimeout(() => {
    // Merge simulated "server" data
    appState.vehicleCount += Math.floor(Math.random() * 500);
    randomizeTableData();

    hideLoadingOverlay();
    showNotification('Data successfully synced with Database', 'success');
  }, 2000);
}

function clearCache() {
  if (confirm('This will clear all local data and log you out. Continue?')) {
    localStorage.clear();
    showNotification('Cache cleared. Reloading...', 'warning');
    setTimeout(() => window.location.href = 'login.html', 1500);
  }
}

function backupData() {
  const data = JSON.stringify(appState, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `PuneTraffic_Backup_${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  showNotification('Backup downloaded successfully', 'success');
}

function saveSettingsFromForm() {
  const form = document.getElementById('profileForm');
  if (!form) return;

  const name = document.getElementById('fullName').value;
  const email = form.querySelector('input[type="email"]').value;
  const mobile = form.querySelector('input[type="tel"]').value;
  const division = form.querySelector('select').options[form.querySelector('select').selectedIndex].text;

  appState.userProfile = {
    ...appState.userProfile,
    name, email, mobile, division
  };

  saveUserProfile();
  showNotification('Profile updated successfully!', 'success');
}

function initializePhotoUpload() {
  // This function sets up the hidden file input handler if it exists
  const fileInput = document.getElementById('photoInput');
  if (fileInput) {
    fileInput.addEventListener('change', function (e) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
          appState.userProfile.photo = event.target.result;
          saveUserProfile();
          showNotification('Profile photo updated successfully', 'success');
        };
        reader.readAsDataURL(file);
      }
    });
  }
}

function triggerPhotoUpload() {
  document.getElementById('photoInput')?.click();
}

function updateUserMobile(newNumber) {
  appState.userProfile.mobile = newNumber;
  saveUserProfile();
  showNotification('Mobile number updated', 'success');
}

// 2. ACTIVITY LOG
function loadActivityLog() {
  const savedLog = localStorage.getItem('activityLog');
  if (savedLog) {
    appState.activityLog = JSON.parse(savedLog);
  } else {
    // Initial seeds if empty
    addActivityLog('System started', 'info');
  }
}

function addActivityLog(text, type = 'info') {
  const log = {
    text: text,
    type: type,
    time: new Date().toLocaleTimeString(),
    timestamp: Date.now(),
    location: puneLocations[Math.floor(Math.random() * puneLocations.length)].name // Add random location for filtering context
  };

  appState.activityLog.unshift(log); // Add to top
  // Keep larger history in storage but usually show less in widget
  if (appState.activityLog.length > 200) appState.activityLog.pop(); // Increased limit

  localStorage.setItem('activityLog', JSON.stringify(appState.activityLog));
  renderActivityLog();
}

function renderActivityLog() {
  // Homepage Widget logic
  const container = document.querySelector('.activity-log-list');
  if (!container) return;

  // Show only top 5 in widget
  const displayLogs = appState.activityLog.slice(0, 5);

  container.innerHTML = displayLogs.map(log => `
    <div class="log-item">
      <div class="log-dot" style="background: var(--${log.type === 'alert' ? 'danger' : log.type === 'warning' ? 'warning' : 'primary'}-500)"></div>
      <div class="log-content">
        <div class="log-text">${log.text}</div>
        <div class="log-meta">
            ${log.time} 
            ${(log.type === 'alert' || log.type === 'warning') ? `• <a href="#" onclick="event.preventDefault(); SecureModule.launchFeedForLocation('${getErrorLocation(log.text)}')">View Cam</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}
// Helper to extract location from text properly
function getErrorLocation(text) {
  // Simple extraction logic for demo
  if (text.includes('Hinjewadi')) return 'Hinjewadi';
  if (text.includes('Chandni Chowk')) return 'Chandni Chowk';
  if (text.includes('Shivajinagar')) return 'Shivajinagar';
  if (text.includes('Nal Stop')) return 'Nal Stop';
  if (text.includes('FC Road')) return 'FC Road';
  return 'Unknown Location';
}

function openActivityLogModal() {
  const modalHTML = `
    <div class="modal-overlay active" id="activityLogModal">
      <div class="modal-content" style="max-width: 600px;">
        <div class="modal-header">
          <h3>Recent Activity Log</h3>
          <button class="close-modal" onclick="document.getElementById('activityLogModal').remove()">&times;</button>
        </div>
        <div class="modal-body">
          <input type="text" placeholder="Filter activity..." class="form-control mb-4" oninput="filterActivityLog(this.value)" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 16px;">
          <div class="full-log-list" style="max-height: 400px; overflow-y: auto;">
             ${generateLogListHTML(appState.activityLog)}
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function filterActivityLog(query) {
  const term = query.toLowerCase();
  const filtered = appState.activityLog.filter(log =>
    log.text.toLowerCase().includes(term) ||
    log.type.toLowerCase().includes(term)
  );
  document.querySelector('.full-log-list').innerHTML = generateLogListHTML(filtered);
}

function generateLogListHTML(logs) {
  if (logs.length === 0) return '<div class="text-center text-gray-500 py-4">No activity found.</div>';
  return logs.map(log => `
    <div class="log-item" style="padding: 10px; border-bottom: 1px solid #eee;">
      <div class="log-dot" style="background: var(--${log.type === 'alert' ? 'danger' : log.type === 'warning' ? 'warning' : 'primary'}-500)"></div>
      <div class="log-content">
        <div class="log-text">${log.text}</div>
        <div class="log-meta" style="font-size: 12px; color: #888;">
            ${log.time} • ${new Date(log.timestamp).toLocaleDateString()}
            ${(log.type === 'alert' || log.type === 'warning') ? `• <a href="#" style="color: #3B82F6;" onclick="event.preventDefault(); document.getElementById('activityLogModal').remove(); SecureModule.launchFeedForLocation('${getErrorLocation(log.text)}')">View Feed</a>` : ''}
        </div>
      </div>
    </div>
  `).join('');
}

function simulateActivity() {
  const actions = [
    { text: 'Signal logic optimized at Shivajinagar', type: 'success' },
    { text: 'Congestion detected at Chandni Chowk', type: 'warning' },
    { text: 'Camera 04 went offline at Hinjewadi', type: 'alert' },
    { text: 'VIP movement cleared at Airport', type: 'info' },
    { text: 'Ambulance cleared at JM Road', type: 'success' },
    { text: 'Traffic violation detected at FC Road', type: 'warning' },
    { text: 'Accident reported at Nal Stop', type: 'alert' }
  ];
  const randomAction = actions[Math.floor(Math.random() * actions.length)];
  addActivityLog(randomAction.text, randomAction.type);
}

// 3. NOTIFICATIONS
function initializeNotifications() {
  const bellBtn = document.querySelector('.header-btn .notification-badge')?.parentElement;
  if (!bellBtn) return;

  // Create Dropdown if missing
  let dropdown = document.querySelector('.notification-dropdown');
  if (!dropdown) {
    dropdown = document.createElement('div');
    dropdown.className = 'notification-dropdown';
    const container = document.querySelector('.header-right') || document.querySelector('.header-search');
    container.appendChild(dropdown);
  }

  bellBtn.onclick = (e) => {
    e.stopPropagation();
    dropdown.classList.toggle('active');
    renderNotifications();
  };

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target) && !bellBtn.contains(e.target)) {
      dropdown.classList.remove('active');
    }
  });
}

function renderNotifications() {
  const container = document.querySelector('.notification-dropdown');
  if (!container) return;

  const savedAndNew = appState.notifications; // In real app, merge or fetch

  const badge = document.querySelector('.notification-badge');
  if (badge) {
    const unread = savedAndNew.filter(n => n.unread).length;
    badge.style.display = unread > 0 ? 'block' : 'none';
  }

  container.innerHTML = `
    <div class="notification-header">
      <span>Notifications</span>
      <button class="clear-all-btn" onclick="clearNotifications()">Mark all read</button>
    </div>
    ${savedAndNew.map(n => `
      <div class="notification-item ${n.unread ? 'unread' : ''}" onclick="handleNotificationClick(${n.id})">
        <div class="n-icon ${n.type}">
           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        </div>
        <div class="n-content">
          <h4>${n.title}</h4>
          <p>${n.text}</p>
          <span class="n-time">${n.time}</span>
        </div>
      </div>
    `).join('')}
  `;
}

function handleNotificationClick(id) {
  const notif = appState.notifications.find(n => n.id === id);
  if (notif) {
    notif.unread = false;
    renderNotifications();
    showNotification(`Navigating to alert: ${notif.title}`, 'info');

    // Logic to zoom to location OR open camera
    if (notif.title.includes('Congestion') || notif.title.includes('Accident') || notif.text.includes('critical')) {
      // Secure Camera Launch
      const location = getErrorLocation(notif.text);
      if (location !== 'Unknown Location') {
        SecureModule.launchFeedForLocation(location);
        return;
      }
    }

    // Fallback to map zoom
    if (notif.text.includes('Hinjewadi')) selectAndZoomLocation('hinjewadi');
    if (notif.text.includes('Nal Stop')) selectAndZoomLocation('nal-stop');
  }
}

function clearNotifications() {
  appState.notifications.forEach(n => n.unread = false);
  renderNotifications();
}

// 4. VIEW ALL MODAL
function openViewAllModal() {
  const modalHTML = `
    <div class="modal-overlay active" id="viewAllModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>All Pune Monitoring Zones (${puneLocations.length})</h3>
          <button class="close-modal" onclick="document.getElementById('viewAllModal').remove()">&times;</button>
        </div>
        <div class="modal-body">
          <input type="text" placeholder="Filter locations..." class="form-control mb-4" oninput="filterModalList(this.value)" style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 8px; margin-bottom: 16px;">
          <div class="locations-list-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            ${puneLocations.map(loc => `
              <div class="loc-item" style="padding: 12px; border: 1px solid #eee; border-radius: 8px; cursor: pointer; display: flex; justify-content: space-between; align-items: center;" onclick="selectFromModal('${loc.id}')">
                <div>
                  <div style="font-weight: 600;">${loc.name}</div>
                  <div style="font-size: 12px; color: #888;">${loc.area} • ${loc.type}</div>
                </div>
                <span class="badge badge-${loc.traffic === 'heavy' ? 'danger' : loc.traffic === 'moderate' ? 'warning' : 'success'}">${loc.traffic}</span>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
}

function filterModalList(query) {
  const term = query.toLowerCase();
  document.querySelectorAll('.loc-item').forEach(item => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.includes(term) ? 'flex' : 'none';
  });
}


function selectFromModal(id) {
  document.getElementById('viewAllModal').remove();
  selectAndZoomLocation(id);
}

// 5. LIVE CAMERAS MODULE
let cameraVideoMap = null;

async function initializeCameras() {
  const grid = document.getElementById('cameraGrid');
  if (!grid) return;

  // Fetch Video Map
  try {
    const response = await fetch('js/camera-video-map.json');
    cameraVideoMap = await response.json();
  } catch (e) {
    console.warn('Could not load camera video map', e);
    cameraVideoMap = {};
  }

  renderCameraGrid(puneLocations);

  const searchInput = document.getElementById('cameraSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const term = e.target.value.toLowerCase();
      const filtered = puneLocations.filter(l =>
        l.name.toLowerCase().includes(term) ||
        l.area.toLowerCase().includes(term)
      );
      renderCameraGrid(filtered);
    });
  }
}

function renderCameraGrid(locations) {
  const grid = document.getElementById('cameraGrid');
  if (!grid) return;

  if (locations.length === 0) {
    grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--gray-500); padding: 2rem;">No cameras found matching your search.</div>';
    return;
  }

  grid.innerHTML = locations.map((loc, index) => {
    // Logic for mapped video
    const videoPath = cameraVideoMap && cameraVideoMap[loc.name];

    let mediaContent;
    if (videoPath) {
      mediaContent = `
             <video autoplay muted loop playsinline style="width: 100%; height: 100%; object-fit: cover; opacity: 0.9;">
                <source src="${videoPath}" type="video/mp4">
             </video>
          `;
    } else {
      // Default placeholder or "No camera available" for explicit request?
      // User said: "If no video exists, show: 'No camera available for this area.'"
      // But usually we might want a fallback for demo. 
      // However, user was specific.
      mediaContent = `
             <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; background: #000; color: #666; font-size: 14px; text-align: center; padding: 20px;">
                No camera available for this area.
             </div>
          `;
    }

    // If it's a "live" looking demo, maybe we want at least a static image fallback if file missing?
    // But adhering strictly to user request:

    return `
    <div class="camera-card">
      <div class="camera-feed-container" style="position: relative; width: 100%; height: 225px; background: #000; overflow: hidden;">
         ${mediaContent}
         <div class="camera-overlay">
            <span class="cam-badge">${loc.name}</span>
            <span class="cam-live" style="${videoPath ? '' : 'background: #666;'}">${videoPath ? 'LIVE' : 'OFFLINE'}</span>
            <span class="cam-time">${new Date().toLocaleTimeString()}</span>
         </div>
      </div>
    </div>
  `}).join('');
}

