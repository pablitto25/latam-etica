// Dentro de ImageDropzone.tsx

import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

interface ImageDropzoneProps {
  onImageDrop: (selectedImage: File[]) => void;
}

const ImageDropzone: React.FC<ImageDropzoneProps> = ({ onImageDrop }) => {
  const [selectedImage, setSelectedImage] = useState<File[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedImage(acceptedFiles);
    if (onImageDrop) {
      onImageDrop(acceptedFiles);
    }
  }, [onImageDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div style={{ cursor: 'pointer' }} className='w-32 h-28 rounded-lg text-center pt-1' {...getRootProps()}>
      <input {...getInputProps()} />
      {selectedImage.length > 0 ? (
        <div className='flex flex-col justify-center items-center'>
          <Image src={URL.createObjectURL(selectedImage[0])} alt="Adjuntar evidencia" width={100} height={100} style={{ maxWidth: '100px', maxHeight: '100px' }} />
        </div>
      ) : (
        isDragActive ? <p>Suelta la imagen aquí...</p> : <p>Adjuntar evidencia
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-12 h-12 mx-auto" transform="rotate(45) scale(-1, 1)">
            <path strokeLinecap="round" strokeLinejoin="round" d="m18.375 12.739-7.693 7.693a4.5 4.5 0 0 1-6.364-6.364l10.94-10.94A3 3 0 1 1 19.5 7.372L8.552 18.32m.009-.01-.01.01m5.699-9.941-7.81 7.81a1.5 1.5 0 0 0 2.112 2.13" />
          </svg>
        </p>
      )}
    </div>
  );
};

export default ImageDropzone;
