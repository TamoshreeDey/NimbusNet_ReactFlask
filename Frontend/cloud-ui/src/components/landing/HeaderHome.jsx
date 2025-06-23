import {Cloud} from 'lucide-react';

const HeaderHome = () => {
  return (
    <header className="relative z-10 px-6 py-4 bg-white/80 backdrop-blur-sm border-b border-gray-200">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-600 p-2 rounded-lg">
          <Cloud className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-gray-900">Cloud Classification System</h1>
          <p className="text-gray-600 text-sm">Professional Weather Analysis</p>
        </div>
      </div>
    </header>
  );
};

export default HeaderHome;