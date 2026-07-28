export function loadImage(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();
      image.onload = () => resolve(image);
      image.onerror = () => reject(new Error('Unable to decode the selected image.'));
      image.src = reader.result;
    };

    reader.onerror = () => reject(new Error('Unable to read the selected image.'));
    reader.readAsDataURL(file);
  });
}

export function resizeImage(width, height, maxWidth, maxHeight, mode = 'Original Size') {
  if (mode === 'Fit Width') {
    const newWidth = Math.min(width, maxWidth);
    const newHeight = (height * newWidth) / width;
    return { width: newWidth, height: newHeight };
  }

  if (mode === 'Fit Height') {
    const newHeight = Math.min(height, maxHeight);
    const newWidth = (width * newHeight) / height;
    return { width: newWidth, height: newHeight };
  }

  const ratio = Math.min(maxWidth / width, maxHeight / height, 1);
  return {
    width: width * ratio,
    height: height * ratio,
  };
}

export function rotateImageDataUrl(file, rotation) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const image = new Image();
      image.onload = () => {
        const angle = ((rotation % 360) + 360) % 360;
        const radians = (angle * Math.PI) / 180;
        let width = image.width;
        let height = image.height;

        if (angle % 180 !== 0) {
          [width, height] = [height, width];
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const context = canvas.getContext('2d');

        context.translate(width / 2, height / 2);
        context.rotate(radians);
        context.drawImage(image, -image.width / 2, -image.height / 2);

        const mimeType = file.type || 'image/png';
        resolve(canvas.toDataURL(mimeType));
      };

      image.onerror = () => reject(new Error('Unable to rotate the selected image.'));
      image.src = reader.result;
    };

    reader.onerror = () => reject(new Error('Unable to read the selected image.'));
    reader.readAsDataURL(file);
  });
}
