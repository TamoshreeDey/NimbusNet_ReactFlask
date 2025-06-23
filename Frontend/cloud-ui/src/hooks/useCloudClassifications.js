import { useState } from 'react';
import { useCloudUpload } from '../routes/useCloudUpload';
import { useCloudPrediction } from '../routes/useCloudPrediction';
import { useHistoryPrediction } from '../routes/useHistoryPrediction';

export const useCloudClassifications = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [classificationData, setClassificationData] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState(null);
  const [analysisComplete, setAnalysisComplete] = useState(false);

  const { uploadImage } = useCloudUpload();
  const { classifyImage } = useCloudPrediction();
  const { saveHistory } = useHistoryPrediction();

  const handleImageUpload = async (file, report = "") => {
    try {
      setIsAnalyzing(true);
      setError(null);

      const imageUrl = await uploadImage(file);
      setUploadedImage(imageUrl);

      const result = await classifyImage(imageUrl);
      setClassificationData(result);
      setAnalysisComplete(true);

      await saveHistory({
        image_url: imageUrl,
        prediction: result.prediction,
        report: report || ""
      });

    } catch (err) {
      setError(err.message);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
    uploadedImage,
    classificationData,
    isAnalyzing,
    analysisComplete,
    error,
    handleImageUpload
  };
};
