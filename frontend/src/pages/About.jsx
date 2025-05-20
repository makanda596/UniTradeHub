import React from 'react';
import {
  FiBook,
  FiShield,
  FiUsers,
  FiMapPin,
  FiRefreshCw,
  FiArrowRight,
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import {
  FiUserPlus,
  FiUser,
  FiSearch,
  FiHeart,
  FiTag,
  FiMessageCircle,
  FiStar,
  FiRepeat,
} from 'react-icons/fi';

import market from '../assets/market.avif';
import GuestNavbar from '../components/GuestNavbar';
import Footer from '../components/Footer';

const About = () => {
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const slideUp = {
    hidden: { y: 40, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  };

  return (
    <div>
            <GuestNavbar/>
          <div className="bg-white">
      <div className="px-8 py-12 max-w-7xl mx-auto text-gray-800">
        {/* Hero Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          className="grid md:grid-cols-2 gap-12 items-center mb-4"
        >
          <div className="relative group overflow-hidden rounded-3xl shadow-xl">
            <img
              src={market}
              alt="Unitrade Hub marketplace"
              className="w-full object-cover rounded-xl transform transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl" />
          </div>

          <motion.div variants={slideUp}>
            <h1 className="text-xl font-extrabold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Redefining Campus Commerce
            </h1>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              <strong>Unitrade Hub</strong> is Moi University's premier digital marketplace —
              We empower you to buy, sell, and connect in a
              secure, verified environment.
            </p>
            <div className="flex flex-wrap gap-4 mt-2">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full font-medium shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300">
                Start Trading
              </button>
              <button className="border border-gray-300 text-gray-800 px-6 py-2 rounded-full font-medium hover:border-purple-500 hover:text-purple-600 transition-all duration-300">
                How It Works
              </button>
            </div>
          </motion.div>
        </motion.div>

     
          {/* How to Use Unitrade Hub */}
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="my-20"
          >
            <h2 className="text-xl font-bold text-center mb-8 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              How to Get Started on Unitrade Hub
            </h2>

            <div className="grid md:grid-cols-2 gap-8 text-gray-700">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <FiUserPlus className="text-purple-600 text-3xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">1️⃣ Register / Log In</h3>
                    <p>Visit the platform and sign up with your Moi University email. If you already have an account, simply log in.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FiUser className="text-purple-600 text-3xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">2️⃣ Set Up Your Profile</h3>
                    <p>Complete your profile with a photo, description, and contact details to help build trust.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FiSearch className="text-purple-600 text-3xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">3️⃣ Explore the Marketplace</h3>
                    <p>Browse categories like textbooks, electronics, fashion, and services — all posted by students like you.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FiHeart className="text-purple-600 text-3xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">4️⃣ Follow Your Favorite Sellers</h3>
                    <p>Tap “Follow” on sellers you trust. You’ll see their latest posts in your feed automatically.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <FiTag className="text-purple-600 text-3xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">5️⃣ Post a Flash Sale</h3>
                    <p>Want to sell something fast? Use the “Post Flash Sale” feature to highlight limited-time deals.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FiMessageCircle className="text-purple-600 text-3xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">6️⃣ Chat with Buyers & Sellers</h3>
                    <p>Use the in-app chat to ask questions, negotiate prices, or confirm meetup details — all safely.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FiStar className="text-purple-600 text-3xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">7️⃣ Rate & Review</h3>
                    <p>After a transaction, leave feedback to help others identify trustworthy users.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <FiRepeat className="text-purple-600 text-3xl mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">8️⃣ Keep Trading!</h3>
                    <p>There’s always something new. Stay active, follow more sellers, and enjoy a smarter campus marketplace.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-4 mb-24">
          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-3xl shadow-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-blue-100 rounded-xl">
                <FiBook className="text-blue-600 text-2xl" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To foster a thriving student economy at Moi University through{' '}
              <strong className="text-gray-900">safe, accessible, and sustainable peer-to-peer trade</strong>.
              We aim to make it easier for students to exchange goods and services within their campus ecosystem.
            </p>
          </motion.div>

          <motion.div
            variants={slideUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 p-2 md:p-20 rounded-3xl shadow-md"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="p-4 bg-purple-100 rounded-xl">
                <FiShield className="text-purple-600 text-xl" />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Our Vision</h2>
            </div>
            <p className="text-gray-700 leading-relaxed">
              To become Kenya's leading university marketplace where{' '}
              <strong className="text-gray-900">trust, affordability, and innovation</strong> define every transaction.
            </p>
          </motion.div>
        </div>

        {/* Features Section */}
        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-2"
        >
          <h2 className="text-xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Why Choose Unitrade Hub?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-8 rounded-2xl bg-white shadow-md hover:shadow-xl border border-gray-100 hover:border-purple-100 transition-all duration-300"
              >
                <div className="p-4 bg-blue-50 w-max rounded-xl mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          variants={slideUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="relative mt-10 overflow-hidden rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 text-white p-12 text-center shadow-xl"
        >
          <div className="absolute w-96 h-96 bg-purple-300/20 rounded-full -top-48 -right-48" />
          <div className="absolute w-96 h-96 bg-blue-300/20 rounded-full -bottom-48 -left-48" />

          <h2 className="text-3xl font-bold mb-2">Join 100+ Campus Sellers</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Be part of Unitrade's most vibrant student marketplace. Discover great deals, connect with trusted peers, and power your campus commerce journey.
          </p>
          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold flex items-center gap-2 mx-auto hover:bg-blue-50 hover:gap-3 transition-all duration-300">
              <a href='/login' >Get Started <FiArrowRight className="inline" /></a> 
          </button>
        </motion.div>
      </div>
    </div>
    <Footer/>
    </div>
  );
};

const features = [
  {
    icon: <FiUsers className="text-blue-600 text-2xl" />,
    title: 'Large Sellers Community',
    description: 'Large number of sellers available for a wide variety of items across campus.',
  },
  {
    icon: <FiMapPin className="text-blue-600 text-2xl" />,
    title: 'Hyper-Local Trading',
    description: 'Easily connect with nearby buyers and sellers in hostels, faculties, and around campus.',
  },
  {
    icon: <FiRefreshCw className="text-blue-600 text-2xl" />,
    title: 'Sustainable Economy',
    description: 'Extend the life of items through resale and reuse, reducing environmental impact on campus.',
  },
];

export default About;
