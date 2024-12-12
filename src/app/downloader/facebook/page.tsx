"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface VideoData {
  resolution: string;
  thumbnail: string;
  url: string;
}

export default function FacebookDownloader() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<VideoData[]>([]);

  const handleFetchMedia = async () => {
    setError("");
    setLoading(true);
    setVideos([]);

    try {
      const response = await fetch('/api/download/facebook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to download media. Please check the URL and try again.');
      }

      const data = await response.json();
      console.log("Videos: ", data.videos);
      setVideos(data.videos);
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
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Facebook Downloader</h2>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter Facebook media URL"
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
          {videos.length > 0 && (
            <div className="mt-4">
              {/* Preview Section */}
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Preview</h3>
                <img 
                  src={videos[0].thumbnail} 
                  alt="Video thumbnail" 
                  className="w-full h-auto rounded-lg shadow-md"
                />
              </div>
              
              {/* Download Options */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Download Options</h3>
                {videos.map((video, index) => (
                  <div key={index} className="p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-gray-900 dark:text-white">
                        {video.resolution}
                      </span>
                      <Button
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                        onClick={() => window.open(video.url, '_blank')}
                      >
                        Download
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
} 