import type { NextApiRequest, NextApiResponse } from 'next';
import Tiktok from '@tobyg74/tiktok-api-dl';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { url } = req.body;

    if (!isValidTikTokUrl(url)) {
      return res.status(400).json({ error: 'Invalid TikTok URL' });
    }

    try {
      const result = await Tiktok.Downloader(url, {
        version: "v1" //  version: "v1" | "v2" | "v3"
      });

    console.log("URL: ");
    console.log(url);
      console.log("Result: ");
      console.log(result);

      if (!result || result.status !== 'success') {
        throw new Error(result?.message || 'Failed to fetch video details');
      }

      if (!result.result) {
        throw new Error('Result data is missing');
      }

      res.status(200).json(result);
    } catch (error) {
      console.error('Error fetching video details:', error);
      res.status(500).json({ error: 'Failed to fetch video details' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function isValidTikTokUrl(url: string): boolean {
  const regex = /^(https?\:\/\/)?(www\.tiktok\.com|vm\.tiktok\.com)\/.+$/;
  return regex.test(url);
}
