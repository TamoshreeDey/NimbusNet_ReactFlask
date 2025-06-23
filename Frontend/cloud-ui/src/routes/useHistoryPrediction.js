import { ApiService } from '../utils/ApiService';

export const useHistoryPrediction = () => {
  const saveHistory = async ({ image_url, prediction, report }) => {
    try {
      return await ApiService.savePredictionHistory({ image_url, prediction, report });
    } catch (error) {
      console.error('Saving history failed:', error);
      throw error;
    }
  };

  const getHistory = async ({ from, to }) => {
    try {
      return await ApiService.getPredictionHistory({ from, to });
    } catch (error) {
      console.error('Fetching history failed:', error);
      throw error;
    }
  };

  return { saveHistory, getHistory };
};
