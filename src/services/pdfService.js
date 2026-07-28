import { jsPDF } from 'jspdf';
import { resizeImage, rotateImageDataUrl } from '../utils/imageUtils';

export async function generatePdf(images, options = {}) {
  if (!images?.length) {
    throw new Error('Add at least one image before converting.');
  }

  const pageSize = options.pageSize === 'Letter' ? 'letter' : 'a4';
  const orientation = options.orientation === 'Landscape' ? 'l' : 'p';
  const fitMode = options.fit || 'Original Size';

  const pdf = new jsPDF({ orientation, unit: 'pt', format: pageSize });
  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 40;
  const availableWidth = pageWidth - margin * 2;
  const availableHeight = pageHeight - margin * 2;

  for (let index = 0; index < images.length; index += 1) {
    if (index > 0) {
      pdf.addPage();
    }

    const image = images[index];
    const rotatedDataUrl = await rotateImageDataUrl(image.file, image.rotation);

    const imageElement = await new Promise((resolve, reject) => {
      const tempImage = new Image();
      tempImage.onload = () => resolve(tempImage);
      tempImage.onerror = () => reject(new Error('Unable to prepare the selected image.'));
      tempImage.src = rotatedDataUrl;
    });

    const { width, height } = resizeImage(
      imageElement.width,
      imageElement.height,
      availableWidth,
      availableHeight,
      fitMode,
    );

    const x = (pageWidth - width) / 2;
    const y = (pageHeight - height) / 2;

    pdf.addImage(rotatedDataUrl, image.file.type === 'image/png' ? 'PNG' : 'JPEG', x, y, width, height);
  }

  const blob = pdf.output('blob');
  const url = URL.createObjectURL(blob);
  return {
    blob,
    filename: `converted-images-${Date.now()}.pdf`,
    url,
  };
}
