import HeroSection from "./HeroSection";
import FeatureGrid from "./FeatureGrid";
import CTAButton from "./CTAButton";
const MainSection = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-80px)] text-center px-6">
      <div className="max-w-4xl mx-auto">
        <HeroSection />
        <FeatureGrid />
        <CTAButton />
      </div>
    </div>
  );
};

export default MainSection;