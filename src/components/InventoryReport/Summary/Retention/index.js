import { createWithRemoteLoader } from '@kne/remote-loader';
import style from './style.module.scss';
import classnames from 'classnames';
import { Progress, Flex, Typography } from 'antd';
import { useIntl } from '@kne/react-intl';

const Retention = createWithRemoteLoader({
  modules: ['components-core:InfoPage@SplitLine']
})(({ remoteModules, data }) => {
  const [SplitLine] = remoteModules;
  const { formatMessage } = useIntl();

  return (
    <SplitLine
      className={style['split-line']}
      labelMode="vertical"
      dataSource={data}
      columns={[
        {
          name: 'potential',
          title: formatMessage({ id: 'potential' }),
          render: text => {
            return <div className={style['view']}>{text}</div>;
          }
        },
        {
          name: 'retention',
          title: formatMessage({ id: 'retention' }),
          render: text => {
            return <div className={style['view']}>{text}</div>;
          }
        },
        {
          name: 'lossImpact',
          title: formatMessage({ id: 'lossImpact' }),
          render: text => {
            return <div className={classnames(style['view'], style['red'])}>{text}</div>;
          }
        },
        {
          name: 'lastPerformanceRating',
          title: formatMessage({ id: 'lastPerformanceRating' }),
          render: value => {
            return (
              <Flex vertical gap={4}>
                <div style={{ width: '150px' }}>
                  <Progress percent={value} type="line" className={style['performance-progress']} format={percent => percent}/>
                </div>
                {/*<Typography.Link className={style['performance-description']}>{data.performanceLevel}</Typography.Link>*/}
              </Flex>
            );
          }
        },
        {
          name: 'overtimePerformance',
          title: formatMessage({ id: 'overtimePerformance' }),
          render: value => {
            return (
              <Flex vertical gap={4}>
                <div style={{ width: '150px' }}>
                  <Progress percent={value} type="line" className={style['performance-progress']} format={percent => percent} />
                </div>
                <Typography.Link className={style['performance-description']}>{formatMessage({ id: 'meetsExpectations' })}</Typography.Link>
              </Flex>
            );
          }
        }
      ]}
    />
  );
});

export default Retention;
