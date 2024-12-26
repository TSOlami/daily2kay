<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>

  <!-- Template for styling the sitemap index -->
  <xsl:template match="/sitemapindex">
    <html>
      <head>
        <title>Sitemap Index</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f9; margin: 0; padding: 20px; }
          h1 { color: #4CAF50; text-align: center; font-size: 2em; margin-bottom: 20px; }
          p { font-size: 1.2em; color: #555; text-align: center; margin-bottom: 20px; }
          .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
          th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
          th { background-color: #4CAF50; color: white; }
          td { background-color: #f9f9f9; }
          tr:hover { background-color: #f1f1f1; }
          a { color: #4CAF50; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Sitemap Index</h1>
          <p>Welcome to the Sitemap of Daily2kay. Below you can find links to our sitemaps.</p>
          <table>
            <thead>
              <tr>
                <th>Location</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap">
                <tr>
                  <td><a href="{loc}"><xsl:value-of select="loc" /></a></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>

  <!-- Template for styling the regular sitemap (urlset) -->
  <xsl:template match="/urlset">
    <html>
      <head>
        <title>Sitemap</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f9; margin: 0; padding: 20px; }
          h1 { color: #4CAF50; text-align: center; font-size: 2em; margin-bottom: 20px; }
          p { font-size: 1.2em; color: #555; text-align: center; margin-bottom: 20px; }
          .container { max-width: 1200px; margin: 0 auto; padding: 20px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
          th, td { padding: 12px; text-align: left; border: 1px solid #ddd; }
          th { background-color: #4CAF50; color: white; }
          td { background-color: #f9f9f9; }
          tr:hover { background-color: #f1f1f1; }
          a { color: #4CAF50; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Sitemap</h1>
          <p>This is the sitemap for Daily2kay, listing all the pages on our site. Below you will find the URLs and associated details.</p>
          <table>
            <thead>
              <tr>
                <th>Location</th>
                <th>Change Frequency</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="url">
                <tr>
                  <td><a href="{loc}"><xsl:value-of select="loc" /></a></td>
                  <td><xsl:value-of select="changefreq" /></td>
                  <td><xsl:value-of select="priority" /></td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
