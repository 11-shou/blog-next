import './globals.css'
import Layout from '@/components/Layout'

export const metadata = {
  title: '11shou - 探索技术的无限可能',
  description: '在这里，我们分享最新的技术趋势、实用的开发技巧和深入的技术解析',
  keywords: '技术博客,前端开发,后端开发,人工智能,机器学习,Web开发,编程教程',
  authors: [{ name: '11shou' }],
  creator: '11shou',
  publisher: '11shou',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#111827' },
  ],
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="zh" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Layout>
          {children}
        </Layout>
      </body>
    </html>
  )
}
