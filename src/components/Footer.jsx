import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "../assets/logo2.png";
import { MdEmail, MdPhone } from "react-icons/md";
function Footer() {
  return (
    <footer className="bg-gradient-to-b  from-[#FFF8F0] to-[#F4A261] py-12">
      <div className="max-w-7xl mx-auto px-6  md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Description */}
          <div>
            <div className="w-32 md:w-40 mb-4">
              <span className="text-2xl font-bold tracking-tight" style={{ fontFamily: "Georgia, serif" }}>
                <span style={{ color: "#c9a84c" }}>My</span>
                <span className="text-gray-900">Glamm</span>
              </span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">
              Discover skincare solutions tailored for all skin types—oily, dry,
              combination, and sensitive. At{" "}
              <span className="font-semibold text-[#f18526]">MyGlamm</span>,
              we craft products to help your skin thrive with gentle, effective
              care.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#f18526] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-700">
              {[
                { name: "Home", link: "/" },
                { name: "Shop", link: "/shop" },
                { name: "About", link: "/about-us" },
                { name: "Contact Us", link: "/contact-us" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    className="hover:text-[#539d68] transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Additional Links */}
          <div>
            <h3 className="text-lg font-semibold text-[#f18526] mb-4">
              Additional Links
            </h3>
            <ul className="space-y-2 text-gray-700">
              {[
                { name: "Terms & Conditions", link: "/" },
                { name: "Privacy Policy", link: "/" },
                { name: "Blog", link: "/" },
                { name: "Cart", link: "/" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.link}
                    className="hover:text-[#539d68] transition-colors duration-200"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div>
            <h3 className="text-lg font-semibold text-[#f18526] mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-5 mb-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#539d68] transition-colors duration-200"
                aria-label="Facebook"
              >
                <FaFacebook size={22} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#539d68] transition-colors duration-200"
                aria-label="Instagram"
              >
                <FaInstagram size={22} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-[#539d68] transition-colors duration-200"
                aria-label="Twitter"
              >
                <FaTwitter size={22} />
              </a>
            </div>
            <p className="text-sm flex items-center gap-2">
              <MdEmail size={18} className="text-[#f18526]" />{" "}
              support@gloweasy.com
            </p>
            <p className="text-sm flex items-center gap-2">
              <MdPhone size={18} className="text-[#f18526]" /> +91 123-456-7890
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-300 pt-6 text-center">
          <p className="text-sm text-gray-600">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-medium text-[#f18526]">MyGlamm</span>. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
