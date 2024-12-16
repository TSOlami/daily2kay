"use client";

import { motion } from "framer-motion";
import { PlatformCard } from "@/components/platform-card";
import { ArrowDown, Download, Shield, Zap, ArrowRight, Globe, EyeOff, Infinity } from "lucide-react";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Timeline } from "@/components/ui/timeline";
import Image from "next/image";
import Link from "next/link";

type PlatformId = 'youtube' | 'tiktok' | 'instagram' | 'facebook' | 'twitter';

interface Platform {
  id: PlatformId;
  name: string;
  icon: string;
  color: string;
  description: string;
}

const platforms: Platform[] = [
  {
    id: "youtube",
    name: "YouTube",
    icon: "youtube",
    color: "red-600",
    description: "Download videos from YouTube with ease",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: "tiktok",
    color: "pink-500",
    description: "Download videos from TikTok effortlessly",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: "instagram",
    color: "purple-500",
    description: "Save Instagram videos and reels",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "facebook",
    color: "blue-600",
    description: "Download Facebook videos instantly",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: "twitter",
    color: "blue-400",
    description: "Save Twitter videos with one click",
  },
];

const features = [
  {
    icon: <Zap className="w-8 h-8" />,
    title: "Lightning Fast",
    description: "Download videos in seconds with our optimized processing",
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Secure Downloads",
    description: "Your data is protected with end-to-end encryption",
  },
  {
    icon: <Download className="w-8 h-8" />,
    title: "Multiple Formats",
    description: "Choose from various quality options and formats",
  },
  {
    icon: <Globe className="w-8 h-8" />,
    title: "Cross-Platform Compatibility",
    description: "Our platform works seamlessly on all operating systems",
  },
  {
    icon: <EyeOff className="w-8 h-8" />,
    title: "No Watermark",
    description: "Download videos without any watermarks for a clean look",
  },
  {
    icon: <Infinity className="w-8 h-8" />,
    title: "Unlimited Usage",
    description: "Download as many videos as you want without restrictions",
  },
];

export default function Home() {
  const howItWorksData = [
    {
      title: "Step 1",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">Navigate to your desired platform and copy the video link.</p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/images/youtube-copy.png"
              alt="Copy Link"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/images/instagram-copy.png"
              alt="Copy Link"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 2",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">Paste the copied link into the input field on our website and click fetch video</p>
          <div className="flex justify-center">
            <Image
              src="/images/paste-copy.png"
              alt="Paste Link"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full max-w-xs md:max-w-md lg:max-w-lg shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 3",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">Choose your preferred format and quality from the options provided.</p>
          <div className="flex justify-center">
            <Image
              src="/images/select-quality-copy.png"
              alt="Select Format"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full max-w-xs md:max-w-md lg:max-w-lg shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 4",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">Click the download button to save the video to your device.</p>
          <div className="flex justify-center">
            <Image
              src="/images/download-button-copy.png"
              alt="Download Video"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full max-w-xs md:max-w-md lg:max-w-lg shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Step 5",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">Watch your downloaded video anytime, anywhere, without an internet connection.</p>
          <div className="grid grid-cols-2 gap-4">
            <Image
              src="/images/images.jpg"
              alt="Enjoy Video"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/images/download watch.jpeg"
              alt="Enjoy Video"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <Image
              src="/images/download.jpeg"
              alt="Enjoy Video"
              width={500}
              height={500}
            />
            <Image
              src="/images/watch.jpg"
              alt="Enjoy Video"
              width={500}
              height={500}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <BackgroundBeamsWithCollision className="h-screen relative">
        <motion.div
          initial={{ opacity: 0.0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeInOut" }}
          className="relative flex flex-col gap-4 items-center justify-center px-4"
        >
          <h1 className="text-3xl md:text-7xl font-bold text-center text-slate-950 dark:text-white">
            Seamless Video Downloads
          </h1>
          <p className="font-extralight text-base md:text-4xl py-4 mb-8 max-w-2xl mx-auto text-slate-950 dark:text-white">
            One click, endless possibilities
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#platforms" className="bg-slate-950 dark:bg-white hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-black px-8 py-3 rounded-full font-semibold transition-colors duration-300 flex items-center">
              Get Started
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="absolute bottom-8"
        >
          <ArrowDown className="w-6 h-6 animate-bounce" />
        </motion.div>
      </BackgroundBeamsWithCollision>

      {/* Platforms Section */}
      <section id="platforms" className="py-20 px-4 bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-slate-950 dark:text-white">
            Supported Platforms
          </h2>
          <div className="overflow-hidden">
            <motion.div
              className="flex space-x-24 animate-marquee"
              initial={{ x: '100%' }}
              animate={{ x: '-100%' }}
              transition={{ repeat: 1000, duration: 10, ease: "linear", }}
            >
              {platforms.map((platform) => (
                <div key={platform.id} className="flex-shrink-0 bg-slate-200 dark:bg-slate-800 p-4 rounded-lg shadow-lg">
                  <PlatformCard platform={platform} />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose daily2kay?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-gray-800 to-gray-900 p-8 rounded-lg text-center hover:bg-gradient-to-l hover:from-gray-700 hover:to-gray-800 transition-all duration-300"
              >
                <div className="mb-4 text-blue-400 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4 bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-white">
        <Timeline data={howItWorksData} />
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-950 dark:text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg text-slate-950 dark:text-white mb-8">
            Experience seamless video downloading with daily2kay.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#platforms" className="bg-white text-slate-950 dark:text-white px-8 py-3 rounded-full font-semibold transition-colors duration-300">
              Start Now
            </a>
          </motion.div>
        </motion.div>
      </section>
      
      {/* Contact Section */}
      <section className="py-20 px-4 bg-slate-100 dark:bg-slate-900 text-slate-950 dark:text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="container mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-950 dark:text-white mb-6">
            Get in Touch
          </h2>
          <p className="text-lg text-slate-950 dark:text-white mb-8">
            Have questions? Reach out to us anytime.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="mailto:support@daily2kay.com" className="bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-8 py-3 rounded-full font-semibold transition-colors duration-300">
              Contact Us
            </a>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
