import React, { useEffect } from 'react';
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi';
import { motion } from 'framer-motion';
import GuestNavbar from '../components/GuestNavbar'
import Footer from '../components/Footer'

const Contact = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } },
  };

  // Load Tawk.to live chat script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/68178c8c51f397190f3140c1/1iqdvq1dj';
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    return () => {
      // Optional cleanup
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div>
      <GuestNavbar/>
    <div className="min-h-screen bg-white text-gray-800 px-6 py-12 max-w-7xl mx-auto">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Get in Touch with Us
        </h2>
        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Have a question, suggestion, or need support? We’d love to hear from you.
        </p>
      </motion.div>
      

      {/* Contact Info */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="bg-blue-50 p-6 rounded-2xl shadow hover:shadow-md transition">
          <FiMail className="text-blue-600 text-2xl mb-4" />
          <h3 className="font-semibold text-lg mb-2">Email</h3>
          <p className="text-sm text-gray-600">unitradeh@gmail.com</p>
        </div>
        <div className="bg-purple-50 p-6 rounded-2xl shadow hover:shadow-md transition">
          <FiPhone className="text-purple-600 text-2xl mb-4" />
          <h3 className="font-semibold text-lg mb-2">Phone</h3>
          <p className="text-sm text-gray-600">+254 742149060</p>
        </div>
        <div className="bg-pink-50 p-6 rounded-2xl shadow hover:shadow-md transition">
          <FiMapPin className="text-pink-600 text-2xl mb-4" />
          <h3 className="font-semibold text-lg mb-2">Location</h3>
          <p className="text-sm text-gray-600">Moi University, Main Campus</p>
        </div>
      </div>

    
    </div>
    <Footer/>
    </div>
  );
};

export default Contact;
