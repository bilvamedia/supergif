// Character type definitions
export interface CharacterStyle {
    color: string;
    type: string;
    accent: string;
    emoji?: string[];
}

export interface AnimationConfig {
    frames: number;
    duration: number;
}

export interface CharacterConfig extends CharacterStyle {
    id: string;
    name: string;
    animation?: AnimationConfig;
}

// Default animation configuration
export const DEFAULT_ANIMATION: AnimationConfig = {
    frames: 10,
    duration: 2000
};
