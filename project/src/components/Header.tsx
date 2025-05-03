
import React from 'react';
import { FileImage } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white py-4 px-4 md:px-6 border-b">
      <div className="container max-w-5xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileImage className="h-6 w-6 text-app-pink" />
          <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-app-pink to-app-red text-transparent bg-clip-text">
            Image to PDF Converter
          </h1>
        </div>
        <div>
          <span className="hidden md:inline text-sm text-gray-500">Fast, Free, & Secure</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
