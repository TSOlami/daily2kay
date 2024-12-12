"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { isValidInstagramUrl } from "@/features/instagram/utils";

type InstagramMediaDetails = {
  is_video: boolean;
  video_url?: string;
  display_url: string;
  title: string;
  video_duration?: number;
  video_view_count?: number;
};

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export default function InstagramDownloader() {
  const [url, setUrl] = useState("");
  const [mediaDetails, setMediaDetails] = useState<InstagramMediaDetails | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetchMedia = async () => {
    if (!isValidInstagramUrl(url)) {
      setError("Please enter a valid Instagram URL.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch('/api/download/instagram', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch media details');
      }

      const data = await response.json();
      const mediaData = data.videoInfo.graphql.shortcode_media;
      setMediaDetails({
        is_video: mediaData.is_video,
        video_url: mediaData.is_video ? mediaData.video_url : undefined,
        display_url: mediaData.display_url,
        title: mediaData.title || "Instagram Media",
        video_duration: mediaData.is_video ? mediaData.video_duration : undefined,
        video_view_count: mediaData.is_video ? mediaData.video_view_count : undefined,
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-lg mx-auto"
      >
        <Card className="p-6 shadow-lg rounded-lg bg-white dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Instagram Downloader</h2>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter Instagram media URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              className="mt-3 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              onClick={handleFetchMedia}
              disabled={loading}
            >
              {loading ? 'Fetching...' : 'Fetch Media'}
            </Button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {mediaDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4"
            >
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{mediaDetails.title}</h3>
              {mediaDetails.is_video ? (
                <>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Duration: {formatDuration(mediaDetails.video_duration || 0)}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Views: {mediaDetails.video_view_count}</p>
                  <video controls className="w-full mb-2 rounded-lg">
                    <source src={mediaDetails.video_url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <Button
                    className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                    onClick={() => window.open(mediaDetails.video_url, '_blank')}
                  >
                    Download Video
                  </Button>
                </>
              ) : (
                <Button
                  className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                  onClick={() => window.open(mediaDetails.display_url, '_blank')}
                >
                  Download Image
                </Button>
              )}
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
} 