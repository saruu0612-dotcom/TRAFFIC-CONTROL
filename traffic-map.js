/**
 * TrafficMap Controller
 * Uses Leaflet.js to render a live map of India.
 * Handles markers, traffic layers, and camera feed integration.
 */

const TrafficMap = {
    map: null,
    markers: [],

    // Map Layers
    streetLayer: null,
    satelliteLayer: null,

    // Default View: India Center
    defaultCenter: [20.5937, 78.9629],
    defaultZoom: 5,

    // India Bounds (Approx)
    indiaBounds: [
        [6.5, 68.1],   // South West
        [35.5, 97.4]   // North East
    ],

    init() {
        console.log("Initializing Traffic Map...");

        // 1. Initialize Map
        this.map = L.map('map', {
            center: this.defaultCenter,
            zoom: this.defaultZoom,
            minZoom: 4,
            maxBounds: this.indiaBounds,
            maxBoundsViscosity: 1.0, // Hard bounce back
            zoomControl: false // We relocate it
        });

        L.control.zoom({ position: 'bottomright' }).addTo(this.map);

        // 2. Define Layers

        // Standard OpenStreetMap (Street View)
        this.streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        });

        // Esri World Imagery (Satellite View - Free)
        this.satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri',
            maxZoom: 18
        });

        // Add default layer
        this.streetLayer.addTo(this.map);

        // 3. Add Traffic Markers (Sample Data simulating API)
        this.loadTrafficMarkers();

        // 4. Setup Search Listener
        this.setupSearch();

        // 5. Relocate to Pune if it's the specific dashboard context
        // Fly to Pune after a short delay for effect
        setTimeout(() => {
            this.map.flyTo([18.5204, 73.8567], 13, { duration: 2 });
        }, 1000);
    },

    toggleSatellite() {
        if (this.map.hasLayer(this.satelliteLayer)) {
            this.map.removeLayer(this.satelliteLayer);
            this.map.addLayer(this.streetLayer);
        } else {
            this.map.removeLayer(this.streetLayer);
            this.map.addLayer(this.satelliteLayer);
        }
    },

    resetToHome() {
        this.map.flyTo([18.5204, 73.8567], 13);
    },

    loadTrafficMarkers() {
        // Sample Hotspots in Pune
        const hotspots = [
            { lat: 18.5913, lng: 73.7389, title: "Hinjewadi IT Park", status: "danger", count: "12,567" }, // Heavy
            { lat: 18.5074, lng: 73.8077, title: "Kothrud", status: "warning", count: "8,234" }, // Moderate
            { lat: 18.5203, lng: 73.8567, title: "Shivaji Nagar", status: "success", count: "5,432" }, // Normal
            { lat: 18.5289, lng: 73.8744, title: "Pune Station", status: "warning", count: "6,789" }, // Heavy
            { lat: 18.5089, lng: 73.9259, title: "Hadapsar", status: "danger", count: "15,890" }, // Congested
            { lat: 18.4529, lng: 73.8552, title: "Katraj", status: "warning", count: "9,876" }, // Moderate
            { lat: 18.5679, lng: 73.9143, title: "Viman Nagar", status: "success", count: "4,123" }, // Normal
            { lat: 18.5590, lng: 73.7868, title: "Baner", status: "success", count: "3,500" } // Normal
        ];

        hotspots.forEach(spot => {
            const color = spot.status === 'danger' ? '#EF4444' : (spot.status === 'warning' ? '#F59E0B' : '#10B981');

            // Custom Pulse Icon
            const iconHtml = `
                <div style="position: relative; width: 20px; height: 20px;">
                    <div style="
                        position: absolute;
                        top: 0; left: 0;
                        width: 20px; height: 20px;
                        background: ${color};
                        border-radius: 50%;
                        border: 2px solid white;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                    "></div>
                    <div class="pulse-marker" style="
                        position: absolute;
                        top: -5px; left: -5px;
                        width: 30px; height: 30px;
                        border-radius: 50%;
                        border: 2px solid ${color};
                        opacity: 0.5;
                        animation: pulse-ring 2s infinite;
                    "></div>
                </div>
            `;

            const icon = L.divIcon({
                html: iconHtml,
                className: 'custom-marker-icon',
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });

            const marker = L.marker([spot.lat, spot.lng], { icon: icon }).addTo(this.map);

            // Popup
            const popupContent = `
                <div style="font-family: 'Inter', sans-serif; padding: 5px;">
                    <h3 style="margin: 0 0 5px 0; font-size: 14px; font-weight: 600;">${spot.title}</h3>
                    <div style="display: flex; gap: 5px; margin-bottom: 5px;">
                        <span style="background: ${color}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: bold;">
                            ${spot.status.toUpperCase()}
                        </span>
                        <span style="font-size: 11px; color: #6B7280;">${spot.count} vehicles</span>
                    </div>
                    <button 
                        onclick="SecureModule.launchFeedForLocation('${spot.title}');"
                        style="
                            background: #2563EB; 
                            color: white; 
                            border: none; 
                            width: 100%;
                            padding: 6px; 
                            border-radius: 4px; 
                            font-size: 11px; 
                            cursor: pointer;
                            font-weight: 500;
                        "
                    >
                        View Live Feed
                    </button>
                </div>
            `;

            marker.bindPopup(popupContent);
        });
    },

    setupSearch() {
        const searchInput = document.getElementById('searchInput');
        let debounceTimer;

        searchInput.addEventListener('input', (e) => {
            clearTimeout(debounceTimer);
            const query = e.target.value;

            if (query.length < 3) return;

            debounceTimer = setTimeout(async () => {
                // Use LocationService logic or direct Nominatim for simple map jump
                try {
                    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${query}+India&format=json&limit=1`);
                    const data = await response.json();

                    if (data && data.length > 0) {
                        const { lat, lon } = data[0];
                        this.map.flyTo([lat, lon], 14);
                        showNotification(`Navigating to ${data[0].name.split(',')[0]}`, 'success');
                    }
                } catch (err) {
                    console.error("Map search failed", err);
                }
            }, 800);
        });
    }
};

// Initialize on Load
document.addEventListener('DOMContentLoaded', () => {
    TrafficMap.init();
});
