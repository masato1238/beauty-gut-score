import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Beauty Gut Score',
    short_name: 'Beauty Gut',
    description: '腸内環境セルフチェックアプリ',
    start_url: '/',
    display: 'standalone',
    background_color: '#FFF5F9',
    theme_color: '#FF6B9D',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/apple-icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
