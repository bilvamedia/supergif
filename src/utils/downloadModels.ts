import * as faceapi from 'face-api.js';

export const downloadModels = async () => {
  try {
    const modelPath = '/models';
    
    // Download models from GitHub
    const modelUrls = [
      'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/tiny_face_detector_model-weights_manifest.json',
      'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/tiny_face_detector_model-shard1',
      'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_landmark_68_model-weights_manifest.json',
      'https://raw.githubusercontent.com/justadudewhohacks/face-api.js/master/weights/face_landmark_68_model-shard1'
    ];

    for (const url of modelUrls) {
      const filename = url.split('/').pop();
      if (!filename) continue;

      const response = await fetch(url);
      const blob = await response.blob();
      
      const formData = new FormData();
      formData.append('file', blob, filename);

      // Save the file to the models directory
      await fetch(`${modelPath}/${filename}`, {
        method: 'PUT',
        body: blob
      });
    }

    console.log('Models downloaded successfully');
  } catch (error) {
    console.error('Error downloading models:', error);
    throw error;
  }
};
