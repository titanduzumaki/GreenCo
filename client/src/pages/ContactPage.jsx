import { useState, useEffect, useRef } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { toast } from "sonner";
import { useContactStore } from "../store/contactStore";
import Lottie from "lottie-react";
import loader2 from "../assets/loader2.json";
import {
  fadeInLeft,
  fadeInRight,
  scaleIn,
  textReveal,
  cardHover,
  cleanupAnimations,
} from "../lib/gsapAnimations";

// Leaflet imports
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { axiosInstance } from "@/lib/axios";

// Fix default leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Component to fit map bounds to markers
function FitBounds({ locations }) {
  const map = useMap();

  useEffect(() => {
    if (locations.length > 0) {
      const bounds = locations.map((loc) => [
        parseFloat(loc.latitude),
        parseFloat(loc.longitude),
      ]);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [locations, map]);

  return null;
}

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    subject: "",
    message: "",
  });

  const [locations, setLocations] = useState([]);
  const { sendContactMessage, loading } = useContactStore();
  const [siteSettings, setSiteSettings] = useState({
    phoneNumbers: [],
    emails: [],
  });

  const headerRef = useRef(null);
  const contactInfoRef = useRef(null);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchSiteSettings = async () => {
      try {
        const res = await axiosInstance.get("/site-settings");
        if (res.data) setSiteSettings(res.data);
      } catch (err) {
        console.error("Failed to fetch site settings:", err);
      }
    };

    fetchSiteSettings();
  }, []);

  // Fetch locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await axiosInstance.get("/locations");
        setLocations(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching locations:", err);
        toast.error("Failed to load map locations");
        setLocations([]);
      }
    };
    fetchLocations();
  }, []);

  // Animations
  useEffect(() => {
    if (headerRef.current)
      textReveal(headerRef.current.querySelectorAll("h1, p"));
    if (contactInfoRef.current) {
      const infoCards = contactInfoRef.current.querySelectorAll(".info-card");
      fadeInLeft(infoCards, { stagger: 0.2 });
      cardHover(infoCards);
    }
    if (formRef.current) fadeInRight([formRef.current]);

    return () => cleanupAnimations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await sendContactMessage(formData);
      toast.success(res.message);
      setFormData({
        name: "",
        email: "",
        company: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error(error.message);
    }
  };

  const contactInfo = [
    {
      icon: <Phone className="w-6 h-6 text-green-400" />,
      title: "Phone",
      details:
        siteSettings.phoneNumbers.length > 0
          ? siteSettings.phoneNumbers
          : ["+1 (555) 123-4567"],
    },
    {
      icon: <Mail className="w-6 h-6 text-green-400" />,
      title: "Email",
      details:
        siteSettings.emails.length > 0
          ? siteSettings.emails
          : ["info@greenco.com"],
    },
    {
      icon: <MapPin className="w-6 h-6 text-green-400" />,
      title: "Address",
      details: ["123 Energy Boulevard", "Tech City, TC 12345"], // You can also make this dynamic if needed
    },
  ];

  return (
    <div className="min-h-screen py-20">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/50">
          <div className="w-40 h-40">
            <Lottie animationData={loader2} loop />
          </div>
        </div>
      )}

      <div
        className={`container mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
          loading ? "blur-sm pointer-events-none select-none" : ""
        }`}
      >
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Contact{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Us
            </span>
          </h1>
          <p className="text-xl text-white/70 max-w-3xl mx-auto">
            Ready to power your next project? Get in touch with our team of
            experts to discuss your electrical infrastructure needs and discover
            how we can help.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <div ref={contactInfoRef} className="lg:col-span-1">
            <Card className="info-card bg-white/5 border-white/10 mb-8">
              <CardHeader>
                <CardTitle className="text-white">Get In Touch</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">{info.icon}</div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">
                        {info.title}
                      </h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-white/70">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Office Hours */}
            <Card className="info-card bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Office Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-white/70">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span>8:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday</span>
                    <span>9:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday</span>
                    <span>Emergency Only</span>
                  </div>
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-green-400 font-semibold">
                      24/7 Emergency Support Available
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div ref={formRef} className="lg:col-span-2">
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Send us a Message</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputGroup
                      label="Full Name *"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                    <InputGroup
                      label="Email Address *"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      type="email"
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                    <InputGroup
                      label="Company"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                    <InputGroup
                      label="Subject *"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                    placeholder="Tell us about your project requirements..."
                  />
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-green-500 hover:bg-green-600 text-white"
                    size="lg"
                  >
                    <Send className="w-5 h-5 mr-2" /> Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="text-white">Find Our Office</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] w-full rounded-lg overflow-hidden">
                <MapContainer
                  center={[19.076, 72.8777]}
                  zoom={5.5}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {locations.length > 0 ? (
                    locations.map((loc, idx) => (
                      <Marker
                        key={idx}
                        position={[
                          parseFloat(loc.latitude),
                          parseFloat(loc.longitude),
                        ]}
                      >
                        <Popup>
                          <strong>{loc.name}</strong>
                          <br />
                          {loc.description || "No description available"}
                        </Popup>
                      </Marker>
                    ))
                  ) : (
                    <Marker position={[19.076, 72.8777]}>
                      <Popup>Default Location (Mumbai)</Popup>
                    </Marker>
                  )}

                  {/* Fit map bounds */}
                  <FitBounds locations={locations} />
                </MapContainer>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Helper component for consistent Input + Label
function InputGroup({
  label,
  id,
  name,
  value,
  onChange,
  type = "text",
  required = false,
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-white mb-2">
        {label}
      </label>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
      />
    </div>
  );
}
