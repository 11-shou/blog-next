'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import SearchBar from './SearchBar';
import { getDailyQuote, getDailyImage } from '@/services/api';
import LoadingAnimation from './LoadingAnimation';
import mockPosts from '@/services/mockPosts';
import { useColorMode } from '@/contexts/ColorModeContext';

// 计算图片主色调
const getAverageColor = async (imageUrl) => {
  return new Promise((resolve) => {
    const img = document.createElement('img');
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      let r = 0, g = 0, b = 0;
      
      for (let i = 0; i < imageData.length; i += 4) {
        r += imageData[i];
        g += imageData[i + 1];
        b += imageData[i + 2];
      }
      
      const pixelCount = imageData.length / 4;
      r = Math.round(r / pixelCount);
      g = Math.round(g / pixelCount);
      b = Math.round(b / pixelCount);
      
      // 计算亮度
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      
      resolve({
        color: `rgb(${r}, ${g}, ${b})`,
        isDark: brightness < 128
      });
    };
    img.onerror = () => {
      resolve({ color: '#ffffff', isDark: false });
    };
    img.src = imageUrl;
  });
};

// 获取金山词霸每日一句
const getIcibaDaily = async () => {
  const res = await fetch('/api/daily');
  return res.json();
};

export default function Hero() {
  const [quote, setQuote] = useState(null);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [imageColor, setImageColor] = useState(null);
  const { setIsDark } = useColorMode();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 获取金山每日一句
        const quoteData = await getIcibaDaily();
        setQuote(quoteData);
        // 保持原有图片逻辑
        const imageData = await getDailyImage();
        setImage(imageData);
        // 计算图片主色调
        const colorData = await getAverageColor(imageData.url);
        setImageColor(colorData);
        setIsDark(colorData.isDark);
        // 设置 CSS 变量
        document.documentElement.style.setProperty('--image-color', colorData.color);
        document.documentElement.style.setProperty('--text-color', colorData.isDark ? '#ffffff' : '#000000');
        document.documentElement.style.setProperty('--navbar-color', '#fff');
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [setIsDark]);


  const scrollToContent = () => {
    const contentSection = document.querySelector('#content-section');
    const navbar = document.querySelector('nav');
    if (contentSection) {
      const navbarHeight = navbar ? navbar.offsetHeight : 0;
      const top = contentSection.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <LoadingAnimation type="fullscreen" />;
  }

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* 背景图片 */}
      <div className="absolute inset-0">
        <Image
          src={image?.url || 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'}
          alt="每日一图"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          style={{ objectPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* 内容区：顶部搜索框+每日一句 */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
        <div className="w-full max-w-2xl mb-8">
          <SearchBar posts={mockPosts} />
        </div>
        {quote && (
          <div className="w-full max-w-2xl">
            <blockquote className="text-2xl md:text-4xl font-bold italic text-white text-center drop-shadow-lg">
              {quote.content}
              {quote.note && (
                <span className="block text-lg not-italic font-normal text-white/80 mt-4">{quote.note}</span>
              )}
            </blockquote>
          </div>
        )}
      </div>

      {/* 背景图片作者信息 */}
      <div className="absolute bottom-4 right-4 text-white text-sm opacity-75 hover:opacity-100 transition-opacity">
        <a 
          href={image?.authorUrl || 'https://unsplash.com'} 
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <span>必应每日图片</span>
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </a>
      </div>

      {/* 向下滚动指示器 */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 group cursor-pointer"
        aria-label="向下滚动"
      >
        <div className="flex flex-col items-center">
          <span className="text-white text-sm mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            向下滚动
          </span>
          <div className="relative">
            <div className="w-8 h-12 border-2 border-white rounded-full flex items-start justify-center p-2">
              <div className="w-1 h-3 bg-white rounded-full animate-scroll-down"></div>
            </div>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 border-b-2 border-r-2 border-white rotate-45 animate-bounce"></div>
          </div>
        </div>
      </button>
    </div>
  );
} 