'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Github, Twitter, Mail, Code2, BookOpen, MessageSquare, Heart, Award } from 'lucide-react';

export default function AboutPage() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // 检测系统暗色模式
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 技能数据
  const skills = [
    { name: '前端开发', level: 90, color: 'bg-blue-500' },
    { name: '后端开发', level: 85, color: 'bg-green-500' },
    { name: '数据库', level: 80, color: 'bg-purple-500' },
    { name: 'DevOps', level: 75, color: 'bg-yellow-500' },
    { name: 'UI/UX设计', level: 70, color: 'bg-pink-500' }
  ];

  // 时间线数据
  const timeline = [
    {
      year: '2024',
      title: '开始个人博客之旅',
      description: '创建技术博客，分享开发经验和心得'
    },
    {
      year: '2023',
      title: '全栈开发工程师',
      description: '专注于Web应用开发，掌握前后端技术栈'
    },
    {
      year: '2022',
      title: '开源项目贡献',
      description: '参与多个开源项目，贡献代码和文档'
    },
    {
      year: '2021',
      title: '技术社区活跃',
      description: '在技术社区分享经验，帮助他人解决问题'
    }
  ];

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20 pb-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 页面标题 */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            关于我
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            热爱技术，热爱分享
          </p>
        </div>

        {/* 作者信息卡片 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* 头像 */}
              <div className="relative w-32 h-32 rounded-full overflow-hidden">
                <Image
                  src="/avatar.jpg"
                  alt="作者头像"
                  fill
                  className="object-cover"
                />
              </div>

              {/* 个人信息 */}
              <div className="flex-1 text-center md:text-left">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  11shou
                </h2>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  全栈开发工程师 / 技术博主
                </p>
                <div className="flex justify-center md:justify-start gap-4">
                  <a
                    href="https://github.com/11shou"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                  <a
                    href="https://twitter.com/11shou"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Twitter className="w-6 h-6" />
                  </a>
                  <a
                    href="mailto:contact@11shou.com"
                    className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <Mail className="w-6 h-6" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 技能展示 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              技术技能
            </h3>
            <div className="space-y-6">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-700 dark:text-gray-300">{skill.name}</span>
                    <span className="text-gray-500 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${skill.color} rounded-full transition-all duration-500`}
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 时间线 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              发展历程
            </h3>
            <div className="space-y-8">
              {timeline.map((item, index) => (
                <div key={item.year} className="relative pl-8">
                  {/* 时间线连接线 */}
                  {index !== timeline.length - 1 && (
                    <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700" />
                  )}
                  {/* 时间点 */}
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  <div>
                    <div className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
                      {item.year}
                    </div>
                    <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 博客介绍 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-12">
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              关于博客
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-start gap-4">
                <Code2 className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    技术分享
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    分享Web开发、前端技术、后端架构等实用技术文章
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <BookOpen className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    学习笔记
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    记录学习过程中的心得体会和技术要点
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MessageSquare className="w-6 h-6 text-purple-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    技术交流
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    与读者互动，解答技术问题，共同进步
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Heart className="w-6 h-6 text-pink-500 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                    开源贡献
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    分享开源项目经验，促进技术社区发展
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 联系方式 */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden">
          <div className="p-8">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              联系我
            </h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Mail className="w-6 h-6 text-gray-400" />
                <a
                  href="mailto:contact@11shou.com"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  contact@11shou.com
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Github className="w-6 h-6 text-gray-400" />
                <a
                  href="https://github.com/11shou"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  github.com/11shou
                </a>
              </div>
              <div className="flex items-center gap-4">
                <Twitter className="w-6 h-6 text-gray-400" />
                <a
                  href="https://twitter.com/11shou"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  @11shou
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 