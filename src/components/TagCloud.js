import React, { useRef, useEffect } from 'react';
import '@/style/tagcloud.css';

function AutoScrollRow({ tags, selectedTag, onTagSelect, rowIdx }) {
  const rowRef = useRef(null);
  // 让每一行的滚动速率为随机值（1~2.5之间，保留两位小数）
  const scrollSpeed = React.useMemo(() => (Math.random() * 1.5 + 1).toFixed(2) * 1, []);

  useEffect(() => {
    const container = rowRef.current;
    if (!container) return;
    let interval;
    let isHover = false;
    const onMouseEnter = () => { isHover = true; };
    const onMouseLeave = () => { isHover = false; };
    container.addEventListener('mouseenter', onMouseEnter);
    container.addEventListener('mouseleave', onMouseLeave);

    setTimeout(() => {
      const content = container.querySelector('.tagcloud-row.original');
      if (!content) return;
      const contentWidth = content.scrollWidth;
      if (contentWidth > container.clientWidth) {
        interval = setInterval(() => {
          if (!isHover) {
            if (container.scrollLeft >= contentWidth) {
              container.scrollLeft = 0;
            } else {
              container.scrollLeft += scrollSpeed;
            }
          }
        }, 16);
      }
    }, 100);

    return () => {
      clearInterval(interval);
      container.removeEventListener('mouseenter', onMouseEnter);
      container.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [tags, scrollSpeed]);

  return (
    <div className="tagcloud-row-scroll" ref={rowRef}>
      <div className="tagcloud-row original">
        {tags.map((tag, idx) => (
          <div
            key={tag.name}
            className={`tagcloud-tag${selectedTag === tag.name ? ' selected' : ''}${idx === 0 ? ' tagcloud-tag-first' : ''}`}
            onClick={() => onTagSelect(tag.name)}
            title={`${tag.name} (${tag.count} 篇文章)`}
          >
            <span className="tagcloud-text">{tag.name}</span>
            <span className="tagcloud-count">{tag.count}</span>
          </div>
        ))}
      </div>
      <div className="tagcloud-row clone">
        {tags.map((tag, idx) => (
          <div
            key={tag.name + '-clone'}
            className={`tagcloud-tag${selectedTag === tag.name ? ' selected' : ''}${idx === 0 ? ' tagcloud-tag-first' : ''}`}
            onClick={() => onTagSelect(tag.name)}
            title={`${tag.name} (${tag.count} 篇文章)`}
          >
            <span className="tagcloud-text">{tag.name}</span>
            <span className="tagcloud-count">{tag.count}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TagCloud({ tags, onTagSelect, selectedTag }) {
  // 依次分配到三行（先每行第一个，再每行第二个...）
  const rows = [[], [], []];
  tags.forEach((tag, idx) => {
    rows[idx % 3].push(tag);
  });
  // 重新分组，保证分配顺序为：第一行第一个、第二行第一个、第三行第一个、第一行第二个...
  const maxLen = Math.ceil(tags.length / 3);
  const newRows = [[], [], []];
  for (let i = 0; i < maxLen; i++) {
    for (let j = 0; j < 3; j++) {
      const tag = rows[j][i];
      if (tag) newRows[j].push(tag);
    }
  }

  return (
    <div className="tagcloud-scroll-container">
      <div className="tagcloud-rows">
        {newRows.map((row, rowIdx) => (
          <AutoScrollRow
            key={rowIdx}
            tags={row}
            selectedTag={selectedTag}
            onTagSelect={onTagSelect}
            rowIdx={rowIdx}
          />
        ))}
      </div>
    </div>
  );
} 