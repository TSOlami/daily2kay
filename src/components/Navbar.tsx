"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() || "";

  const tabs = [
    { id: "youtube", name: "YouTube", href: "/downloader/youtube" },
    { id: "tiktok", name: "TikTok", href: "/downloader/tiktok" },
    { id: "instagram", name: "Instagram", href: "/downloader/instagram" },
    { id: "facebook", name: "Facebook", href: "/downloader/facebook" },
    { id: "twitter", name: "Twitter", href: "/downloader/twitter" },
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-white dark:bg-slate-900 shadow-md relative">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
            {menuOpen ? <X className="h-6 w-6 text-gray-900 dark:text-white" /> : <Menu className="h-6 w-6 text-gray-900 dark:text-white" />}
          </button>
        </div>

        {/* Logo */}
        <div className="text-2xl font-bold text-gray-900 dark:text-white">
          <Link href="/">Daily2kay</Link>
        </div>

        {/* Dark Mode Toggle for Mobile */}
        <div className="md:hidden">
          <ThemeToggle />
        </div>

        {/* Tabs for Desktop */}
        <div className="hidden md:flex items-center">
          <ul className="flex space-x-6">
            {tabs.map((tab) => (
              <li key={tab.id} className="relative">
                <Link href={tab.href}>
                  <motion.div
                    className={`px-3 py-2 cursor-pointer text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {tab.name}
                  </motion.div>
                </Link>
                {pathname.includes(tab.id) && (
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                    layoutId="underline"
                  />
                )}
              </li>
            ))}
          </ul>

          {/* Dark Mode Toggle */}
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed top-0 left-0 bottom-0 w-[250px] bg-white dark:bg-gray-900 shadow-lg"
            >
              <div className="p-5">
                <div className="flex justify-between items-center mb-8">
                  <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
                    Daily2kay
                  </Link>
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="text-gray-900 dark:text-white"
                    aria-label="Close menu"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <ul className="space-y-4">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <Link href={tab.href}>
                        <motion.div
                          className={`px-3 py-2 cursor-pointer text-gray-900 dark:text-white hover:text-blue-500 dark:hover:text-blue-400 transition-colors duration-300 ${
                            pathname.includes(tab.id) ? 'text-blue-500 dark:text-blue-400' : ''
                          }`}
                          whileHover={{ x: 4 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {tab.name}
                        </motion.div>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <ThemeToggle />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 