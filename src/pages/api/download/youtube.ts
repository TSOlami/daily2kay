import type { NextApiRequest, NextApiResponse } from 'next';
import ytdl from '@distube/ytdl-core';

// Parse cookies from environment variable
const cookies = (() => {
  try {
    const rawCookies = process.env.YOUTUBE_COOKIES;
    return rawCookies ? JSON.parse(rawCookies) : [];
  } catch (error) {
    console.error("Error parsing YOUTUBE_COOKIES:", error);
    return [];
  }
})();
const agentOptions = {
  pipelining: 5,
  maxRedirections: 0,
  localAddress: "127.0.0.1",
};

export const agent = ytdl.createAgent(cookies, agentOptions);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'Missing YouTube URL' });
    }

    

    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    try {
      const info = await ytdl.getInfo(url, { agent });

      console.log("Total formats available:", info.formats.length);

      // Filter formats to include video formats (with or without audio)
      const formats = info.formats.filter(format => {
        const hasVideo = format.hasVideo;
        const isMP4 = format.container === 'mp4';
        const hasQuality = !!format.qualityLabel;
        return hasVideo && isMP4 && hasQuality;
      });

      // Also include audio-only formats
      const audioFormats = info.formats.filter(format => {
        const hasAudioOnly = format.hasAudio && !format.hasVideo;
        const isMP4 = format.container === 'mp4';
        return hasAudioOnly && isMP4;
      });

      const allFormats = [...formats, ...audioFormats];
      console.log("Filtered formats:", allFormats.length);

      const videoDetails = {
        title: info.videoDetails.title,
        thumbnail: info.videoDetails.thumbnails[0].url,
        duration: info.videoDetails.lengthSeconds,
        formats: allFormats.map(format => ({
          itag: format.itag,
          qualityLabel: format.qualityLabel || 'Audio Only',
          mimeType: format.mimeType,
          bitrate: format.bitrate,
          url: format.url,
          hasAudio: format.hasAudio,
          hasVideo: format.hasVideo,
          container: format.container,
          contentLength: format.contentLength,
          audioQuality: format.audioQuality,
          // Generate a download URL through our API
          downloadUrl: `/api/download/youtube/stream?url=${encodeURIComponent(url)}&itag=${format.itag}`
        })).sort((a, b) => {
          // Sort video formats by quality
          if (a.hasVideo && b.hasVideo) {
            const aQuality = parseInt(a.qualityLabel);
            const bQuality = parseInt(b.qualityLabel);
            return bQuality - aQuality;
          }
          // Put audio-only formats at the end
          if (!a.hasVideo && b.hasVideo) return 1;
          if (a.hasVideo && !b.hasVideo) return -1;
          // Sort audio-only formats by bitrate, handle undefined bitrate with fallback to 0
          const aBitrate = a.bitrate ?? 0;
          const bBitrate = b.bitrate ?? 0;
          return bBitrate - aBitrate;
        })
      };

      console.log("Available formats:", videoDetails.formats.map(f => ({
        quality: f.qualityLabel,
        hasAudio: f.hasAudio,
        hasVideo: f.hasVideo
      })));

      if (videoDetails.formats.length === 0) {
        throw new Error('No suitable formats found');
      }

      res.status(200).json(videoDetails);
    } catch (error) {
      console.error('Error fetching video details:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Status code: 429')) {
          return res.status(429).json({ 
            error: 'YouTube rate limit reached. Please try again later.' 
          });
        }
        if (error.message.includes('No suitable formats found')) {
          return res.status(404).json({ 
            error: 'No downloadable formats found for this video.' 
          });
        }
      }
      
      res.status(500).json({ 
        error: 'Failed to fetch video details',
        details: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 