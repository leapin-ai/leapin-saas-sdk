import { Flex } from 'antd';
import get from 'lodash/get';
import classnames from 'classnames';
import style from './style.module.scss';

const BarChart = ({ className, columns = [], data = {}, colors = ['#FFF5E3', '#FFA92A'], title, group }) => {
  return (
    <div className={classnames(style['chart-container'], className)}>
      <Flex vertical className={style['chart']} style={{ '--sub-color': colors[0], '--color': colors[1] }}>
        <Flex className={classnames(style['line'], style['line-group'])}>
          <Flex className={style['line-label']} justify="flex-end">
            {title}
          </Flex>
          <Flex flex={1}>
            {group && group.length > 0 ? (
              group.map(({ label, value }) => {
                return (
                  <div
                    className={style['group']}
                    style={{
                      '--width': `${value}%`
                    }}
                  >
                    <Flex justify="center" flex={1}>
                      {label}
                    </Flex>
                    <div className={style['group-line']} />
                  </div>
                );
              })
            ) : (
              <span />
            )}
          </Flex>
        </Flex>
        {columns.map(item => {
          const value = Math.max(Math.min(100, get(data, item.name) || 0), 0);
          return (
            <Flex key={item.name} className={style['line']}>
              <Flex className={style['line-label']} justify="flex-end" align="center">
                {item.title}
              </Flex>
              <Flex flex={1} className={style['line-bar']}>
                <div
                  className={style['line-bar-value']}
                  style={{
                    '--bar-value': `${value}%`
                  }}
                >
                  {Math.round(value)}
                </div>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
      <Flex className={classnames(style['line'], style['line-footer'])}>
        <Flex className={style['line-label']} justify="flex-end">
          <div className={style['footer']}>0</div>
        </Flex>
        <Flex flex={1} justify="flex-end">
          <div className={style['footer']}>100</div>
        </Flex>
      </Flex>
    </div>
  );
};

export default BarChart;
