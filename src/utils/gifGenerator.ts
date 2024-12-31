// Import type only
import type GIF from 'gif.js';
import { createCharacterWithFace as createFaceCharacter, loadTemplates as loadImageTemplates } from './imageProcessor';
import { dancingAvocadoAnimation, goofyRobotAnimation, sassyUnicornAnimation, animateTransport } from './animations';
import { getCharacterConfig } from './characterConfig';
import { animateCharacter } from './characterAnimations';
import { BACKGROUND_STYLES } from './backgroundstyles';

interface GifOptions {
  message: string;
  background: string;
  character: string;
  category: string;
  style?: string;
  regenerateKey?: number;
  faceImage?: HTMLImageElement;
  selectedTransport?: string[];
}

interface Sparkle {
  x: number;
  y: number;
  size: number;
  opacity: number;
  angle: number;
  color?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  shape: 'circle' | 'star' | 'heart' | 'confetti';
}

const createSparkle = (canvas: HTMLCanvasElement, color?: string): Sparkle => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  size: Math.random() * 3 + 1,
  opacity: Math.random(),
  angle: Math.random() * Math.PI * 2,
  color: color || '#ffffff'
});

const createParticle = (canvas: HTMLCanvasElement): Particle => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 4,
  vy: (Math.random() - 0.5) * 4,
  size: Math.random() * 5 + 2,
  color: ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'][Math.floor(Math.random() * 5)],
  shape: ['circle', 'star', 'heart', 'confetti'][Math.floor(Math.random() * 4)] as Particle['shape']
});

const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
  ctx.fillStyle = particle.color;
  ctx.beginPath();

  switch (particle.shape) {
    case 'circle':
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      break;
    case 'star':
      for (let i = 0; i < 5; i++) {
        const angle = (i * Math.PI * 2) / 5 - Math.PI / 2;
        const x = particle.x + Math.cos(angle) * particle.size;
        const y = particle.y + Math.sin(angle) * particle.size;
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      break;
    case 'heart':
      const x = particle.x;
      const y = particle.y;
      const size = particle.size;
      ctx.moveTo(x, y + size / 4);
      ctx.quadraticCurveTo(x, y, x - size / 2, y);
      ctx.quadraticCurveTo(x - size, y, x - size, y + size / 2);
      ctx.quadraticCurveTo(x - size, y + size, x, y + size * 1.25);
      ctx.quadraticCurveTo(x + size, y + size, x + size, y + size / 2);
      ctx.quadraticCurveTo(x + size, y, x + size / 2, y);
      ctx.quadraticCurveTo(x, y, x, y + size / 4);
      break;
    case 'confetti':
      ctx.fillRect(particle.x, particle.y, particle.size, particle.size / 2);
      break;
  }
  ctx.fill();
};

const drawBackground = (
  ctx: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement,
  style: string,
  frameIndex: number
) => {
  const bgStyle = BACKGROUND_STYLES[style];
  if (!bgStyle) return;

  switch (bgStyle.pattern) {
    case 'gradient':
      if (bgStyle.id === 'neon') {
        // Special handling for neon effect
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        const glow = ctx.createRadialGradient(
          canvas.width / 2, canvas.height / 2, 0,
          canvas.width / 2, canvas.height / 2, canvas.width / 2
        );
        bgStyle.colors.forEach((color, i) => {
          glow.addColorStop(i / bgStyle.colors.length, color);
          glow.addColorStop((i + 1) / bgStyle.colors.length, 'transparent');
        });
        ctx.fillStyle = glow;
      } else {
        // Regular gradient handling
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        bgStyle.colors.forEach((color, i) => {
          gradient.addColorStop(i / (bgStyle.colors.length - 1), color);
        });
        ctx.fillStyle = gradient;
      }
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawSparkles(ctx, canvas);
      break;
    case 'neon':
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      const glow = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      bgStyle.colors.forEach((color, i) => {
        glow.addColorStop(i / bgStyle.colors.length, color);
        glow.addColorStop((i + 1) / bgStyle.colors.length, 'transparent');
      });
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawSparkles(ctx, canvas);
      break;
    case 'stars':
      ctx.fillStyle = bgStyle.colors[0];
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.5 + 0.5;
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    case 'rainbow':
      const rainbowOffset = (frameIndex * 2) % 360;
      for (let i = 0; i < canvas.height; i++) {
        const hue = (i + rainbowOffset) % 360;
        ctx.fillStyle = `hsl(${hue}, 80%, 60%)`;
        ctx.fillRect(0, i, canvas.width, 1);
      }
      break;
    case 'confetti':
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      break;
  }
};

