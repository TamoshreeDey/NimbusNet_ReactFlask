import { Cloud, ArrowRight } from 'lucide-react';
const HeroSection = () => {
  return (
    <div className="mb-8">
      <div className="bg-blue-600 p-4 rounded-2xl inline-block mb-6 shadow-lg">
        <Cloud className="w-16 h-16 text-white" />
      </div>
      
      <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
        Advanced Cloud
        <span className="text-blue-600 block">Classification</span>
      </h1>
      
      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
        Harness the power of AI to analyze and classify cloud formations with precision. 
        Professional weather analysis made simple and accessible.
      </p>
    </div>
  );
};

export default HeroSection;