import imageCompression from "browser-image-compression";

interface CompressionOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  initialQuality?: number;
}

export const compressImage = async (
  file: File,
  options: CompressionOptions = {}
): Promise<File> => {
  if (!file) {
    throw new Error("No file provided for compression.");
  }

  const defaultOptions: CompressionOptions = {
    maxSizeMB: 2,
    maxWidthOrHeight: 3500,
    useWebWorker: true,
    initialQuality: 0.7,
    ...options,
  };

  try {
    const compressedBlob = await imageCompression(file, defaultOptions);

    return new File([compressedBlob], file.name, {
      type: file.type,
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error("Image compression error:", error);
    throw new Error("Image compression failed.");
  }
};
