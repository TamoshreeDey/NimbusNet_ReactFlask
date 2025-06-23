import React, { useRef } from 'react';
import Card from '../Card';
import Button from '../Button';
import { Upload } from 'lucide-react';

const ImageUpload = ({ uploadedImage, setUploadedImage, setImageFile, onAnalyze }) => {
  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setUploadedImage(e.target.result);
      reader.readAsDataURL(file);
      setImageFile(file); // ✅ store raw file for backend upload
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="p-8">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Upload Cloud Image</h2>
        <div className="border-2 border-dashed border-slate-400/50 rounded-lg p-8 text-center hover:border-slate-400/70 transition-colors">
          <Upload className="mx-auto mb-4 text-slate-600" size={48} />
          <p className="text-slate-700 mb-4">
            Drag and drop your cloud image here, or click to browse
          </p>

          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileUpload}
            className="hidden"
          />

          <Button variant="secondary" onClick={triggerFileInput}>
            <Upload size={18} />
            Choose File
          </Button>
        </div>
      </Card>

      {uploadedImage && (
        <Card className="p-8">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Preview</h3>
          <div className="aspect-square rounded-lg overflow-hidden bg-slate-100/50">
            <img src={uploadedImage} alt="Uploaded cloud" className="w-full h-full object-cover" />
          </div>
          <Button variant="primary" size="lg" className="w-full mt-6" onClick={onAnalyze}>
            Analyze Cloud
          </Button>
        </Card>
      )}
    </div>
  );
};

export default ImageUpload;
