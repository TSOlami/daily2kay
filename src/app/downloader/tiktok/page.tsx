"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type VideoDetails = {
  status: string;
  message?: string;
  result?: {
    type: string;
    description?: string;
    author?: {
      uid: string;
      username: string;
      nickname: string;
      signature: string;
      region: string;
      url: string;
    };
    music?: {
      id: number;
      title: string;
      author: string;
      album: string;
      playUrl: string[];
      duration: number;
    };
    images?: string[];
    video?: {
      playAddr: string[];
      ratio: string;
      duration: number;
    };
  };
};

export default function TikTokDownloader() {
  const [url, setUrl] = useState("");
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFetchVideo = async () => {
    if (!isValidTikTokUrl(url)) {
      setError("Please enter a valid TikTok URL.");
      return;
    }
    setError("");
    setLoading(true);

    try {
      const response = await fetch('/api/download/tiktok', {
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
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  const isValidTikTokUrl = (url: string) => {
    const regex = /^(https?\:\/\/)?(www\.tiktok\.com|vm\.tiktok\.com)\/.+$/;
    return regex.test(url);
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
          <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">TikTok Downloader</h2>
          <div className="mb-4">
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter TikTok video URL"
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
          {error && <p className="text-red-500">{error}</p>}
          {videoDetails && videoDetails.result && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-4 space-y-6"
            >
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Author Details</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Nickname:</strong> {videoDetails.result.author?.nickname}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Username:</strong> @{videoDetails.result.author?.username}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Signature:</strong> {videoDetails.result.author?.signature}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Region:</strong> {videoDetails.result.author?.region}</p>
                  <a href={videoDetails.result.author?.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">Visit Profile</a>
                </div>
              </div>
              <div className="border-b pb-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Post Description</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{videoDetails.result.description}</p>
              </div>
              {videoDetails.result.images && (
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Images</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {videoDetails.result.images.map((image, index) => (
                      <div key={index} className="mb-4">
                        <img src={image} alt={`Image ${index + 1}`} className="w-full mb-2 rounded-lg" />
                        <Button
                          className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                          onClick={() => window.open(image, '_blank')}
                        >
                          Download Image
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {videoDetails.result.video && videoDetails.result.video.playAddr && videoDetails.result.video.playAddr.length > 0 && (
                <div className="border-b pb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Video</h3>
                  <video controls className="w-full mb-2 rounded-lg">
                    <source src={videoDetails.result.video.playAddr[0]} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <Button
                    className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                    onClick={() => window.open(videoDetails.result?.video?.playAddr[0], '_blank')}
                  >
                    Download Video
                  </Button>
                </div>
              )}
              {videoDetails.result.music && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Music Details</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Title:</strong> {videoDetails.result.music.title}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Author:</strong> {videoDetails.result.music.author}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300"><strong>Album:</strong> {videoDetails.result.music.album}</p>
                  <audio controls className="w-full mb-2">
                    <source src={videoDetails.result.music.playUrl[0]} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  <Button
                    className="w-full p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300"
                    onClick={() => window.open(videoDetails.result?.music?.playUrl[0], '_blank')}
                  >
                    Download Music
                  </Button>
                </div>
              )}
            </motion.div>
          )}
        </Card>
      </motion.div>
    </div>
  );
} 