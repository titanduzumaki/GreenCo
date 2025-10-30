import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle, Clock, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";
import { useEffect, useRef } from "react";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  textReveal,
  imageReveal,
  cardHover,
  pageEntrance,
  cleanupAnimations,
} from "../lib/gsapAnimations";
import { usePhotoStore } from "@/store/PhotoStore";

export function HomePage() {
  const heroRef = useRef(null);
  const servicesRef = useRef(null);
  const featuresRef = useRef(null);
  const galleryRef = useRef(null);

  const recPhotos = usePhotoStore((state) => state.recPhotos);
  const fetchRecentImages = usePhotoStore((state) => state.fetchRecentImages);
  const recentPhotos = recPhotos;

  useEffect(() => {
    fetchRecentImages();
  }, [fetchRecentImages]);

  useEffect(() => {
    // Page entrance animation
    pageEntrance([heroRef.current]);

    // Services section animations
    if (servicesRef.current) {
      const serviceCards =
        servicesRef.current.querySelectorAll(".service-card");
      fadeInUp(serviceCards, { stagger: 0.2 });
      cardHover(serviceCards);
    }

    // Features section animations
    if (featuresRef.current) {
      const featureItems =
        featuresRef.current.querySelectorAll(".feature-item");
      scaleIn(featureItems, { stagger: 0.15 });
    }

    // Gallery section animations
    if (galleryRef.current) {
      const galleryImages =
        galleryRef.current.querySelectorAll(".gallery-image");
      imageReveal(galleryImages, { stagger: 0.1 });
    }

    // Cleanup on unmount
    return () => {
      cleanupAnimations();
    };
  }, []);

  const services = [
    {
      title: "Power Grid Infrastructure",
      description:
        "Modern electrical grid solutions for sustainable energy distribution",
      icon: "⚡",
    },
    {
      title: "Smart City Solutions",
      description:
        "Intelligent infrastructure for connected urban environments",
      icon: "🏙️",
    },
    {
      title: "Renewable Integration",
      description: "Seamless integration of renewable energy sources",
      icon: "🌱",
    },
  ];

  const features = [
    {
      icon: <CheckCircle className="w-8 h-8 text-green-400" />,
      title: "Certified Company",
      description: "Industry certified with highest standards",
    },
    {
      icon: <Clock className="w-8 h-8 text-green-400" />,
      title: "24/7 Support",
      description: "Round-the-clock technical assistance",
    },
    {
      icon: <Shield className="w-8 h-8 text-green-400" />,
      title: "Reliable Solutions",
      description: "Proven track record of successful projects",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Powering Cities,
              <br />
              <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                Empowering Lives
              </span>
            </h1>

            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              GreenCo is your trusted electricity infrastructure partner,
              delivering innovative solutions that power communities and drive
              sustainable growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <Link to="/services">
                  Explore Our Services
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/20  hover:bg-white/10"
              >
                <Link to="/contact">Get In Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section ref={servicesRef} className="py-20 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Comprehensive electrical infrastructure solutions tailored to your
              needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card
                key={index}
                className="service-card bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/70">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section ref={featuresRef} className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Why Choose Us
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              Experience excellence with our proven expertise and commitment to
              quality
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-item text-center">
                <div className="mb-6 flex justify-center">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section ref={galleryRef} className="py-20 bg-black/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Our Projects
            </h2>
            <p className="text-xl text-white/70 max-w-2xl mx-auto">
              See our latest infrastructure projects and innovations
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {recentPhotos.map((photo) => (
              <div
                key={photo._id}
                className="gallery-image aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={photo.url}
                  alt={photo.title || "Image"}
                  className="w-full h-full cursor-pointer  object-cover group-hover:scale-105 transition-transform duration-300"
                />

                <div className="absolute top-2 right-2">
                  <div
                    className={`w-2 h-2 rounded-full ${
                      photo.isVisible ? "bg-green-500" : "bg-slate-400"
                    }`}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Button
              asChild
              variant="outline"
              className="border-white/20  hover:bg-white/10"
            >
              <Link to="/gallery">
                View Full Gallery
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
