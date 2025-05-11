'use client';

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import ArticleHeader from '@/components/ArticleHeader';
import ArticleTagBar from '@/components/ArticleTagBar';
import ArticleList from '@/components/ArticleList';
import LoadingAnimation from '@/components/LoadingAnimation';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('全部');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [posts, setPosts] = useState([]);

  // 检测系统暗色模式
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 首页文章列表接口请求
  useEffect(() => {
    fetch('/api/home-articles')
      .then(res => res.json())
      .then(data => setPosts(data))
      .finally(() => setLoading(false));
  }, []);

  // 保存滚动位置
  useEffect(() => {
    const handleScroll = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  // 恢复滚动位置
  useEffect(() => {
    if (!loading) {
      const saved = sessionStorage.getItem('scrollPosition');
      if (saved) {
        window.scrollTo({
          top: parseInt(saved),
          behavior: 'instant'
        });
        sessionStorage.removeItem('scrollPosition');
      }
    }
  }, [loading]);

  if (loading) return <LoadingAnimation />;

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Hero />
      <div 
        id="content-section" 
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12"
      >
        <ArticleHeader />
        <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
          <ArticleTagBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
          />
        </div>
        <div className="mt-6">
          <ArticleList 
            posts={posts} 
            selectedCategory={selectedCategory}
          />
        </div>
      </div>
    </main>
  );
} 