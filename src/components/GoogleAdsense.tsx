'use client';

import Script from 'next/script';

export default function GoogleAdsense() {
  return (
    <Script
      id="adsbygoogle-init"
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1345276010845166"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
} 