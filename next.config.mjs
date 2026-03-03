/** @type {import('next').NextConfig} */
const nextConfig = {
  // Explicitly set the Turbopack root so Next.js
  // doesn't infer the workspace from parent lockfiles.
  turbopack: {
    root: 'C:/var/www/Portfolio',
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
