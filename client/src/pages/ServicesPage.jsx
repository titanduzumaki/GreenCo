import {
  CheckCircle,
  Zap,
  Building,
  Leaf,
  Wrench,
  Globe,
  Battery,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { useEffect, useRef } from "react";
import {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  textReveal,
  cardHover,
  cleanupAnimations,
} from "../lib/gsapAnimations";

export function ServicesPage() {
  const headerRef = useRef(null);
  const servicesRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Header animation
    if (headerRef.current) {
      textReveal(headerRef.current.querySelectorAll("h1, p"));
    }

    // Services section animations
    if (servicesRef.current) {
      const serviceCards =
        servicesRef.current.querySelectorAll(".service-card");
      fadeInUp(serviceCards, { stagger: 0.2 });
      cardHover(serviceCards);
    }

    // CTA section animation
    if (ctaRef.current) {
      scaleIn([ctaRef.current]);
    }

    // Cleanup on unmount
    return () => {
      cleanupAnimations();
    };
  }, []);

  const services = [
    {
      icon: <Zap className="w-12 h-12 text-green-400" />,
      title: "Electrical Consultant",
      description:
        "Expert consulting services providing innovative and compliant electrical designs focused on safety, efficiency, and sustainability for diverse projects.",
      features: [
        "System Design & Planning",
        "Energy Efficiency Analysis",
        "Power Distribution Strategy",
        "Regulatory Compliance & Safety Audits",
      ],
      category: "Consultancy",
    },

    {
      icon: <Building className="w-12 h-12 text-blue-400" />,
      title: "Electrical Contractor",
      description:
        "Professional electrical contracting services delivering turnkey solutions for commercial, industrial, and infrastructure projects — from system design to final commissioning.",
      features: [
        "Project Design & Consultation",
        "High & Low Voltage Installation",
        "Industrial Wiring & Cabling",
        "Testing, Commissioning & Certification",
      ],
      category: "Contracting",
    },

    // {
    //   icon: <Leaf className="w-12 h-12 text-green-500" />,
    //   title: "Renewable Integration",
    //   description:
    //     "Seamless integration of solar, wind, and other renewable energy sources into existing power infrastructure.",
    //   features: [
    //     "Solar Integration",
    //     "Wind Power",
    //     "Energy Storage",
    //     "Grid Compatibility",
    //   ],
    //   category: "Renewable Energy",
    // },
    {
      icon: <Wrench className="w-12 h-12 text-orange-400" />,
      title: "Electrical Installation",
      description:
        "Comprehensive electrical installation services for residential, commercial, and industrial projects, ensuring safety, compliance, and efficiency from design to implementation.",
      features: [
        "New Wiring & Circuit Setup",
        "Switchboard & Panel Installation",
        "Lighting & Power Distribution",
        "Load Testing & Safety Certification",
      ],
      category: "Installation",
    },

    // {
    //   icon: <Globe className="w-12 h-12 text-purple-400" />,
    //   title: "Network Management",
    //   description:
    //     "Advanced network management solutions for monitoring and controlling distributed electrical systems.",
    //   features: [
    //     "Real-time Monitoring",
    //     "Remote Control",
    //     "Data Analytics",
    //     "Predictive Maintenance",
    //   ],
    //   category: "Management",
    // },
    // {
    //   icon: <Battery className="w-12 h-12 text-yellow-400" />,
    //   title: "Energy Storage",
    //   description:
    //     "Battery storage solutions and energy management systems for enhanced grid stability and efficiency.",
    //   features: [
    //     "Battery Systems",
    //     "Energy Management",
    //     "Grid Stability",
    //     "Peak Shaving",
    //   ],
    //   category: "Storage",
    // },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Our{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Services
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Comprehensive electrical infrastructure solutions designed to meet
            the evolving needs of modern cities and communities. From smart
            grids to renewable integration, we deliver cutting-edge technology
            with proven reliability.
          </p>
        </div>

        {/* Services Grid */}
        <div ref={servicesRef} className="grid lg:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <Card
              key={index}
              className="service-card bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    {service.icon}
                    <div>
                      <CardTitle className="text-white text-xl">
                        {service.title}
                      </CardTitle>
                      <Badge variant="secondary" className="mt-2">
                        {service.category}
                      </Badge>
                    </div>
                  </div>
                </div>
                <p className="text-white/70">{service.description}</p>
              </CardHeader>

              <CardContent>
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Key Features:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-2"
                      >
                        <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        <span className="text-white/80 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div
          ref={ctaRef}
          className="mt-20 text-center bg-gradient-to-r from-green-500/10 to-blue-500/10 rounded-2xl p-12"
        >
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Power Your Project?
          </h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            Contact our team of experts to discuss your electrical
            infrastructure needs and discover how we can help bring your vision
            to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
              Request Consultation
            </button>
            <button className="border border-white/20 text-white hover:bg-white/10 px-8 py-3 rounded-lg font-semibold transition-colors">
              Download Brochure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
