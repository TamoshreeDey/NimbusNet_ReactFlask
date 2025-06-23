import React from 'react';
import { Cloud, ArrowRight } from 'lucide-react';
import "./animated.css"

// Animated Background Component
const AnimatedClouds = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Cloud 1 */}
      <div className="absolute top-20 left-10 animate-float">
        <Cloud className="w-16 h-16 text-blue-200 opacity-60" />
      </div>
      
      {/* Cloud 2 */}
      <div className="absolute top-32 right-20 animate-float-delayed">
        <Cloud className="w-20 h-20 text-blue-300 opacity-40" />
      </div>
      
      {/* Cloud 3 */}
      <div className="absolute top-60 left-1/4 animate-float-slow">
        <Cloud className="w-12 h-12 text-blue-400 opacity-50" />
      </div>
      
      {/* Cloud 4 */}
      <div className="absolute bottom-40 right-1/3 animate-float">
        <Cloud className="w-24 h-24 text-blue-200 opacity-30" />
      </div>
      
      {/* Cloud 5 */}
      <div className="absolute bottom-20 left-1/2 animate-float-delayed">
        <Cloud className="w-14 h-14 text-blue-300 opacity-45" />
      </div>
    </div>
  );
};

export default AnimatedClouds;