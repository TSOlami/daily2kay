"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGithub, FaCode, FaLightbulb } from "react-icons/fa";

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const features = [
    {
      icon: <FaCode />,
      title: "Modern Tech Stack",
      description: "Built with Next.js, TypeScript, and cutting-edge technologies for optimal performance."
    },
    {
      icon: <FaGithub />,
      title: "Open Source",
      description: "Freely available on GitHub, encouraging collaboration and community contributions."
    },
    {
      icon: <FaLightbulb />,
      title: "AI-Powered",
      description: "Leveraging advanced AI capabilities to enhance the chat experience."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl"
            {...fadeInUp}
          >
            About Our Project
          </motion.h1>
          <motion.p 
            className="mt-4 text-xl text-gray-600 dark:text-gray-300"
            {...fadeInUp}
          >
            An innovative AI chat interface that brings powerful conversation capabilities to your fingertips.
          </motion.p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="text-3xl text-blue-600 dark:text-blue-400 mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          className="bg-blue-50 dark:bg-gray-700 rounded-2xl p-8 mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            We're dedicated to making AI technology more accessible and user-friendly. 
            Our platform combines powerful language models with an intuitive interface, 
            enabling meaningful conversations and practical applications for users of all backgrounds.
          </p>
        </motion.div>
      </div>
    </div>
  );
}