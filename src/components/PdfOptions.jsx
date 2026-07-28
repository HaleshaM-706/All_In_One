export function PdfOptions({ options, onChange }) {
  return (
    <div className="options-group">
      <label className="option-field">
        <span>Page Size</span>
        <select value={options.pageSize} onChange={(event) => onChange('pageSize', event.target.value)}>
          <option value="A4">A4</option>
          <option value="Letter">Letter</option>
        </select>
      </label>

      <label className="option-field">
        <span>Orientation</span>
        <select value={options.orientation} onChange={(event) => onChange('orientation', event.target.value)}>
          <option value="Portrait">Portrait</option>
          <option value="Landscape">Landscape</option>
        </select>
      </label>

      <label className="option-field">
        <span>Image Fit</span>
        <select value={options.fit} onChange={(event) => onChange('fit', event.target.value)}>
          <option value="Fit Width">Fit Width</option>
          <option value="Fit Height">Fit Height</option>
          <option value="Original Size">Original Size</option>
        </select>
      </label>
    </div>
  );
}
