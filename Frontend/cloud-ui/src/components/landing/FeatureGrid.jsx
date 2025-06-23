import FeatureCard from './FeatureCard';
import { Cloud, ArrowRight } from 'lucide-react';
const FeatureGrid = () => {
  const features = [
    {
      icon: <Cloud className="w-6 h-6 text-blue-600" />,
      iconColor: "bg-blue-100",
      title: "AI-Powered Analysis",
      description: "Advanced machine learning algorithms for accurate cloud type identification"
    },
    {
      icon: <ArrowRight className="w-6 h-6 text-green-600" />,
      iconColor: "bg-green-100", 
      title: "Real-time Processing",
      description: "Get instant results with our optimized classification pipeline"
    },
    {
      icon: <Cloud className="w-6 h-6 text-purple-600" />,
      iconColor: "bg-purple-100",
      title: "Professional Reports", 
      description: "Comprehensive analysis reports for meteorological insights"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          icon={feature.icon}
          iconColor={feature.iconColor}
          title={feature.title}
          description={feature.description}
        />
      ))}
    </div>
  );
};

export default FeatureGrid