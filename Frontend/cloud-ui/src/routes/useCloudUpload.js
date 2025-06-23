import { ApiService } from '../utils/ApiService';

export const useCloudUpload = () => {
  const uploadImage = async (file) => {
    try {
      const imageUrl = await ApiService.uploadImage(file);
      return imageUrl;
    } catch (error) {
      console.error('Upload failed:', error);
      throw error;
    }
  };

  return { uploadImage };
};
