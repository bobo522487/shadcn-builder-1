/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: { reactCompiler: true }, // disabled to avoid missing babel-plugin-react-compiler error
  transpilePackages: [
    "@shadcn-builder/renderer",
    "@shadcn-builder/designer",
  ],
};

export default nextConfig;
