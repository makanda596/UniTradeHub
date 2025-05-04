import React from 'react';
import GuestNavbar from '../components/GuestNavbar';

const About = () => {
  return (
    <div>
      <GuestNavbar/>
    <div className="bg-white text-gray-800 px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6 text-center">
        About Us
      </h1>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">Welcome to Unitrade Hub</h2>
        <p className="text-lg leading-relaxed">
          At Unitrade Hub, we connect buyers and sellers across Kenya, providing a seamless platform for trading goods and services. Our mission is to empower individuals and businesses by facilitating trustworthy and efficient transactions.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">Who We Are</h2>
        <p className="text-lg leading-relaxed mb-2">
          Unitrade Hub is a leading online marketplace in Kenya, offering a diverse range of categories including:
        </p>
        <ul className="list-disc list-inside text-lg space-y-1">
          <li>Vehicles</li>
          <li>Property</li>
          <li>Electronics</li>
          <li>Home & Garden</li>
          <li>Fashion</li>
          <li>Jobs</li>
          <li>Services</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">Our Vision</h2>
        <p className="text-lg leading-relaxed">
          To be Kenya's most trusted and efficient online marketplace, fostering economic growth by connecting people and businesses.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-3">Why Choose Us?</h2>
        <ul className="list-disc list-inside text-lg space-y-1">
          <li><strong>Free Listings:</strong> Post your ads without any charges.</li>
          <li><strong>Wide Reach:</strong> Access a vast audience across Kenya.</li>
          <li><strong>Secure Transactions:</strong> Your safety and data privacy are our priorities.</li>
          <li><strong>24/7 Support:</strong> Our team is always here to help.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-3">Join Our Community</h2>
        <p className="text-lg leading-relaxed">
          Whether you're buying, selling, or offering services, Unitrade Hub is your go-to platform. Become part of a growing community built on trust and opportunity.
        </p>
      </section>
    </div>
    <Footer
    </div>
  );
};

export default About;
