'use client';

import { useState, useEffect } from 'react';
import { 
  Heart, 
  MessageSquare,
  ArrowUp
} from 'lucide-react';

export default function FloatingButtons() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  // 模拟获取点赞数和评论数
  useEffect(() => {
    setLikeCount(Math.floor(Math.random() * 100));
    setCommentCount(Math.floor(Math.random() * 20));
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 transition-all duration-300 ${
      isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
    }`}>
      {/* 互动按钮 */}
      <div className="flex items-center gap-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg rounded-full shadow-lg border border-gray-200 dark:border-gray-700 p-2">
        <button
          onClick={handleLike}
          className={`group flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-200 ${
            isLiked 
              ? 'bg-red-50 text-red-500' 
              : 'bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          <Heart 
            size={20} 
            className={`transition-transform duration-200 ${isLiked ? 'fill-current' : ''}`}
          />
          <span className="text-sm font-medium">{likeCount}</span>
        </button>

        <button
          onClick={() => {}}
          className="group flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
        >
          <MessageSquare size={20} />
          <span className="text-sm font-medium">{commentCount}</span>
        </button>

        <button
          onClick={scrollToTop}
          className="group flex items-center gap-1.5 px-4 py-2 rounded-full bg-gray-50 text-gray-600 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-all duration-200"
        >
          <ArrowUp size={20} />
        </button>
      </div>
    </div>
  );
} 