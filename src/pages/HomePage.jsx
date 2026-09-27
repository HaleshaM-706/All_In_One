import { useCallback, useMemo, useState } from "react";
import { ImageUploader } from "../components/ImageUploader";
import { ImagePreview } from "../components/ImagePreview";
import { PdfOptions } from "../components/PdfOptions";
import { Toolbar } from "../components/Toolbar";
import { useImageManager } from "../hooks/useImageManager";
import { generatePdf } from "../services/pdfService";
import { PremiumBanner } from "../premium/PremiumBanner";
import { PremiumFeatures } from "../premium/PremiumFeatures";
import { PremiumGuard } from "../premium/PremiumGuard";
import { UpgradeDialog } from "../premium/UpgradeDialog";
import {
  trackUpload,
  trackGeneratePdf,
  trackDownload,
  trackFeatureUsage,
} from "../analytics/events";
import { useFeatureFlags } from "../hooks/useFeatureFlags";
import { AppLayout } from "../layouts/AppLayout";

export function HomePage() {
  const {
    images,
    addImages,
    removeImage,
    rotateImage,
    reorderImages,
    clearImages,
  } = useImageManager();
  const { PREMIUM_ENABLED } = useFeatureFlags();
  const [pdfOptions, setPdfOptions] = useState({
    pageSize: "A4",
    orientation: "Portrait",
    fit: "Original Size",
  });
  const [feedback, setFeedback] = useState(
    "Upload a few images to start building your PDF.",
  );
  const [isGenerating, setIsGenerating] = useState(false);
  const [pdfUrl, setPdfUrl] = useState(null);
  const [pdfName, setPdfName] = useState("converted-images.pdf");
  const [showUpgrade, setShowUpgrade] = useState(false);

  const handleUpload = useCallback(
    async (files) => {
      const result = await addImages(files);
      trackUpload();
      trackFeatureUsage("upload");

      if (result?.errors?.length) {
        const message = result.errors[0];
        if (
          message.toLowerCase().includes("10 mb") ||
          message.toLowerCase().includes("less than 10 mb")
        ) {
          window.alert(message);
        }
        setFeedback(message);
      } else if (result?.addedCount) {
        setFeedback(
          `${result.addedCount} image${result.addedCount > 1 ? "s" : ""} added.`,
        );
      } else {
        setFeedback("No new images were added.");
      }
    },
    [addImages],
  );

  const handleConvert = useCallback(async () => {
    if (!images.length) {
      setFeedback("Add at least one image before converting.");
      return;
    }

    setIsGenerating(true);
    setFeedback("Preparing your PDF...");

    try {
      const result = await generatePdf(images, pdfOptions);
      setPdfUrl(result.url);
      setPdfName(result.filename);
      trackGeneratePdf();
      trackFeatureUsage("convert");
      setFeedback("PDF generated successfully.");
    } catch (error) {
      setFeedback(error.message || "Unable to generate the PDF.");
    } finally {
      setIsGenerating(false);
    }
  }, [images, pdfOptions]);

  const handleDownload = useCallback(() => {
    if (!pdfUrl) {
      setFeedback("Generate a PDF first.");
      return;
    }

    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = pdfName;
    link.click();
    trackDownload();
    trackFeatureUsage("download");
    setFeedback("Download started.");
  }, [pdfName, pdfUrl]);

  const handleClear = useCallback(() => {
    clearImages();
    setPdfUrl(null);
    setPdfName("converted-images.pdf");
    trackFeatureUsage("clear");
    setFeedback("All images cleared.");
  }, [clearImages]);

  const handleOptionChange = useCallback((key, value) => {
    setPdfOptions((prev) => ({ ...prev, [key]: value }));
  }, []);

  const canConvert = useMemo(() => images.length > 0, [images.length]);
  const canDownload = useMemo(() => Boolean(pdfUrl), [pdfUrl]);
  const hasPublisherContent = useMemo(
    () => images.length > 0 || Boolean(pdfUrl),
    [images.length, pdfUrl],
  );

  return (
    <AppLayout showAds={hasPublisherContent}>
      <div className="app-shell">
        <header className="hero-card hero-card--split">
          <div className="hero-copy-block">
            <p className="eyebrow">Browser-first tools</p>
            <h1>Image to PDF Converter</h1>
            <p className="hero-copy">
              Turn JPG, PNG, and other image files into a clean PDF directly in
              your browser. No upload to a remote server, no waiting on a
              third-party conversion service, and no complicated setup.
            </p>
          </div>

          <div className="hero-meta">
            <ul className="feature-list">
              <li>Batch-upload multiple images in one step</li>
              <li>Reorder, rotate, and remove files before export</li>
              <li>Customize page size, orientation, and fit options</li>
              <li>Download a ready-to-share PDF in seconds</li>
            </ul>
          </div>
        </header>

        <section className="info-strip" aria-label="Tool benefits">
          <article className="info-card">
            <span className="info-kicker">Privacy first</span>
            <h2>Everything happens on-device</h2>
            <p>
              Your images stay in the browser while you prepare the PDF, which
              keeps the workflow simple and private.
            </p>
          </article>
          <article className="info-card">
            <span className="info-kicker">Built for speed</span>
            <h2>Fast document prep</h2>
            <p>
              Drag in a few photos, choose the final layout, and export a
              polished file without leaving the page.
            </p>
          </article>
          <article className="info-card">
            <span className="info-kicker">Clear controls</span>
            <h2>Simple output settings</h2>
            <p>
              Adjust page size, rotation, and fit to match the source images and
              the final document you need.
            </p>
          </article>
        </section>
        
<section className="panel panel-stack">
            <div className="panel-header">
              <h2>Uploaded Images</h2>
              <span>{images.length} selected</span>
            </div>
            <ImagePreview
              images={images}
              onRotate={rotateImage}
              onDelete={removeImage}
              onReorder={reorderImages}
            />
            <PremiumGuard enabled={true} onUpgrade={() => setShowUpgrade(true)}>
              <div className="premium-inline">Premium controls enabled</div>
            </PremiumGuard>
          </section>
        <main className="content-grid">
          
          <section className="panel">
            <ImageUploader onUpload={handleUpload} />
          </section>

          <section className="panel panel-stack">
            <div className="panel-header">
              <h2>PDF Settings</h2>
              <span>Customize output</span>
            </div>
            <PdfOptions options={pdfOptions} onChange={handleOptionChange} />
            <Toolbar
              onConvert={handleConvert}
              onDownload={handleDownload}
              onClear={handleClear}
              canConvert={canConvert}
              canDownload={canDownload}
              isGenerating={isGenerating}
            />
            <PremiumBanner onUpgrade={() => setShowUpgrade(true)} />
            {PREMIUM_ENABLED && <PremiumFeatures />}
          </section>
        </main>

        <section className="help-panel" aria-label="How this tool works">
          <div className="panel-header">
            <h2>How it works</h2>
          </div>

          <div className="steps-grid">
            <div className="step-card">
              <span className="step-number">1</span>
              <h3>Add your images</h3>
              <p>Upload photos, screenshots, or scanned pages from your device.</p>
            </div>
            <div className="step-card">
              <span className="step-number">2</span>
              <h3>Arrange them</h3>
              <p>Sort the order, remove unwanted files, and rotate anything that needs a quick fix.</p>
            </div>
            <div className="step-card">
              <span className="step-number">3</span>
              <h3>Export a PDF</h3>
              <p>Choose the page setup that fits your document and download the finished file.</p>
            </div>
          </div>
        </section>

        <UpgradeDialog open={showUpgrade} onClose={() => setShowUpgrade(false)} />
        <p className="feedback-banner" role="status">{feedback}</p>
      </div>
    </AppLayout>
  );
}
