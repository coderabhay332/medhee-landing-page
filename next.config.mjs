/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This app lives inside a monorepo with other lockfiles; pin the tracing root
  // to this package so Next doesn't infer the wrong workspace root.
  outputFileTracingRoot: import.meta.dirname,
};

export default nextConfig;
