import { useRef, useState } from 'react';
import { createWithRemoteLoader } from '@kne/remote-loader';
import ChatBotPanel from './ChatBotPanel';
import ChatBotFloat from './ChatBotFloat';
import style from './style.module.scss';

const ChatBot = createWithRemoteLoader({
  modules: ['components-core:Modal@useModal']
})(({ remoteModules, tips, tipsContent = 'Chat here!', onVisibleChange, title = 'Elsa', ...panelProps }) => {
  const [useModal] = remoteModules;
  const modal = useModal();
  const [tipsOpen, setTipsOpen] = useState(Boolean(tips));
  const rootRef = useRef(null);

  const openChat = () => {
    setTipsOpen(false);
    onVisibleChange?.(true);
    const modalApi = modal({
      title,
      footer: null,
      noPadding: true,
      children: <ChatBotPanel {...panelProps} title={null} />,
      onClose: () => {
        onVisibleChange?.(false);
        modalApi.close();
      }
    });
  };

  return (
    <div className={style['root']} ref={rootRef}>
      <ChatBotFloat rootRef={rootRef} onTap={openChat} tips={tips} tipsContent={tipsContent} tipsOpen={tipsOpen} onTipsClose={() => setTipsOpen(false)} />
    </div>
  );
});

export default ChatBot;
