
import React, { useState, useCallback } from 'react';
import { jsPDF } from 'jspdf';
import { saveAs } from 'file-saver';
import { Download, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import ImageUploader from './ImageUploader';
import ImagePreview from './ImagePreview';

const Converter = () => {
  const [images, setImages] = useState<{ file: File; url: string }[]>([]);
  const [isConverting, setIsConverting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const { toast } = useToast();

  const handleImageUpload = useCallback((files: File[]) => {
    const newImages = files.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));
    
    setImages(prev => [...prev, ...newImages]);
    setIsComplete(false);
    
    toast({
      title: 'Images added',
      description: `${files.length} image${files.length > 1 ? 's' : ''} added successfully`,
    });
  }, [toast]);

  const handleRemoveImage = useCallback((index: number) => {
    setImages(prev => {
      const newImages = [...prev];
      URL.revokeObjectURL(newImages[index].url);
      newImages.splice(index, 1);
      return newImages;
    });
    setIsComplete(false);
  }, []);

  const handleConvertToPdf = useCallback(async () => {
    if (images.length === 0) {
      toast({
        title: 'No images selected',
        description: 'Please upload at least one image',
        variant: 'destructive',
      });
      return;
    }
    
    setIsConverting(true);
    
    try {
      const pdf = new jsPDF();
      
      // Create an array to store promises for image loading
      const imagePromises = images.map((image, index) => {
        return new Promise<void>((resolve) => {
          const img = new Image();
          img.src = image.url;
          
          img.onload = () => {
            const imgWidth = pdf.internal.pageSize.getWidth() - 20;
            const imgHeight = (img.height * imgWidth) / img.width;
            
            // Add new page for all images except the first one
            if (index > 0) {
              pdf.addPage();
            }
            
            // Add the image to the PDF
            pdf.addImage(
              img, 
              'JPEG', 
              10, 
              10, 
              imgWidth, 
              imgHeight
            );
            
            resolve();
          };
        });
      });
      
      // Wait for all images to be processed
      await Promise.all(imagePromises);
      
      // Save the PDF
      const pdfBlob = pdf.output('blob');
      saveAs(pdfBlob, 'converted_images.pdf');
      
      setIsComplete(true);
      
      toast({
        title: 'PDF created successfully',
        description: 'Your images have been converted to PDF',
      });
    } catch (error) {
      console.error('Error creating PDF:', error);
      toast({
        title: 'Error creating PDF',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsConverting(false);
    }
  }, [images, toast]);

  const handleReset = useCallback(() => {
    // Clean up object URLs
    images.forEach(image => URL.revokeObjectURL(image.url));
    setImages([]);
    setIsComplete(false);
  }, [images]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <ImageUploader onImagesSelected={handleImageUpload} />
      
      <ImagePreview images={images} onRemove={handleRemoveImage} />
      
      {images.length > 0 && (
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={handleConvertToPdf}
            disabled={isConverting || images.length === 0}
            className={`${
              isComplete 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-app-pink hover:bg-app-burgundy'
            } text-white font-medium px-8 py-2`}
          >
            {isConverting ? (
              <div className="flex items-center">
                <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full mr-2" />
                Converting...
              </div>
            ) : isComplete ? (
              <>
                <Check className="h-5 w-5 mr-2" />
                Converted
              </>
            ) : (
              <>
                <Download className="h-5 w-5 mr-2" />
                Convert to PDF
              </>
            )}
          </Button>
          
          {images.length > 0 && (
            <Button 
              onClick={handleReset}
              variant="outline"
              className="border-app-red text-app-red hover:bg-app-red/10"
            >
              Start Over
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default Converter;
