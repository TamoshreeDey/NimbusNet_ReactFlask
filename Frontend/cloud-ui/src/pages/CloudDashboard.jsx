import React, { useState } from 'react';
import { ApiService } from '../utils/ApiService';
import { ccsn_cloudTypes } from '../utils/cloudTypes';
import Navigation from "../components/dashboardUI/layout/Navigation";
import ImageUpload from "../components/dashboardUI/upload/ImageUpload";
import AboutPage from "./AboutPage";
import HistoryPage from "./HistoryPage";
import AnalysisModal from "../components/analysis/AnalysisModal";
import { useNavigate } from 'react-router-dom';


export default function CloudDashboard() {
  const [activeTab, setActiveTab] = useState('home');
  const [uploadedImage, setUploadedImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [showAnalysisModal, setShowAnalysisModal] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [report, setReport] = useState(null);
  const navigate = useNavigate();

  const handleBackToLanding = () => {
    navigate('/'); // ← navigate to landing page
  };

  const handleAnalyze = async () => {
    try {
      if (!imageFile) return alert("No file selected!");

      const imageUrl = await ApiService.uploadImage(imageFile);
      setUploadedImage(imageUrl);

      const result = await ApiService.classifyCloudFromURL(imageUrl);
      const predictedClass = result.prediction?.predicted_class;
      const reportObject = ccsn_cloudTypes[predictedClass];

      setPrediction(result.prediction);
      setReport(reportObject || null);
      setShowAnalysisModal(true);
    } catch (error) {
      console.error('Prediction failed:', error);
      alert('Failed to analyze image');
    }
  };

  const handleSave = async () => {
    try {
      if (!uploadedImage || !prediction) return;

      await ApiService.savePredictionHistory({
        image_url: uploadedImage,
        prediction,
        report
      });

      alert('Analysis saved!');
      setShowAnalysisModal(false);
    } catch (error) {
      console.error('Failed to save history:', error);
      alert('Failed to save analysis');
    }
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = uploadedImage;
    link.download = 'cloud-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'history':
        return <HistoryPage />;
      case 'about':
        return <AboutPage />;
      default:
        return (
          <ImageUpload
            uploadedImage={uploadedImage}
            setUploadedImage={setUploadedImage}
            setImageFile={setImageFile}
            onAnalyze={handleAnalyze}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-white to-blue-100 p-6">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-slate-800 mb-4 bg-gradient-to-r from-sky-600 to-blue-800 bg-clip-text text-transparent">
            Cloud Classification System
          </h1>
          <p className="text-xl text-slate-600">
            Advanced AI-powered cloud identification and analysis
          </p>
        </header>

        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onBackToLanding={handleBackToLanding}
        />

        <main className={`transition-all duration-300 ${showAnalysisModal ? 'blur-sm' : ''}`}>
          {renderContent()}
        </main>

        <AnalysisModal
          isOpen={showAnalysisModal}
          onClose={() => setShowAnalysisModal(false)}
          uploadedImage={uploadedImage}
          onSave={handleSave}
          onDownload={handleDownload}
          prediction={prediction}
          report={report}
        />
      </div>
    </div>
  );
}
