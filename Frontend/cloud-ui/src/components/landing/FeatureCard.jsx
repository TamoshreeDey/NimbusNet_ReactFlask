const FeatureCard = ({ icon, iconColor, title, description }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-200">
      <div className={`${iconColor} p-3 rounded-lg inline-block mb-4`}>
        {icon}
      </div>
      <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;