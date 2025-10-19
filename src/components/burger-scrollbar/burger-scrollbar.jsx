import { useRef, useEffect, useState } from 'react';

import styles from './burger-scrollbar.module.css';

export const BurgerScrollbar = ({
  children,
  width = 8,
  thumbColor = '#8585ad',
  top = 0,
  bottom = 0,
  className = '',
  debug = false,
}) => {
  const containerRef = useRef();
  const contentRef = useRef();
  const isDraggingRef = useRef(false);
  const [thumb, setThumb] = useState({ height: 0, top: 0, visible: false });

  useEffect(() => {
    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    const updateThumbPosition = () => {
      const containerH = container.clientHeight - top - bottom;
      const contentH = content.scrollHeight;
      const scrollTop = container.scrollTop;

      if (contentH > containerH) {
        const thumbHeight = Math.max((containerH / contentH) * containerH * 2, 20);
        const scrollableHeight = contentH - containerH;

        const scrollRatio =
          scrollableHeight > 0 ? Math.min(scrollTop / scrollableHeight, 1) : 0;

        const trackHeight = containerH - thumbHeight + width * 2;
        const thumbTop = scrollRatio * trackHeight;

        setThumb({
          height: thumbHeight,
          top: thumbTop,
          visible: true,
        });
      } else {
        setThumb((prev) => ({ ...prev, visible: false }));
      }
    };

    container.addEventListener('scroll', updateThumbPosition, { passive: true });

    const resizeObserver = new ResizeObserver(updateThumbPosition);
    resizeObserver.observe(container);
    resizeObserver.observe(content);

    const mutationObserver = new MutationObserver(updateThumbPosition);
    mutationObserver.observe(content, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    updateThumbPosition();

    return () => {
      container.removeEventListener('scroll', updateThumbPosition);
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [top, bottom]);

  const handleThumbMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const container = containerRef.current;
    const content = contentRef.current;
    if (!container || !content) return;

    isDraggingRef.current = true;

    const startY = e.clientY;
    const startThumbTop = thumb.top;
    const containerH = container.clientHeight - top - bottom;
    const contentH = content.scrollHeight;
    const scrollableHeight = contentH - containerH;
    const thumbHeight = thumb.height;
    const trackHeight = containerH - thumbHeight;

    const handleMouseMove = (e) => {
      if (!isDraggingRef.current) return;

      const deltaY = e.clientY - startY;
      const newThumbTop = Math.max(0, Math.min(startThumbTop + deltaY, trackHeight));

      const scrollRatio = Math.min(newThumbTop / trackHeight, 1);
      const newScrollTop = scrollRatio * scrollableHeight;

      container.scrollTop = newScrollTop;
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const thumbStyle = {
    top: `${thumb.top}px`,
    height: `${thumb.height}px`,
    background: thumbColor,
    borderRadius: `${0}px`,
    width: `${width}px`,
    ...(debug && {
      background: 'red',
      boxShadow: '0 0 0 1px yellow',
    }),
  };

  const trackStyle = {
    top: `${top}px`,
    bottom: `${bottom}px`,
    width: `${width}px`,
    ...(debug && {
      background: 'rgba(0,255,0,0.3)',
      border: '1px dashed blue',
    }),
  };

  return (
    <div className={`${styles.wrapper} ${className}`} style={{ position: 'relative' }}>
      <div ref={containerRef} className={styles.container}>
        <div ref={contentRef} className={styles.content}>
          {children}
        </div>
      </div>

      {thumb.visible && (
        <div className={styles.track} style={trackStyle}>
          <div
            className={styles.thumb}
            style={thumbStyle}
            onMouseDown={handleThumbMouseDown}
          />
          {debug && (
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '-100px',
                background: 'white',
                padding: '2px',
                fontSize: '10px',
                whiteSpace: 'nowrap',
                zIndex: 1000,
              }}
            ></div>
          )}
        </div>
      )}
    </div>
  );
};
