"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="p-8 shadow-lg rounded-lg bg-white dark:bg-gray-800">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Privacy Policy</h1>
          
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Data Collection</h2>
              <p>We collect minimal data necessary for service functionality. No personal information is stored.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Usage of Information</h2>
              <p>Any collected data is used solely for improving our service and user experience.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Cookies</h2>
              <p>We use essential cookies to ensure the proper functioning of our service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">Third-Party Services</h2>
              <p>We may use third-party services for analytics and service improvement.</p>
            </section>
          </div>
        </Card>
      </motion.div>
    </div>
  );
} 