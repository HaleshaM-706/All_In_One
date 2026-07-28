export function Toolbar({ onConvert, onDownload, onClear, canConvert, canDownload, isGenerating }) {
  return (
    <div className="toolbar">
      <button type="button" className="primary-button" onClick={onConvert} disabled={!canConvert || isGenerating}>
        {isGenerating ? 'Preparing...' : 'Convert to PDF'}
      </button>
      <button type="button" className="secondary-button" onClick={onDownload} disabled={!canDownload}>
        Download PDF
      </button>
      <button type="button" className="ghost-button" onClick={onClear} disabled={!canConvert}>
        Clear Images
      </button>
    </div>
  );
}
