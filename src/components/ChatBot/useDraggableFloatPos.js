import { useEffect, useRef, useState } from 'react';

const DEFAULT_STORAGE_KEY = 'leapin-saas-sdk:chatbot-float-pos';
const DEFAULT_POS = { right: 40, bottom: 120 };
const DEFAULT_SIZE = 40;
const DEFAULT_EDGE_PAD = 8;
const DEFAULT_DRAG_THRESHOLD = 8;

const readCssDefaultPos = (cssRightVar, cssBottomVar, fallback) => {
  if (typeof window === 'undefined') {
    return { ...fallback };
  }
  const styles = window.getComputedStyle(document.documentElement);
  const right = parseFloat(styles.getPropertyValue(cssRightVar));
  const bottom = parseFloat(styles.getPropertyValue(cssBottomVar));
  return {
    right: Number.isFinite(right) ? right : fallback.right,
    bottom: Number.isFinite(bottom) ? bottom : fallback.bottom
  };
};

const getDefaultFloatPos = (bounds, options) => {
  const { size, edgePad, cssRightVar, cssBottomVar, defaultPos } = options;
  const base = readCssDefaultPos(cssRightVar, cssBottomVar, defaultPos);
  const width = bounds?.width ?? (typeof window !== 'undefined' ? window.innerWidth : 0);
  const height = bounds?.height ?? (typeof window !== 'undefined' ? window.innerHeight : 0);
  if (!(width > 0) || !(height > 0)) {
    return { ...base };
  }
  const maxRight = Math.max(edgePad, width - size - edgePad);
  const maxBottom = Math.max(edgePad, height - size - edgePad);
  return {
    right: Math.min(base.right, maxRight),
    bottom: Math.min(base.bottom, maxBottom)
  };
};

const readStoredFloatPos = storageKey => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw);
    if (parsed && Number.isFinite(parsed.right) && Number.isFinite(parsed.bottom)) {
      return { right: parsed.right, bottom: parsed.bottom };
    }
  } catch (e) {
    // ignore
  }
  return null;
};

const writeStoredFloatPos = (storageKey, pos) => {
  if (typeof window === 'undefined' || !window.localStorage || !pos) {
    return;
  }
  try {
    window.localStorage.setItem(storageKey, JSON.stringify({ right: pos.right, bottom: pos.bottom }));
  } catch (e) {
    // ignore
  }
};

const clearStoredFloatPos = storageKey => {
  if (typeof window === 'undefined' || !window.localStorage) {
    return;
  }
  try {
    window.localStorage.removeItem(storageKey);
  } catch (e) {
    // ignore
  }
};

const isFloatPosVisibleIn = (pos, width, height, size, edgePad) => {
  if (!pos || !(width > 0) || !(height > 0)) {
    return false;
  }
  const { right, bottom } = pos;
  if (!Number.isFinite(right) || !Number.isFinite(bottom)) {
    return false;
  }
  const left = width - right - size;
  const top = height - bottom - size;
  return left >= edgePad && top >= edgePad && right >= edgePad && bottom >= edgePad;
};

const isFloatElVisibleInRoot = (rootEl, floatEl, edgePad) => {
  if (!rootEl || !floatEl) {
    return false;
  }
  const rootRect = rootEl.getBoundingClientRect();
  const floatRect = floatEl.getBoundingClientRect();
  if (!(rootRect.width > 0) || !(rootRect.height > 0)) {
    return false;
  }
  if (!(floatRect.width > 0) || !(floatRect.height > 0)) {
    return false;
  }
  return (
    floatRect.left >= rootRect.left + edgePad &&
    floatRect.top >= rootRect.top + edgePad &&
    floatRect.right <= rootRect.right - edgePad &&
    floatRect.bottom <= rootRect.bottom - edgePad
  );
};

/**
 * 浮球位置：默认值 / localStorage / 可见性校验 / document 级拖动。
 *
 * 按下 → 移动态，在 document.documentElement 绑 move；
 * 松开 → 解绑，结束移动；未真正移动则触发 onTap。
 */
