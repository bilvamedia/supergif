// Icon configuration module
export interface IconConfig {
    id: string;
    name: string;
    path: string;
    category: 'emoji' | 'character' | 'decoration';
    tags?: string[];
    // Style properties
    color: string;
    type: string;
    accent: string;
    emoji: string[];
}

// Professional character icons configuration
export const characterIcons: IconConfig[] = [
    {
        id: 'sparkle-star',
        name: '✨ Sparkle Star',
        path: '✨',
        category: 'character',
        tags: ['sparkle', 'star', 'shine'],
        color: '#FFD700',
        type: 'sparkle',
        accent: '#FFF8DC',
        emoji: ['✨', '⭐', '🌟']
    },
    {
        id: 'crystal-gem',
        name: '💎 Crystal',
        path: '💎',
        category: 'character',
        tags: ['crystal', 'gem', 'diamond'],
        color: '#4FC3F7',
        type: 'crystal',
        accent: '#B3E5FC',
        emoji: ['💎', '💫', '✨']
    },
    {
        id: 'golden-crown',
        name: '👑 Crown',
        path: '👑',
        category: 'character',
        tags: ['crown', 'royal', 'gold'],
        color: '#FFD700',
        type: 'crown',
        accent: '#FFF8DC',
        emoji: ['👑', '✨', '💫']
    },
    {
        id: 'rainbow-heart',
        name: '❤️ Rainbow Heart',
        path: '❤️',
        category: 'character',
        tags: ['heart', 'love', 'rainbow'],
        color: '#FF69B4',
        type: 'heart',
        accent: '#FFB6C1',
        emoji: ['❤️', '🌈', '💝']
    },
    {
        id: 'magic-wand',
        name: '🪄 Magic Wand',
        path: '🪄',
        category: 'character',
        tags: ['magic', 'wand', 'sparkle'],
        color: '#BA68C8',
        type: 'magic',
        accent: '#E1BEE7',
        emoji: ['🪄', '✨', '💫']
    },
    {
        id: 'glowing-heart',
        name: '💖 Glowing Heart',
        path: '💖',
        category: 'character',
        tags: ['heart', 'love', 'glow'],
        color: '#FFC0CB',
        type: 'heart',
        accent: '#FFB6C1',
        emoji: ['💖', '❤️', '💫']
    },
    {
        id: 'shooting-star',
        name: '🌠 Shooting Star',
        path: '🌠',
        category: 'character',
        tags: ['star', 'night', 'wish'],
        color: '#6495ED',
        type: 'star',
        accent: '#87CEEB',
        emoji: ['🌠', '✨', '🌟']
    },
    {
        id: 'crystal-ball',
        name: '🔮 Crystal Ball',
        path: '🔮',
        category: 'character',
        tags: ['crystal', 'magic', 'fortune'],
        color: '#4FC3F7',
        type: 'crystal',
        accent: '#B3E5FC',
        emoji: ['🔮', '💎', '✨']
    }
];

// Helper functions for icon management
export const getIconByName = (name: string): IconConfig | undefined => 
    characterIcons.find(icon => icon.name === name);

export const getIconById = (id: string): IconConfig | undefined => 
    characterIcons.find(icon => icon.id === id);

export const getIconsByTag = (tag: string): IconConfig[] => 
    characterIcons.filter(icon => icon.tags?.includes(tag));
