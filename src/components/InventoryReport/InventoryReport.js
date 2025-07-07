import style from './style.module.scss';
import { createWithRemoteLoader } from '@kne/remote-loader';
import { Empty, Tabs } from 'antd';
import Fetch from '@kne/react-fetch';
import enUS from './locale/en-US';
import zhCN from './locale/zh-CN';
import { useIntl, createIntlProvider } from '@kne/react-intl';
import Report from './Report';
import IntlProvider from './IntlProvider';

const InventoryReport = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset']
})(({ remoteModules, id, detailId }) => {
  const [usePreset] = remoteModules;
  const { apis } = usePreset();
  return (
    <IntlProvider>
      <Fetch
        {...Object.assign({}, apis.inventory.userList, {
          urlParams: { id }
        })}
        render={({ data }) => {
          if (!(data.user_application_form_inventory && data.user_application_form_inventory.length > 0)) {
            return <Empty />;
          }

          return (
            <Tabs
              defaultActiveKey={detailId}
              className={style['report']}
              tabPosition="left"
              items={data.user_application_form_inventory.map(item => {
                return {
                  label: <div className={style['user-name']}>{item.user_name}</div>,
                  key: item.id,
                  children: (
                    <Report
                      title={item.name}
                      apis={{
                        getShareLink: Object.assign({}, apis.inventory.getShareLink, {
                          urlParams: { id: item.id }
                        }),
                        detail: Object.assign({}, apis.inventory.detail, {
                          urlParams: { id: item.id }
                        }),
                        answer: Object.assign({}, apis.inventory.answer, {
                          urlParams: { id: item.id }
                        }),
                        downloadReport: apis.inventory.downloadReport
                      }}
                    />
                  )
                };
              })}
            />
          );
        }}
      />
    </IntlProvider>
  );
});

export default InventoryReport;
