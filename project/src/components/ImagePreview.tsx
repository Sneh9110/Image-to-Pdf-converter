
import React from 'react';
import { X } from 'lucide-react';

interface ImagePreviewProps {
  images: { file: File; url: string }[];
  onRemove: (index: number) => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ images, onRemove }) => {
  if (images.length === 0) return null;

  return (
    <div className="mt-8">
      <h3 className="text-lg font-medium mb-4">Preview ({images.length} images)</h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div key={index} className="relative group">
            <div className="thumbnail-wrapper border border-gray-200 rounded-md overflow-hidden shadow-sm">
              <img 
                src={image.url} 
                alt={`Preview ${index}`} 
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => onRemove(index)}
                className="absolute top-2 right-2 bg-app-red text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1 truncate">{image.file.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;
