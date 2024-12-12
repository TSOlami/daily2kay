"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function TwitterDownloader() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto"
      >
        <Card className="p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Twitter Downloader</h2>
          <p className="text-gray-600 dark:text-gray-300">Coming soon!</p>
        </Card>
      </motion.div>
    </div>
  );
} 