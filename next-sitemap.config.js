/** @type {import('next-sitemap').IConfig} */
const config = {
    siteUrl: process.env.NEXT_PUBLIC_BASE_URL || 'https://daily2kay.com',
    generateRobotsTxt: true,
    sitemapSize: 10000, // Large enough to prevent splitting into multiple files
    changefreq: 'daily',
    priority: 0.7,
    exclude: [],
    transform: async (config, path) => {
      return {
        loc: path, // Include path in the sitemap
        changefreq: 'daily',
        priority: 0.7,
        lastmod: new Date().toISOString(),
      };
    },
    additionalPaths: async (config) => {
      return [
        { loc: '/terms', changefreq: 'monthly', priority: 0.5 }, // Add manually for app routes
        { loc: '/privacy', changefreq: 'monthly', priority: 0.5 }, // Add manually for app routes
        { loc: '/', changefreq: 'daily', priority: 1.0 }, // Add root manually if missing
      ];
    },
  };
  
  module.exports = config;
  