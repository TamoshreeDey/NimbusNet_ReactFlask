import React from 'react';
import Modal from '../dashboardUI/Modal';
import Card from '../dashboardUI/Card';
import Button from '../dashboardUI/Button';
import { Save, Download, X } from 'lucide-react';

const AnalysisModal = ({
  isOpen,
  onClose,
  uploadedImage,
  onSave,
  onDownload,
  prediction,
  report
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <Card className="p-8 max-h-[90vh] overflow-y-auto relative">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-slate-500 hover:text-slate-700 transition"
        aria-label="Close Modal"
      >
        <X size={20} />
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Image Preview */}
        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Uploaded Image</h3>
          <div className="aspect-square rounded-lg overflow-hidden bg-slate-100/50">
            <img
              src={uploadedImage}
              alt="Analyzed cloud"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Prediction Report */}
        <div>
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Analysis Report</h3>
          <div className="space-y-4 text-slate-700">
            {/* Cloud Type */}
            <div className="p-4 bg-slate-100/50 rounded-lg">
              <h4 className="font-semibold mb-2 text-slate-800">Cloud Type</h4>
              <p className="text-2xl font-bold text-blue-600">
                {prediction?.predicted_class || 'N/A'}
              </p>
            </div>

            {/* Confidence */}
            <div className="p-4 bg-slate-100/50 rounded-lg">
              <h4 className="font-semibold mb-2 text-slate-800">Confidence</h4>
              <p className="text-xl text-sky-600">
                {prediction?.confidence_percentage || 'N/A'}
              </p>
            </div>

            {/* Structured Report */}
            <div className="p-4 bg-slate-100/50 rounded-lg">
              <h4 className="font-semibold mb-2 text-slate-800">Details</h4>
              {report ? (
                <div className="space-y-2 text-sm text-slate-700">
                  <p><span className="font-semibold text-slate-800">Risk Level:</span> {report.riskLevel}</p>
                  <p><span className="font-semibold text-slate-800">Weather Impact:</span> {report.weatherImpact}</p>
                  <p><span className="font-semibold text-slate-800">Typical Weather:</span> {report.typicalWeather}</p>
                  <p><span className="font-semibold text-slate-800">Description:</span> {report.description}</p>
                </div>
              ) : (
                <p>No additional report provided.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-end mt-8 pt-6 border-t border-slate-300/50">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="ghost" onClick={onDownload}>
          <Download size={18} />
          Download
        </Button>
        <Button variant="primary" onClick={onSave}>
          <Save size={18} />
          Save Analysis
        </Button>
      </div>
    </Card>
  </Modal>
);

export default AnalysisModal;
