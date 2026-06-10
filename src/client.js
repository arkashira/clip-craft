import axios from 'axios';

/**
 * Generates a video based on the provided script and template ID.
 * 
 * @param {string} script - The script for the video.
 * @param {string} templateId - The ID of the template to use.
 * @returns {Promise<string>} A promise that resolves with the video data or a download URL.
 */
export async function generateVideo(script, templateId) {
  try {
    const response = await axios.post('/api/generate', {
      script,
      templateId,
    });
    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(`Server responded with status ${response.status}`);
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`HTTP error: ${error.message}`);
    } else {
      throw error;
    }
  }
}