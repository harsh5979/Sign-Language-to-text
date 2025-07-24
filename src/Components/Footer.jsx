import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  Heart,
  Hand,
  Users,
  Globe
} from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img src="/img/GECM_logo.png" alt="Logo" className="w-12 h-12" />
              <div>
                <h3 className="text-xl font-bold">Sign Language</h3>
                <p className="text-sm text-gray-400">Recognition System</p>
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Breaking communication barriers through advanced AI-powered sign language recognition technology. 
              Making the world more accessible for everyone.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Users size={16} />
              <span>Trusted by 10,000+ users worldwide</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Globe size={20} />
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <NavLink 
                  to="/" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 hover:translate-x-1 transform"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/translator" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 hover:translate-x-1 transform"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  Translator
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/donations" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 hover:translate-x-1 transform"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  Donations
                </NavLink>
              </li>
              <li>
                <NavLink 
                  to="/contactus" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 hover:translate-x-1 transform"
                >
                  <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                  Contact Us
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Phone size={20} />
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-sm">
                <Mail className="text-blue-400 mt-0.5 flex-shrink-0" size={16} />
                <div>
                  <p className="text-gray-300">support@signlanguage.com</p>
                  <p className="text-gray-400">info@signlanguage.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Phone className="text-green-400 mt-0.5 flex-shrink-0" size={16} />
                <div>
                  <p className="text-gray-300">+1 (555) 123-4567</p>
                  <p className="text-gray-400">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>
              {/* <div className="flex items-start gap-3 text-sm">
                <MapPin className="text-red-400 mt-0.5 flex-shrink-0" size={16} />
                <div>
                  <p className="text-gray-300">123 Innovation Drive</p>
                  <p className="text-gray-400">Tech Valley, CA 94025</p>
                </div>
              </div> */}
            </div>
          </div>

          {/* Resources & Social */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold flex items-center gap-2">
              <Hand size={20} />
              Resources
            </h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 hover:translate-x-1 transform"
                >
                  <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                  User Guide
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 hover:translate-x-1 transform"
                >
                  <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                  API Documentation
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 hover:translate-x-1 transform"
                >
                  <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                  Privacy Policy
                </a>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm flex items-center gap-2 hover:translate-x-1 transform"
                >
                  <span className="w-1 h-1 bg-green-400 rounded-full"></span>
                  Terms of Service
                </a>
              </li>
            </ul>

            {/* Social Media */}
            <div className="pt-4">
              <h5 className="text-sm font-semibold text-gray-300 mb-3">Follow Us</h5>
              <div className="flex space-x-3">
                <a 
                  href="#" 
                  className="bg-gray-800 hover:bg-blue-600 p-2 rounded-lg transition-all duration-200 hover:scale-110 transform"
                  aria-label="Facebook"
                >
                  <Facebook size={18} />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 hover:bg-blue-400 p-2 rounded-lg transition-all duration-200 hover:scale-110 transform"
                  aria-label="Twitter"
                >
                  <Twitter size={18} />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 hover:bg-pink-600 p-2 rounded-lg transition-all duration-200 hover:scale-110 transform"
                  aria-label="Instagram"
                >
                  <Instagram size={18} />
                </a>
                <a 
                  href="#" 
                  className="bg-gray-800 hover:bg-blue-700 p-2 rounded-lg transition-all duration-200 hover:scale-110 transform"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Subscription */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-6 text-center">
            <h3 className="text-xl font-bold mb-2">Stay Updated</h3>
            <p className="text-blue-100 mb-4">Get the latest updates on new features and improvements</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>© {currentYear} Sign Language Recognition System.</span>
              <span>Made with</span>
              <Heart className="text-red-500" size={16} fill="currentColor" />
              <span>for accessibility</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white transition-colors duration-200">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;