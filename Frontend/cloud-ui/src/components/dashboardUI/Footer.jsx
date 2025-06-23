import React from 'react';

export const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white mt-0">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-semibold mb-3">System Information</h4>
            <p className="text-slate-300 text-sm">
              ML Model Version: 1.1.0<br/>
              Last Updated: {new Date().toLocaleDateString()}<br/>
              Classification Accuracy: 92%
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <p className="text-slate-300 text-sm">
              For technical support or questions about cloud classification, contact our support team.
            </p>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-slate-400 text-sm">
          <p>© 2025 Cloud Classification System | Professional Weather Analysis Platform</p>
        </div>
      </div>
    </footer>
  );
};