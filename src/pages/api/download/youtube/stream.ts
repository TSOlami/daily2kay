import type { NextApiRequest, NextApiResponse } from 'next';
import ytdl from '@distube/ytdl-core';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url, itag } = req.query;

  if (!url || !itag) {
    return res.status(400).json({ error: 'Missing URL or itag' });
  }

  try {
    const videoUrl = decodeURIComponent(url as string);
    const videoItag = parseInt(itag as string);

    if (!ytdl.validateURL(videoUrl)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    const info = await ytdl.getInfo(videoUrl);
    const format = info.formats.find(f => f.itag === videoItag);

    if (!format) {
      return res.status(404).json({ error: 'Format not found' });
    }

    const stream = ytdl(videoUrl, {
      quality: videoItag,
      requestOptions: {
        headers: {
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        }
      }
    });

    // Set headers for video download
    res.setHeader('Content-Disposition', `attachment; filename="${info.videoDetails.title}.mp4"`);
    res.setHeader('Content-Type', 'video/mp4');

    // Pipe the video stream to response
    stream.pipe(res);
  } catch (error) {
    console.error('Error streaming video:', error);
    res.status(500).json({ 
      error: 'Failed to stream video',
      details: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 