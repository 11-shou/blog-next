import React from 'react';

const friends = [
  {
    name: '阮一峰的网络日志',
    url: 'https://www.ruanyifeng.com/blog/',
    avatar: 'https://www.ruanyifeng.com/images_new/logo.png',
    desc: '科技、编程、互联网、生活。'
  },
  {
    name: '张鑫旭-鑫空间-鑫生活',
    url: 'https://www.zhangxinxu.com/',
    avatar: 'https://www.zhangxinxu.com/img/logo.png',
    desc: '前端开发、CSS、JavaScript、生活随笔。'
  },
  {
    name: '小林coding',
    url: 'https://xiaolincoding.com/',
    avatar: 'https://xiaolincoding.com/logo.png',
    desc: '图解计算机基础、后端、前端、面试。'
  },
  {
    name: '掘金',
    url: 'https://juejin.cn/',
    avatar: 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b6c1b6c2b6c1b6c2b6c1b6c2b6c1b6c~tplv-k3u1fbpfcp-watermark.image',
    desc: '开发者成长社区。'
  },
  {
    name: '知乎',
    url: 'https://www.zhihu.com/',
    avatar: 'https://static.zhihu.com/heifetz/favicon.ico',
    desc: '有问题，上知乎。'
  },
];

export default function FriendsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50/60 via-white/80 to-white dark:from-gray-900 dark:via-gray-900/80 dark:to-gray-900 pt-20 pb-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2 tracking-tight">友链</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">欢迎交换友链，互相学习，共同进步！</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-2">
          {friends.map(friend => (
            <a
              key={friend.url}
              href={friend.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 bg-white/90 dark:bg-gray-800/90 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 hover:shadow-2xl hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-200 relative overflow-hidden"
              style={{boxShadow: '0 4px 24px 0 rgba(59,130,246,0.04), 0 1.5px 6px 0 rgba(0,0,0,0.03)'}}
            >
              <span className="inline-block bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 p-1 rounded-full shadow-md">
                <img
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-white dark:border-gray-900 bg-white"
                  loading="lazy"
                />
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-lg text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {friend.name}
                </div>
                <div className="text-gray-500 dark:text-gray-400 text-sm truncate mb-1">
                  {friend.desc}
                </div>
                <div className="text-blue-500 dark:text-blue-400 text-xs truncate opacity-80 group-hover:opacity-100 transition-opacity">
                  {friend.url}
                </div>
              </div>
              <span className="absolute right-0 top-0 w-2 h-2 bg-gradient-to-tr from-blue-400 via-purple-400 to-pink-400 rounded-bl-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
            </a>
          ))}
        </div>
        <div className="mt-10 text-center text-sm text-gray-400 dark:text-gray-600">
          想要交换友链？请联系站长，或在 <span className="text-blue-500">README</span> 留言。
        </div>
      </div>
    </main>
  );
} 