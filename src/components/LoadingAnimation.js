'use client';

export default function LoadingAnimation() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="text-center">
        <div className="inline-block animate-bounce text-4xl font-bold text-blue-600 mb-4">
          11shou
        </div>
        <div className="text-gray-600">加载中...</div>
      </div>
    </div>
  );
} 