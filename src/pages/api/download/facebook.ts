import type { NextApiRequest, NextApiResponse } from 'next';
import { fbdl } from 'ruhend-scraper';

interface VideoData {
  resolution?: string;
  thumbnail?: string;
  url: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { url } = req.body;

  if (!url || !isValidFacebookUrl(url)) {
    return res.status(400).json({ error: 'Invalid Facebook video URL' });
  }

  try {
    const mediaInfo = await fbdl(url);

    if (!mediaInfo.status || !mediaInfo.data || mediaInfo.data.length === 0) {
      throw new Error('No media found');
    }

    // Extract relevant data
    const videos = mediaInfo.data.map((video: VideoData) => ({
      resolution: video.resolution,
      thumbnail: video.thumbnail,
      url: video.url
    }));

    console.log("Videos: ", videos);

    res.status(200).json({ videos });
  } catch (error) {
    console.error("Error fetching video information:", error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to fetch media information' });
    }
  }
}

function isValidFacebookUrl(url: string): boolean {
  const facebookVideoUrlPattern = /^(https?:\/\/)?(www\.|web\.)?(facebook\.com\/.*)$/;
  return facebookVideoUrlPattern.test(url);
} 