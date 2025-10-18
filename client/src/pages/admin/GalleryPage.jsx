import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Eye, ImageIcon } from "lucide-react";
import { axiosInstance } from "../../lib/axios";
import Lottie from "lottie-react";

import loader2 from "../../assets/loader2.json";
import picLoader from "../../assets/picLoader.json";

export default function GalleryPage() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [fullImage, setFullImage] = useState(null);
  const [fullLoading, setFullLoading] = useState(false);

  useEffect(() => {
    const fetchThumbnails = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/images/get-images");
        setImages(res.data.data || []);
      } catch {
        setImages([]);
      } finally {
        setLoading(false);
      }
    };
    fetchThumbnails();
  }, []);

  const handleThumbnailClick = async (img) => {
    setSelectedImage(img);
    setFullLoading(true);
    try {
      const res = await axiosInstance.get(`/images/get-image/${img._id}`);
      setFullImage(res.data.data);
    } catch {
      setFullImage(null);
    } finally {
      setFullLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-slate-900 dark:text-white text-center tracking-tight">
          Media Gallery
        </h1>

        {/* Loader */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Lottie
              animationData={loader2}
              loop
              style={{ width: "180px", height: "180px" }}
            />
            <p className="text-slate-500 mt-4">Loading your images...</p>
          </div>
        ) : images.length === 0 ? (
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
            {images.map((img) => (
              <div
                key={img._id}
                onClick={() => handleThumbnailClick(img)}
                className="relative group aspect-square rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-700 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
              >
                <img
                  src={img.thumbnail}
                  alt="thumbnail"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <Eye className="w-10 h-10 text-white" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Full Image Modal */}
        <Dialog
          open={!!selectedImage}
          onOpenChange={() => {
            setSelectedImage(null);
            setFullImage(null);
          }}
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
            <div className="flex justify-end pt-4 border-t ">
              <Button
                className="cursor-pointer"
                onClick={() => {
                  setSelectedImage(null);
                  setFullImage(null);
                }}
                variant="outline"
                size="sm"
              >
                Close
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
