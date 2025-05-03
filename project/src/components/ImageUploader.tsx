import React, { useCallback, useState, useRef } from 'react';
import { Upload, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ImageUploaderProps {
  onImagesSelected: (files: File[]) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ onImagesSelected }) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files).filter(file => 
      file.type === 'image/jpeg' || 
      file.type === 'image/jpg' || 
      file.type === 'image/png'
    );
    
    if (files.length > 0) {
      onImagesSelected(files);
    }
  }, [onImagesSelected]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).filter(file => 
        file.type === 'image/jpeg' || 
        file.type === 'image/jpg' || 
        file.type === 'image/png'
      );
      
      if (files.length > 0) {
        onImagesSelected(files);
      }
    }
  }, [onImagesSelected]);

  const handleBrowseClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div 
      className={`drag-area flex flex-col items-center justify-center p-10 rounded-lg transition-colors ${isDragging ? 'active' : ''}`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="bg-app-yellow bg-opacity-20 p-4 rounded-full mb-4">
        <Upload className="h-8 w-8 text-app-burgundy animate-bounce-subtle" />
      </div>
      <h2 className="text-xl font-medium mb-2 text-center">Drag & Drop Images Here</h2>
      <p className="text-gray-500 mb-4 text-center max-w-md">
        Upload JPG or PNG files to convert to PDF
      </p>
      
      <div className="mt-2">
        <input
          id="file-upload"
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleFileSelect}
          className="hidden"
        />
        <Button 
          onClick={handleBrowseClick}
          className="bg-app-pink hover:bg-app-burgundy text-white font-medium px-8 py-2"
        >
          <Image className="h-4 w-4 mr-2" />
          Browse Files
        </Button>
      </div>
    </div>
  );
};

export default ImageUploader;
