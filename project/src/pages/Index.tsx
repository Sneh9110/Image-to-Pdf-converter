import React, { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Converter from '@/components/Converter';
import AdBanner from '@/components/Adbanner';  // Adjust this if your path is different


const Index = () => {
  
  // Add the ad banner script when the component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      atOptions = {
        'key' : 'e7e27e267732e29bfb57187f1af7429f',
        'format' : 'iframe',
        'height' : 250,
        'width' : 300,
        'params' : {}
      };
    `;
    document.body.appendChild(script);

    const invokeScript = document.createElement('script');
    invokeScript.type = 'text/javascript';
    invokeScript.src = '//www.highperformanceformat.com/e7e27e267732e29bfb57187f1af7429f/invoke.js';
    document.body.appendChild(invokeScript);

    return () => {
      // Cleanup scripts when component unmounts
      document.body.removeChild(script);
      document.body.removeChild(invokeScript);
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow py-10 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Convert Images to PDF
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Easily combine multiple images into a single PDF document. 
              Free, fast, and secure - no registration required.
            </p>
          </div>
          
          <Converter />
          
          <AdBanner />

          <div className="mt-16 bg-app-yellow/10 border border-app-yellow/30 rounded-lg p-6 max-w-3xl mx-auto">
            <h2 className="text-xl font-semibold mb-3 text-gray-800">How to use:</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Drag and drop your images or click "Browse Files" to select</li>
              <li>Arrange your images in the preview section (if needed)</li>
              <li>Click "Convert to PDF" button</li>
              <li>Your PDF will automatically download</li>
            </ol>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
