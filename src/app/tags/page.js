'use client';

import { useState, useEffect, useRef } from 'react';
import mockPosts from '@/services/mockPosts';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, Search, X, AlertCircle } from 'lucide-react';
import TagCloud from '@/components/TagCloud';

export default function TagsPage() {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState(null);
  const searchRef = useRef(null);
  const tagListRef = useRef(null);

  useEffect(() => {
    // 从文章数据中提取所有标签
    const allTags = mockPosts.reduce((acc, post) => {
      post.tags.forEach(tag => {
        if (!acc[tag]) {
          acc[tag] = {
            name: tag,
            count: 0,
            posts: []
          };
        }
        acc[tag].count++;
        acc[tag].posts.push(post);
      });
      return acc;
    }, {});

    // 转换为数组并按文章数量排序
    const sortedTags = Object.values(allTags).sort((a, b) => b.count - a.count);
    setTags(sortedTags);
    setLoading(false);
  }, []);

  // 处理标签选择
  const handleTagSelect = (tag) => {
    if (selectedTag === tag) {
      setSelectedTag(null);
    } else {
      setSelectedTag(tag);
    }
  };

  // 处理搜索
  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query) {
      setSelectedTag(null);
    } else {
      setSelectedTag(null);
    }
  };

  // 过滤和排序标签
  const filteredTags = tags
    .filter(tag => {
      if (!searchQuery) return true;
      return tag.name.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => b.count - a.count);

  // 获取要显示的文章列表
  const getDisplayPosts = () => {
    if (selectedTag) {
      const tag = tags.find(t => t.name === selectedTag);
      return tag ? [tag] : [];
    }
    return searchQuery ? filteredTags : tags;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="inline-block animate-bounce text-4xl font-bold text-blue-600 mb-4">
            11shou
          </div>
          <div className="text-gray-600 dark:text-gray-400">加载中...</div>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-6 sm:mb-12">
          <h1 className="font-bold text-gray-900 dark:text-white sm:text-4xl text-xl mb-1">标签云</h1>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-1 sm:gap-4 text-gray-600 dark:text-gray-400 text-xs sm:text-base mb-1">
            <span>通过标签快速找到感兴趣的内容</span>
            <span className="hidden sm:inline">|</span>
            <span>共 {tags.length} 个标签</span>
          </div>
        </div>

        {/* 标签搜索 */}
        <div className="mb-4 sm:mb-8" ref={searchRef}>
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="搜索标签..."
              className="w-full px-4 py-2 pl-10 pr-10 bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            {searchQuery && (
              <button
                onClick={() => handleSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          
          {/* 搜索反馈 */}
          {searchQuery && (
            <div className="mt-4 text-center">
              {filteredTags.length > 0 ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  找到 {filteredTags.length} 个相关标签
                </p>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 dark:bg-yellow-900/30 text-yellow-600 dark:text-yellow-400 rounded-lg">
                  <AlertCircle className="w-4 h-4" />
                  <span>未找到相关标签</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 标签云 */}
        <div className="mb-12">
          <TagCloud
            tags={tags}
            onTagSelect={handleTagSelect}
            selectedTag={selectedTag}
          />
        </div>

        {/* 标签文章列表 */}
        <div className="grid gap-8" ref={tagListRef}>
          {getDisplayPosts().map((tag) => (
            <div 
              key={tag.name}
              id={tag.name}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
            >
              {/* 标签标题 */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    #{tag.name}
                  </h2>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full text-sm font-medium">
                    {tag.count} 篇文章
                  </span>
                </div>
              </div>

              {/* 文章列表 */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {tag.posts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/post/${post.id}`}
                    className="block p-4 sm:p-6 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex items-center gap-4 sm:gap-6">
                      {/* 文章缩略图 */}
                      <div className="relative w-16 h-16 sm:w-24 sm:h-24 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* 文章信息 */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-1 sm:mb-2 line-clamp-1">
                          {post.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-2 mb-2 sm:mb-3">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 gap-x-2 gap-y-1">
                          <span>{post.date}</span>
                          <span className="mx-1">•</span>
                          <span>{post.readTime} 分钟阅读</span>
                          <span className="mx-1">•</span>
                          <span>{post.views || 0} 次阅读</span>
                        </div>
                      </div>

                      {/* 箭头图标 */}
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 flex-shrink-0" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 