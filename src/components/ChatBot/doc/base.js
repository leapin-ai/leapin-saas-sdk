const { default: ChatBot } = _ChatBot;

const BaseExample = () => {
  return (
    <div
      className="chatbot-example-stage"
      style={{
        position: 'relative',
        boxSizing: 'border-box',
        width: '100%',
        minHeight: 560,
        height: 'var(--kne-viewport-height, 560px)'
      }}
    >
      <ChatBot
        baseUrl="https://rag-chatbot.staging.leapin-ai.com"
        chatId="a878ad04-04d3-4411-9074-67c389aea590"
        token="sk-bot_KxkVHmXCBFiBpr9qRQ-tfh3vZ6yg6_QWgFAXYeIjc94"
        tips
        title="Elsa"
        openSide
      />
    </div>
  );
};

render(<BaseExample />);
