import React, { useRef, useEffect } from 'react';

const App: React.FC = () => {
  const listRef = useRef<HTMLDivElement>(null);
  const nextSectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const listEl = listRef.current;
    const containerEl = containerRef.current;
    if (!listEl || !containerEl) return;

    const handleScroll = (event: WheelEvent) => {
      const isAtBottom = listEl.scrollHeight - listEl.scrollTop === listEl.clientHeight;
      const isAtTop = listEl.scrollTop === 0;

      if (event.deltaY > 0 && !isAtBottom) {
        // 向下滚动且列表未到底部
        listEl.scrollTop += event.deltaY;
        event.preventDefault();  // 阻止页面滚动
      } else if (event.deltaY < 0 && !isAtTop) {
        // 向上滚动且列表未到顶部
        listEl.scrollTop += event.deltaY;
        event.preventDefault();  // 阻止页面滚动
      } else if (isAtBottom && event.deltaY > 0) {
        // 列表已滚动到底部，移动到下一个区块
        nextSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    };

    containerEl.addEventListener('wheel', handleScroll, { passive: false });
    return () => containerEl.removeEventListener('wheel', handleScroll);
  }, []);

  return (
<>
    <div ref={nextSectionRef} style={{ height: '500px', border: '1px solid blue' }}>
    Block
  </div>
    <div ref={containerRef}>
    <div  className="relative mx-auto  h-[600px] w-[500px] shadow-xl border-gray-900 transform -skew-y-12 shadow-[8px_16px]">
    <div className="w-full h-[50px] border-[4px] border-gray-900 bg-[#a580ff]"></div>
    <div className=" border-[4px] border-gray-900 border-t-0">
    <div ref={listRef}  className="overflow-y-auto w-full h-[548px] bg-white border-[#ff92cb] border-[10px]">
    <div className="border-[4px] border-gray-900 h-[528px] overflow-y-auto">
    Master's student at NTUST, CSIE. Specializing in Machine Learning & Data Science. Adept at Microservices and Kubernetes. Always keen on data-driven projects
    </div>
    </div>
    </div>
</div>
      <div ref={nextSectionRef} style={{ height: '500px', border: '1px solid blue' }}>
    
      </div>
    </div>
    </>
  );
};

export default App;
