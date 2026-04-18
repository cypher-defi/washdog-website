import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://www.googletagmanager.com https://www.google-analytics.com`,
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://maps.googleapis.com https://api.iconify.design https://sbwtfddxkqnnfcbpytne.supabase.co",
      "frame-src 'self' https://www.google.com https://maps.google.com",
    ].join("; "),
  },
];

// Set WASHDOG_POS_URL in Vercel env vars once the POS project is deployed
// e.g. https://washdog-pos.vercel.app
const POS_URL = process.env.WASHDOG_POS_URL || 'https://washdog-pos.vercel.app'

const nextConfig: NextConfig = {
  reactCompiler: true,
  async rewrites() {
    return [
      {
        source: '/pos',
        destination: `${POS_URL}/pos/`,
      },
      {
        source: '/pos/:path*',
        destination: `${POS_URL}/pos/:path*`,
      },
    ]
  },
  async redirects() {
    return [
      {
        source: "/servicios/auto-lavado-perros-san-ramon",
        destination: "/servicios/bano-perros-san-ramon",
        permanent: true,
      },
      {
        source: "/servicios/peluqueria-gatos-lo-prado",
        destination: "/servicios/peluqueria-gatos",
        permanent: true,
      },
      {
        source: "/servicios/spa-canino-san-miguel",
        destination: "/servicios/peluqueria-canina-san-miguel",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