const drawSparkles = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  const sparkleCount = 50; // Number of sparkles
  for (let i = 0; i < sparkleCount; i++) {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const size = Math.random() * 5 + 2; // Sparkle size
    const opacity = Math.random() * 0.7 + 0.3; // Sparkle opacity
    ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }
};

const loadFaceDetectionModels = async () => {
  // Load face detection models here
};

const createCharacterWithFace = async (canvas: HTMLCanvasElement, faceImage: HTMLImageElement) => {
  // Create character with face image here
};

const drawWrappedText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, maxWidth: number) => {
  const words = text.split(' ');
  let lines = [];
  let currentLine = '';

  // First, calculate all the lines
  for (let i = 0; i < words.length; i++) {
    const testLine = currentLine + words[i] + ' ';
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && i > 0) {
      lines.push(currentLine.trim());
      currentLine = words[i] + ' ';
    } else {
      currentLine = testLine;
    }
  }
  if (currentLine.trim().length > 0) {
    lines.push(currentLine.trim());
  }

  return lines;
};

const getTextGradient = (style: string) => {
  const backgroundMap: { [key: string]: { primary: string, secondary: string, tertiary: string } } = {
    'party': {
      primary: '#FF1493',    // Deep Pink
      secondary: '#FF69B4',  // Hot Pink
      tertiary: '#FF8C69'    // Salmon Pink
    },
    'neon': {
      primary: '#FFFFFF',    // White
      secondary: '#F0F0F0',  // Light Gray
      tertiary: '#E0E0E0'    // Lighter Gray
    },
    'galaxy': {
      primary: '#FFD700',    // Gold
      secondary: '#FFA500',  // Orange
      tertiary: '#FF8C00'    // Dark Orange
    },
    'rainbow': {
      primary: '#FFFFFF',    // White
      secondary: '#F0F0F0',  // Light Gray
      tertiary: '#E0E0E0'    // Lighter Gray
    },
    'confetti': {
      primary: '#4B0082',    // Indigo
      secondary: '#800080',  // Purple
      tertiary: '#8B008B'    // Dark Magenta
    },
    'glitter': {
      primary: '#4B0082',    // Indigo
      secondary: '#800080',  // Purple
      tertiary: '#8B008B'    // Dark Magenta
    },
    'holographic': {
      primary: '#4B0082',    // Indigo
      secondary: '#800080',  // Purple
      tertiary: '#8B008B'    // Dark Magenta
    },
    'metallic': {
      primary: '#FFFFFF',    // White
      secondary: '#F0F0F0',  // Light Gray
      tertiary: '#E0E0E0'    // Lighter Gray
    }
  };

  const colors = backgroundMap[style] || backgroundMap['party'];
  return {
    gradient: ctx => {
      const gradient = ctx.createLinearGradient(0, 0, ctx.canvas.width, 0);
      gradient.addColorStop(0, colors.primary);
      gradient.addColorStop(0.5, colors.secondary);
      gradient.addColorStop(1, colors.tertiary);
      return gradient;
    },
    shadow: colors.primary
  };
};

const drawAnimatedText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  frameIndex: number,
  style: string
) => {
  const progress = frameIndex / 20;
  const textStyle = getTextGradient(style);
  
  // Text shadow for better visibility
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;

  // Set text properties
  ctx.font = 'bold 32px "Segoe UI", Arial, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = textStyle.gradient(ctx);

  // Text wrapping
  const maxWidth = 400;
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = words[0];

  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const width = ctx.measureText(currentLine + " " + word).width;
    if (width < maxWidth) {
      currentLine += " " + word;
    } else {
      lines.push(currentLine);
      currentLine = word;
    }
  }
  lines.push(currentLine);

  // Calculate total height
  const lineHeight = 40;
  const totalHeight = lines.length * lineHeight;
  const startY = y - (totalHeight / 2) + (lineHeight / 2);

  // Draw each line with animation
  lines.forEach((line, lineIndex) => {
    const lineY = startY + (lineIndex * lineHeight);
    const words = line.split(' ');
    const lineWidth = ctx.measureText(line).width;
    let currentX = x - lineWidth / 2;

    words.forEach((word, wordIndex) => {
      const wordWidth = ctx.measureText(word + ' ').width;
      const wordOffset = Math.sin(progress * Math.PI * 2 + (lineIndex * words.length + wordIndex) * 0.3) * 3;
      ctx.fillText(word, currentX + wordWidth / 2, lineY + wordOffset);
      currentX += wordWidth;
    });
  });

  // Reset shadow
  ctx.shadowColor = 'transparent';
  ctx.shadowBlur = 0;
  ctx.shadowOffsetX = 0;
  ctx.shadowOffsetY = 0;

  // Return the total height of text for character positioning
  return totalHeight;
};

