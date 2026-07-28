export function validateImageType(file) {
  if (!file?.type) return false;
  return ['image/png', 'image/jpeg', 'image/jpg'].includes(file.type.toLowerCase());
}

export function validateImageSize(file, maxSizeInBytes = 10 * 1024 * 1024) {
  return file?.size <= maxSizeInBytes;
}

export function generateUniqueId() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
