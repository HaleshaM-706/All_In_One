export function ImageCard({ image, onRotate, onDelete, dragHandleProps }) {
  return (
    <article className="image-card">
      <div className="card-header">
        <button className="drag-handle" type="button" aria-label="Drag to reorder" {...dragHandleProps}>
          ⋮⋮
        </button>
        <div className="card-title-wrap">
          <p className="card-title">{image.name}</p>
          <span className="card-meta">{Math.round(image.file.size / 1024)} KB</span>
        </div>
      </div>
      <div className="image-frame">
        <img
          src={image.preview}
          alt={image.name}
          className="preview-image"
          style={{ transform: `rotate(${image.rotation}deg)` }}
        />
      </div>
      <div className="card-actions">
        <button type="button" className="ghost-button" onClick={() => onRotate(image.id, 'left')}>
          Rotate Left
        </button>
        <button type="button" className="ghost-button" onClick={() => onRotate(image.id, 'right')}>
          Rotate Right
        </button>
        <button type="button" className="danger-button" onClick={() => onDelete(image.id)}>
          Remove
        </button>
      </div>
    </article>
  );
}
