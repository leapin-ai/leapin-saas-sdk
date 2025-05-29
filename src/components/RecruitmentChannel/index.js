import { createWithRemoteLoader } from '@kne/remote-loader';
import { useState } from 'react';
import { Flex, Button } from 'antd';
import Seek, { logo as seekLogo } from '@components/Seek';
import style from './style.module.scss';

const channel = [
  {
    value: 'seek',
    label: 'SEEK',
    logo: seekLogo,
    component: Seek
  }
];

const RecruitmentChannel = createWithRemoteLoader({
  modules: ['components-core:Icon']
})(({ remoteModules, ...props }) => {
  const [Icon] = remoteModules;
  const [current, setCurrent] = useState(null);
  const RecruitmentComponent = current?.component;
  return (
    <Flex vertical gap={20} className={style['container']}>
      {current ? (
        <Flex vertical>
          <Flex gap={10} className={style['title']}>
            <Button
              type="link"
              className={'btn-no-padding btn-no-gap'}
              icon={<Icon type="arrow-thin-left" />}
              onClick={() => {
                setCurrent(null);
              }}
            >
              Back
            </Button>
            <div>{current.label}</div>
          </Flex>
          <RecruitmentComponent {...props} />
        </Flex>
      ) : (
        <>
          <h3>Recruitment website management</h3>
          <div>Choose a recruitment website to complete publishing and updating</div>
          <Flex gap={12}>
            {channel.map(item => {
              return (
                <div
                  key={item.value}
                  className={style['channel-item']}
                  onClick={() => {
                    setCurrent(item);
                  }}
                >
                  {item.logo || item.label}
                </div>
              );
            })}
          </Flex>
        </>
      )}
    </Flex>
  );
});

export default RecruitmentChannel;
