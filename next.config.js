/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  webpack: (config) => {
    // Fix for node: protocol imports
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      net: false,
      tls: false,
      crypto: false,
      os: false,
      url: false,
      http: false,
      https: false,
      stream: false,
      util: false,
      buffer: false,
      events: false,
      querystring: false,
    };
    
    // Handle node: protocol imports
    config.resolve.alias = {
      ...config.resolve.alias,
      'node:fs': false,
      'node:path': false,
      'node:crypto': false,
      'node:os': false,
      'node:url': false,
      'node:http': false,
      'node:https': false,
      'node:stream': false,
      'node:util': false,
      'node:buffer': false,
      'node:events': false,
      'node:querystring': false,
    };

    // Add externals for Node.js packages
    if (!config.externals) {
      config.externals = [];
    }
    config.externals.push({
      'imapflow': 'commonjs imapflow',
      'nodemailer': 'commonjs nodemailer',
      'crypto-js': 'commonjs crypto-js',
    });
    
    return config;
  },
};

module.exports = nextConfig;