import { useRef } from 'react';
import { FloatButton } from 'antd';
import classnames from 'classnames';
import { ReactComponent as LogoIcon } from './logo.svg';
import useDraggableFloatPos, { DEFAULT_SIZE } from './useDraggableFloatPos';
import style from './style.module.scss';

/**
 * 可拖动浮球 + 可选 tips。
 * 位置持久化与 document 级拖动见 useDraggableFloatPos。
 */
const ChatBotFloat = ({ rootRef, onTap, tips, tipsContent = 'Chat here!', tipsOpen, onTipsClose }) => {
  const floatRef = useRef(null);
  const { pos, dragging, floatHandlers } = useDraggableFloatPos({
    rootRef,
    floatRef,
    onTap
  });

  return (
    <>
      <div
        ref={floatRef}
        className={classnames(style['float-wrap'], { [style['is-dragging']]: dragging })}
        style={{ right: pos.right, bottom: pos.bottom }}
        {...floatHandlers}
      >
        <FloatButton
          className={classnames(style['float-button'], 'ant-float-btn-pure')}
          type="primary"
          style={{
            position: 'relative',
            inset: 'auto',
            insetInlineEnd: 'auto',
            bottom: 'auto',
            right: 'auto',
            zIndex: 'auto'
          }}
          icon={
            <LogoIcon
              style={{
                width: `${DEFAULT_SIZE}px`,
                background: '#FFFFFF',
                height: `${DEFAULT_SIZE}px`,
                position: 'absolute',
                left: '0px',
                top: '0px'
              }}
            />
          }
        />
      </div>
      {tips && tipsOpen ? (
        <div
          className={style['tips']}
          style={{
            right: pos.right + 56,
            bottom: pos.bottom + 4
          }}
          onClick={onTipsClose}
        >
          {tipsContent}
        </div>
      ) : null}
    </>
  );
};

export default ChatBotFloat;
