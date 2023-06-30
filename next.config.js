/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "images.unsplash.com",
      "uploadthing.com",
      "pbs.twimg.com",
      "api.dicebear.com",
      "utfs.io",
    ],
    dangerouslyAllowSVG: true,
  },
};

module.exports = nextConfig;