const useDraggableFloatPos = ({
  rootRef,
  floatRef,
  onTap,
  storageKey = DEFAULT_STORAGE_KEY,
  defaultPos = DEFAULT_POS,
  size = DEFAULT_SIZE,
  edgePad = DEFAULT_EDGE_PAD,
  dragThreshold = DEFAULT_DRAG_THRESHOLD,
  cssRightVar = '--leapin-saas-sdk-chatbot-right',
  cssBottomVar = '--leapin-saas-sdk-chatbot-bottom'
} = {}) => {
  const options = { size, edgePad, cssRightVar, cssBottomVar, defaultPos };
  const [pos, setPos] = useState(() => ({ ...defaultPos }));
  const [dragging, setDragging] = useState(false);
  const posRef = useRef(pos);
  const dragRef = useRef(null);
  const suppressClickRef = useRef(false);
  const unbindDocDragRef = useRef(() => {});
  const onTapRef = useRef(onTap);

  posRef.current = pos;
  onTapRef.current = onTap;

  const getBoundsSize = () => {
    const root = rootRef?.current;
    if (root) {
      const rect = root.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        return { width: rect.width, height: rect.height };
      }
    }
    if (typeof window === 'undefined') {
      return { width: 0, height: 0 };
    }
    return { width: window.innerWidth, height: window.innerHeight };
  };

  const resetPos = () => {
    clearStoredFloatPos(storageKey);
    const next = getDefaultFloatPos(getBoundsSize(), options);
    posRef.current = next;
    setPos(next);
  };

  const ensureVisible = () => {
    const bounds = getBoundsSize();
    if (!(bounds.width > 0) || !(bounds.height > 0)) {
      return;
    }
    const current = posRef.current;
    const posOk = isFloatPosVisibleIn(current, bounds.width, bounds.height, size, edgePad);
    const elOk = isFloatElVisibleInRoot(rootRef?.current, floatRef?.current, edgePad);
    if (posOk && elOk) {
      return;
    }
    resetPos();
  };

  useEffect(() => {
    return () => {
      unbindDocDragRef.current();
    };
  }, []);

  useEffect(() => {
    const stored = readStoredFloatPos(storageKey);
    const bounds = getBoundsSize();
    if (stored && isFloatPosVisibleIn(stored, bounds.width, bounds.height, size, edgePad)) {
      posRef.current = stored;
      setPos(stored);
    } else {
      if (stored) {
        clearStoredFloatPos(storageKey);
      }
      const next = getDefaultFloatPos(bounds, options);
      posRef.current = next;
      setPos(next);
    }

    let raf = 0;
    raf = window.requestAnimationFrame(() => {
      ensureVisible();
    });

    const onResize = () => {
      ensureVisible();
    };
    window.addEventListener('resize', onResize);

    const root = rootRef?.current;
    let observer;
    if (typeof ResizeObserver !== 'undefined' && root) {
      observer = new ResizeObserver(() => {
        ensureVisible();
      });
      observer.observe(root);
    }

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      observer?.disconnect();
    };
    // 仅挂载时初始化位置与监听
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const stopDocDrag = () => {
    const drag = dragRef.current;
    unbindDocDragRef.current();
    unbindDocDragRef.current = () => {};
    dragRef.current = null;
    setDragging(false);

    if (!drag) {
      return;
    }

    suppressClickRef.current = true;
    window.setTimeout(() => {
      suppressClickRef.current = false;
    }, 400);

    if (!drag.moved) {
      onTapRef.current && onTapRef.current();
      return;
    }

    const bounds = getBoundsSize();
    const next = posRef.current;
    if (!isFloatPosVisibleIn(next, bounds.width, bounds.height, size, edgePad) || !isFloatElVisibleInRoot(rootRef?.current, floatRef?.current, edgePad)) {
      resetPos();
      return;
    }
    writeStoredFloatPos(storageKey, next);
  };

  const onDocMove = (clientX, clientY) => {
    const drag = dragRef.current;
    if (!drag) {
      return;
    }
    const dx = clientX - drag.startX;
    const dy = clientY - drag.startY;
    if (!drag.moved && (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold)) {
      drag.moved = true;
    }
    if (!drag.moved) {
      return;
    }
    const next = {
      right: drag.originRight - dx,
      bottom: drag.originBottom - dy
    };
    posRef.current = next;
    setPos(next);
  };

  const startDocDrag = (clientX, clientY) => {
    unbindDocDragRef.current();

    dragRef.current = {
      startX: clientX,
      startY: clientY,
      originRight: posRef.current.right,
      originBottom: posRef.current.bottom,
      moved: false
    };
    setDragging(true);

    const doc = document.documentElement;

    const onMouseMove = ev => {
      onDocMove(ev.clientX, ev.clientY);
    };
    const onTouchMove = ev => {
      const touch = ev.touches[0];
      if (!touch) {
        return;
      }
      onDocMove(touch.clientX, touch.clientY);
      if (dragRef.current?.moved) {
        ev.preventDefault();
      }
    };
    const onEnd = () => {
      stopDocDrag();
    };

    doc.addEventListener('mousemove', onMouseMove);
    doc.addEventListener('mouseup', onEnd);
    doc.addEventListener('touchmove', onTouchMove, { passive: false });
    doc.addEventListener('touchend', onEnd);
    doc.addEventListener('touchcancel', onEnd);

    unbindDocDragRef.current = () => {
      doc.removeEventListener('mousemove', onMouseMove);
      doc.removeEventListener('mouseup', onEnd);
      doc.removeEventListener('touchmove', onTouchMove);
      doc.removeEventListener('touchend', onEnd);
      doc.removeEventListener('touchcancel', onEnd);
    };
  };

  const onMouseDown = e => {
    if (e.button !== 0) {
      return;
    }
    e.preventDefault();
    startDocDrag(e.clientX, e.clientY);
  };

  const onTouchStart = e => {
    const touch = e.touches[0];
    if (!touch) {
      return;
    }
    startDocDrag(touch.clientX, touch.clientY);
  };

  const onClick = e => {
    if (suppressClickRef.current) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    onTapRef.current && onTapRef.current();
  };

  return {
    pos,
    dragging,
    resetPos,
    floatHandlers: {
      onMouseDown,
      onTouchStart,
      onClick
    }
  };
};

export default useDraggableFloatPos;
export { DEFAULT_POS, DEFAULT_SIZE, DEFAULT_STORAGE_KEY };
