"use client";

import { motion } from "framer-motion";
import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhone,
} from "react-icons/fa";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br  py-16 px-4 md:px-24 text-gray-800">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
          Get in Touch 🌿
        </h1>
        <p className="text-lg md:text-xl text-gray-700">
          We’d love to hear from you! Reach out to grow with the GardenSocial
          community.
        </p>
      </motion.section>

      {/* Contact Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
        {/* Form */}
        <motion.form
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="bg-white/70 backdrop-blur-lg shadow-xl p-8 rounded-2xl space-y-6"
        >
          <div>
            <label className="block mb-1 font-semibold text-gray-800">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Jane Gardener"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-800">
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div>
            <label className="block mb-1 font-semibold text-gray-800">
              Your Message
            </label>
            <textarea
              placeholder="Tell us what's on your mind..."
              rows={5}
              className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-full transition duration-300"
          >
            Send Message
          </button>
        </motion.form>

        {/* Contact Info */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col justify-center bg-white/70 backdrop-blur-lg shadow-xl p-8 rounded-2xl space-y-6"
        >
          <h2 className="text-2xl font-bold text-green-800">
            Contact Information
          </h2>
          <p className="text-gray-700">
            Whether you’re a plant parent, community leader, or someone new to
            gardening — we're excited to connect with you!
          </p>

          <div className="space-y-2">
            <p className="flex items-center gap-3">
              <FaEnvelope className="text-green-600" /> support@gardensocial.com
            </p>
            <p className="flex items-center gap-3">
              <FaPhone className="text-green-600" /> +1 (555) 123-4567
            </p>
            <p className="text-gray-700">
              123 Garden Lane, Natureville, Earth 🌎
            </p>
          </div>

          <div className="flex gap-5 text-xl mt-4">
            <a
              href="https://facebook.com"
              target="_blank"
              className="hover:text-green-700 transition"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              className="hover:text-green-700 transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              className="hover:text-green-700 transition"
            >
              <FaTwitter />
            </a>
          </div>
        </motion.div>
      </div>
    </main>
  );
};

export default ContactPage;
