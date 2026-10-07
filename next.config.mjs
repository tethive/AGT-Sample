/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,

  images: {
    // Every asset in /public is already pre-sized and encoded to WebP by the
    // asset pipeline, so Next's on-demand optimiser has nothing left to do —
    // and on a cold cache it was queueing ~50 resize jobs on first load, which
    // is exactly why images arrived late. Serving them straight from /public
    // makes them appear immediately.
    unoptimized: true,
  },
};
export default nextConfig;
