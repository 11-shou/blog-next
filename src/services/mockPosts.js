const mockPosts = [
  {
    id: 1,
    title: '深入理解 React Hooks 的工作原理',
    excerpt: '探索 React Hooks 的内部实现机制，了解 useState、useEffect 等核心 Hook 的工作原理，以及如何正确使用它们来优化应用性能。',
    category: '前端开发',
    date: '2024-03-15',
    readTime: '12',
    author: '张三',
    tags: ['React', 'Hooks', 'JavaScript', '性能优化', '前端工程化'],
    image: 'https://picsum.photos/seed/post1/800/400',
    views: 1234,
    content: `
      <h2>什么是React Hooks？</h2>
      <p>React Hooks是React 16.8中引入的新特性，它让我们可以在不编写class的情况下使用state以及其他的React特性。Hooks的出现使得函数组件变得更加强大，可以处理状态、副作用等之前只能在class组件中实现的功能。</p>
      
      <h2>常用的Hooks</h2>
      <ul>
        <li>useState - 用于在函数组件中添加状态</li>
        <li>useEffect - 用于处理副作用</li>
        <li>useContext - 用于访问React上下文</li>
        <li>useReducer - 用于复杂状态管理</li>
      </ul>

      <h2>useState示例</h2>
      <pre><code>function Counter() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}</code></pre>

      <h2>useEffect示例</h2>
      <pre><code>function Example() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`You clicked \${count} times\`;
  });

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}</code></pre>
    `
  },
  {
    id: 2,
    title: 'Next.js 13 新特性详解：App Router 与 Server Components',
    excerpt: '深入探讨 Next.js 13 带来的重大更新，包括 App Router 架构、Server Components 的使用方法，以及如何利用这些新特性提升应用性能。',
    category: '前端开发',
    date: '2024-03-14',
    readTime: '15',
    author: '李四',
    tags: ['Next.js', 'React', 'Server Components', '前端框架', '性能优化', 'TypeScript'],
    image: 'https://picsum.photos/seed/post2/800/400',
    views: 2345,
    content: `
      <h2>App Router</h2>
      <p>Next.js 13引入了全新的App Router，它基于React Server Components构建，提供了更好的性能和更简单的数据获取方式。App Router使用文件系统路由，让路由配置变得更加直观。</p>

      <h2>Server Components</h2>
      <p>Server Components是React的一个新特性，它允许组件在服务器端渲染，减少客户端的JavaScript体积。Next.js 13默认使用Server Components，这大大提升了应用的性能。</p>

      <h2>示例代码</h2>
      <pre><code>// app/page.js
export default async function Page() {
  const data = await fetch('https://api.example.com/data');
  const json = await data.json();
  
  return (
    <div>
      <h1>{json.title}</h1>
      <p>{json.description}</p>
    </div>
  );
}</code></pre>
    `
  },
  {
    id: 3,
    title: 'TypeScript 高级类型实战指南',
    excerpt: '掌握 TypeScript 中的高级类型特性，包括泛型、条件类型、映射类型等，通过实际案例学习如何构建类型安全的应用程序。',
    category: '前端开发',
    date: '2024-03-13',
    readTime: '10',
    author: '王五',
    tags: ['TypeScript', '类型系统', 'JavaScript', '前端开发', '代码质量'],
    image: 'https://picsum.photos/seed/post3/800/400',
    views: 3456,
    content: `
      <h2>条件类型</h2>
      <p>条件类型是TypeScript中非常强大的特性，它允许我们根据输入类型来决定输出类型。这在处理泛型时特别有用。</p>

      <pre><code>type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false</code></pre>

      <h2>映射类型</h2>
      <p>映射类型允许我们基于现有类型创建新类型，这在处理对象类型时特别有用。</p>

      <pre><code>type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

interface Todo {
  title: string;
  completed: boolean;
}

type ReadonlyTodo = Readonly<Todo>;</code></pre>
    `
  },
  {
    id: 4,
    title: 'Docker 容器化部署最佳实践',
    excerpt: '学习 Docker 容器化部署的核心概念和最佳实践，包括镜像构建、容器编排、网络配置等，提升应用部署效率。',
    category: 'DevOps',
    date: '2024-03-12',
    readTime: '18',
    author: '赵六',
    tags: ['Docker', '容器化', 'DevOps', '部署', '微服务', '云原生'],
    image: 'https://picsum.photos/seed/post4/800/400',
    views: 4567,
    content: `
      <h2>Docker基础</h2>
      <p>Docker是一个开源的容器化平台，它允许开发者将应用及其依赖打包到一个可移植的容器中。这使得应用可以在任何支持Docker的环境中运行。</p>

      <h2>Dockerfile示例</h2>
      <pre><code>FROM node:16-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]</code></pre>

      <h2>常用命令</h2>
      <ul>
        <li>docker build - 构建镜像</li>
        <li>docker run - 运行容器</li>
        <li>docker-compose up - 启动服务</li>
        <li>docker ps - 查看运行中的容器</li>
      </ul>
    `
  },
  {
    id: 5,
    title: '微服务架构设计原则与实践',
    excerpt: '探讨微服务架构的核心设计原则，包括服务拆分、通信机制、数据一致性等，结合实际案例分享实践经验。',
    category: '架构设计',
    date: '2024-03-11',
    readTime: '20',
    author: '钱七',
    tags: ['微服务', '架构设计', '分布式系统', '云原生', 'DevOps', '高可用'],
    image: 'https://picsum.photos/seed/post5/800/400',
    views: 5678,
    content: `
      <h2>微服务架构概述</h2>
      <p>微服务架构是一种将应用程序构建为一系列小型服务的架构风格，每个服务都运行在自己的进程中，通过轻量级机制（通常是HTTP API）进行通信。</p>

      <h2>设计原则</h2>
      <ul>
        <li>单一职责原则</li>
        <li>服务自治</li>
        <li>数据隔离</li>
        <li>弹性设计</li>
        <li>可观测性</li>
      </ul>

      <h2>服务通信</h2>
      <pre><code>// 服务间通信示例
async function getOrderDetails(orderId) {
  const order = await orderService.getOrder(orderId);
  const user = await userService.getUser(order.userId);
  const products = await productService.getProducts(order.productIds);
  
  return {
    order,
    user,
    products
  };
}</code></pre>
    `
  },
  {
    id: 6,
    title: '机器学习模型部署与优化',
    excerpt: '介绍机器学习模型的部署策略和优化技巧，包括模型压缩、量化、推理加速等，提升模型在生产环境中的性能。',
    category: '人工智能',
    date: '2024-03-10',
    readTime: '16',
    author: '孙八',
    tags: ['机器学习', 'AI', '模型部署', '性能优化', '深度学习', 'TensorFlow'],
    image: 'https://picsum.photos/seed/post6/800/400',
    views: 6789,
    content: '...'
  },
  {
    id: 7,
    title: '大数据处理框架对比：Spark vs Flink',
    excerpt: '深入对比 Apache Spark 和 Apache Flink 两大流处理框架，分析它们的优缺点和适用场景，帮助选择合适的技术方案。',
    category: '数据科学',
    date: '2024-03-09',
    readTime: '14',
    author: '周九',
    tags: ['大数据', 'Spark', 'Flink', '流处理', '数据科学', '分布式计算'],
    image: 'https://picsum.photos/seed/post7/800/400',
    views: 7890,
    content: '...'
  },
  {
    id: 8,
    title: '移动端性能优化实战指南',
    excerpt: '分享移动应用性能优化的关键策略，包括启动优化、内存管理、网络优化等，提升用户体验。',
    category: '移动开发',
    date: '2024-03-08',
    readTime: '13',
    author: '吴十',
    tags: ['移动开发', '性能优化', 'Android', 'iOS', '用户体验', 'Flutter'],
    image: 'https://picsum.photos/seed/post8/800/400',
    views: 8901,
    content: '...'
  },
  {
    id: 9,
    title: '云原生安全最佳实践',
    excerpt: '探讨云原生环境下的安全挑战和解决方案，包括容器安全、服务网格安全、密钥管理等。',
    category: 'DevOps',
    date: '2024-03-07',
    readTime: '17',
    author: '郑十一',
    tags: ['云原生', '安全', 'DevOps', '容器安全', '服务网格', 'Kubernetes'],
    image: 'https://picsum.photos/seed/post9/800/400',
    views: 9012,
    content: '...'
  },
  {
    id: 10,
    title: '前端工程化实践：从构建到部署',
    excerpt: '分享前端工程化的实践经验，包括构建工具选择、自动化测试、CI/CD 流程等，提升开发效率。',
    category: '前端开发',
    date: '2024-03-06',
    readTime: '15',
    author: '王十二',
    tags: ['前端工程化', '构建工具', '自动化测试', 'CI/CD', 'Webpack', 'Vite'],
    image: 'https://picsum.photos/seed/post10/800/400',
    views: 10123,
    content: '...'
  }
];

export default mockPosts; 