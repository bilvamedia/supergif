export const BACKGROUND_STYLES = {
  party: { 
    id: "party",
    name: "Party Gradient",
    style: "bg-gradient-to-r from-[#ffd1dc] via-[#ffecb3] to-[#e1bee7]",
    pattern: "gradient",
    colors: ["#ffd1dc", "#ffecb3", "#e1bee7"]
  },
  neon: {
    id: "neon",
    name: "Neon Glow",
    style: "bg-gradient-to-r from-[#ff00ff] via-[#00ffff] to-[#ff00aa]",
    pattern: "gradient",
    colors: ["#ff00ff", "#00ffff", "#ff00aa"]
  },
  galaxy: {
    id: "galaxy",
    name: "Galaxy Stars",
    style: "bg-gradient-to-r from-[#1a237e] via-[#311b92] to-[#4a148c]",
    pattern: "gradient",
    colors: ["#1a237e", "#311b92", "#4a148c"]
  },
  rainbow: {
    id: "rainbow",
    name: "Rainbow Wave",
    style: "bg-gradient-to-r from-[#ff0000] via-[#00ff00] to-[#0000ff]",
    pattern: "gradient",
    colors: ["#ff0000", "#00ff00", "#0000ff"]
  },
  confetti: {
    id: "confetti",
    name: "Confetti Burst",
    style: "bg-gradient-to-r from-[#ff0000] via-[#00ff00] to-[#ffff00]",
    pattern: "gradient",
    colors: ["#ff0000", "#00ff00", "#ffff00"]
  },
  glitter: {
    id: "glitter",
    name: "Golden Glitter",
    style: "bg-gradient-to-r from-[#FFD700] via-[#FFF8DC] to-[#FFFFE0] animate-shimmer",
    pattern: "gradient",
    colors: ["#FFD700", "#FFF8DC", "#FFFFE0"]
  },
  holographic: {
    id: "holographic",
    name: "Holographic Dream",
    style: "bg-gradient-to-r from-[#F4F5F0] via-[#C5E7D3] to-[#F1CBFF] animate-holo",
    pattern: "gradient",
    colors: ["#F4F5F0", "#C5E7D3", "#F1CBFF"]
  },
  metallic: {
    id: "metallic",
    name: "Metallic Gold",
    style: "bg-gradient-to-r from-[#D4AF37] via-[#FFD700] to-[#C5B358] animate-metallic",
    pattern: "gradient",
    colors: ["#D4AF37", "#FFD700", "#C5B358"]
  },
  iridescent: {
    id: "iridescent",
    name: "Iridescent Glow",
    style: "bg-gradient-to-r from-[#FF1493] via-[#00FFFF] to-[#4B0082] animate-iridescent",
    pattern: "gradient",
    colors: ["#FF1493", "#00FFFF", "#4B0082"]
  },
  pearl: {
    id: "pearl",
    name: "Pearl Shine",
    style: "bg-gradient-to-r from-[#FFDAB9] via-[#FFF0F5] to-[#FFFAFA] animate-pearl",
    pattern: "gradient",
    colors: ["#FFDAB9", "#FFF0F5", "#FFFAFA"]
  },
  sparkle: {
    id: "sparkle",
    name: "Sparkle Magic",
    style: "bg-gradient-to-r from-[#E8F5E9] via-[#B2DFDB] to-[#4DB6AC] animate-sparkle",
    pattern: "gradient",
    colors: ["#E8F5E9", "#B2DFDB", "#4DB6AC"]
  },
  sunset: {
    id: "sunset",
    name: "Sunset Bliss",
    style: "bg-gradient-to-r from-[#ff7e5f] to-[#feb47b]",
    pattern: "gradient",
    colors: ["#ff7e5f", "#feb47b"]
  },
  ocean: {
    id: "ocean",
    name: "Ocean Waves",
    style: "bg-gradient-to-r from-[#00c6ff] to-[#0072ff]",
    pattern: "gradient",
    colors: ["#00c6ff", "#0072ff"]
  },
  gold: {
    id: "gold",
    name: "Gold Shine",
    style: "bg-gradient-to-r from-[#f9d423] to-[#ff4e50]",
    pattern: "gradient",
    colors: ["#f9d423", "#ff4e50"]
  },
  silver: {
    id: "silver",
    name: "Silver Lining",
    style: "bg-gradient-to-r from-[#d3d3d3] to-[#a9a9a9]",
    pattern: "gradient",
    colors: ["#d3d3d3", "#a9a9a9"]
  },
  "rose-gold": {
    id: "rose-gold",
    name: "Rose Gold",
    style: "bg-gradient-to-r from-[#d19a6a] to-[#f7b7a3]",
    pattern: "gradient",
    colors: ["#d19a6a", "#f7b7a3"]
  },
  "vibrant-sunset": {
    id: "vibrant-sunset",
    name: "Vibrant Sunset",
    style: "bg-gradient-to-r from-[#ff5f6d] to-[#ffc371]",
    pattern: "gradient",
    colors: ["#ff5f6d", "#ffc371"]
  }
} as const;

export type BackgroundStyleKey = keyof typeof BACKGROUND_STYLES;