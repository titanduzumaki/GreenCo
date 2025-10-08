import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Power Grids",
    "Smart Cities",
    "Renewable Energy",
    "Maintenance",
  ];

  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop&auto=format",
      title: "Modern Power Grid Installation",
      category: "Power Grids",
      description:
        "State-of-the-art electrical grid infrastructure in downtown metropolitan area.",
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&h=600&fit=crop&auto=format",
      title: "Smart City Lighting System",
      category: "Smart Cities",
      description:
        "Intelligent LED street lighting with IoT sensors and remote monitoring capabilities.",
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=800&h=600&fit=crop&auto=format",
      title: "Solar Farm Integration",
      category: "Renewable Energy",
      description:
        "Large-scale solar installation connected to the regional power grid.",
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop&auto=format",
      title: "Substation Maintenance",
      category: "Maintenance",
      description:
        "Routine maintenance and inspection of critical electrical infrastructure.",
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&h=600&fit=crop&auto=format",
      title: "Wind Power Connection",
      category: "Renewable Energy",
      description:
        "Wind turbine farm connected to the main electrical distribution network.",
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1581092918789-6c13be0f7bd2?w=800&h=600&fit=crop&auto=format",
      title: "Urban Grid Modernization",
      category: "Power Grids",
      description:
        "Upgrading legacy electrical systems with modern smart grid technology.",
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1581092446488-2b92c95b7c5a?w=800&h=600&fit=crop&auto=format",
      title: "Smart Traffic Control",
      category: "Smart Cities",
      description:
        "Intelligent traffic management system with integrated power distribution.",
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1581092353999-efb18e503c84?w=800&h=600&fit=crop&auto=format",
      title: "Emergency Response Team",
      category: "Maintenance",
      description:
        "24/7 emergency response team restoring power after severe weather.",
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1581092795442-6e0c3a6c8f32?w=800&h=600&fit=crop&auto=format",
      title: "Battery Storage Facility",
      category: "Renewable Energy",
      description:
        "Grid-scale battery storage system for renewable energy integration.",
    },
  ];

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
                <h3 className="text-white font-semibold mb-2">{image.title}</h3>
                <p className="text-white/70 text-sm">{image.description}</p>
              </div>
            </div>
          ))}
        </div>

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
