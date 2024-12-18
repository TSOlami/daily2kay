"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaVolumeMute } from "react-icons/fa";

type VideoFormat = {
  itag: number;
  qualityLabel: string;
  mimeType: string;
  bitrate: number;
  url: string;
  hasAudio: boolean;
  hasVideo: boolean;
  container: string;
  size?: string;
  downloadUrl?: string;
};

type VideoDetails = {
  title: string;
  thumbnail: string;
  duration: string;
  formats: VideoFormat[];
};

export default function YouTubeDownloader() {
  const [url, setUrl] = useState("");
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [selectedQuality, setSelectedQuality] = useState<VideoFormat | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleFetchVideo = async () => {
    if (!url.includes('youtube.com/') && !url.includes('youtu.be/')) {
      setError("Please enter a valid YouTube URL.");
      return;
    }
    setError("");
    setLoading(true);
    setVideoDetails(null);
    setSelectedQuality(null);

    try {
      const response = await fetch('/api/download/youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch video details');
      }

      const data = await response.json();
      setVideoDetails(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!selectedQuality) {
      setError("Please select a video quality.");
      return;
    }

    try {
      setDownloading(true);
      setError("");

      if (selectedQuality.downloadUrl) {
        const a = document.createElement('a');
        a.href = selectedQuality.downloadUrl;
        a.download = `${videoDetails?.title || 'video'}.${selectedQuality.container || 'mp4'}`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        throw new Error("Download URL not available");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Download failed');
    } finally {
      // Add a small delay before enabling the button again
      setTimeout(() => {
        setDownloading(false);
      }, 2000); // 2 seconds delay
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
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">YouTube Downloader</h2>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter YouTube URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
            <Button
              className="mt-3 w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
              onClick={handleFetchVideo}
              disabled={loading}
            >
              {loading ? 'Fetching...' : 'Fetch Video'}
            </Button>
          </div>

          {error && <p className="text-red-500 mb-4">{error}</p>}
          
          {videoDetails && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4"
            >
              <img 
                src={videoDetails.thumbnail} 
                alt="Video Thumbnail" 
                className="w-full mb-2 rounded-lg"
              />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {videoDetails.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                Duration: {videoDetails.duration}
              </p>
              
              <div className="mt-4 relative">
                <button
                  className="w-full p-3 border rounded-lg bg-white dark:bg-gray-700 dark:text-white flex justify-between items-center"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                >
                  <span>
                    {selectedQuality 
                      ? `${selectedQuality.qualityLabel}${!selectedQuality.hasAudio ? ' (No Audio)' : ''}`
                      : 'Select quality'}
                  </span>
                  <span className="transform transition-transform duration-200">
                    {dropdownOpen ? '▼' : '▲'}
                  </span>
                </button>
                
                {dropdownOpen && videoDetails.formats.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white dark:bg-gray-700 border rounded-lg mt-1 max-h-60 overflow-y-auto">
                    {videoDetails.formats.map((format) => (
                      <li
                        key={format.itag}
                        className="p-3 hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer flex justify-between items-center"
                        onClick={() => {
                          setSelectedQuality(format);
                          setDropdownOpen(false);
                        }}
                      >
                        <span>{format.qualityLabel}</span>
                        {!format.hasAudio && <FaVolumeMute className="text-gray-500" />}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {selectedQuality && (
                <Button
                  className={`mt-4 w-full p-3 rounded-lg transition-colors duration-300 ${
                    downloading 
                      ? 'bg-gray-500 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white`}
                  onClick={handleDownload}
                  disabled={downloading}
                >
                  {downloading ? 'Downloading...' : 'Download'}
                </Button>
              )}
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
} 