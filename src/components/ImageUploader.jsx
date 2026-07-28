import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export function ImageUploader({ onUpload }) {
  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length) {
        onUpload(acceptedFiles);
      }
    },
    [onUpload],
  );

  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpeg': ['.jpg', '.jpeg'],
    },
    multiple: true,
  });

  return (
    <div className={`upload-zone ${isDragActive ? 'upload-zone-active' : ''}`} {...getRootProps()}>
      <input {...getInputProps()} />
      <div className="upload-content">
        <p className="upload-title">{isDragActive ? 'Drop your images here' : 'Drag and drop images here'}</p>
        <p className="upload-copy">or click to browse files from your device.</p>
        <p className="upload-meta">PNG, JPG, and JPEG • Up to 10 MB each</p>
        <button
          type="button"
          className="secondary-button"
          onClick={(event) => {
            event.stopPropagation();
            open();
          }}
        >
          Choose files
        </button>
      </div>
    </div>
  );
}
