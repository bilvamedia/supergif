import { characterIcons, IconConfig } from './iconConfig';

export interface AnimationConfig {
    frames: number;
    duration: number;
}

export interface CharacterConfig extends IconConfig {
    animation: AnimationConfig;
}

// Default animation configuration
const DEFAULT_ANIMATION: AnimationConfig = {
    frames: 20,
    duration: 2000
};

// Helper functions for character management
export const getCharacterConfig = (characterId: string): CharacterConfig | undefined => {
    const icon = characterIcons.find(icon => icon.id === characterId);
    if (!icon) return undefined;

    return {
        ...icon,
        animation: DEFAULT_ANIMATION
    };
};

export const getAllCharacters = (): string[] => {
    return characterIcons.map(icon => icon.id);
}