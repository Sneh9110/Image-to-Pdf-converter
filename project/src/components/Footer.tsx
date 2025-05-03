
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white py-6 px-4 md:px-6 border-t mt-auto">
      <div className="container max-w-5xl mx-auto">
        <div className="text-center">
          <p className="text-sm text-gray-500 mb-2">
            Convert images to PDF for free. No registration required.
          </p>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Image to PDF Converter | 
            <a 
              href="#" 
              className="text-app-pink hover:text-app-burgundy ml-1 transition-colors"
            >
              Contact Us
            </a>
          </p>
        </div>
        
        {/* Placeholder for Adsterra integration */}
        <div className="mt-4 text-center text-xs text-gray-400">
          {/* Adsterra code would go here */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
