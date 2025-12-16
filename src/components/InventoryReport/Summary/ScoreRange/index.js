import { Flex } from 'antd';
import classnames from 'classnames';
import style from './style.module.scss';

const ScoreRange = ({ value, title, range, point, unit = 20 }) => {
  return (
    <Flex vertical className={style['score-range']} gap={20}>
      {title && <div>{title}</div>}
      <Flex className={style['line']}>
        {point && point > 0 ? (
          <div
            className={style['line-point']}
            style={{
              '--point': `${Math.round(point)}%`
            }}
          />
        ) : null}
        {range && range.length === 2 && range[1] > range[0] && range[0] >= 0 ? (
          <div
            className={style['line-range']}
            style={{
              '--location': `${range[0]}%`,
              '--width': `${Math.round(range[1] - range[0])}%`
            }}
          />
        ) : null}
        {Array.from({ length: parseInt(100 / unit) }).map((item, index) => {
          const isCurrent = value >= index * unit && value < (index + 1) * unit;
          return <div className={style['line-item']}>{index * unit}</div>;
        })}
        <div className={classnames(style['line-item'], style['line-item-last'])}>100</div>
      </Flex>
    </Flex>
  );
};

export default ScoreRange;
