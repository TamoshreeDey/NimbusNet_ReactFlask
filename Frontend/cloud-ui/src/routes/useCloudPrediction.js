import { ApiService } from '../utils/ApiService';

export const useCloudPrediction = () => {
  const classifyImage = async (imageUrl) => {
    try {
      const result = await ApiService.classifyCloudFromURL(imageUrl);
      return result;
    } catch (error) {
      console.error('Prediction failed:', error);
      throw error;
    }
  };

  return { classifyImage };
};