const drawSparkle = (ctx: CanvasRenderingContext2D, sparkle: Sparkle, frameIndex: number) => {
  const { x, y, size, opacity, angle, color } = sparkle;
  const flickerOpacity = opacity * (0.5 + Math.sin(frameIndex * 0.2) * 0.5);
  
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle + frameIndex * 0.1);
  ctx.fillStyle = `rgba(${color}, ${flickerOpacity})`;
  
  // Draw a star shape
  ctx.beginPath();
  for (let i = 0; i < 5; i++) {
    const angleStep = (Math.PI * 2) / 5;
    const longRadius = size * 2;
    const shortRadius = size;
    
    const longX = Math.cos(i * angleStep) * longRadius;
    const longY = Math.sin(i * angleStep) * longRadius;
    const shortX = Math.cos((i + 0.5) * angleStep) * shortRadius;
    const shortY = Math.sin((i + 0.5) * angleStep) * shortRadius;
    
    if (i === 0) {
      ctx.moveTo(longX, longY);
    } else {
      ctx.lineTo(longX, longY);
    }
    ctx.lineTo(shortX, shortY);
  }
  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

const drawWatermark = (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) => {
  const watermarkText = 'supergif.net';
  ctx.save();
  
  // Set watermark style
  ctx.font = '16px Arial';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'bottom';
  
  // Position in bottom right with padding
  const padding = 10;
  ctx.fillText(watermarkText, canvas.width - padding, canvas.height - padding);
  
  ctx.restore();
};

const CHARACTERS = {
  // Party & Celebration
  party: ['🎉', '🎊', '🎈', '🎆', '🎇'],
  // Food & Drinks
  food: ['🎂', '🧁', '🍰', '🍭', '🍬', '🍫', '🍪'],
  // Animals
  animals: ['🦄', '🐱', '🐶', '🐰', '🦊', '🐼', '🦁'],
  // Nature
  nature: ['🌈', '⭐', '🌟', '✨', '🌺', '🌸', '🍀'],
  // Love
  love: ['❤️', '💖', '💝', '💕', '💗', '💓', '💘'],
  // Fun
  fun: ['🎮', '🎨', '🎭', '🎪', '🎡', '🎠', '🎪'],
  // Music
  music: ['🎵', '🎶', '🎹', '🎸', '🥁', '🎺', '🎻'],
  // Sports
  sports: ['⚽', '🏀', '🎾', '⚾', '🏈', '🏉', '🎱']
};

const getRandomEmoji = (category: string): string => {
  const categoryEmojis = CHARACTERS[category as keyof typeof CHARACTERS] || CHARACTERS.party;
  return categoryEmojis[Math.floor(Math.random() * categoryEmojis.length)];
};

// Transport name to emoji mapping
const transportEmojis: { [key: string]: string } = {
  'Bicycle': '🚲',
  'Car': '🚗',
  'Bus': '🚌',
  'Airplane': '✈️',
  'Ship': '🚢',
  'Helicopter': '🚁',
  'Train': '🚂',
  'Rocket': '🚀'
};

// Category-specific effects
const categoryEffects: { [key: string]: {
  emojis: string[],
  particleCount: number,
  sparkleCount: number
}} = {
  'party': {
    emojis: ['🎉', '🎊', '🎈', '✨', '🎆'],
    particleCount: 30,
    sparkleCount: 25
  },
  'food': {
    emojis: ['🍕', '🍰', '🍷', '🍪', '☕'],
    particleCount: 20,
    sparkleCount: 15
  },
  'animals': {
    emojis: ['🐱', '🐶', '🐰', '🦊', '🐼'],
    particleCount: 20,
    sparkleCount: 15
  },
  'nature': {
    emojis: ['🌸', '🌺', '🌈', '✨', '🌟'],
    particleCount: 25,
    sparkleCount: 20
  },
  'love': {
    emojis: ['❤️', '💖', '💝', '💕', '💫'],
    particleCount: 25,
    sparkleCount: 20
  },
  'fun': {
    emojis: ['🎮', '🎲', '🎯', '🎪', '🎨'],
    particleCount: 25,
    sparkleCount: 20
  },
  'music': {
    emojis: ['🎵', '🎶', '🎸', '🎹', '🎺'],
    particleCount: 25,
    sparkleCount: 20
  },
  'sports': {
    emojis: ['⚽', '🏀', '🎾', '⚾', '🏈'],
    particleCount: 20,
    sparkleCount: 15
  }
};

