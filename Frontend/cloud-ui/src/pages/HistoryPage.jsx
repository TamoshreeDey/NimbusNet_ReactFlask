import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import Card from '../components/dashboardUI/Card';
import { ApiService } from '../utils/ApiService';


const HistoryPage = () => {
  const [historyData, setHistoryData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  const fetchHistory = async (filters = {}) => {
    try {
      const result = await ApiService.getPredictionHistory(filters);
      setHistoryData(result);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  useEffect(() => {
    fetchHistory(); // default fetch (latest 3 handled in backend or slicing frontend)
  }, []);

  useEffect(() => {
    if (fromDate || toDate) {
      fetchHistory({ from: fromDate, to: toDate });
    }
  }, [fromDate, toDate]);

  const filteredData = historyData.filter(item =>
    item.prediction?.predicted_class?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Analysis History</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-slate-700 mb-2">From Date</label>
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="w-full p-3"
              max={today}
            />
          </div>
          <div>
            <label className="block text-slate-700 mb-2">To Date</label>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="w-full p-3"
              max={today}
            />
          </div>
          <div>
            <label className="block text-slate-700 mb-2">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-500" size={18} />
              <input
                type="text"
                placeholder="Search cloud type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pl-10"
              />
            </div>
          </div>
        </div>
      </Card>

      <div className="grid gap-4">
        {filteredData.map((item) => (
          <Card key={item._id} className="p-6">
            <div className="flex gap-6 items-center">
              <img
                src={item.image_url}
                alt="Cloud"
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-xl font-semibold">
                  {item.prediction?.predicted_class}
                </h3>
                <p>Date: {new Date(item.timestamp).toLocaleDateString()}</p>
                <p>Confidence: {item.prediction?.confidence_percentage}</p>

                {item.report && typeof item.report === 'object' ? (
                  <div className="mt-2 text-sm text-slate-700 space-y-1">
                    <p><strong>Description:</strong> {item.report.description}</p>
                    <p><strong>Typical Weather:</strong> {item.report.typicalWeather}</p>
                    <p><strong>Impact:</strong> {item.report.weatherImpact}</p>
                    <p><strong>Risk Level:</strong> {item.report.riskLevel}</p>
                  </div>
                ) : (
                  <p className="mt-2 text-sm text-slate-500">No report available.</p>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HistoryPage;
