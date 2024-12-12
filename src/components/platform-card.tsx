"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { FaYoutube, FaTiktok, FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';

type PlatformId = 'youtube' | 'tiktok' | 'instagram' | 'facebook' | 'twitter';

interface PlatformCardProps {
  platform: {
    id: PlatformId;
    name: string
    icon: string
    color: string
    description: string
  }
}

const platformIcons: Record<PlatformId, JSX.Element> = {
  youtube: <FaYoutube />,
  tiktok: <FaTiktok />,
  instagram: <FaInstagram />,
  facebook: <FaFacebook />,
  twitter: <FaTwitter />,
};

export function PlatformCard({ platform }: PlatformCardProps) {
  return (
    <div className="flex items-center space-x-4">
      <span className={`text-${platform.color} text-2xl`}>
        {platformIcons[platform.id]}
      </span>
      <span className="text-lg font-semibold">{platform.name}</span>
    </div>
  )
} 