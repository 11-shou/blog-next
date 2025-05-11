'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import mockPosts from '@/services/mockPosts';
import Link from 'next/link';
import FloatingButtons from '@/components/FloatingButtons';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [prevPost, setPrevPost] = useState(null);
  const [nextPost, setNextPost] = useState(null);

  useEffect(() => {
    const currentPost = mockPosts.find(p => p.id === parseInt(id));
    if (currentPost) {
      setPost(currentPost);
      const currentIndex = mockPosts.findIndex(p => p.id === parseInt(id));
      setPrevPost(mockPosts[currentIndex + 1] || null);
      setNextPost(mockPosts[currentIndex - 1] || null);
    }
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">文章不存在</h1>
          <p className="text-gray-600">抱歉，您访问的文章不存在或已被删除。</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 pb-10">
      {/* 顶部封面图和信息区 */}
      <div className="relative w-full h-[40vh] md:h-[35vh] mb-4 md:mb-8">
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover shadow-lg"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60" />
        
        {/* 移动端搜索栏和标题 */}
        <div className="md:hidden">
          {/* 搜索栏居中 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full px-4">
            <SearchBar />
          </div>
          {/* 标题左下 */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h1 className="text-2xl font-bold text-white">
              {post.title}
            </h1>
          </div>
        </div>

        {/* 文章信息区 - PC端 */}
        <div className="hidden md:block absolute bottom-0 left-0 right-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
            <h1 className="text-4xl font-bold text-white mb-4">
              {post.title}
            </h1>
            
            {/* 时间和浏览量 */}
            <div className="flex items-center gap-4 mb-4 text-gray-200">
              <span className="text-sm">{post.date}</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm">{post.views || 0} 次阅读</span>
            </div>

            {/* 分类和标签 */}
            <div className="flex flex-wrap gap-2 items-center">
              <span className="px-4 py-1.5 bg-blue-500/80 text-white rounded-full text-sm font-medium">
                {post.category}
              </span>
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-white/20 text-white rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 移动端文章信息区 */}
      <div className="md:hidden max-w-4xl mx-auto px-4 mb-6">
        {/* 时间和浏览量 */}
        <div className="flex items-center gap-4 mb-4 text-gray-600">
          <span className="text-sm">{post.date}</span>
          <span className="text-gray-400">•</span>
          <span className="text-sm">{post.views || 0} 次阅读</span>
        </div>

        {/* 分类和标签 */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-sm font-medium">
            {post.category}
          </span>
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      {/* 文章内容区 */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg mb-4">
        <div className="markdown-body">
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }} 
          />
        </div>
      </article>

      {/* 上一篇/下一篇文章导航 */}
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg">
          {prevPost ? (
            <Link 
              href={`/post/${prevPost.id}`}
              className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-1"
            >
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={prevPost.image}
                  alt={prevPost.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">上一篇</div>
                <div className="text-base font-medium text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {prevPost.title}
                </div>
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
          {nextPost ? (
            <Link 
              href={`/post/${nextPost.id}`}
              className="group flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex-1 md:justify-end"
            >
              <div className="flex-1 min-w-0 text-right">
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">下一篇</div>
                <div className="text-base font-medium text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                  {nextPost.title}
                </div>
              </div>
              <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={nextPost.image}
                  alt={nextPost.title}
                  fill
                  className="object-cover"
                />
              </div>
            </Link>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      </div>

      <FloatingButtons />
    </main>
  );
} 