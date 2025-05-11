'use client';

import ArticleCard from './ArticleCard';

export default function ArticleList({ posts, selectedCategory }) {
  const filteredPosts = selectedCategory === '全部'
    ? posts
    : posts.filter(post => post.category === selectedCategory);

  const showMore = typeof window !== 'undefined' && window.location.pathname === '/';
  const displayPosts = filteredPosts;

  return (
    <>
      <div className="masonry-list">
        {displayPosts.map(post => (
          <ArticleCard key={post.id} post={post} />
        ))}
      </div>
      {showMore && filteredPosts.length > 9 && (
        <div className="flex justify-center mt-8">
          <a
            href="/tags"
            className="group px-7 py-2 rounded-full bg-gradient-to-r from-mi-blue/80 to-mi-blue-light/80 shadow-lg border border-mi-blue/30 text-white font-semibold flex items-center gap-2 transition-all duration-200 hover:scale-105 hover:shadow-xl hover:border-mi-blue/80 backdrop-blur-lg"
            style={{
              boxShadow: '0 4px 24px 0 rgba(0,148,255,0.10), 0 1.5px 6px 0 rgba(0,0,0,0.03)'
            }}
          >
            <span className="font-semibold tracking-wide z-10">查看更多</span>
            <span className="inline-block animate-bounce-slow z-10">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </span>
          </a>
        </div>
      )}
    </>
  );
} 