/**
 * Secure Live Cameras Module
 * Handles Biometric Auth, Location Hierarchy, and Video Feeds
 */

const SecureModule = {
    state: {
        isAuthenticated: false,
        selectedState: '',
        selectedCity: '',
        selectedArea: '',
        isMonitoring: false
    },

    // UI Components
    stateSelect: null,
    citySelect: null,
    areaSelect: null,

    init() {
        console.log('Secure Cam Module Initialized');

        // Attach event listeners for close buttons
        document.querySelectorAll('.close-secure-modal').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const modalId = e.target.closest('.secure-modal-backdrop').id;
                SecureModule.closeModal(modalId);
            });
        });

        // Initialize Searchable Dropdowns
        // Note: These IDs must correspond to DIVs in HTML, not SELECT tags anymore
        this.stateSelect = new SearchableSelect('secureStateSelect', 'Select State', (val) => this.onStateChange(val));
        this.citySelect = new SearchableSelect('secureCitySelect', 'Select City', (val) => this.onCityChange(val));
        this.areaSelect = new SearchableSelect('secureAreaSelect', 'Select Area', (val) => this.onAreaChange(val));
    },

    // NEW: Quick Launch from Dashboard
    pendingRedirectArea: null,

    launchFeedForLocation(areaName) {
        if (this.state.isAuthenticated) {
            // Already auth'd, just open
            // We need to infer State/City? For now, we'll assume Pune/Maharashtra for this demo app context
            // or just show the feed with the passed name.
            this.state.selectedCity = "Pune";
            this.state.selectedState = "Maharashtra";
            this.state.selectedArea = areaName;
            this.openCameraModal(areaName);
        } else {
            // Need Auth
            this.pendingRedirectArea = areaName;
            this.openAuth();
        }
    },

    openAuth() {
        document.getElementById('biometricModal').classList.add('active');
        // Reset state
        const icon = document.querySelector('.bio-icon');
        const status = document.getElementById('bioStatus');
        const line = document.querySelector('.scan-line');

        icon.classList.remove('scanning', 'success', 'error');
        line.style.display = 'none';
        status.innerText = "Place finger or face camera to scan";
        status.style.color = "#9CA3AF";
    },

    startScan() {
        const icon = document.querySelector('.bio-icon');
        const status = document.getElementById('bioStatus');
        const line = document.querySelector('.scan-line');

        // scanning state
        icon.classList.add('scanning');
        line.style.display = 'block';
        status.innerText = "Verifying identity...";
        status.style.color = "#60A5FA";

        // Random delay for realism (2-3 seconds)
        setTimeout(() => {
            SecureModule.completeAuth(true); // Simulate success
        }, 2000);
    },

    completeAuth(success) {
        const icon = document.querySelector('.bio-icon');
        const status = document.getElementById('bioStatus');
        const line = document.querySelector('.scan-line');

        icon.classList.remove('scanning');
        line.style.display = 'none';

        if (success) {
            icon.classList.add('success');
            status.innerText = "Access Granted.";
            status.style.color = "#34D399";
            this.state.isAuthenticated = true; // Set Auth State

            // Log access
            const officer = document.getElementById('userName') ? document.getElementById('userName').innerText : 'Unknown Officer';
            console.log(`[SECURE LOG] Access Granted to ${officer} at ${new Date().toISOString()}`);

            setTimeout(() => {
                SecureModule.closeModal('biometricModal');

                // CHECK PENDING REDIRECT
                if (this.pendingRedirectArea) {
                    this.state.selectedCity = "Pune"; // Default context for quick launch
                    this.state.selectedState = "Maharashtra";
                    this.openCameraModal(this.pendingRedirectArea);
                    this.pendingRedirectArea = null; // Clear it
                } else {
                    SecureModule.openLocationSelector();
                }
            }, 800);
        } else {
            icon.classList.add('error');
            status.innerText = "Access Denied.";
            status.style.color = "#EF4444";
        }
    },

    async openLocationSelector() {
        document.getElementById('locationModal').classList.add('active');

        // Show loading state for States
        const triggerText = document.querySelector('#secureStateSelect .trigger-text');
        if (triggerText) triggerText.textContent = "Loading States...";
        this.stateSelect.disable();

        try {
            // Load States from LocationService
            const states = await LocationService.getStates();
            this.stateSelect.setOptions(states);
            this.stateSelect.enable();
            if (triggerText) triggerText.textContent = "Select State";
        } catch (e) {
            console.error("State fetch failed", e);
            if (triggerText) triggerText.textContent = "Error loading states";
        }

        // Reset children
        this.citySelect.reset();
        this.areaSelect.reset();
    },

    async onStateChange(stateName) {
        this.state.selectedState = stateName;

        // Show loading state
        this.citySelect.disable(); // Temporary disable
        // You might want to update the placeholder text to "Loading..." if the component supported it, 
        // but for now we look for the trigger text
        const triggerText = document.querySelector('#secureCitySelect .trigger-text');
        if (triggerText) triggerText.textContent = "Loading Cities...";

        // Fetch Cities Async
        try {
            const cities = await LocationService.getCities(stateName);
            this.citySelect.setOptions(cities);
            this.citySelect.enable();
            // Reset trigger text is handled by setOptions/enable logic usually, 
            // but we ensure it prompts for selection
            if (triggerText) triggerText.textContent = "Select City";
        } catch (e) {
            console.error("City fetch failed", e);
            if (triggerText) triggerText.textContent = "Error loading cities";
        }

        this.areaSelect.reset();
    },

    async onCityChange(cityName) {
        this.state.selectedCity = cityName;

        // Show loading state
        this.areaSelect.disable();
        const triggerText = document.querySelector('#secureAreaSelect .trigger-text');
        if (triggerText) triggerText.textContent = "Loading Areas...";

        try {
            const towns = await LocationService.getAreas(cityName, this.state.selectedState);
            this.areaSelect.setOptions(towns);
            this.areaSelect.enable();
            if (triggerText) triggerText.textContent = "Select Area";
        } catch (e) {
            console.error("Area fetch failed", e);
            if (triggerText) triggerText.textContent = "Error loading areas";
        }
    },

    onAreaChange(areaName) {
        this.state.selectedArea = areaName;
    },

    launchFeed() {
        const { selectedState, selectedCity, selectedArea } = this.state;
        if (!selectedState || !selectedCity || !selectedArea) {
            alert("Please complete the location selection.");
            return;
        }

        SecureModule.closeModal('locationModal');
        SecureModule.openCameraModal(selectedArea);
    },

    openCameraModal(areaName) {
        console.log('[SecureModule] Opening Camera Modal for:', areaName);
        document.getElementById('cameraFeedModal').classList.add('active');

        // UPDATE UI FIRST - Ensure text updates even if video logic fails
        const displayCity = this.state.selectedCity || "Pune";
        const displayName = areaName && areaName !== 'Select Area' ? areaName : "Unknown Area";
        const nameEl = document.getElementById('feedAreaName');
        if (nameEl) nameEl.innerText = `${displayName}, ${displayCity}`;

        // Determine if camera exists
        let videoData = null;
        let cameraExists = false;

        try {
            if (typeof VideoUtils !== 'undefined') {
                videoData = VideoUtils.getVideo(areaName);
                cameraExists = !!videoData;
            } else {
                console.error('[SecureModule] VideoUtils is NOT defined! Check script loading.');
                // Fallback manually if Utils missing
                videoData = { type: 'mp4', src: 'dummy_feed.mp4' };
                cameraExists = true;
            }
        } catch (e) {
            console.error('[SecureModule] Error getting video:', e);
            videoData = { type: 'mp4', src: 'dummy_feed.mp4' };
            cameraExists = true;
        }

        console.log('[SecureModule] Video Decision:', { cameraExists, videoData });

        const feedContainer = document.getElementById('secureFeedContent');
        const noSignalContainer = document.getElementById('noSignalContent');
        const headerInfo = document.getElementById('feedId');

        if (cameraExists) {
            feedContainer.style.display = 'flex';
            noSignalContainer.style.display = 'none';
            headerInfo.style.color = '#9CA3AF';
            headerInfo.innerText = `ID: CAM-${Math.floor(Math.random() * 10000 + 1000)}`;

            // Clear previous content
            // keep the overlay elements

            const overlays = Array.from(feedContainer.querySelectorAll('.live-overlay, .timestamp-overlay, .alert-overlay'));

            feedContainer.innerHTML = ''; // Clear all

            let playerHtml = '';

            if (videoData && videoData.type === 'mp4') {
                playerHtml = `
                    <video autoplay muted playsinline controls loop style="width:100%; height:100%; object-fit:cover; position:absolute; top:0; left:0; z-index:1; background: black;"
                        onerror="
                            console.error('Video Error:', this.error);
                            // Avoid infinite loop if dummy itself fails
                            if (this.src.includes('dummy_feed.mp4')) {
                                this.style.display='none';
                                document.getElementById('videoErrorOverlay').style.display='flex';
                                document.getElementById('errorPath').innerText = 'dummy_feed.mp4';
                            } else {
                                console.warn('Primary video failed, switching to fallback dummy_feed.mp4');
                                this.src = 'dummy_feed.mp4';
                                this.load();
                                this.play();
                            }
                        ">
                        <source src="${videoData.src}" type="video/mp4">
                        Your browser does not support video playback.
                    </video>
                    <div id="videoErrorOverlay" style="display:none; position:absolute; top:0; left:0; width:100%; height:100%; background:#111; color:#EF4444; flex-direction:column; align-items:center; justify-content:center; z-index:0; text-align:center; padding:20px;">
                       <h3 style="margin-bottom:10px;">Video Failed to Load</h3>
                       <p style="color:#9CA3AF; margin-bottom:5px;">Could not play file:</p>
                       <code id="errorPath" style="background:#333; color:#fff; padding:4px 8px; border-radius:4px; font-size:12px;">${videoData.src}</code>
                       <p style="color:#6B7280; margin-top:15px; font-size:12px;">Please check if the file exists in the correct folder.</p>
                    </div>
                `;
            } else if (videoData && videoData.type === 'youtube') {
                playerHtml = `
                    < iframe
                src = "${VideoUtils.getEmbedUrl(videoData.id)}"
                style = "width:100%; height:100%; border:none; position:absolute; top:0; left:0; z-index:1;"
                allow = "autoplay; encrypted-media"
                allowfullscreen >
        </iframe >
    `;
            } else {
                playerHtml = `
    < div style = "color:white; display:flex; align-items:center; justify-content:center; height:100%; background:#000;" >
        No camera available for this area
        </div >
    `;
            }


            feedContainer.innerHTML = playerHtml;
            // Restore overlays
            overlays.forEach(el => {
                el.style.zIndex = '2'; // Ensure on top
                feedContainer.appendChild(el);
            });

            // Disable Copy/Right Click
            feedContainer.addEventListener('contextmenu', e => e.preventDefault());

            this.startFeedTimer();
            this.simulateAlerts();
        } else {
            feedContainer.style.display = 'none';
            noSignalContainer.style.display = 'flex';
            headerInfo.innerText = "OFFLINE";
            headerInfo.style.color = '#EF4444';
        }

        // Log Access
        const officer = document.getElementById('userName') ? document.getElementById('userName').innerText : 'Unknown Officer';
        const status = cameraExists ? "ACTIVE" : "NOT_INSTALLED";
        console.log(`[SECURE LOG] Feed Access: ${areaName} | User: ${officer} | Status: ${status} `);
    },

    startFeedTimer() {
        const timeEl = document.getElementById('feedTimestamp');
        if (this.feedInterval) clearInterval(this.feedInterval);

        this.feedInterval = setInterval(() => {
            const now = new Date();
            timeEl.innerText = now.toLocaleString('en-IN', { hour12: false });
        }, 1000);
    },

    simulateAlerts() {
        const hasAlert = Math.random() > 0.7; // 30% chance
        const alertEl = document.getElementById('feedAlert');
        if (hasAlert) {
            alertEl.style.display = 'block';
            alertEl.innerText = Math.random() > 0.5 ? "⚠ ACCIDENT DETECTED" : "⚠ HEAVY CONGESTION";
        } else {
            alertEl.style.display = 'none';
        }
    },

    closeModal(modalId) {
        document.getElementById(modalId).classList.remove('active');
        if (modalId === 'cameraFeedModal') {
            if (this.feedInterval) clearInterval(this.feedInterval);

            // Stop Video (Reset SRC)
            const feedContainer = document.getElementById('secureFeedContent');
            if (feedContainer) {
                // Remove iframe to stop audio
                const iframe = feedContainer.querySelector('iframe');
                if (iframe) iframe.remove();

                // Restore placeholder image just in case (optional, but keeps structure)
                // actually we regenerate it on open, so just clearing is fine.
            }
        }
    }
};

// Initialize
document.addEventListener('DOMContentLoaded', () => SecureModule.init());
