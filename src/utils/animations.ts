// Import avocado image
//import avocadoImage from '../../public/characters/avocado.png';

export const dancingAvocadoAnimation = async (
  ctx: CanvasRenderingContext2D, 
  canvas: HTMLCanvasElement
) => {
  // Create and load the image
  const image = new Image();
  //image.src = avocadoImage;
  
  // Wait for the image to load
  await new Promise((resolve) => {
    image.onload = resolve;
  });

  // Groove Side-to-Side
  for (let i = 0; i < 10; i++) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 100, 100 + Math.sin(i * 0.5) * 10);
    ctx.fillText('😊', 120, 80); // Smiling face
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Spin Move
  for (let i = 0; i < 20; i++) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(150, 150);
    ctx.rotate(i * 0.1);
    ctx.drawImage(image, -50, -50);
    ctx.restore();
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Disco Lights
  for (let i = 0; i < 10; i++) {
    ctx.fillStyle = `hsl(${i * 36}, 100%, 50%)`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
};

export const goofyRobotAnimation = async (ctx, canvas) => {
  // Arm Spin
  for (let i = 0; i < 10; i++) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.drawImage(robotImage, 100, 100);
    ctx.fillText('ERROR', 120, 80); // Error message
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Bounce and Fix
  for (let i = 0; i < 10; i++) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.drawImage(robotImage, 100, 100 + Math.sin(i * 0.5) * 10);
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Emoji Display
  ctx.fillText('❤️', 120, 80); // Heart emoji
  await new Promise(resolve => setTimeout(resolve, 1000));
};

export const sassyUnicornAnimation = async (ctx, canvas) => {
  // Mane Toss
  for (let i = 0; i < 10; i++) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.drawImage(unicornImage, 100, 100);
    ctx.fillText('✨', 120, 80); // Glitter
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Rainbow Horn Shot
  for (let i = 0; i < 20; i++) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctx.drawImage(unicornImage, 100, 100);
    ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
    ctx.fillRect(100, 100, 50, 5); // Rainbow shot
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  // Power Pose
  ctx.fillText('🌈', 120, 80); // Rainbow emoji
};

export const animateTransport = (
  ctx: CanvasRenderingContext2D,
  transport: string,
  x: number,
  y: number,
  frameIndex: number
) => {
  const scale = 2.0; // Increased size
  ctx.save();
  
  // Add a bouncing effect based on the frame index
  const bounce = Math.sin(frameIndex * 0.2) * 5;
  
  // Add a slight rotation for dynamic effect
  const rotation = Math.sin(frameIndex * 0.1) * 0.1;
  
  // Transform context for animation
  ctx.translate(x, y + bounce);
  ctx.rotate(rotation);
  ctx.scale(scale, scale);
  
  // Add shadow for depth
  ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
  ctx.shadowBlur = 4;
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  
  // Draw the transport emoji
  ctx.font = '20px "Segoe UI Emoji", "Apple Color Emoji", "Noto Color Emoji", Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(transport, 0, 0);
  
  // Reset context
  ctx.restore();
};
