import { createWithRemoteLoader } from '@kne/remote-loader';
import { Flex } from 'antd';
import get from 'lodash/get';
import { MobileOutlined, MailOutlined } from '@ant-design/icons';
import { useIntl } from '@kne/react-intl';
import style from '../style.module.scss';
import { App, Alert } from 'antd';
import { ReactComponent as DownloadIcon } from './download.svg';
import { ReactComponent as ShareIcon } from './share.svg';

const Header = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset', 'components-core:Image', 'components-core:InfoPage@SplitLine', 'components-core:LoadingButton', 'components-core:Modal@useModal', 'components-core:File@downloadBlobFile']
})(({ remoteModules, data, title, exportDisabled, apis, shareLink }) => {
  const [usePreset, Image, SplitLine, LoadingButton, useModal, downloadBlobFile] = remoteModules;
  const { formatMessage } = useIntl();
  const { ajax } = usePreset();
  const modal = useModal();
  const { message } = App.useApp();
  const userName = get(data, 'user.name', '');
  return (
    <Flex vertical>
      <Flex justify="space-between" align="center" className={style['top-info']}>
        <div>{title}</div>
        <Flex gap={12} className="header-options">
          <LoadingButton
            size="small"
            icon={<DownloadIcon />}
            type="link"
            onClick={async () => {
              let link;
              if (!shareLink) {
                const { data: resData } = await ajax(Object.assign({}, apis.getShareLink));

                if (resData.code !== 0) {
                  return;
                }
                link = resData.data;
              } else {
                link = shareLink;
              }

              const { data } = await ajax(
                Object.assign({}, apis.downloadReport, {
                  data: {
                    url: link,
                    options: {
                      waitForSelectors: ['#inventoryReportPrintTarget'],
                      waitForMaxTime: 60000,
                      waitForVisible: true,
                      margin: {
                        top: '6mm',
                        right: '6mm',
                        bottom: '6mm',
                        left: '6mm'
                      },
                      printBackground: true,
                      displayHeaderFooter: false
                    }
                  }
                })
              );

              downloadBlobFile(data, `Report-${userName || 'unknown'}.pdf`);
            }}
          />
          {!exportDisabled && (
            <LoadingButton
              size="small"
              icon={<ShareIcon />}
              type="link"
              onClick={async () => {
                const { data } = await ajax(Object.assign({}, apis.getShareLink));

                if (data.code !== 0) {
                  return;
                }
                modal({
                  title: formatMessage({ id: 'copyShareLinkTitle' }),
                  size: 'small',
                  footer: null,
                  children: (
                    <Flex vertical gap={60}>
                      <Alert
                        message={
                          <Flex style={{ minHeight: '100px' }} align="center">
                            {data.data}
                          </Flex>
                        }
                      />
                      <Flex justify="center" gap={12}>
                        <LoadingButton
                          type="primary"
                          onClick={async () => {
                            await navigator.clipboard.writeText(data.data);
                            message.success(formatMessage({ id: 'copyShareLinkSuccess' }));
                          }}
                        >
                          {formatMessage({ id: 'copy' })}
                        </LoadingButton>
                      </Flex>
                    </Flex>
                  )
                });
              }}
            />
          )}
        </Flex>
      </Flex>
      <Flex gap={20} className={style['header-info']}>
        <Image.Avatar className={style['header-avatar']} src={get(data, 'user.avatar')} size={64} />
        <Flex vertical gap={12}>
          <div className={style['header-name']}>{get(data, 'user.name', '')}</div>
          <SplitLine
            dataSource={get(data, 'user', {})}
            columns={[
              {
                name: 'position'
              },
              {
                icon: <MobileOutlined />,
                name: 'mobile'
              },
              {
                icon: <MailOutlined />,
                name: 'email'
              }
            ]}
          />
          <SplitLine
            className={style['split-line']}
            labelMode="vertical"
            dataSource={get(data, 'user', {})}
            columns={[
              {
                name: 'department',
                title: formatMessage({ id: 'department' }),
                getValueOf: item => get(item, 'departments[0]')
              },
              {
                name: 'job_year',
                title: formatMessage({ id: 'workingYears' }),
                render: item => formatMessage({ id: 'yearUnit' }, { value: item })
              },
              {
                name: 'year_in_company',
                title: formatMessage({ id: 'yearOfEmployment' }),
                render: item => formatMessage({ id: 'yearUnit' }, { value: item })
              },
              {
                name: 'superior',
                title: formatMessage({ id: 'reportTo' })
              }
            ]}
          />
        </Flex>
      </Flex>
    </Flex>
  );
});

export default Header;
