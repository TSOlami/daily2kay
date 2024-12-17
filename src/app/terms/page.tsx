"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        <Card className="p-8 shadow-lg rounded-lg bg-white dark:bg-gray-800">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">Terms of Service</h1>
          
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">1. Acceptance of Terms</h2>
              <p>By accessing and using daily2kay, you agree to be bound by these Terms of Service.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">2. Use License</h2>
              <p>Daily2kay grants you a personal, non-exclusive, non-transferable license to use our service for personal, non-commercial purposes.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">3. Fair Use</h2>
              <p>Users are responsible for ensuring their downloads comply with the respective platform's terms of service and copyright laws.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">4. Service Modifications</h2>
              <p>We reserve the right to modify or discontinue our service at any time without notice.</p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">5. Limitation of Liability</h2>
              <p>Daily2kay shall not be liable for any indirect, incidental, special, consequential, or punitive damages.</p>
            </section>
          </div>
        </Card>
      </motion.div>
    </div>
  );
} 