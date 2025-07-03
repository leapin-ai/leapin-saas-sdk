import { Flex } from 'antd';
import classnames from 'classnames';
import style from './style.module.scss';
import { useIntl } from '@kne/react-intl';
import withIntlProvider from './withIntlProvider';
import getLocation from './getLocation';

const colors = ['#D7E1FF', '#D0F5BE', '#92CC76', '#FEEAB9', '#D7E1FF', '#D0F5BE', '#FFE1E0', '#FEEAB9', '#D7E1FF'];

const NineSquareGrid = withIntlProvider(({ size = '86px', values, verticalTitle, horizontalTitle }) => {
  const { formatMessage } = useIntl();
  return (
    <div
      className={style['square-grid-container']}
      style={{
        '--item-size': size
      }}
    >
      <Flex gap={6} vertical className={style['square-grid']}>
        {Array.from({ length: 3 }).map((item, index) => {
          return (
            <Flex gap={6} key={index}>
              {Array.from({ length: 3 }).map((item, innerIndex) => {
                return (
                  <Flex className={style['square-item']} justify="center" align="center" key={innerIndex} style={{ '--square-item-color': colors[index * 3 + innerIndex] }}>
                    <span>{values && values[getLocation(index, innerIndex)]}</span>
                  </Flex>
                );
              })}
            </Flex>
          );
        })}
      </Flex>
      <div className={style['vertical-line']}>
        <span className={style['line-title']}>{verticalTitle || formatMessage({ id: 'potential' })}</span>
        <Flex className={classnames(style['line-item'], style['vertical'])} vertical justify="space-between" align="flex-end">
          <div>{formatMessage({ id: 'high' })}</div>
          <div>{formatMessage({ id: 'moderate' })}</div>
          <div>{formatMessage({ id: 'low' })}</div>
        </Flex>
      </div>
      <div className={style['horizontal-line']}>
        <span className={style['line-title']}>{horizontalTitle || formatMessage({ id: 'performance' })}</span>
        <Flex className={style['line-item']} justify="space-between" align="center">
          <div>{formatMessage({ id: 'low' })}</div>
          <div>{formatMessage({ id: 'moderate' })}</div>
          <div>{formatMessage({ id: 'high' })}</div>
        </Flex>
      </div>
    </div>
  );
});

export default NineSquareGrid;
