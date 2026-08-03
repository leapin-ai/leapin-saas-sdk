import { Card, Typography, Space } from 'antd';

const { Text, Paragraph, Link } = Typography;

const ReferenceList = ({ title = 'References', items = [] }) => {
  const list = Array.isArray(items) ? items.filter(Boolean) : [];
  if (list.length === 0) {
    return null;
  }
  return (
    <Card size="small" title={title}>
      <Space direction="vertical" size={12} style={{ width: '100%' }}>
        {list.map(item => (
          <div key={item.key || item.title}>
            {item.url ? (
              <Link href={item.url} target="_blank" rel="noreferrer">
                {item.title}
              </Link>
            ) : (
              <Text strong>{item.title}</Text>
            )}
            {item.snippet ? (
              <Paragraph type="secondary" style={{ marginBottom: 0 }} ellipsis={{ rows: 3 }}>
                {item.snippet}
              </Paragraph>
            ) : null}
          </div>
        ))}
      </Space>
    </Card>
  );
};

export default ReferenceList;
