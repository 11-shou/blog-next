'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import mockPosts from '@/services/mockPosts';
import Link from 'next/link';
import { Sparkles, X } from 'lucide-react';

export default function SearchBar({ isScrolled }) {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const router = useRouter();

  // 点击外部关闭建议
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion.title);
    router.push(`/search?q=${encodeURIComponent(suggestion.title)}`);
    setShowSuggestions(false);
    setQuery('');
  };

  const handleClear = () => {
    setQuery('');
    setShowSuggestions(false);
  };

  // 计算相关性分数
  const calculateRelevanceScore = (post, searchQuery) => {
    const query = searchQuery.toLowerCase();
    let score = 0;

    // 标题匹配权重最高
    if (post.title.toLowerCase().includes(query)) {
      score += 100;
      // 完全匹配额外加分
      if (post.title.toLowerCase() === query) {
        score += 50;
      }
    }

    // 摘要匹配次之
    if (post.excerpt.toLowerCase().includes(query)) {
      score += 30;
    }

    // 标签匹配
    if (post.tags?.some(tag => tag.toLowerCase().includes(query))) {
      score += 20;
    }

    // 日期越新分数越高
    const postDate = new Date(post.date);
    const now = new Date();
    const daysDiff = Math.floor((now - postDate) / (1000 * 60 * 60 * 24));
    score += Math.max(0, 10 - Math.floor(daysDiff / 30)); // 每月衰减1分，最多10分

    return score;
  };

  // 搜索建议
  const suggestions = query.trim()
    ? mockPosts
      .filter(post =>
        post.title.toLowerCase().includes(query.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        post.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      )
      .map(post => ({
        ...post,
        relevanceScore: calculateRelevanceScore(post, query)
      }))
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 5)
    : [];

  return (
    <div className="relative w-full max-w-2xl" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => {
              setIsFocused(true);
              setShowSuggestions(true);
            }}
            placeholder="搜索文章..."
            className={`w-full h-8 pl-9 pr-8 text-sm bg-transparent border rounded-full focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 ${
              isScrolled 
                ? 'border-gray-400 text-gray-900 placeholder-gray-600 focus:ring-gray-400/30' 
                : 'border-white text-white placeholder-white/80 focus:ring-white/40'
            }`}
          />
          <button
            type="submit"
            className={`absolute left-2 top-1/2 -translate-y-1/2 p-1 transition-colors ${
              isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-white/90'
            }`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 transition-colors ${
                isScrolled ? 'text-gray-600 hover:text-gray-800' : 'text-white/80 hover:text-white'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>

      {/* 搜索建议 */}
      {showSuggestions && (
        <div className="absolute top-[2.5rem] left-0 right-0 z-[100]">
          <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden">
            {suggestions.length > 0 ? (
              <div className="max-h-[calc(100vh-28rem)] md:max-h-[calc(100vh-36rem)] overflow-y-auto scrollbar-hide">
                {suggestions.map((suggestion, index) => (
                  <div key={suggestion.id}>
                    <Link
                      href={`/post/${suggestion.id}`}
                      className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-200"
                      onClick={() => {
                        handleSuggestionClick(suggestion);
                        setShowSuggestions(false);
                      }}
                    >
                      <div className="flex gap-4">
                        {/* 文章缩略图 */}
                        <div className="flex-shrink-0 w-[60px] md:w-[80px]">
                          <div className="w-full aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                            <img
                              src={suggestion.image}
                              alt={suggestion.title}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.src = '/images/placeholder.jpg';
                              }}
                            />
                          </div>
                          {index === 0 && suggestion.relevanceScore >= 100 && (
                            <div className="mt-1">
                              <span className="inline-flex items-center justify-center px-1 py-0.5 rounded-full text-[10px] font-semibold bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-sm">
                                <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                                最佳匹配
                              </span>
                            </div>
                          )}
                        </div>
                        
                        {/* 文章信息 */}
                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-medium text-gray-900 dark:text-white truncate text-left">
                            {suggestion.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400 line-clamp-2 text-left md:block hidden">
                            {suggestion.excerpt}
                          </p>
                          <div className="mt-2 flex items-center text-xs text-gray-500 dark:text-gray-400 space-x-4">
                            <span>{suggestion.date}</span>
                            <span className="md:inline hidden">{suggestion.readTime} 分钟阅读</span>
                            <span className="flex items-center">
                              <svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                              {suggestion.views || 0}
                            </span>
                          </div>
                          <div className="mt-2 flex flex-wrap gap-1.5 overflow-x-auto scrollbar-hide">
                            {suggestion.tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-primary/10 text-primary"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-400">
                没有找到相关结果
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 