/**
 * TrafficDataManager
 * Centralizes data generation for Traffic Map, Analytics, and Reports.
 * Implements deterministic RNG based on date seeds to ensure data consistency.
 */

class TrafficDataManager {
    constructor() {
        this.zones = this.generateZones(847); // Generate 847 virtual zones as per UI
        this.pageSize = 7;
        this.currentTrafficPage = 1;
        this.currentDate = new Date();
    }

    // Seeded Random Number Generator
    // Allows us to get the same "random" numbers for a specific day
    seededRandom(seed) {
        let x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
    }

    generateZones(count) {
        const zones = [];
        const areas = ['Hinjewadi', 'Kothrud', 'Viman Nagar', 'Hadapsar', 'Shivaji Nagar', 'Baner', 'Aundh', 'Wakad', 'Koregaon Park', 'Swargate', 'Katraj', 'FC Road', 'JM Road', 'Magarpatta'];

        for (let i = 1; i <= count; i++) {
            const area = areas[i % areas.length];
            zones.push({
                id: `PNE-${String(i).padStart(3, '0')}`,
                location: `${area} - Sector ${Math.floor(i / areas.length) + 1}`,
                areaName: area,
                baseVolume: 2000 + (Math.random() * 8000), // Random base volume
                baseSpeed: 10 + (Math.random() * 50)         // Random base speed
            });
        }
        return zones;
    }

    // Get Traffic Data for a specific page and date
    // deterministically modifies base data based on the date
    getTrafficPage(page, dateString) {
        this.currentTrafficPage = page;
        const seed = this.getDateSeed(dateString);

        const start = (page - 1) * this.pageSize;
        const end = start + this.pageSize;
        const slicedZones = this.zones.slice(start, end);

        return slicedZones.map((zone, index) => {
            // Use seed + zoneIndex to make specific zone data distinctive but consistent for the day
            const dailyFluctuation = this.seededRandom(seed + index);

            let currentVolume = Math.floor(zone.baseVolume * (0.8 + dailyFluctuation * 0.4));
            let currentSpeed = Math.floor(zone.baseSpeed * (0.8 + (1 - dailyFluctuation) * 0.4));

            // Derive Status
            let status = 'Normal';
            if (currentSpeed < 20) status = 'Congested';
            else if (currentSpeed < 35) status = 'Heavy';

            // Randomize "Last Update" slightly so they look live
            const sec = Math.floor(this.seededRandom(seed + index * 2) * 60);

            return {
                ...zone,
                vehicleCount: currentVolume,
                avgSpeed: currentSpeed,
                status: status,
                lastUpdate: `${sec} sec ago`
            };
        });
    }

    getAnalyticsData(dateString) {
        const seed = this.getDateSeed(dateString);

        // Total Vehicles (in Millions)
        const totalVehicles = (35 + (this.seededRandom(seed) * 20)).toFixed(1) + 'M';

        // Signal Uptime
        const uptime = (92 + (this.seededRandom(seed + 1) * 7)).toFixed(1) + '%';

        // Avg Wait Time
        const waitTime = (2.5 + (this.seededRandom(seed + 2) * 2.5)).toFixed(1) + ' min';

        // Incidents
        const incidents = Math.floor(100 + (this.seededRandom(seed + 3) * 150));

        // Hourly Data (24 hrs) - deterministically generated
        const hourlyData = [];
        for (let i = 0; i < 24; i++) {
            // Peak hours 9-11 and 18-20
            let factor = 1;
            if ((i >= 9 && i <= 11) || (i >= 18 && i <= 20)) factor = 1.8;
            else if (i < 6) factor = 0.2;

            const val = Math.floor(2000 * factor * (0.8 + this.seededRandom(seed + 100 + i) * 0.4));
            hourlyData.push(val);
        }

        return {
            totalVehicles,
            uptime,
            waitTime,
            incidents,
            hourlyData
        };
    }

    // Helper to turn date string (YYYY-MM-DD) into a numeric seed
    getDateSeed(dateString) {
        // Simple hash of the date string
        let hash = 0;
        if (dateString.length === 0) return hash;
        for (let i = 0; i < dateString.length; i++) {
            const char = dateString.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; // Convert to 32bit integer
        }
        return Math.abs(hash);
    }
}

// Export instance
const trafficDataManager = new TrafficDataManager();
