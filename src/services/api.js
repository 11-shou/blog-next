// 模拟 API 请求延迟
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// 模拟文章数据
const mockPosts = [
  {
    id: 1,
    title: 'Next.js 13 新特性详解',
    excerpt: 'Next.js 13 带来了许多激动人心的新特性，包括 App Router、Server Components 等。本文将详细介绍这些新特性及其使用方法...',
    date: '2024-03-20',
    category: '前端开发',
    coverImage: 'https://picsum.photos/800/400',
    readingTime: '10',
    content: `
      <h2>引言</h2>
      <p>Next.js 13 带来了许多激动人心的新特性，这些特性不仅提升了开发体验，还带来了更好的性能优化。本文将详细介绍这些新特性及其使用方法。</p>
      <img src="https://nextjs.org/static/twitter-cards/home.jpg" alt="Next.js 13" style="width:100%;border-radius:8px;" />
      <h2>App Router</h2>
      <pre><code>import { useRouter } from 'next/router';
const router = useRouter();
router.push('/about');
</code></pre>
      <h2>总结</h2>
      <p>Next.js 13 的新特性大大提升了开发效率和用户体验，建议开发者及时升级并尝试这些新特性。</p>
    `
  },
  {
    id: 2,
    title: 'React 性能优化实战指南',
    excerpt: '本文将分享一些 React 应用性能优化的实用技巧，包括组件优化、状态管理、代码分割等多个方面...',
    date: '2024-03-21',
    category: '性能优化',
    coverImage: 'https://picsum.photos/800/401',
    readingTime: '15',
    content: `
      <h2>组件优化</h2>
      <ul>
        <li>使用 React.memo 避免不必要的重渲染</li>
        <li>合理使用 useMemo 和 useCallback</li>
      </ul>
      <pre><code>const MemoComp = React.memo(MyComponent);
</code></pre>
      <img src="https://reactjs.org/logo-og.png" alt="React Logo" style="width:60%;margin:16px auto;display:block;" />
      <h2>代码分割</h2>
      <pre><code>const LazyComponent = React.lazy(() => import('./LazyComponent'));
</code></pre>
    `
  },
  {
    id: 3,
    title: 'TypeScript 高级类型实战',
    excerpt: '深入探讨 TypeScript 的高级类型系统，包括条件类型、映射类型、工具类型等，并通过实际案例展示其应用...',
    date: '2024-03-22',
    category: 'TypeScript',
    coverImage: 'https://picsum.photos/800/402',
    readingTime: '12',
    content: `
      <h2>条件类型</h2>
      <pre><code>type IsString<T> = T extends string ? true : false;
</code></pre>
      <h2>映射类型</h2>
      <pre><code>type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};
</code></pre>
      <img src="https://www.typescriptlang.org/assets/images/branding/logo-hex-blue.svg" alt="TypeScript Logo" style="width:80px;margin:16px auto;display:block;" />
    `
  },
  {
    id: 4,
    title: '现代 CSS 技巧与最佳实践',
    excerpt: '探索现代 CSS 的新特性和最佳实践，包括 Grid 布局、Flexbox、CSS 变量、容器查询等...',
    date: '2024-03-23',
    category: 'CSS',
    coverImage: 'https://picsum.photos/800/403',
    readingTime: '8',
    content: `
      <h2>Grid 布局</h2>
      <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
</code></pre>
      <img src="https://css-tricks.com/wp-content/uploads/2018/11/css-grid.png" alt="CSS Grid" style="width:100%;border-radius:8px;" />
      <h2>CSS 变量</h2>
      <pre><code>:root {
  --primary: #3B82F6;
}
</code></pre>
    `
  },
  {
    id: 5,
    title: '前端工程化实践总结',
    excerpt: '分享前端工程化的实践经验，包括构建工具选择、自动化测试、CI/CD 流程、代码规范等...',
    date: '2024-03-24',
    category: '工程化',
    coverImage: 'https://picsum.photos/800/404',
    readingTime: '20',
    content: `
      <h2>自动化测试</h2>
      <pre><code>describe('sum', () => {
  it('should add numbers', () => {
    expect(sum(1, 2)).toBe(3);
  });
});
</code></pre>
      <img src="https://testing-library.com/img/octopus-128x128.png" alt="Testing" style="width:64px;margin:16px auto;display:block;" />
      <h2>CI/CD 流程</h2>
      <pre><code>jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Install
        run: npm install
      - name: Build
        run: npm run build
</code></pre>
    `
  },
  {
    id: 6,
    title: '微前端架构设计与实践',
    excerpt: '探讨微前端架构的设计原则、技术选型、实现方案，以及在实际项目中的应用经验...',
    date: '2024-03-25',
    category: '架构设计',
    coverImage: 'https://picsum.photos/800/405',
    readingTime: '18',
    content: `
      <h2>微前端架构</h2>
      <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*QF1pQnQw1kQw1QnQw1QnQw.png" alt="Micro Frontends" style="width:100%;border-radius:8px;" />
      <h2>技术选型</h2>
      <ul>
        <li>Single-SPA</li>
        <li>Module Federation</li>
      </ul>
      <pre><code>import { registerApplication, start } from 'single-spa';
registerApplication(...);
start();
</code></pre>
    `
  },
  {
    id: 7,
    title: 'Vue3 组合式 API 实战',
    excerpt: '深入体验 Vue3 组合式 API，包含响应式、生命周期、watch、computed 等核心用法...',
    date: '2024-03-26',
    category: 'Vue',
    coverImage: 'https://picsum.photos/800/406',
    readingTime: '14',
    content: `
      <h2>响应式原理</h2>
      <pre><code>import { reactive, watch } from 'vue';
const state = reactive({ count: 0 });
watch(() => state.count, val => console.log(val));
</code></pre>
      <img src="https://vuejs.org/images/logo.png" alt="Vue Logo" style="width:80px;margin:16px auto;display:block;" />
      <h2>生命周期</h2>
      <ul>
        <li>onMounted</li>
        <li>onUnmounted</li>
      </ul>
    `
  },
  {
    id: 8,
    title: 'Node.js 文件系统操作指南',
    excerpt: '掌握 Node.js 的 fs 模块，进行文件读写、目录遍历、流式处理等常见操作...',
    date: '2024-03-27',
    category: 'Node.js',
    coverImage: 'https://picsum.photos/800/407',
    readingTime: '11',
    content: `
      <h2>文件读写</h2>
      <pre><code>const fs = require('fs');
fs.readFile('input.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});
</code></pre>
      <img src="https://nodejs.org/static/images/logo.svg" alt="Node.js Logo" style="width:80px;margin:16px auto;display:block;" />
      <h2>目录遍历</h2>
      <pre><code>fs.readdir('.', (err, files) => {
  if (err) throw err;
  console.log(files);
});
</code></pre>
    `
  },
  {
    id: 9,
    title: 'Python 数据分析入门',
    excerpt: '用 Pandas、Matplotlib 快速上手数据分析，包含数据清洗、可视化、统计分析等...',
    date: '2024-03-28',
    category: 'Python',
    coverImage: 'https://picsum.photos/800/408',
    readingTime: '16',
    content: `
      <h2>Pandas 数据处理</h2>
      <pre><code>import pandas as pd
df = pd.read_csv('data.csv')
print(df.head())
</code></pre>
      <img src="https://pandas.pydata.org/static/img/pandas_mark.svg" alt="Pandas Logo" style="width:80px;margin:16px auto;display:block;" />
      <h2>数据可视化</h2>
      <pre><code>import matplotlib.pyplot as plt
df['value'].plot(kind='bar')
plt.show()
</code></pre>
    `
  },
  {
    id: 10,
    title: '算法面试题精选',
    excerpt: '精选常见算法面试题，包括二分查找、排序、链表操作等，附详细代码解析...',
    date: '2024-03-29',
    category: '算法',
    coverImage: 'https://picsum.photos/800/409',
    readingTime: '13',
    content: `
      <h2>二分查找</h2>
      <pre><code>function binarySearch(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}
</code></pre>
      <img src="https://static.leetcode.cn/cn-mono-assets/production/assets/logo-dark-2b5e3b5b.svg" alt="LeetCode Logo" style="width:80px;margin:16px auto;display:block;" />
      <h2>链表反转</h2>
      <pre><code>function reverseList(head) {
  let prev = null, curr = head;
  while (curr) {
    const next = curr.next;
    curr.next = prev;
    prev = curr;
    curr = next;
  }
  return prev;
}
</code></pre>
    `
  }
];

