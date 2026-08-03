import { useEffect, useMemo, useRef, useState } from 'react';
import { Alert, App, Flex, Result, Spin } from 'antd';
import createAjax from '@kne/axios-fetch';
import ReactBot from '@kne/react-bot';
import '@kne/react-bot/dist/index.css';
import merge from 'lodash/merge';
import createParseRagChunk from './parseRagChunk';
import ReferenceList from './ReferenceList';
import JobCard from './JobCard';
import { ReactComponent as LogoIcon } from './logo.svg';
import userAvatarImg from './user-avatar.png';
import style from './style.module.scss';

const DEFAULT_ROLES = {
  assistant: {
    name: 'Elsa',
    avatar: (
      <span className={style['role-avatar']}>
        <LogoIcon />
      </span>
    )
  },
  user: {
    name: 'User',
    avatar: userAvatarImg
  }
};

const normalizeWelcomeMessages = messages => {
  if (!Array.isArray(messages)) {
    return [];
  }
  return messages.map((item, index) => ({
    id: item.id || `welcome-${index}`,
    role: item.role || 'assistant',
    content: item.content || '',
    status: 'sent'
  }));
};

const ChatBotPanel = ({
  baseUrl,
  chatId,
  token,
  userId,
  title = 'Elsa',
  openSide = true,
  sideSizes,
  defaultSideSizes,
  markdownComponents,
  messageInputProps,
  messageListProps,
  roles,
  // strip SDK/App passthrough noise
  type: _type,
  ...reactBotProps
}) => {
  const { message } = App.useApp();
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const lastAnswerRef = useRef('');
  const referenceRef = useRef(null);
  const referenceAppendedRef = useRef(false);

  const missing = !baseUrl || !chatId || !token;

  const botAjax = useMemo(() => {
    if (missing) {
      return null;
    }
    return createAjax({
      baseUrl,
      getDefaultHeaders: () => ({
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      }),
      errorHandler: err => {
        if (err) {
          message.error(typeof err === 'string' ? err : err.message || 'Request failed');
        }
      }
    });
  }, [baseUrl, token, missing, message]);

  const parseChunk = useMemo(
    () => createParseRagChunk(lastAnswerRef, referenceRef, referenceAppendedRef),
    []
  );

  useEffect(() => {
    if (missing || !botAjax) {
      setLoading(false);
      setError(missing ? 'Missing required options: baseUrl, chatId, token' : null);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);
    setSession(null);

    (async () => {
      try {
        const { data: resData } = await botAjax({
          url: `/api/v1/chats/${chatId}/sessions`,
          method: 'POST',
          data: {
            name: '新对话',
            user_id: userId || `sdk-${Date.now()}`,
            metadata: {}
          }
        });
        if (cancelled) return;
        if (!resData || resData.code !== 0 || !resData.data) {
          throw new Error(resData?.message || resData?.msg || 'Failed to create session');
        }
        setSession(resData.data);
      } catch (e) {
        if (!cancelled) {
          setError(e?.message || 'Failed to create session');
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [botAjax, chatId, userId, missing]);

  const mergedMarkdownComponents = useMemo(
    () =>
      Object.assign(
        {},
        {
          ReferenceList,
          JobCard
        },
        markdownComponents
      ),
    [markdownComponents]
  );

  const mergedRoles = useMemo(() => merge({}, DEFAULT_ROLES, roles), [roles]);

  if (missing) {
    return (
      <div className={style['panel']}>
        <Alert
          type="error"
          showIcon
          message="ChatBot configuration required"
          description="Please pass baseUrl, chatId and token via SDK options."
        />
      </div>
    );
  }

  if (loading) {
    return (
      <Flex className={style['panel']} align="center" justify="center">
        <Spin />
      </Flex>
    );
  }

  if (error || !session) {
    return (
      <div className={style['panel']}>
        <Result status="error" title="Unable to start chat" subTitle={error || 'Session not found'} />
      </div>
    );
  }

  const sessionId = session.id;

  return (
    <div className={style['panel']}>
      <ReactBot
        {...reactBotProps}
        className={style['react-bot']}
        title={title === null ? undefined : title}
        ajax={botAjax}
        requestMode="sse"
        openSide={openSide}
        sideEmpty={null}
        sideSizes={sideSizes}
        defaultSideSizes={defaultSideSizes}
        roles={mergedRoles}
        messageListProps={messageListProps}
        markdownComponents={mergedMarkdownComponents}
        parseChunk={parseChunk}
        getRequest={({ content }) => {
          lastAnswerRef.current = '';
          referenceRef.current = null;
          referenceAppendedRef.current = false;
          const root = String(baseUrl).replace(/\/$/, '');
          return {
            // fetchSse: 用 FetchEventSource 发 POST SSE（Authorization / Content-Type 走 ajax 默认头）
            url: `${root}/api/v1/chats/${chatId}/completions`,
            method: 'POST',
            fetchSse: true,
            headers: {
              Accept: 'text/event-stream'
            },
            data: {
              session_id: sessionId,
              question: content
            }
          };
        }}
        defaultMessages={normalizeWelcomeMessages(session.messages)}
        messageInputProps={Object.assign(
          {
            showVoice: false,
            borderType: 'default',
            placeholder: '输入消息...'
          },
          messageInputProps
        )}
      />
    </div>
  );
};

const ChatBotPanelWithApp = props => (
  <App>
    <ChatBotPanel {...props} />
  </App>
);

export default ChatBotPanelWithApp;
