import { FaGithub, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-20">
      <div className="container mx-auto px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-center mb-12">
          {/* Brand Section */}
          <div className="text-center lg:text-left space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              Crime Analytics
            </h3>
            <p className="text-gray-300 max-w-sm">
              Empowering communities with data-driven insights for a safer
              tomorrow.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-8">
            <a
              href="https://github.com/MohitGoyal09/SafeReport"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-400 transform hover:scale-110 transition-all duration-300 hover:rotate-6"
              title="GitHub"
              aria-label="GitHub"
            >
              <FaGithub size={28} />
            </a>
            <a
              href="https://x.com/ByteMohit"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-300 hover:text-blue-400 transform hover:scale-110 transition-all duration-300 hover:-rotate-6"
              title="Twitter"
              aria-label="Twitter"
            >
              <FaTwitter size={28} />
            </a>
            <a
              href="mailto:info@crimeanalytics.com"
              className="text-gray-300 hover:text-blue-400 transform hover:scale-110 transition-all duration-300 hover:rotate-6"
              title="Email"
              aria-label="Email"
            >
              <MdEmail size={28} />
            </a>
          </div>

          {/* Credit Section */}
          <div className="text-center lg:text-right">
            <div className="inline-block px-4 py-2 bg-gray-800/50 rounded-lg backdrop-blur-sm">
              Created with{" "}
              <AiFillHeart className="inline-block text-red-500 animate-pulse mx-1" />{" "}
              by{" "}
              <span className="font-semibold text-blue-400 hover:text-blue-300 transition-colors">
                Mohit
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-sm text-gray-400">
              © {new Date().getFullYear()} Crime Analytics. All rights reserved.
            </div>

            {/* Links */}
            <div className="flex flex-wrap justify-center gap-8">
              <a
                href="/privacy"
                className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="/terms"
                className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                Terms of Service
              </a>
              <a
                href="/contact"
                className="text-sm text-gray-400 hover:text-blue-400 transition-colors duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
