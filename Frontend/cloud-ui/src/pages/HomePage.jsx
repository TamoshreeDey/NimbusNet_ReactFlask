import AnimatedClouds from "../components/landing/AnimatedCloud";
import HeaderHome from "../components/landing/HeaderHome";
import MainSection from "../components/landing/MainSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 relative overflow-hidden">
      <AnimatedClouds />
      <HeaderHome />
      <MainSection />
    </div>
  );
}