import { createWithRemoteLoader } from '@kne/remote-loader';
import { Button, Flex } from 'antd';
import style from './style.module.scss';

const JobCard = createWithRemoteLoader({
  modules: ['components-core:InfoPage']
})(({ remoteModules, title, link, children }) => {
  const [InfoPage] = remoteModules;
  return (
    <InfoPage className={style['job-card']}>
      <InfoPage.Part title={title}>{children}</InfoPage.Part>
      <InfoPage>
        <Flex justify="flex-end">
          <Button shape="round" target="_blank" href={link} type="primary">
            Apply
          </Button>
        </Flex>
      </InfoPage>
    </InfoPage>
  );
});

export default JobCard;
