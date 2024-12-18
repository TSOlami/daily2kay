import type { NextApiRequest, NextApiResponse } from 'next';
import ytdl from 'ytdl-core';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { url } = req.body;

    if (!ytdl.validateURL(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    try {
      // First get basic info to avoid signature deciphering issues
      const info = await ytdl.getBasicInfo(url, {
        requestOptions: {
          headers: {
            'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
            'accept-language': 'en-US,en;q=0.9',
          }
        }
      });

      console.log("All available formats:", info.formats.length);
      
      // Log a sample format to see its structure
      console.log("Sample format:", info.formats[0]);

      // Get formats with video
      const formats = info.formats.filter(format => {
        // Log each format's key properties
        console.log("Format:", {
          itag: format.itag,
          quality: format.quality,
          qualityLabel: format.qualityLabel,
          hasVideo: format.hasVideo,
          hasAudio: format.hasAudio,
          mimeType: format.mimeType
        });

        return format.qualityLabel && format.mimeType?.includes('video/mp4');
      });

      console.log("Filtered formats:", formats.length);
      
      const videoDetails = {
        title: info.videoDetails.title,
        thumbnail: info.videoDetails.thumbnails[0].url,
        duration: info.videoDetails.lengthSeconds,
        formats: formats.map(format => ({
          itag: format.itag,
          qualityLabel: format.qualityLabel,
          mimeType: format.mimeType,
          bitrate: format.bitrate,
          url: format.url,
          hasAudio: format.hasAudio,
          hasVideo: format.hasVideo,
          container: format.container,
          contentLength: format.contentLength
        })).sort((a, b) => {
          // Sort by quality (assuming quality labels are like '1080p', '720p', etc.)
          const aQuality = parseInt(a.qualityLabel);
          const bQuality = parseInt(b.qualityLabel);
          return bQuality - aQuality;
        })
      };

      // Log the final result
      console.log("Video details:", {
        title: videoDetails.title,
        formatsCount: videoDetails.formats.length,
        availableQualities: videoDetails.formats.map(f => f.qualityLabel)
      });

      res.status(200).json(videoDetails);
    } catch (error) {
      console.error('Error fetching video details:', error);
      
      if (error instanceof Error) {
        if (error.message.includes('Status code: 429')) {
          return res.status(429).json({ 
            error: 'YouTube rate limit reached. Please try again later.' 
          });
        }
        if (error.message.includes('Could not extract')) {
          return res.status(500).json({ 
            error: 'Unable to extract video information. This might be due to YouTube restrictions.' 
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