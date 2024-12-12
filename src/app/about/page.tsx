"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github, Globe, Code } from "lucide-react";
import Link from "next/link";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <Card className="p-8 shadow-lg rounded-lg bg-white dark:bg-gray-800">
          <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">About daily2kay</h1>
          
          <div className="space-y-6 text-gray-700 dark:text-gray-300">
            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Our Mission</h2>
              <p>
                daily2kay is an open-source project dedicated to making video downloading simple and accessible. 
                We provide a seamless experience for downloading content from various social media platforms while 
                respecting platform guidelines and user privacy.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Creator Links</h2>
              <div className="flex flex-wrap gap-4">
                <Button
                  className="flex items-center gap-2"
                  variant="outline"
                  asChild
                >
                  <Link href="https://github.com/TSOlami" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4" />
                    GitHub Profile
                  </Link>
                </Button>
                <Button
                  className="flex items-center gap-2"
                  variant="outline"
                  asChild
                >
                  <Link href="https://whosteejay.netlify.app/" target="_blank" rel="noopener noreferrer">
                    <Globe className="w-4 h-4" />
                    Portfolio
                  </Link>
                </Button>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white">Open Source</h2>
              <p className="mb-4">
                daily2kay is open source and welcomes contributions from the community. 
                Feel free to check out the source code, report issues, or contribute to the project.
              </p>
              <Button
                className="flex items-center gap-2"
                variant="outline"
                asChild
              >
                <Link href="https://github.com/TSOlami/daily2kay" target="_blank" rel="noopener noreferrer">
                  <Code className="w-4 h-4" />
                  View Source Code
                </Link>
              </Button>
            </section>
          </div>
        </Card>
      </motion.div>
    </div>
  );
} 