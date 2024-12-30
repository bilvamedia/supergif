import { getCharacterConfig } from './characterConfig';

/**
 * Animates a character on the canvas based on the current frame
 * @param ctx Canvas rendering context
 * @param character Character ID or emoji
 * @param x Center x position
 * @param y Center y position
 * @param frameIndex Current frame index
 */
export const animateCharacter = (
    ctx: CanvasRenderingContext2D,
    character: string,
    x: number,
    y: number,
    frameIndex: number
): void => {
    const config = getCharacterConfig(character);
    
    // Get the emoji to display (either from config or use the character directly)
    const displayEmoji = config ? config.path : character;

    // Calculate animation progress (0 to 1)
    const progress = (frameIndex % 20) / 20;
    
    // Smaller bounce for top-right position
    const bounceHeight = 10;
    const yOffset = Math.sin(progress * Math.PI * 2) * bounceHeight;
    
    // Slight tilt animation
    const tiltAngle = Math.sin(progress * Math.PI * 2) * 0.1;
    
    // Scale animation
    const scaleBase = 0.8; // Slightly smaller size
    const scaleVariation = 0.05;
    const scale = scaleBase + Math.sin(progress * Math.PI * 2) * scaleVariation;
    
    // Draw the character with animation
    ctx.save();
    ctx.translate(x, y + yOffset);
    ctx.rotate(tiltAngle);
    ctx.scale(scale, scale);
    ctx.font = '80px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(displayEmoji, 0, 0);
    ctx.restore();
};

/**
 * Draws the SuperGif logo with a modern, professional style
 * @param ctx Canvas rendering context
 * @param x X position
 * @param y Y position
 * @param frameIndex Current frame index for animation
 */
export const drawSuperGifLogo = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    frameIndex: number
): void => {
    // Save current context state
    ctx.save();
    
    // Calculate wave effect
    const waveAmplitude = 3;
    const waveFrequency = 0.1;
    const letterSpacing = 14;
    const text = 'SuperGIF';
    
    // Set up gradient for the text
    const gradient = ctx.createLinearGradient(x - 90, y - 20, x + 90, y + 20);
    gradient.addColorStop(0, '#FF6B6B');  // Coral pink
    gradient.addColorStop(0.5, '#4ECDC4'); // Turquoise
    gradient.addColorStop(1, '#45B7D1');   // Sky blue
    
    // Draw main text with wave effect
    ctx.font = 'bold 32px "Segoe UI", Arial';
    ctx.fillStyle = gradient;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add shadow for depth
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 3;
    ctx.shadowOffsetX = 1;
    ctx.shadowOffsetY = 1;

    // Draw each letter with individual wave effect
    const chars = text.split('');
    let totalWidth = -((chars.length - 1) * letterSpacing) / 2;
    
    chars.forEach((char, i) => {
        const charX = x + totalWidth + (i * letterSpacing);
        const waveOffset = Math.sin((frameIndex * waveFrequency) + (i * 0.3)) * waveAmplitude;
        
        // Draw base text
        ctx.fillText(char, charX, y + waveOffset);
        
        // Add shimmer effect
        const shimmerPos = (frameIndex * 2 + i * 20) % (chars.length * letterSpacing * 2);
        const distanceFromShimmer = Math.abs(shimmerPos - (i * letterSpacing));
        
        if (distanceFromShimmer < letterSpacing * 2) {
            const shimmerOpacity = Math.max(0, 1 - distanceFromShimmer / (letterSpacing * 2));
            ctx.save();
            
            // Draw shimmering highlight
            ctx.fillStyle = `rgba(255, 255, 255, ${shimmerOpacity * 0.7})`;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
            ctx.shadowBlur = 5;
            ctx.fillText(char, charX, y + waveOffset);
            
            ctx.restore();
        }
    });

    // Add main sparkle circles
    const mainSparkles = [
        { x: x - 80, y: y - 10, color: '#FF6B6B' },  // Coral pink
        { x: x + 80, y: y - 10, color: '#4ECDC4' },  // Turquoise
        { x: x, y: y - 20, color: '#45B7D1' }        // Sky blue
    ];
    
    // Draw the three main sparkles
    mainSparkles.forEach((sparkle, i) => {
        const sparkleTime = (frameIndex + i * 10) * 0.1;
        const sparkleSize = (Math.sin(sparkleTime) + 1) * 3;
        
        // Draw sparkle with glow
        ctx.fillStyle = sparkle.color;
        ctx.shadowColor = sparkle.color;
        ctx.shadowBlur = 5;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;

        // Draw main circle
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkleSize, 0, Math.PI * 2);
        ctx.fill();

        // Inner glow
        ctx.beginPath();
        ctx.arc(sparkle.x, sparkle.y, sparkleSize * 0.6, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Restore context state
    ctx.restore();
};
