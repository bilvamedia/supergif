import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { SuperGifLogo } from './SuperGifLogo';
import { Button } from './ui/button';
import { ArrowLeft } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

const Layout = ({ children, showBackButton = true }: LayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#fdfcfb] to-[#e2d1c3]">
      <div className="max-w-4xl mx-auto p-6">
        {!isHomePage && (
          <header className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <SuperGifLogo />
            </Link>
            {showBackButton && (
              <Button
                variant="ghost"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
                onClick={() => navigate(-1)}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
            )}
          </header>
        )}
        
        <main>
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-8 mt-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm">
              {new Date().getFullYear()} SuperGIF. All rights reserved.
            </div>
            <div className="flex space-x-6 text-sm">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
