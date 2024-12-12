"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="py-8 px-4 bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">About daily2kay</h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Your trusted platform for downloading videos from various social media platforms.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm hover:text-blue-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-blue-500 transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/feedback" className="text-sm hover:text-blue-500 transition-colors">
                  Feedback
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/terms" className="text-sm hover:text-blue-500 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-blue-500 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <a 
              href="mailto:support@daily2kay.com" 
              className="text-sm hover:text-blue-500 transition-colors"
            >
              support@daily2kay.com
            </a>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
          <p className="text-center text-sm">
            &copy; {new Date().getFullYear()} daily2kay. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 