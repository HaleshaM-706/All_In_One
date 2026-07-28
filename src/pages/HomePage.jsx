import { useCallback, useMemo, useState } from 'react';
import { ImageUploader } from '../components/ImageUploader';
import { ImagePreview } from '../components/ImagePreview';
import { PdfOptions } from '../components/PdfOptions';
import { Toolbar } from '../components/Toolbar';
import { useImageManager } from '../hooks/useImageManager';
import { generatePdf } from '../services/pdfService';
import { InlineAd } from '../ads/components/InlineAd';
import { SidebarAd } from '../ads/components/SidebarAd';
import { PremiumBanner } from '../premium/PremiumBanner';
import { PremiumFeatures } from '../premium/PremiumFeatures';
import { PremiumGuard } from '../premium/PremiumGuard';
import { UpgradeDialog } from '../premium/UpgradeDialog';
import { trackUpload, trackGeneratePdf, trackDownload, trackFeatureUsage } from '../analytics/events';
import { useFeatureFlags } from '../hooks/useFeatureFlags';

export function HomePage() {
  const { images, addImages, removeImage, rotateImage, reorderImages, clearImages } = useImageManager();
  const { ADS_ENABLED, PREMIUM_ENABLED } = useFeatureFlags();
  const [pdfOptions, setPdfOptions] = useState({ pageSize: 'A4', orientation: 'Portrait', fit: 'Original Size' });
  const [feedback, setFeedback] = useState('Upload a few images to start building your PDF.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfName, setPdfName] = useState('converted-images.pdf');
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleUpload = useCallback(async (files) => {
    const result = await addImages(files);
    trackUpload();
    trackFeatureUsage('upload');
    if (result?.errors?.length) {
      setFeedback(result.errors[0]);
    } else if (result?.addedCount) {
      setFeedback(`${result.addedCount} image${result.addedCount > 1 ? 's' : ''} added.`);
    } else {
      setFeedback('No new images were added.');
    }
  }, [addImages]);

  const handleConvert = useCallback(async () => {
    if (!images.length) {
      setFeedback('Add at least one image before converting.');
      return;
    }

    setIsGenerating(true);
    setFeedback('Preparing your PDF...');

    try {
      const result = await generatePdf(images, pdfOptions);
      setPdfUrl(result.url);
      setPdfName(result.filename);
      trackGeneratePdf();
      trackFeatureUsage('convert');
      setFeedback('PDF generated successfully.');
    } catch (error) {
      setFeedback(error.message || 'Unable to generate the PDF.');
    } finally {
      setIsGenerating(false);
    }
  }, [images, pdfOptions]);

  const handleDownload = useCallback(() => {
    if (!pdfUrl) {
      setFeedback('Generate a PDF first.');
      return;
    }

    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = pdfName;
    link.click();
    trackDownload();
    trackFeatureUsage('download');
    setFeedback('Download started.');
  }, [pdfName, pdfUrl]);

  const handleClear = useCallback(() => {
    clearImages();
    setPdfUrl(null);
    setPdfName('converted-images.pdf');
    trackFeatureUsage('clear');
    setFeedback('All images cleared.');
  }, [clearImages]);

  const handleOptionChange = useCallback((key, value) => {
    setPdfOptions((prev) => ({ ...prev, [key]: value }));
  }, []);

  const canConvert = useMemo(() => images.length > 0, [images.length]);
  const canDownload = useMemo(() => Boolean(pdfUrl), [pdfUrl]);

  return (
    <div className="app-shell">
      <header className="hero-card">
        <div>
          <p className="eyebrow">Browser-first tools</p>
          <h1>Image to PDF Converter</h1>
          <p className="hero-copy">Upload images, reorder them, and create a polished PDF without sending anything to a server.</p>
        </div>
      </header>

      <main className="content-grid">
        <section className="panel">
          {ADS_ENABLED && <InlineAd />}
          <ImageUploader onUpload={handleUpload} />
        </section>

        <section className="panel panel-stack">
          <div className="panel-header">
            <h2>PDF Settings</h2>
            <span>Customize output</span>
          </div>
          <PdfOptions options={pdfOptions} onChange={handleOptionChange} />
          <Toolbar onConvert={handleConvert} onDownload={handleDownload} onClear={handleClear} canConvert={canConvert} canDownload={canDownload} isGenerating={isGenerating} />
          <PremiumBanner onUpgrade={() => setShowUpgrade(true)} />
          {PREMIUM_ENABLED && <PremiumFeatures />}
        </section>

        <section className="panel panel-stack">
          <div className="panel-header">
            <h2>Uploaded Images</h2>
            <span>{images.length} selected</span>
          </div>
          <ImagePreview images={images} onRotate={rotateImage} onDelete={removeImage} onReorder={reorderImages} />
          <PremiumGuard enabled={true} onUpgrade={() => setShowUpgrade(true)}>
            <div className="premium-inline">Premium controls enabled</div>
          </PremiumGuard>
        </section>
      </main>

      {ADS_ENABLED && <SidebarAd />}
      <UpgradeDialog open={showUpgrade} onClose={() => setShowUpgrade(false)} />
      <p className="feedback-banner" role="status">{feedback}</p>
    </div>
  );
}
