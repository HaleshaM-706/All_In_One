import { useCallback, useEffect, useRef, useState } from 'react';
import { generateUniqueId, validateImageSize, validateImageType } from '../utils/fileUtils';

export function useImageManager() {
  const [images, setImages] = useState([]);
  const previousImagesRef = useRef([]);

  useEffect(() => {
    const removedImages = previousImagesRef.current.filter(
      (prevImage) => !images.some((currentImage) => currentImage.id === prevImage.id),
    );

    removedImages.forEach((image) => {
      if (image.preview) {
        URL.revokeObjectURL(image.preview);
      }
    });

    previousImagesRef.current = images;
  }, [images]);

  useEffect(() => {
    return () => {
      previousImagesRef.current.forEach((image) => {
        if (image.preview) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, []);

  const addImages = useCallback(async (files) => {
    const incomingFiles = Array.from(files || []);
    const errors = [];
    const validFiles = [];
    const totalUploadSize = incomingFiles.reduce((total, file) => total + (file?.size || 0), 0);

    if (totalUploadSize > 10 * 1024 * 1024) {
      return {
        addedCount: 0,
        errors: ['Upload less than 10 MB.'],
      };
    }

    setImages((previousImages) => {
      incomingFiles.forEach((file) => {
        if (!validateImageType(file)) {
          errors.push(`${file.name} is not a supported image type.`);
          return;
        }

        if (!validateImageSize(file)) {
          errors.push(`${file.name} exceeds the 10 MB upload limit.`);
          return;
        }

        const isDuplicate = previousImages.some(
          (image) =>
            image.file.name === file.name &&
            image.file.size === file.size &&
            image.file.lastModified === file.lastModified,
        );

        if (isDuplicate) {
          errors.push(`${file.name} is already selected.`);
          return;
        }

        validFiles.push(file);
      });

      if (!validFiles.length) {
        return previousImages;
      }

      const nextImages = validFiles.map((file) => ({
        id: generateUniqueId(),
        file,
        preview: URL.createObjectURL(file),
        rotation: 0,
        name: file.name,
      }));

      return [...previousImages, ...nextImages];
    });

    return { addedCount: validFiles.length, errors };
  }, []);

  const removeImage = useCallback((id) => {
    setImages((previous) => previous.filter((image) => image.id !== id));
  }, []);

  const rotateImage = useCallback((id, direction) => {
    setImages((previous) =>
      previous.map((image) => {
        if (image.id !== id) {
          return image;
        }

        const delta = direction === 'left' ? -90 : 90;
        return { ...image, rotation: (image.rotation + delta + 360) % 360 };
      }),
    );
  }, []);

  const reorderImages = useCallback((nextImages) => {
    setImages(nextImages);
  }, []);

  const clearImages = useCallback(() => {
    setImages([]);
  }, []);

  return {
    images,
    addImages,
    removeImage,
    rotateImage,
    reorderImages,
    clearImages,
  };
}
