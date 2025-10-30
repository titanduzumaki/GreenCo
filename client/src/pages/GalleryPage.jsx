import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { axiosInstance } from "../lib/axios";
import loader2 from "../assets/loader2.json";
import Lottie from "lottie-react";
import { useMediaQuery } from "react-responsive";
import Stack from "@/components/Stack";
import Masonry from "@/components/Masonry"; // ✅ newly added import

export function UsersGalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(false);
  const [galleryImages, setGalleryImages] = useState([]);

  const categories = ["All"];
  const isMobile = useMediaQuery({ maxWidth: 768 });

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

  const openLightbox = (index) => setSelectedImage(index);
  const closeLightbox = () => setSelectedImage(null);

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

  // Masonry-compatible items
  const masonryItems = filteredImages.map((img, i) => ({
    id: img.id || `masonry-${i}`,
    img: img.src,
    url: "#",
    height: 400 + Math.floor(Math.random() * 250),
    index: i,
  }));

  return (
    <div className="min-h-screen py-20 pt-20 pb-32">
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

        {/* Gallery Section */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-24">
            <Lottie
              animationData={loader2}
              style={{ width: "180px", height: "180px" }}
            />
            <p className="text-slate-500 mt-4">Loading images...</p>
          </div>
        ) : filteredImages.length === 0 ? (
          <div className="text-center text-white/70">
            No images to display yet.
          </div>
        ) : (
          <div className="flex justify-center mt-1">
            {isMobile ? (
              <Stack
                randomRotation={true}
                sensitivity={180}
                sendToBackOnClick={false}
                onImageClick={(index) => openLightbox(index)}
                cardDimensions={{ width: 300, height: 300 }}
                cardsData={filteredImages.map((img, i) => ({
                  id: img._id || `card-${i}`,
                  img: img.src,
                  originalIndex: i,
                }))}
              />
            ) : (
              <div className="w-full relative overflow-visible block pb-20 min-h-[80vh]">
                <Masonry
                  items={masonryItems}
                  ease="power3.out"
                  duration={0.6}
                  stagger={0.05}
                  animateFrom="bottom"
                  scaleOnHover={true}
                  hoverScale={0.95}
                  blurToFocus={true}
                  colorShiftOnHover={false}
                  onItemClick={(item) =>
                    openLightbox(
                      filteredImages.findIndex((i) => i.src === item.img)
                    )
                  }
                />
              </div>
            )}
          </div>
        )}

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-6 right-6 text-white hover:bg-white/10 z-10 rounded-full p-3"
              onClick={closeLightbox}
            >
              <X size={24} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 z-10 rounded-full p-3"
              onClick={() => navigateImage("prev")}
            >
              <ChevronLeft size={24} />
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 z-10 rounded-full p-3"
              onClick={() => navigateImage("next")}
            >
              <ChevronRight size={24} />
            </Button>

            <div className="max-w-5xl max-h-full flex flex-col items-center">
              <div className="relative max-h-[75vh] overflow-hidden rounded-2xl shadow-2xl">
                <ImageWithFallback
                  src={filteredImages[selectedImage].src}
                  alt={filteredImages[selectedImage].title}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              <div className="mt-6 text-center max-w-3xl">
                <h3 className="text-white text-2xl font-bold mb-3">
                  {filteredImages[selectedImage].title || "Project Showcase"}
                </h3>
                <p className="text-white/80 text-lg leading-relaxed">
                  {filteredImages[selectedImage].description ||
                    "Explore our electrical infrastructure project showcasing innovative solutions and professional craftsmanship."}
                </p>
                <div className="mt-4 flex items-center justify-center gap-4">
                  <Badge
                    variant="secondary"
                    className="bg-green-500/20 text-green-300 border-green-500/30 px-4 py-2"
                  >
                    {filteredImages[selectedImage].category}
                  </Badge>
                  <span className="text-white/60 text-sm">
                    {selectedImage + 1} of {filteredImages.length}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
