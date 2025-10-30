import { useEffect, useState } from "react";
import { usePhotoStore } from "../../store/PhotoStore";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Eye, ImageIcon, Send, Trash2, Upload } from "lucide-react";
import Lottie from "lottie-react";
import loader3 from "../../assets/loader3.json";
import picLoader from "../../assets/picLoader.json";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function GalleryPage() {
  const photos = usePhotoStore((state) => state.photos);
  const loading = usePhotoStore((state) => state.loading);
  const fetchThumbnails = usePhotoStore((state) => state.fetchThumbnails);
  const fetchFullImage = usePhotoStore((state) => state.fetchFullImage);
  const fullImage = usePhotoStore((state) => state.fullImage);
  const fullLoading = usePhotoStore((state) => state.fullLoading);
  const deletePhotoById = usePhotoStore((state) => state.deletePhotoById);
  const deletePhotosByIds = usePhotoStore((state) => state.deletePhotosByIds);
  const setShowcaseBulk = usePhotoStore((state) => state.setShowcaseBulk);

  const [selectedImage, setSelectedImage] = useState(null);
  const [photoToDelete, setPhotoToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);
  const [bulkDeleteDialog, setBulkDeleteDialog] = useState(false);
  const [removingIds, setRemovingIds] = useState([]); // for fade-out animation

  const showcasedImageLength = photos.filter((p) => p.isShowcased);

  const navigate = useNavigate();

  useEffect(() => {
    fetchThumbnails();
    // eslint-disable-next-line
  }, []);

  const handleThumbnailClick = (img) => {
    setSelectedImage(img);
    fetchFullImage(img._id);
  };

  const toggleSelectPhoto = (id) => {
    setSelectedPhotos((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedPhotos.length === photos.length) setSelectedPhotos([]);
    else setSelectedPhotos(photos.map((p) => p._id));
  };

  const handleDelete = async (photo) => {
    try {
      if (photo.isShowcased) {
        const showcasedIds = photos
          .filter((p) => p.isShowcased)
          .map((p) => p._id);
        if (showcasedIds.length <= 6) {
          toast.error(
            `Cannot delete this photo. Minimum 6 showcased images required. Currently showcased: ${showcasedIds.length}`
          );
          return;
        }
      }

      setDeleting(true);
      setRemovingIds((prev) => [...prev, photo._id]);
      await deletePhotoById(photo._id);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
      setRemovingIds((prev) => prev.filter((id) => id !== photo._id));
      setPhotoToDelete(null);
      setSelectedPhotos((prev) => prev.filter((id) => id !== photo._id));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedPhotos.length === 0) return;

    const showcasedIds = photos.filter((p) => p.isShowcased).map((p) => p._id);
    const showcasedToDelete = selectedPhotos.filter((id) =>
      showcasedIds.includes(id)
    );

    // Check min 6 limit
    if (showcasedIds.length - showcasedToDelete.length < 6) {
      toast.error(
        `Cannot delete selected photos. At least 6 showcased images must remain. Currently showcased: ${showcasedIds.length}`
      );
      return;
    }

    try {
      setDeleting(true);
      setRemovingIds([...selectedPhotos]);
      await deletePhotosByIds(selectedPhotos);

      setSelectedPhotos([]);
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
      setRemovingIds([]);
      setBulkDeleteDialog(false);
    }
  };

  const handleShowcaseSelection = async () => {
    const showcasedIds = photos.filter((p) => p.isShowcased).map((p) => p._id);

    const toShowcase = selectedPhotos.filter(
      (id) => !showcasedIds.includes(id)
    );
    const toUnshowcase = selectedPhotos.filter((id) =>
      showcasedIds.includes(id)
    );

    const totalAfter =
      showcasedIds.length - toUnshowcase.length + toShowcase.length;

    if (totalAfter < 6) {
      toast.error(
        `You must have at least 6 images showcased. Current showcased: ${showcasedIds.length}`
      );
      return;
    }

    if (totalAfter > 10) {
      toast.error(
        `You can showcase a maximum of 10 images. Current showcased: ${showcasedIds.length}`
      );
      return;
    }

    try {
      await setShowcaseBulk(toShowcase, toUnshowcase);
      setSelectedPhotos([]);
      toast.success(
        `Showcase updated successfully! Total showcased: ${totalAfter}`
      );
    } catch {
      toast.error("Failed to update showcase.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex  justify-between">
          <h1 className="text-4xl font-bold mb-6 text-slate-900 dark:text-white text-center tracking-tight">
            Media Gallery
          </h1>

          <h2 className="text-lg text-slate-600 dark:text-slate-400">
            Total Images Showcased : {showcasedImageLength.length}
          </h2>

          <Button
            onClick={() => navigate("/admin/upload")}
            className="cursor-pointer bg-green-500 hover:bg-green-600 text-white"
            size="lg"
          >
            <>
              <Upload className="w-5 h-5 mr-2" /> Upload
            </>
          </Button>
        </div>

        {/* Toolbar */}
        {photos.length > 0 && (
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={toggleSelectAll}>
                {selectedPhotos.length === photos.length
                  ? "Deselect All"
                  : "Select All"}
              </Button>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                {selectedPhotos.length} selected
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                variant="secondary"
                size="sm"
                className="cursor-pointer bg-green-700"
                disabled={selectedPhotos.length === 0 || loading}
                onClick={handleShowcaseSelection}
              >
                Showcase / Unshowcase
              </Button>

              <Button
                variant="secondary"
                size="sm"
                className="cursor-pointer bg-red-700"
                disabled={selectedPhotos.length === 0 || deleting}
                onClick={() => setBulkDeleteDialog(true)}
              >
                {deleting ? "Deleting..." : "Delete Selected"}
              </Button>
            </div>
          </div>
        )}

        {/* Loader */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Lottie
              animationData={loader3}
              loop
              style={{ width: "180px", height: "180px" }}
            />
            <p className="text-slate-500 mt-4">Loading your images...</p>
          </div>
        ) : photos.length === 0 ? (
          <div className="text-center py-20">
            <div className="inline-flex p-8 bg-slate-200 dark:bg-slate-700 rounded-full mb-6 shadow-inner">
              <ImageIcon className="w-20 h-20 text-slate-400 dark:text-slate-500" />
            </div>
            <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
              No images uploaded yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {photos.map((img) => (
              <div
                key={img._id}
                className={`relative group aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 shadow-md transition-all duration-300 cursor-pointer
                  ${
                    removingIds.includes(img._id)
                      ? "opacity-0 scale-95 transition-all duration-300"
                      : ""
                  }`}
              >
                <input
                  type="checkbox"
                  checked={selectedPhotos.includes(img._id)}
                  onChange={(e) => {
                    e.stopPropagation();
                    toggleSelectPhoto(img._id);
                  }}
                  className="absolute top-2 left-2 w-5 h-5 z-10 cursor-pointer"
                />
                {img.isShowcased && (
                  <span className="absolute top-2 right-2 z-10 text-xs bg-green-500 text-white px-2 py-1 rounded-md shadow">
                    Showcased
                  </span>
                )}
                <img
                  src={img.thumbnail}
                  alt="thumbnail"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  onClick={() => handleThumbnailClick(img)}
                />

                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleThumbnailClick(img);
                    }}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition"
                    title="View"
                  >
                    <Eye className="w-6 h-6 text-white" />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setPhotoToDelete(img);
                    }}
                    className="p-2 rounded-full bg-red-500/70 hover:bg-red-600 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-6 h-6 text-white" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Full Image Modal */}
        <Dialog
          open={!!selectedImage}
          onOpenChange={() => setSelectedImage(null)}
        >
          <DialogContent className="max-w-4xl rounded-xl overflow-hidden">
            <DialogHeader className="border-b pb-3">
              <DialogTitle className="text-xl font-semibold text-slate-800 dark:text-slate-100">
                {fullImage?.tags?.length
                  ? fullImage.tags.join(", ")
                  : fullImage?.url
                  ? "Image"
                  : ""}
              </DialogTitle>
            </DialogHeader>
            <div className="flex items-center justify-center bg-slate-50 dark:bg-slate-800 min-h-[400px] rounded-lg">
              {fullLoading ? (
                <Lottie
                  animationData={picLoader}
                  loop
                  style={{ width: "150px", height: "150px" }}
                />
              ) : fullImage?.url ? (
                <img
                  src={fullImage.url}
                  alt="full"
                  className="max-h-[75vh] w-auto object-contain rounded-xl shadow-lg transition-all duration-300"
                />
              ) : (
                <span className="text-slate-500">Failed to load image.</span>
              )}
            </div>
            <div className="flex justify-end pt-4 border-t">
              <Button
                className="cursor-pointer"
                onClick={() => setSelectedImage(null)}
                variant="outline"
                size="sm"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Individual Delete Dialog */}
        <Dialog
          open={!!photoToDelete}
          onOpenChange={() => setPhotoToDelete(null)}
        >
          <DialogContent className="max-w-md rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Confirm Delete
              </DialogTitle>
            </DialogHeader>
            <p className="text-slate-600 dark:text-slate-400">
              Are you sure you want to permanently delete this photo?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setPhotoToDelete(null)}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={() => handleDelete(photoToDelete)}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Bulk Delete Dialog */}
        <Dialog
          open={bulkDeleteDialog}
          onOpenChange={() => setBulkDeleteDialog(false)}
        >
          <DialogContent className="max-w-md rounded-xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold text-slate-800 dark:text-slate-100">
                Confirm Bulk Delete
              </DialogTitle>
            </DialogHeader>
            <p className="text-slate-600 dark:text-slate-400">
              Are you sure you want to permanently delete{" "}
              {selectedPhotos.length} photo
              {selectedPhotos.length > 1 ? "s" : ""}?
            </p>

            <div className="flex justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setBulkDeleteDialog(false)}
                disabled={deleting}
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={handleBulkDelete}
                disabled={deleting}
              >
                {deleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
