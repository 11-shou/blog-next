'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import SearchBar from './SearchBar';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isPostPage = pathname.startsWith('/post/');
  const menuRef = useRef(null);

  // 抽取菜单数据
  const navLinks = [
    { name: '首页', href: '/' },
    { name: '标签云', href: '/tags' },
    { name: '友链', href: '/friends' },
    { name: '关于', href: '/about' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 点击外部关闭菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      (pathname === '/' && !isScrolled)
        ? 'bg-black/30 backdrop-blur-sm'
        : 'bg-white/80 backdrop-blur-lg shadow-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 flex items-center space-x-2">
            <span className={`text-xl font-bold transition-colors ${
              isScrolled ? 'bg-gradient-to-r from-mi-blue to-mi-blue-light' : 'bg-gradient-to-r from-mi-blue to-mi-blue-light'
            } bg-clip-text text-transparent`}>
              11shou blog
            </span>
          </Link>

          {/* 桌面端导航 */}
          <div className="hidden md:flex md:items-center md:flex-1 md:justify-end md:ml-8">
            {isPostPage && (
              <div className="flex-1 max-w-xl mx-8">
                <SearchBar isScrolled={isScrolled} />
              </div>
            )}

            <div className="flex items-center space-x-8">
              {navLinks.filter(link => link.href !== '/categories').map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors ${
                    pathname === link.href
                      ? (isScrolled ? 'text-mi-blue' : 'text-mi-blue')
                      : ((pathname === '/' && !isScrolled) ? 'text-white hover:text-mi-blue' : 'text-gray-600 hover:text-mi-blue')
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* 移动端菜单按钮 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-lg transition-colors text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700`}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* 移动端菜单 */}
      <div 
        ref={menuRef}
        className={`md:hidden fixed top-16 left-0 right-0 transition-all duration-300 ${
          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="bg-white border-t border-gray-200 shadow-lg">
          <div className="px-4 py-2 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === link.href ? 'bg-mi-blue/10 text-mi-blue' : 'text-gray-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
} 