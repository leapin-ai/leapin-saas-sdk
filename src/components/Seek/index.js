import { createWithRemoteLoader } from '@kne/remote-loader';
import { Flex, App, Button } from 'antd';
import style from './style.module.scss';
import PositionFormInner, { PAY_SALARY } from './PositionFormInner';
import transformSalary from './transformSalary';
import Fetch from '@kne/react-fetch';
import get from 'lodash/get';
import { useState } from 'react';
import { ReactComponent as Logo } from './logo.svg';

const CreatePosition = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:Global@usePreset']
})(({ remoteModules, reload, ...props }) => {
  const [FormInfo, usePreset] = remoteModules;
  const { apis, ajax } = usePreset();
  const { Form, SubmitButton } = FormInfo;
  const { message } = App.useApp();
  return (
    <Form
      className={style['form']}
      data={{
        detail: props.positionDetail.replace(/\n/g, '<br/>')
      }}
      rules={{ PAY_SALARY }}
      onSubmit={async data => {
        const output = {
          platformCode: 'seek',
          hirerId: data.account?.value,
          positionTitle: props.positionTitle,
          seekAnzWorkTypeCode: data.workType,
          seekWorkArrangementCodes: data.seekWorkArrangement && [data.seekWorkArrangement],
          jobCategories: data.category,
          positionLocation: data.location?.value,
          seekAdvertisementProductId: data.seekAdvertisementProductId,
          offeredRemunerationPackage: transformSalary(data.salary),
          summary: data.summary,
          detail: data.detail,
          leapinJobId: props.positionId,
          formData: data
        };

        const { data: resData } = await ajax(
          Object.assign({}, apis.seek.post, {
            data: output
          })
        );
        if (resData.code !== 0) {
          return;
        }
        message.success('success');
        reload && reload();
      }}
    >
      <PositionFormInner {...props} />
      <Flex justify="center">
        <SubmitButton>Submit</SubmitButton>
      </Flex>
    </Form>
  );
});

const EditPosition = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:Global@usePreset']
})(({ remoteModules, data, reload, ...props }) => {
  const [FormInfo, usePreset] = remoteModules;
  const { Form, SubmitButton } = FormInfo;
  const { apis, ajax } = usePreset();
  const { message } = App.useApp();
  return (
    <Form
      className={style['form']}
      data={data}
      rules={{ PAY_SALARY }}
      onSubmit={async data => {
        const output = {
          platformCode: 'seek',
          hirerId: data.account?.value,
          positionTitle: props.positionTitle,
          seekAnzWorkTypeCode: data.workType,
          seekWorkArrangementCodes: data.seekWorkArrangement && [data.seekWorkArrangement],
          jobCategories: data.category,
          positionLocation: data.location?.value,
          seekAdvertisementProductId: data.seekAdvertisementProductId,
          offeredRemunerationPackage: transformSalary(data.salary),
          summary: data.summary,
          detail: data.detail,
          leapinJobId: props.positionId,
          formData: data
        };

        const { data: resData } = await ajax(
          Object.assign({}, apis.seek.update, {
            data: output
          })
        );
        if (resData.code !== 0) {
          return;
        }
        message.success('success');
        reload && reload();
      }}
    >
      <PositionFormInner {...props} />
      <Flex justify="center" gap={20}>
        <SubmitButton>Submit</SubmitButton>
        <Button onClick={reload}>Cancel</Button>
      </Flex>
    </Form>
  );
});

const PositionDetail = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset', 'components-core:InfoPage', 'components-core:ConfirmButton']
})(({ remoteModules, data, positionId, reload, positionTitle, ...props }) => {
  const [usePreset, InfoPage, ConfirmButton] = remoteModules;
  const [isEdit, setIsEdit] = useState(false);
  const { ajax, apis } = usePreset();
  if (isEdit) {
    return (
      <EditPosition
        {...props}
        positionId={positionId}
        positionTitle={positionTitle}
        data={data}
        reload={() => {
          setIsEdit(false);
          reload && reload();
        }}
      />
    );
  }
  return (
    <InfoPage className={style['container']}>
      <InfoPage.Part title="Preview Link">
        <Button type="link" href={data.positionUri} target="_blank">
          {data.positionUri}
        </Button>
      </InfoPage.Part>
      <InfoPage.Part title="Position detail">
        <InfoPage.Part title="Title">{positionTitle}</InfoPage.Part>
        <InfoPage.Part title="Summary">{get(data, 'summary', '')}</InfoPage.Part>
        <InfoPage.Part title="Description">
          <div className={style['content']} dangerouslySetInnerHTML={{ __html: get(data, 'detail', '') }}></div>
        </InfoPage.Part>
        <Flex justify="center" gap={20}>
          <Button
            type="primary"
            onClick={() => {
              setIsEdit(true);
            }}
          >
            Update
          </Button>
          <ConfirmButton
            type="primary"
            message="Are you sure you want to close the position on SEEK?"
            danger
            okText="Close"
            onClick={async () => {
              const { data: resData } = await ajax(
                Object.assign({}, apis.seek.close, {
                  data: { leapinJobId: positionId }
                })
              );
              if (resData.code !== 0) {
                return;
              }
              reload && reload();
            }}
          >
            Close
          </ConfirmButton>
        </Flex>
      </InfoPage.Part>
    </InfoPage>
  );
});

const Seek = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset']
})(({ remoteModules, ...props }) => {
  const [usePreset] = remoteModules;
  const { apis } = usePreset();
  return (
    <Fetch
      {...Object.assign({}, apis.seek.retrieve, {
        params: { leapinJobId: props.positionId }
      })}
      render={({ data, reload }) => {
        if (data?.positionUri) {
          return <PositionDetail {...props} data={data} reload={reload} />;
        }
        return <CreatePosition {...props} reload={reload} />;
      }}
    />
  );
});

export default Seek;

export const logo = <Logo />;
