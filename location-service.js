/**
 * Location Service
 * Handles dynamic fetching of geographic data using CountriesNow API and OpenStreetMap Nominatim.
 * Provides comprehensive lists of States, Cities (including towns), and Local Areas.
 */

class LocationService {
    // API Endpoints
    static COUNTRIES_NOW_BASE = "https://countriesnow.space/api/v0.1/countries";
    static NOMINATIM_BASE = "https://nominatim.openstreetmap.org/search";

    // Cache to improve performance and reduce API calls
    static cache = {
        states: null,
        cities: {}, // key: stateName
        areas: {}   // key: cityName-stateName
    };

    /**
     * Fetch all Indian States
     * Uses CountriesNow API
     * @returns {Promise<string[]>}
     */
    static async getStates() {
        if (this.cache.states) {
            return this.cache.states;
        }

        try {
            const response = await fetch(`${this.COUNTRIES_NOW_BASE}/states`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country: 'India' })
            });

            const data = await response.json();

            if (!data.error && data.data && data.data.states) {
                const states = data.data.states.map(s => s.name).sort();
                this.cache.states = states;
                return states;
            } else {
                throw new Error("Invalid API response format");
            }
        } catch (error) {
            console.error("[LocationService] Error fetching states:", error);
            // Fallback static list only if API fails completely
            return [
                "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat",
                "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
                "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
                "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
                "Delhi", "Jammu and Kashmir", "Ladakh", "Puducherry"
            ].sort();
        }
    }

    /**
     * Fetch all Cities/Towns for a selected State
     * Uses CountriesNow API
     * @param {string} stateName 
     * @returns {Promise<string[]>}
     */
    static async getCities(stateName) {
        if (this.cache.cities[stateName]) {
            return this.cache.cities[stateName];
        }

        try {
            const response = await fetch(`${this.COUNTRIES_NOW_BASE}/state/cities`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ country: 'India', state: stateName })
            });

            const data = await response.json();

            if (!data.error && data.data) {
                const cities = data.data.sort();
                this.cache.cities[stateName] = cities;
                return cities;
            } else {
                throw new Error("Invalid API response for cities");
            }
        } catch (error) {
            console.error(`[LocationService] Error fetching cities for ${stateName}:`, error);
            return []; // Return empty trigger UI to handle no data
        }
    }

    /**
     * Fetch Local Areas (Streets/Wards/Suburbs) for a City
     * Uses OpenStreetMap Nominatim API
     * @param {string} cityName 
     * @param {string} stateName 
     * @returns {Promise<string[]>}
     */
    static async getAreas(cityName, stateName) {
        const cacheKey = `${cityName}-${stateName}`;
        if (this.cache.areas[cacheKey]) {
            return this.cache.areas[cacheKey];
        }

        try {
            // Strategy: Search for "suburbs" or general named places in the city
            // We use a broader search to get more results
            const params = new URLSearchParams({
                q: `${cityName} ${stateName} India`,
                format: 'json',
                addressdetails: 1,
                limit: 50, // Fetch top 50 relevant places
                dedupe: 1
            });

            const response = await fetch(`${this.NOMINATIM_BASE}?${params.toString()}`);
            const data = await response.json();

            // Extract relevant place names
            // We look for 'suburb', 'neighbourhood', 'residential', 'village', or just the name if it's distinct
            const areas = new Set();

            data.forEach(item => {
                // Try to find a meaningful local name
                // Often 'name' is the place, and 'display_name' is the full address
                if (item.name && item.name !== cityName) {
                    areas.add(item.name);
                } else if (item.display_name) {
                    // Fallback to extracting first part of address if name is generic
                    const firstPart = item.display_name.split(',')[0];
                    if (firstPart !== cityName) areas.add(firstPart);
                }
            });

            const sortedAreas = Array.from(areas).sort();

            // If Nominatim returns very few results, fallback to some generic city zones
            if (sortedAreas.length < 3) {
                const generics = ["City Center", "Railway Station Area", "Bus Stand", "Market Road", "Civil Lines", "Industrial Estate"];
                this.cache.areas[cacheKey] = generics;
                return generics;
            }

            this.cache.areas[cacheKey] = sortedAreas;
            return sortedAreas;

        } catch (error) {
            console.error(`[LocationService] Error fetching areas for ${cityName}:`, error);
            return ["City Center", "Main Road"];
        }
    }
}
