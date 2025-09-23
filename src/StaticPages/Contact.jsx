import { useState } from "react";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa";

function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  // handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const res = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/contact`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        setStatus("Message sent successfully ✅");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        setStatus(data.message || "Failed to send ❌");
      }
    } catch (err) {
      console.error(err);
      setStatus("Something went wrong ❌");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 lg:pt-28 pt-40 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Contact SkinBuddy
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We'd love to hear from you! Reach out with questions, feedback, or
            skincare advice.
          </p>
        </div>

        <div className="grid grid-cols-1  lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white h-fit p-8 rounded-xl shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Send us a message
            </h2>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f18526] focus:border-transparent"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f18526] focus:border-transparent"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f18526] focus:border-transparent"
                  placeholder="What's this about?"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#f18526] focus:border-transparent"
                  placeholder="Tell us how we can help..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#f18526] hover:bg-[#d9731d] text-white font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Send Message
              </button>
            </form>

            {status && (
              <p className="mt-4 text-center text-sm font-medium text-gray-600">
                {status}
              </p>
            )}
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Get in touch
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#f18526]/10 p-3 rounded-full">
                    <FaPhone className="h-6 w-6 text-[#f18526]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Phone</h3>
                    <p className="text-gray-600">+1 (800) 123-4567</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Monday-Friday, 9am-5pm EST
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#f18526]/10 p-3 rounded-full">
                    <FaEnvelope className="h-6 w-6 text-[#f18526]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">Email</h3>
                    <p className="text-gray-600">support@skinbuddy.com</p>
                    <p className="text-sm text-gray-500 mt-1">
                      We typically reply within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#f18526]/10 p-3 rounded-full">
                    <FaMapMarkerAlt className="h-6 w-6 text-[#f18526]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Headquarters
                    </h3>
                    <p className="text-gray-600">123 Skincare Avenue</p>
                    <p className="text-gray-600">Beauty City, BC 10001</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 bg-[#f18526]/10 p-3 rounded-full">
                    <FaClock className="h-6 w-6 text-[#f18526]" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      Business Hours
                    </h3>
                    <p className="text-gray-600">Monday-Friday: 9am - 6pm</p>
                    <p className="text-gray-600">Saturday: 10am - 4pm</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">FAQs</h2>
              <div className="space-y-4">
                {[
                  {
                    question: "How long does shipping take?",
                    answer: "Typically 3-5 business days within the US.",
                  },
                  {
                    question: "Can I return opened products?",
                    answer:
                      "Yes, we accept returns within 30 days of purchase.",
                  },
                  {
                    question: "Do you ship internationally?",
                    answer: "Yes, we ship to over 50 countries worldwide.",
                  },
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <h3 className="font-medium text-gray-900">
                      {faq.question}
                    </h3>
                    <p className="text-gray-600 mt-1">{faq.answer}</p>
                  </div>
                ))}
                <button className="text-[#f18526] font-medium hover:underline mt-2">
                  View all FAQs →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
