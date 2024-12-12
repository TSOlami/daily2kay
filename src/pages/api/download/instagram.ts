import type { NextApiRequest, NextApiResponse } from 'next';
import { getPostMeta } from 'instatouch';

import { isValidInstagramUrl } from '@/features/instagram/utils';
import { getPostIdFromUrl } from '@/features/instagram/utils';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { url } = req.body;

    if (!url) {
      return res.status(400).json({ error: 'Invalid Instagram URL' });
    }

    try {
      if (!isValidInstagramUrl(url)) {
        return res.status(400).json({ error: 'Invalid Instagram URL' });
      }

      const postId = getPostIdFromUrl(url);

      const newUrl = `https://www.instagram.com/p/${postId}/`;
      // Use instatouch to get video information
      const options = { count: 100 };
      console.log("Url: ", url, " Options: ", options);
      const videoInfo = await getPostMeta(newUrl, options);

      console.log("Video Info: ", videoInfo);

      res.status(200).json({ status: 'success', videoInfo });
    } catch (error) {
      console.error('Error fetching video details:', error);
      res.status(500).json({ error: 'Failed to fetch video details' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
