import RemoteModule from '@kne/remote-loader';
import RecruitmentChannel from '@components/RecruitmentChannel';
import InventoryReport from '@components/InventoryReport';
import { Empty, ConfigProvider } from 'antd';
import { useRef } from 'react';
import './index.scss';

const typeMapping = { RecruitmentChannel, InventoryReport };

const App = ({ globalPreset, themeToken, options }) => {
  const { type, ...props } = Object.assign({}, options);
  const ref = useRef(null);
  const Component = typeMapping[type];
  if (!Component) {
    return <Empty description="Type不支持" />;
  }
  return (
    <RemoteModule module="components-core:Global@PureGlobal" preset={globalPreset} themeToken={themeToken}>
      <div ref={ref}>
        <ConfigProvider getPopupContainer={() => ref.current}>
          <Component {...props} />
        </ConfigProvider>
      </div>
    </RemoteModule>
  );
};

export default App;
