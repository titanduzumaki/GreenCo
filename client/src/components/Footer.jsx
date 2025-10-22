import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export function Footer() {
  const quickLinks = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' }
  ];

  const services = [
    'Electrical Consultant',
    'Electrical Contractor',
    'Electrical Installation'
    ];

  const socialLinks = [
    { icon: <Facebook size={20} />, href: '#', label: 'Facebook' },
    { icon: <Twitter size={20} />, href: '#', label: 'Twitter' },
    { icon: <Linkedin size={20} />, href: '#', label: 'LinkedIn' },
    { icon: <Instagram size={20} />, href: '#', label: 'Instagram' }
  ];

  return (
    <footer className="bg-black/40 border-t border-white/10 mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <Link to="/" className="text-2xl font-bold text-white hover:text-green-400 transition-colors">
              GreenCo
            </Link>
            <p className="text-white/70 mt-4 mb-6">
              Powering cities and empowering lives through innovative electrical infrastructure solutions.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-white/70">
                <Mail size={16} className="text-green-400" />
                <span className="text-sm">info@greenco.com</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <Phone size={16} className="text-green-400" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-white/70">
                <MapPin size={16} className="text-green-400" />
                <span className="text-sm">123 Energy Boulevard, Tech City</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-white/70 hover:text-green-400 transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service, index) => (
                <li key={index}>
                  <span className="text-white/70 text-sm hover:text-green-400 transition-colors cursor-pointer">
                    {service}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Connected</h3>
            <p className="text-white/70 text-sm mb-4">
              Subscribe to our newsletter for the latest updates on sustainable energy solutions.
            </p>
            
            <div className="flex space-x-2 mb-6">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-sm placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Subscribe
              </button>
            </div>

            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="text-white/70 hover:text-green-400 transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/70 text-sm">
            © 2024 GreenCo. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <span className="text-white/70 text-sm hover:text-green-400 transition-colors cursor-pointer">
              Privacy Policy
            </span>
            <span className="text-white/70 text-sm hover:text-green-400 transition-colors cursor-pointer">
              Terms of Service
            </span>
            <span className="text-white/70 text-sm hover:text-green-400 transition-colors cursor-pointer">
              Cookie Policy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}