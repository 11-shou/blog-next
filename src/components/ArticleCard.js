'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function ArticleCard({ post }) {
  return (
    <Link
      href={`/post/${post.id}`}
      className="block group"
    >
      <article className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-48">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="px-3 py-1 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">{post.readTime}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
          <p className="text-gray-600 mb-4">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{post.author}</span>
              <span className="text-gray-300">•</span>
              <span className="text-sm text-gray-500">{post.date}</span>
            </div>
            <div className="flex gap-2">
              {post.tags.slice(0, 2).map(tag => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
} 