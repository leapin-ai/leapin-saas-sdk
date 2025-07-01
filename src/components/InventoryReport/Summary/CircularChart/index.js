import { Flex, Tag } from 'antd';
import style from './style.module.scss';
import { useId } from 'react';

const CircularChart = ({ title, radius = 28, progress = 0, strokeWidth = 12, bgColor = '#f0f0f0', gradientColors = ['#904CD3', '#EEE7F4'], textColor = '#904CD3', textSize = 20, showText = true }) => {
  const center = radius + strokeWidth / 2;
  const viewBoxSize = center * 2;
  const round = Math.round(2 * radius * Math.PI);
  const id = useId();
  const gradientId = `progressGradient-${id}`;
  return (
    <Flex vertical gap={12} className={style['circular-chart']}>
      <svg className={style['circular-chart-svg']} width={viewBoxSize} height={viewBoxSize} viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
        {/* 定义渐变色 */}
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            {gradientColors.map((color, index) => {
              return <stop offset={`${(index / (gradientColors.length - 1)) * 100}%`} stopColor={color} />;
            })}
          </linearGradient>
        </defs>

        {/* 背景环 */}
        <circle cx={center} cy={center} r={radius} stroke={bgColor} strokeWidth={strokeWidth} fill="none" />

        {/* 前景进度环（带渐变色和圆角） */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
          strokeDasharray={`${Math.round((progress * round) / 100)} ${round}`}
        />

        {/* 中间文字 */}
        {showText && (
          <text x={center} y={Math.round(center + textSize / 3)} textAnchor="middle" fontSize={textSize} fill={textColor}>
            {Math.round(progress)}
          </text>
        )}
      </svg>
      {title && (
        <Tag className={style['title']} color={textColor} bordered={false}>
          {title}
        </Tag>
      )}
    </Flex>
  );
};

export default CircularChart;
