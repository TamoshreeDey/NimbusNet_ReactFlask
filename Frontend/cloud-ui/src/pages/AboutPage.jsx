import React from 'react';
import { Cloud, Brain, Eye, Zap, Target, TrendingUp, Filter, Layers, Award, Users } from 'lucide-react';

const Card = ({ children, className = '' }) => (
  <div className={`bg-white/80 backdrop-blur-lg border border-blue-100/50 rounded-xl shadow-xl ${className}`}>
    {children}
  </div>
);

const AboutPage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 p-6">
    <div className="max-w-6xl mx-auto">
      {/* Hero Section */}
      <Card className="p-12 mb-8 text-center bg-gradient-to-r from-blue-50/90 to-sky-50/90">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-sky-600 rounded-full text-white shadow-lg">
            <Cloud size={48} />
          </div>
        </div>
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-700 to-sky-800 bg-clip-text text-transparent mb-4">
          Cloud Classification System
        </h1>
        <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
          Revolutionizing meteorological analysis through cutting-edge artificial intelligence and advanced computer vision techniques
        </p>
      </Card>

      {/* Main Content */}
      <Card className="p-10 mb-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold text-slate-800 mb-6 flex items-center gap-3">
              <Brain className="text-blue-600" size={36} />
              Advanced AI Technology
            </h2>
            <p className="text-lg text-slate-700 mb-6 leading-relaxed">
              Our revolutionary cloud classification system harnesses the power of state-of-the-art 
              <span className="font-semibold text-blue-700"> Convolutional Neural Networks (CNN)</span> to 
              deliver unprecedented accuracy in atmospheric analysis. Through meticulous engineering and 
              innovative design, we've created a system that sees the sky like never before.
            </p>
            <p className="text-lg text-slate-700 leading-relaxed">
              With an impressive <span className="font-bold text-green-600">92% training accuracy</span>, 
              our model consistently identifies and categorizes cloud formations including Cumulus, Stratus, 
              Cirrus, Nimbus, and their complex variations with remarkable precision.
            </p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-sky-100 p-8 rounded-2xl">
            <div className="text-center">
              <div className="text-6xl font-bold text-blue-600 mb-2">92%</div>
              <div className="text-xl font-semibold text-slate-700 mb-4">Training Accuracy</div>
              <div className="flex justify-center gap-4">
                <div className="p-2 bg-blue-500 rounded-full text-white">
                  <Target size={20} />
                </div>
                <div className="p-2 bg-sky-500 rounded-full text-white">
                  <TrendingUp size={20} />
                </div>
                <div className="p-2 bg-cyan-500 rounded-full text-white">
                  <Award size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Technical Excellence Section */}
      <Card className="p-10 mb-8 bg-gradient-to-r from-slate-50/90 to-blue-50/90">
        <h2 className="text-3xl font-bold text-slate-800 mb-8 text-center flex items-center justify-center gap-3">
          <Filter className="text-blue-600" size={32} />
          Advanced Image Processing Pipeline
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white/60 rounded-xl border border-blue-100">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full text-white inline-block mb-4">
              <Layers size={24} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Sobel Edge Detection</h3>
            <p className="text-slate-600">
              Advanced gradient-based edge detection for identifying cloud boundaries and structural features with precision
            </p>
          </div>
          <div className="text-center p-6 bg-white/60 rounded-xl border border-blue-100">
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full text-white inline-block mb-4">
              <Eye size={24} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Laplacian Filtering</h3>
            <p className="text-slate-600">
              Second-order derivative filtering for enhanced feature extraction and cloud texture analysis
            </p>
          </div>
          <div className="text-center p-6 bg-white/60 rounded-xl border border-blue-100">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-white inline-block mb-4">
              <Zap size={24} />
            </div>
            <h3 className="text-xl font-semibold text-slate-800 mb-3">Gaussian Smoothing</h3>
            <p className="text-slate-600">
              Sophisticated noise reduction and image enhancement for optimal pattern recognition
            </p>
          </div>
        </div>
      </Card>

      {/* Features & Technology Grid */}
      <div className="grid lg:grid-cols-2 gap-8 mb-8">
        <Card className="p-8 bg-gradient-to-br from-blue-50/90 to-cyan-50/90">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Zap className="text-blue-600" size={28} />
            Key Features
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
              <div className="p-1 bg-blue-500 rounded-full mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Real-time Classification</h4>
                <p className="text-slate-600 text-sm">Instant cloud type identification with millisecond response times</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
              <div className="p-1 bg-green-500 rounded-full mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">High-Precision Analytics</h4>
                <p className="text-slate-600 text-sm">92% accuracy with detailed confidence scoring and analysis</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
              <div className="p-1 bg-purple-500 rounded-full mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Comprehensive Reports</h4>
                <p className="text-slate-600 text-sm">Detailed atmospheric analysis with meteorological insights</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
              <div className="p-1 bg-cyan-500 rounded-full mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Historical Tracking</h4>
                <p className="text-slate-600 text-sm">Advanced data management with searchable analysis history</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-8 bg-gradient-to-br from-sky-50/90 to-blue-50/90">
          <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
            <Brain className="text-blue-600" size={28} />
            Technology Stack
          </h3>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
              <div className="p-1 bg-red-500 rounded-full mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Custom CNN Architecture</h4>
                <p className="text-slate-600 text-sm">Optimized deep learning model with advanced feature extraction</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
              <div className="p-1 bg-orange-500 rounded-full mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Computer Vision Pipeline</h4>
                <p className="text-slate-600 text-sm">Multi-filter processing with Sobel, Laplacian & Gaussian filters</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
              <div className="p-1 bg-green-500 rounded-full mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">Flask Backend</h4>
                <p className="text-slate-600 text-sm">Robust server architecture with scalable API endpoints</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/50 rounded-lg">
              <div className="p-1 bg-blue-500 rounded-full mt-1">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">React Frontend</h4>
                <p className="text-slate-600 text-sm">Modern, responsive interface with real-time visualization</p>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Mission Statement */}
      <Card className="p-10 text-center bg-gradient-to-r from-blue-50/90 via-sky-50/90 to-cyan-50/90">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-600 to-sky-700 rounded-full text-white shadow-lg">
            <Users size={32} />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Mission</h2>
        <p className="text-lg text-slate-700 leading-relaxed max-w-4xl mx-auto">
          We're dedicated to advancing meteorological science through innovative AI solutions. 
          By democratizing access to sophisticated atmospheric analysis tools, we empower researchers, 
          educators, and weather enthusiasts to unlock the secrets hidden in the clouds above us.
        </p>
      </Card>
    </div>
  </div>
);

export default AboutPage;