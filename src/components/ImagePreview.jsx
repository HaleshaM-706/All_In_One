import { DragDropList } from './DragDropList';
import { ImageCard } from './ImageCard';

export function ImagePreview({ images, onRotate, onDelete, onReorder }) {
  if (!images.length) {
    return (
      <div className="empty-state">
        <p>Your selected images will appear here.</p>
      </div>
    );
  }

  return (
    <div className="image-preview-list">
      <DragDropList
        items={images}
        onReorder={onReorder}
        renderItem={(image, dragHandleProps) => (
          <ImageCard
            image={image}
            onRotate={onRotate}
            onDelete={onDelete}
            dragHandleProps={dragHandleProps}
          />
        )}
      />
    </div>
  );
}
