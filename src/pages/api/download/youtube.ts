import type { NextApiRequest, NextApiResponse } from 'next';
import youtubedl from 'youtube-dl-exec';

type VideoFormat = {
  format_id: string;
  format_note: string;
  filesize: number;
  url: string;
  acodec: string;
  audio_ext: string;
};

type YouTubeDLResponse = {
  title: string;
  thumbnail: string;
  duration: number;
  formats: VideoFormat[];
};

type VideoDetails = {
  title: string;
  thumbnail: string;
  duration: string;
  formats: VideoFormat[];
};

const QUALITY_MAP: { [key: string]: string } = {
  // 4K and 2K formats
  '401': '4K',
  '400': '4K',
  '313': '4K',
  '271': '2K',
  '308': '2K',
  
  // Standard HD formats
  '137': '1080p',
  '136': '720p',
  '135': '480p',
  '134': '360p',
  '133': '240p',
  '160': '144p',
  
  // MP4 container formats
  '18': '360p MP4',
  '22': '720p MP4',
  '37': '1080p MP4',
  '38': '4K MP4',
  
  // WebM formats
  '248': '1080p WebM',
  '247': '720p WebM',
  '244': '480p WebM',
  '243': '360p WebM',
  '242': '240p WebM',
  
  // Audio formats
  '140': 'Audio (128kbps)',
  '251': 'Audio (160kbps)',
  '250': 'Audio (70kbps)',
  '249': 'Audio (50kbps)',
  
  // Common VP9 formats
  '315': '4K VP9',
  '303': '1080p VP9',
  '302': '720p VP9',
  
  // AV1 formats (newer, more efficient)
  '398': '1080p AV1',
  '397': '720p AV1',
  '396': '480p AV1',
  '395': '360p AV1'
};

const filterQualities = (qualities: string[]): string[] => {
  const filteredQualities = qualities
    .filter(quality => QUALITY_MAP[quality])
    .map(quality => QUALITY_MAP[quality]);
  
  // Remove duplicates and sort by resolution
  return [...new Set(filteredQualities)].sort((a, b) => {
    const aNum = parseInt(a) || 0;
    const bNum = parseInt(b) || 0;
    return bNum - aNum;
  });
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { url } = req.body;

    if (!isValidYouTubeUrl(url)) {
      return res.status(400).json({ error: 'Invalid YouTube URL' });
    }

    try {
      const info = await youtubedl(url, {
        dumpSingleJson: true,
        noWarnings: true,
        noCheckCertificates: true,
        preferFreeFormats: true,
      }) as YouTubeDLResponse;

      const videoDetails: VideoDetails = {
        title: info.title,
        thumbnail: info.thumbnail,
        duration: info.duration.toString(),
        formats: Array.from(
          new Map(
            info.formats
              .filter((format) => format.url && format.filesize)
              .map((format) => [format.format_id, format])
          ).values()
        ).map((format) => ({
          format_id: format.format_id,
          format_note: format.format_note,
          filesize: format.filesize,
          url: format.url,
          acodec: format.acodec,
          audio_ext: format.audio_ext
        }))
      };

      res.status(200).json(videoDetails);
      console.log(info.formats);
    } catch (error) {
      console.error('Error fetching video details:', error);
      res.status(500).json({ error: 'Failed to fetch video details' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function isValidYouTubeUrl(url: string): boolean {
  const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/.+$/;
  return regex.test(url);
} 