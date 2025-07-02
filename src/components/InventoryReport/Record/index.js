import { createWithRemoteLoader } from '@kne/remote-loader';
import { Flex } from 'antd';
import cover from './img.png';
import style from './style.module.scss';
import { useIntl } from '@kne/react-intl';

const Record = createWithRemoteLoader({
  modules: ['components-core:InfoPage']
})(({ remoteModules, data }) => {
  const [InfoPage] = remoteModules;
  const answers = data.answers_list || [];
  const { formatMessage } = useIntl();
  return (
    <InfoPage>
      <InfoPage.Part title={formatMessage({ id: 'aiInterviewPlayback' })}>
        {answers.map((item, index) => {
          return (
            <Flex justify="center">
              <Flex vertical gap={20} key={index} className={style['record']}>
                <div>
                  <div className={style['question']}>
                    {formatMessage({ id: 'question' })}: {index + 1}/{answers.length}
                  </div>
                  <div>{item.question_name}</div>
                </div>
                <div className={style['answer']}>
                  <video src={item.video_url} controls poster={cover} />
                </div>
              </Flex>
            </Flex>
          );
        })}
      </InfoPage.Part>
    </InfoPage>
  );
});

export default Record;
