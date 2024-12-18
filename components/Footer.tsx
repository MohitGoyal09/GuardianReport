import { FaGithub, FaTwitter } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-center md:text-left">
                        <h3 className="text-xl font-bold mb-2">Crime Analytics</h3>
                        <p className="text-sm font-light text-gray-300">
                            © {new Date().getFullYear()} Crime Analytics. All rights reserved.
                        </p>
                    </div>
                    
                    <div className="flex space-x-8">
                        <a
                            href="https://github.com/MohitGoyal09/SafeReport"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transform hover:scale-110 transition-all duration-300"
                            title="Visit our GitHub repository"
                            aria-label="Visit our GitHub repository"
                        >
                            <FaGithub size={28} />
                        </a>
                        <a
                            href="https://x.com/ByteMohit"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-blue-400 transform hover:scale-110 transition-all duration-300"
                            title="Follow us on Twitter"
                            aria-label="Follow us on Twitter"
                        >
                            <FaTwitter size={28} />
                        </a>
                        <a
                            href="mailto:info@crimeanalytics.com"
                            className="hover:text-blue-400 transform hover:scale-110 transition-all duration-300"
                            title="Send us an email"
                            aria-label="Send us an email"
                        >
                            <MdEmail size={28} />
                        </a>
                    </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-700 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-gray-400">
                    <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                    <span className="hidden md:block">•</span>
                    <a href="/terms" className="hover:text-white transition-colors">Terms of Service</a>
                    <span className="hidden md:block">•</span>
                    <a href="/contact" className="hover:text-white transition-colors">Contact Us</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