export const getPosts = async (category = '') => {
  // 模拟 API 请求延迟
  await delay(500);
  
  if (category) {
    return mockPosts.filter(post => post.category === category);
  }
  
  return mockPosts;
};

export const getPostById = async (id) => {
  await delay(300);
  const post = mockPosts.find(post => post.id === parseInt(id));
  
  if (!post) {
    throw new Error('文章不存在');
  }
  
  return post;
};

// 获取每日一句
export async function getDailyQuote() {
  try {
    const response = await fetch('/api/quote');
    if (!response.ok) {
      throw new Error('Failed to fetch quote');
    }
    const data = await response.json();
    return {
      content: data.hitokoto,
      author: data.creator || data.from
    };
  } catch (error) {
    console.error('Error fetching quote:', error);
    return {
      content: '生活不止眼前的苟且，还有诗和远方的田野。',
      author: '高晓松'
    };
  }
}

// 获取每日图片
export async function getDailyImage() {
  try {
    const response = await fetch('https://api.vvhan.com/api/bing?type=json');
    if (!response.ok) {
      throw new Error('Failed to fetch image');
    }
    const data = await response.json();
    return {
      url: data.data.url,
      authorUrl: data.data.title
    };
  } catch (error) {
    console.error('Error fetching image:', error);
    return {
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80',
      authorUrl: 'https://unsplash.com'
    };
  }
} 