const drawCategoryEffects = (
  ctx: CanvasRenderingContext2D,
  category: string,
  canvas: HTMLCanvasElement,
  frameIndex: number
) => {
  const effect = categoryEffects[category];
  if (!effect) return;

  // Draw category-specific emojis
  const progress = frameIndex / 20;
  effect.emojis.forEach((emoji, index) => {
    const angle = (progress * Math.PI * 2) + (index * (Math.PI * 2 / effect.emojis.length));
    const radius = 80;
    const x = canvas.width / 2 + Math.cos(angle) * radius;
    const y = canvas.height / 2 + Math.sin(angle) * radius;
    
    ctx.save();
    ctx.font = '24px "Segoe UI Emoji"';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add a slight bounce effect
    const bounceOffset = Math.sin(progress * Math.PI * 4 + index) * 5;
    
    // Add rotation for some emojis
    const rotation = Math.sin(progress * Math.PI * 2 + index) * 0.2;
    ctx.translate(x, y + bounceOffset);
    ctx.rotate(rotation);
    
    ctx.fillText(emoji, 0, 0);
    ctx.restore();
  });
};

export async function generateGif({
  message,
  background,
  character,
  category,
  style = background,
  regenerateKey = 0,
  faceImage,
  selectedTransport = []
}: GifOptions): Promise<string> {
  console.log('Starting GIF generation with:', {
    message,
    background,
    character,
    category,
    style,
    hasTransport: selectedTransport.length > 0
  });

  const characterConfig = getCharacterConfig(character);
  console.log('Character config:', characterConfig);
  
  if (!characterConfig) {
    console.error(`Invalid character: ${character}`);
    throw new Error(`Invalid character: ${character}`);
  }

  try {
    console.log('Initializing GIF module...');
    const GIFModule = await import('gif.js/dist/gif.js');
    const GIFConstructor = GIFModule.default || GIFModule;
    
    // Initialize face detection and templates if needed
    if (faceImage) {
      await Promise.all([
        loadFaceDetectionModels(),
        loadImageTemplates()
      ]);
    }

    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      canvas.width = 500;
      canvas.height = 300;
      const ctx = canvas.getContext('2d')!;

      // Get character configuration
      const characterEmoji = characterConfig?.path || character;

      // Get category effect configuration
      const effectConfig = categoryEffects[category] || categoryEffects['celebration'];
      
      const gif = new GIFConstructor({
        workers: 2,
        quality: 10,
        width: canvas.width,
        height: canvas.height,
        workerScript: '/gif.worker.js'
      });

      const frameCount = 20;
      const sparkles: Sparkle[] = Array(effectConfig.sparkleCount).fill(null).map(() => createSparkle(canvas));
      const particles: Particle[] = Array(effectConfig.particleCount).fill(null).map(() => createParticle(canvas));

      for (let i = 0; i < frameCount; i++) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw background
        drawBackground(ctx, canvas, style, i);
        
        // Draw sparkles
        sparkles.forEach(sparkle => {
          drawSparkle(ctx, sparkle, i);
          sparkle.angle += 0.1;
        });

        // Draw category effects
        if (category) {
          drawCategoryEffects(ctx, category, canvas, i);
        }

        // Calculate text width for positioning
        ctx.font = 'bold 32px "Segoe UI", Arial, sans-serif';
        const textMetrics = ctx.measureText(message);
        const textWidth = textMetrics.width;

        // Draw text in center with background-specific style and get text height
        const centerY = canvas.height / 2;
        const textHeight = drawAnimatedText(ctx, message, canvas.width / 2, centerY, i, style);

        // Draw character at top right of text, adjusted for text height
        if (characterEmoji) {
          const characterX = (canvas.width / 2) + (textMetrics.width / 2) + 30;
          const characterY = centerY - (textHeight / 2) - 20; // Position above the first line
          animateCharacter(ctx, characterEmoji, characterX, characterY, i);
        }

        // Draw transport icons if selected
        if (selectedTransport && selectedTransport.length > 0) {
          const spacing = canvas.width / (selectedTransport.length + 1);
          selectedTransport.forEach((transport, index) => {
            const transportEmoji = transportEmojis[transport];
            if (transportEmoji) {
              const x = spacing * (index + 1);
              const y = canvas.height - 40; // Moved up slightly
              animateTransport(ctx, transportEmoji, x, y, i);
            }
          });
        }

        // Add watermark
        drawWatermark(ctx, canvas);

        gif.addFrame(ctx, { copy: true, delay: 100 });
      }

      gif.on('finished', (blob: Blob) => {
        resolve(URL.createObjectURL(blob));
      });

      gif.on('error', (error: Error) => {
        reject(error);
      });

      gif.render();
    });
  } catch (error) {
    console.error('Error during GIF generation:', error);
    throw error;
  }
}