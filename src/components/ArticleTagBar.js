'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const categories = [
  '全部',
  '前端开发',
  '后端开发',
  '移动开发',
  '人工智能',
  '数据科学',
  'DevOps',
  '架构设计'
];

export default function ArticleTagBar({ selectedCategory, onCategoryChange }) {
  const scrollContainerRef = useRef(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setShowLeftButton(scrollLeft > 0);
      setShowRightButton(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleScroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      const newScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount;
      
      scrollContainerRef.current.scrollTo({
        left: newScroll,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full mb-8 relative">
      {/* 左侧滚动按钮 */}
      {showLeftButton && (
        <button
          onClick={() => handleScroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full border border-gray-200 hover:bg-gray-50 z-10 hidden md:block"
        >
          <ChevronLeft className="w-5 h-5 text-gray-600" />
        </button>
      )}

      {/* 标签容器 */}
      <div 
        ref={scrollContainerRef}
        className="flex items-center space-x-4 overflow-x-auto py-2 scrollbar-none md:mx-12"
        onScroll={checkScroll}
      >
        {categories.map(category => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0
              ${selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 右侧滚动按钮 */}
      {showRightButton && (
        <button
          onClick={() => handleScroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md p-2 rounded-full border border-gray-200 hover:bg-gray-50 z-10 hidden md:block"
        >
          <ChevronRight className="w-5 h-5 text-gray-600" />
        </button>
      )}
    </div>
  );
} 