import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CTAButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/dashboard')}  // ← navigate to dashboard
      className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center space-x-2 mx-auto"
    >
      <span>Get Started</span>
      <ArrowRight className="w-5 h-5" />
    </button>
  );
};

export default CTAButton;
