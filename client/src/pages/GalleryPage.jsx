import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { axiosInstance } from "../lib/axios";
import loader2 from "../assets/loader2.json";
import Lottie from "lottie-react";

export function UsersGalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  const categories = ["All"]; // Categories can be enhanced later from tags

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        setLoading(true);
        const res = await axiosInstance.get("/images/showcase");
        if (!mounted) return;
        const images = (res.data?.data || []).map((img) => ({
          id: img._id,
          src: img.url,
          title: img.tags?.join(", ") || "",
          category: "Showcase",
          description: "",
        }));
        setGalleryImages(images);
      } catch {
        setGalleryImages([]);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    load();
    return () => {
      mounted = false;
    };
  }, []);

  const filteredImages =
    selectedCategory === "All"
      ? galleryImages
      : galleryImages.filter((img) => img.category === selectedCategory);

  const openLightbox = (index) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    if (selectedImage === null) return;

    const currentIndex = selectedImage;
    const totalImages = filteredImages.length;

    if (direction === "prev") {
      setSelectedImage(currentIndex > 0 ? currentIndex - 1 : totalImages - 1);
    } else {
      setSelectedImage(currentIndex < totalImages - 1 ? currentIndex + 1 : 0);
    }
  };

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Project{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Gallery
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Explore our portfolio of successful electrical infrastructure
            projects. From power grid modernization to renewable energy
            integration, see how we're powering the future.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={
                selectedCategory === category
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "border-white/20 cursor-pointer hover:bg-white/10"
              }
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Lottie
              animationData={loader2}
              // loop
              style={{ width: "180px", height: "180px" }}
            />
            <p className="text-slate-500 mt-4">Loading images...</p>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center text-white/70">
            No images to display yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group cursor-pointer overflow-hidden rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-300"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-video overflow-hidden">
                  <ImageWithFallback
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {image.category}
                    </Badge>
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {image.title}
                  </h3>
                  <p className="text-white/70 text-sm">{image.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
              onClick={closeLightbox}
            >
              <X size={24} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 z-10"
              onClick={() => navigateImage("prev")}
            >
              <ChevronLeft size={24} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 z-10"
              onClick={() => navigateImage("next")}
            >
              <ChevronRight size={24} />
            </Button>

            <div className="max-w-4xl max-h-full flex flex-col items-center">
              <div className="relative max-h-[70vh] overflow-hidden rounded-lg">
                <ImageWithFallback
                  src={filteredImages[selectedImage].src}
                  alt={filteredImages[selectedImage].title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-white text-xl font-semibold mb-2">
                  {filteredImages[selectedImage].title}
                </h3>
                <p className="text-white/70 max-w-2xl">
                  {filteredImages[selectedImage].description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
