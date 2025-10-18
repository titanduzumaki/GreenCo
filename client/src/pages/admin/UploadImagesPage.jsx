import { useState, useRef } from "react";
import { usePhotoStore } from "../../store/PhotoStore";
import { Button } from "../../components/ui/button";
import {
  Upload,
  X,
  ImageIcon,
  Eye,
  FileImage,
  CheckCircle2,
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";

export default function UploadImagesPage() {
  const fileInputRef = useRef(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const { uploadPhotos } = usePhotoStore();
  const PREVIEW_THRESHOLD = 5;

  const handleFileSelect = (files) => {
    if (!files || files.length === 0) return;
    const validFiles = [];
    const previews = [];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!file.type.startsWith("image/")) {
        toast.error(`${file.name} is not an image file`);
        continue;
      }
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} is too large (max 10MB)`);
        continue;
      }
      validFiles.push(file);
      const previewUrl = URL.createObjectURL(file);
      previews.push({
        id: Date.now() + i,
        file,
        url: previewUrl,
        name: file.name,
      });
    }
    if (validFiles.length === 0) return;
    setSelectedFiles([...selectedFiles, ...validFiles]);
    setPreviewUrls([...previewUrls, ...previews]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };
  const removePreview = (id) => {
    const preview = previewUrls.find((p) => p.id === id);
    if (preview) URL.revokeObjectURL(preview.url);
    setPreviewUrls(previewUrls.filter((p) => p.id !== id));
    const fileIndex = selectedFiles.findIndex((f) => f.name === preview?.name);
    if (fileIndex !== -1) {
      const newFiles = [...selectedFiles];
      newFiles.splice(fileIndex, 1);
      setSelectedFiles(newFiles);
    }
  };
  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select images to upload");
      return;
    }
    setIsUploading(true);
    try {
      await uploadPhotos(selectedFiles);
      toast.success(
        `Successfully uploaded ${selectedFiles.length} image${
          selectedFiles.length > 1 ? "s" : ""
        }`
      );
      previewUrls.forEach((preview) => URL.revokeObjectURL(preview.url));
      setSelectedFiles([]);
      setPreviewUrls([]);
    } catch {
      toast.error("Upload failed. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };
  const handleCancel = () => {
    previewUrls.forEach((preview) => URL.revokeObjectURL(preview.url));
    setSelectedFiles([]);
    setPreviewUrls([]);
    toast.info("Upload cancelled");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
            Upload Images
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Select and upload images to your gallery
          </p>
        </div>
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer ${
            isDragging
              ? "border-green-500 bg-green-50/50 dark:bg-green-950/20 scale-105"
              : "border-slate-300 dark:border-slate-600 hover:border-green-400 dark:hover:border-green-500 hover:bg-slate-50 dark:hover:bg-slate-800/50"
          }`}
        >
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
              <Upload className="w-12 h-12 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-slate-700 dark:text-slate-300 mb-2">
                {isDragging ? "Drop images here" : "Drag & drop images here"}
              </p>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                or click to browse from your computer
              </p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
                Supports: JPG, PNG, GIF, WebP (Max 10MB per file)
              </p>
            </div>
          </div>
          <input
            type="file"
            multiple
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={(e) => handleFileSelect(e.target.files)}
          />
        </div>
        {previewUrls.length > 0 && previewUrls.length <= PREVIEW_THRESHOLD && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-6 space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                Preview ({previewUrls.length}{" "}
                {previewUrls.length === 1 ? "image" : "images"})
              </h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {previewUrls.map((preview) => (
                <div
                  key={preview.id}
                  className="relative group aspect-square rounded-lg overflow-hidden bg-slate-100 dark:bg-slate-700 shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                  onClick={() => setSelectedImage(preview)}
                >
                  <img
                    src={preview.url}
                    alt={preview.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Eye className="w-8 h-8 text-white" />
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removePreview(preview.id);
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10"
                    title="Remove image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs text-white truncate">
                      {preview.name}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-4 justify-end pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button
                onClick={handleCancel}
                variant="outline"
                size="lg"
                disabled={isUploading}
                className="px-8 border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                size="lg"
                className="px-8 bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                {isUploading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload {previewUrls.length}{" "}
                    {previewUrls.length === 1 ? "Image" : "Images"}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
        {previewUrls.length > PREVIEW_THRESHOLD && (
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg p-8 space-y-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-full">
                <FileImage className="w-12 h-12 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-center">
                <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
                  {previewUrls.length} Images Selected
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mt-1">
                  Ready to upload
                </p>
              </div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900/50 rounded-lg p-4 max-h-48 overflow-y-auto">
              <div className="space-y-2">
                {previewUrls.slice(0, 10).map((preview) => (
                  <div
                    key={preview.id}
                    className="flex items-center justify-between text-sm hover:bg-slate-100 dark:hover:bg-slate-800 p-2 rounded cursor-pointer transition-colors"
                    onClick={() => setSelectedImage(preview)}
                  >
                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                      <CheckCircle2 className="w-4 h-4 text-green-600 dark:text-green-400 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300 truncate">
                        {preview.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImage(preview);
                        }}
                        className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
                        title="View image"
                      >
                        <Eye className="w-4 h-4 text-slate-500" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          removePreview(preview.id);
                        }}
                        className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"
                        title="Remove image"
                      >
                        <X className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  </div>
                ))}
                {previewUrls.length > 10 && (
                  <p className="text-sm text-slate-500 dark:text-slate-400 text-center py-2">
                    ... and {previewUrls.length - 10} more images
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div className="p-3 bg-slate-100 dark:bg-slate-900/50 rounded-lg">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {previewUrls.length}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Total Files
                </p>
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-900/50 rounded-lg">
                <p className="text-2xl font-bold text-slate-900 dark:text-white">
                  {(
                    selectedFiles.reduce((acc, file) => acc + file.size, 0) /
                    (1024 * 1024)
                  ).toFixed(2)}{" "}
                  MB
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Total Size
                </p>
              </div>
              <div className="p-3 bg-slate-100 dark:bg-slate-900/50 rounded-lg">
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  ✓
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  All Valid
                </p>
              </div>
            </div>
            <div className="flex gap-4 justify-center pt-4 border-t border-slate-200 dark:border-slate-700">
              <Button
                onClick={handleCancel}
                variant="outline"
                size="lg"
                disabled={isUploading}
                className="px-12 border-slate-300 hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button
                onClick={handleUpload}
                disabled={isUploading}
                size="lg"
                className="px-12 bg-green-600 hover:bg-green-700 text-white shadow-lg hover:shadow-xl transition-all"
              >
                {isUploading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                    Uploading {previewUrls.length} Images...
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 mr-2" />
                    Upload All {previewUrls.length} Images
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
        {previewUrls.length === 0 && (
          <div className="text-center py-12">
            <div className="inline-flex p-6 bg-slate-200 dark:bg-slate-700 rounded-full mb-4">
              <ImageIcon className="w-16 h-16 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-slate-500 dark:text-slate-400">
              No images selected yet. Select or drag images to get started.
            </p>
          </div>
        )}
        <Dialog
          open={!!selectedImage}
          onOpenChange={() => setSelectedImage(null)}
        >
          <DialogContent className="max-w-4xl">
            <DialogHeader>
              <DialogTitle className="truncate">
                {selectedImage?.name}
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-center bg-slate-100 dark:bg-slate-900 rounded-lg p-4">
              <img
                src={selectedImage?.url}
                alt={selectedImage?.name}
                className="max-h-[70vh] w-auto object-contain rounded"
              />
            </div>
            <div className="flex justify-between items-center pt-4 border-t">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Size:{" "}
                {selectedImage?.file &&
                  (selectedImage.file.size / 1024).toFixed(2)}{" "}
                KB
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => {
                    if (selectedImage) {
                      removePreview(selectedImage.id);
                      setSelectedImage(null);
                    }
                  }}
                  variant="destructive"
                  size="sm"
                >
                  <X className="w-4 h-4 mr-2" />
                  Remove
                </Button>
                <Button
                  onClick={() => setSelectedImage(null)}
                  variant="outline"
                  size="sm"
                >
                  Close
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
