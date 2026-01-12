
// Hardcoded fallback in case JSON fetch fails or lags
let CAMERA_MAP = {
  "Hinjewadi IT Park": "dummy_feed.mp4",
  "Shivaji Nagar": "dummy_feed.mp4",
  "Baner": "dummy_feed.mp4",
  "Hinjewadi": "dummy_feed.mp4"
};
let CAMERA_MAP_READY = true;

// Attempt to load external mapping to override/extend
fetch('js/camera-video-map.json')
  .then(res => {
    if (!res.ok) throw new Error("camera-video-map.json not found");
    return res.json();
  })
  .then(data => {
    CAMERA_MAP = { ...CAMERA_MAP, ...data }; // Merge
    console.log("Camera map loaded extended:", CAMERA_MAP);
  })
  .catch(err => {
    console.warn("Camera map fetch failed, using fallback:", err);
  });

const VideoUtils = {
  getVideo(locationName) {
    if (!locationName) return null;

    const normalized = locationName.toLowerCase();

    // Direct lookup first
    let key = Object.keys(CAMERA_MAP).find(k => k.toLowerCase() === normalized);

    // Fuzzy lookup
    if (!key) {
      key = Object.keys(CAMERA_MAP).find(k =>
        k.toLowerCase().includes(normalized) ||
        normalized.includes(k.toLowerCase())
      );
    }

    if (!key) {
      // Universal Fallback: Use the ONLY available video for now to ensure 100% success rate
      // Since v1.mp4 and v3.mp4 are missing, we force dummy_feed.mp4
      const availableVideos = ["dummy_feed.mp4"];
      const charCodeSum = locationName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
      const videoIndex = charCodeSum % availableVideos.length;

      console.log(`[VideoUtils] Auto-assigning '${availableVideos[videoIndex]}' to '${locationName}'`);

      return {
        type: 'mp4',
        src: availableVideos[videoIndex]
      };
    }

    console.log(`[VideoUtils] Mapping '${locationName}' -> '${CAMERA_MAP[key]}'`);

    return {
      type: 'mp4',
      src: CAMERA_MAP[key]
    };
  },

  getEmbedUrl(id) {
    return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&controls=0&showinfo=0&loop=1`;
  }
};
