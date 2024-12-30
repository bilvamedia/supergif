import * as faceapi from 'face-api.js';

interface BodyTemplate {
  id: string;
  src: string;
  anchorX: number;
  anchorY: number;
  scale: number;
  data: string;
}

let templates: BodyTemplate[] = [];
let modelsLoaded = false;

export const loadTemplates = async () => {
  try {
    const response = await fetch('/bodies/templates.json');
    const data = await response.json();
    templates = data.templates;

    // Create body images from base64 data
    for (const template of templates) {
      const response = await fetch(template.data);
      const blob = await response.blob();
      const bodyImage = new Image();
      bodyImage.src = URL.createObjectURL(blob);
      await new Promise((resolve) => {
        bodyImage.onload = resolve;
      });
      template.src = bodyImage.src;
    }
  } catch (error) {
    console.error('Error loading body templates:', error);
  }
};

export const loadFaceDetectionModels = async () => {
  if (!modelsLoaded) {
    try {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      modelsLoaded = true;
    } catch (error) {
      console.error('Error loading face detection models:', error);
      throw error;
    }
  }
};

export const detectFace = async (imageElement: HTMLImageElement): Promise<faceapi.FaceDetection | null> => {
  try {
    await loadFaceDetectionModels();
    const detection = await faceapi.detectSingleFace(
      imageElement,
      new faceapi.TinyFaceDetectorOptions()
    );
    return detection || null;
  } catch (error) {
    console.error('Face detection error:', error);
    return null;
  }
};

export const createCharacterWithFace = async (
  canvas: HTMLCanvasElement,
  faceImage: HTMLImageElement,
  templateIndex: number = Math.floor(Math.random() * templates.length)
): Promise<void> => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Make sure templates are loaded
  if (templates.length === 0) {
    await loadTemplates();
  }

  // Get body template
  const template = templates[templateIndex];
  if (!template) {
    throw new Error('No body template available');
  }

  // Load body image
  const bodyImage = new Image();
  bodyImage.src = template.src;
  await new Promise((resolve) => {
    bodyImage.onload = resolve;
  });

  // Draw body
  ctx.drawImage(bodyImage, 0, 0, canvas.width, canvas.height);

  // Detect face
  const detection = await detectFace(faceImage);
  if (!detection) {
    throw new Error('No face detected in the image');
  }

  // Calculate face position on body
  const faceBox = detection.box;
  const targetX = canvas.width * template.anchorX - (faceBox.width * template.scale) / 2;
  const targetY = canvas.height * template.anchorY - (faceBox.height * template.scale) / 2;

  // Draw face on body with circular mask
  ctx.save();
  ctx.beginPath();
  ctx.arc(
    targetX + (faceBox.width * template.scale) / 2,
    targetY + (faceBox.height * template.scale) / 2,
    (faceBox.width * template.scale) / 2,
    0,
    Math.PI * 2
  );
  ctx.closePath();
  ctx.clip();

  // Draw the face
  ctx.drawImage(
    faceImage,
    faceBox.x,
    faceBox.y,
    faceBox.width,
    faceBox.height,
    targetX,
    targetY,
    faceBox.width * template.scale,
    faceBox.height * template.scale
  );

  ctx.restore();
};
