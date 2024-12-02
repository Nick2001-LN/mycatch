import React from 'react';
import { useDropzone } from 'react-dropzone';
import { Image, Upload } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  previewUrl?: string;
}

export function ImageUpload({ onImageSelect, previewUrl }: ImageUploadProps) {
  const [preview, setPreview] = React.useState<string | undefined>(previewUrl);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (file) {
        onImageSelect(file);
        const objectUrl = URL.createObjectURL(file);
        setPreview(objectUrl);
      }
    },
    [onImageSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
    },
    maxFiles: 1,
    multiple: false,
  });

  React.useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div
      {...getRootProps()}
      className={`relative border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${
        isDragActive
          ? 'border-blue-500 bg-blue-50'
          : 'border-gray-300 hover:border-gray-400'
      }`}
    >
      <input {...getInputProps()} />
      {preview ? (
        <div className="relative aspect-video">
          <img
            src={preview}
            alt="Preview"
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg">
            <Upload className="h-8 w-8 text-white" />
          </div>
        </div>
      ) : (
        <div className="py-8">
          <Image className="mx-auto h-12 w-12 text-gray-400" />
          <div className="mt-4 text-sm text-gray-600">
            <span className="font-semibold text-blue-600">Click to upload</span> or
            drag and drop
          </div>
          <p className="mt-1 text-xs text-gray-500">
            PNG, JPG, GIF up to 10MB
          </p>
        </div>
      )}
    </div>
  );
}