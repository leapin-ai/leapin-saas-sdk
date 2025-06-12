import { createWithRemoteLoader } from '@kne/remote-loader';
import PayDetails from '@kne/pay-details';
import '@kne/pay-details/dist/index.css';
import Location from '../Location';
import Category from '../Category';
import AdSelection from '../AdSelection';
import QuestionSelection from '../QuestionSelection';
import Branding from '../Branding';
import { useState } from 'react';

const PositionFormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:Global@usePreset', 'components-ckeditor:Editor']
})(({ remoteModules, positionTitle, mode, getQuestionSelectionApis }) => {
  const [FormInfo, usePreset, Editor] = remoteModules;
  const { useFormContext } = FormInfo;
  const { SuperSelect, RadioGroup, TextArea, Upload } = FormInfo.fields;
  const { apis } = usePreset();
  const { formData, openApi } = useFormContext();
  const [hasBranding, setHasBranding] = useState(false);
  return (
    <>
      <FormInfo
        list={[
          <SuperSelect
            block
            name="account"
            label="SEEK account"
            rule="REQ"
            single
            api={Object.assign({}, apis.seek.organizations, {
              transformData: data => {
                return { pageData: data.map(item => ({ label: item.name, value: item.id, schemeId: item.schemeId })) };
              }
            })}
            onChange={() => {
              openApi.setField({
                name: 'location',
                value: null
              });
            }}
          />,
          <TextArea name="summary" label="Summary" rule="REQ" maxLength={150} block />,
          <Editor name="detail" label="Description" rule="REQ" block />,
          <Upload
            name="video"
            label="Video"
            block
            accept={['.mp4', '.webm', '.ogg']}
            getPermission={type => {
              return ['delete', 'preview'].indexOf(type) > -1;
            }}
          />,
          <RadioGroup
            name="videoPosition"
            label="Video position"
            block
            defaultValue="Above"
            options={[
              { label: 'Above', value: 'Above' },
              { label: 'Below', value: 'Below' }
            ]}
          />,
          <PayDetails name="salary" label="Pay details" rule="REQ PAY_SALARY" block />,
          <Location name="location" label="Location" rule="REQ" display={() => formData.account} account={formData.account} />,
          <Category name="category" label="Category" rule="REQ" display={() => formData.account && formData.location} account={formData.account} location={formData.location} />,
          <RadioGroup
            name="seekWorkArrangement"
            label="Work setting"
            options={[
              { value: 'OnSite', label: 'On-site' },
              { value: 'Remote', label: 'Remote' },
              { value: 'Hybrid', label: 'Hybrid' }
            ]}
          />,
          <RadioGroup
            name="workType"
            label="Work type"
            options={[
              { value: 'FullTime', label: 'Full time' },
              { value: 'PartTime', label: 'Part time' },
              { value: 'ContractTemp', label: 'Contract/Temp' },
              { value: 'Casual', label: 'Casual' }
            ]}
          />,
          <AdSelection
            block
            name="seekAdvertisementProductId"
            label="SEEK ad selection"
            rule="REQ"
            positionTitle={positionTitle}
            display={() => formData.account && formData.location && formData.category}
            account={formData.account}
            location={formData.location}
            category={formData.category}
            salary={formData.salary}
            workType={formData.workType}
            onBrandingChange={setHasBranding}
          />,
          <Branding
            name="brandingId"
            label="Branding"
            account={formData.account}
            seekAdvertisementProduct={formData.seekAdvertisementProductId}
            block
            display={() => formData.account && formData.seekAdvertisementProductId && hasBranding}
          />,
          <TextArea name="seekBillingReference" label="Billing reference" block rule="LEN-0-500" />,
          <TextArea name="seekHirerJobReference" label="Hirer job reference" block rule="LEN-0-500" />,
          <QuestionSelection
            block
            mode={mode}
            getApis={getQuestionSelectionApis}
            name="questionnaire"
            label="Questionnaire"
            positionTitle={positionTitle}
            positionDetail={formData.detail}
            positionSummary={formData.summary}
            display={() => formData.account && formData.location && formData.category}
            account={formData.account}
            location={formData.location}
            category={formData.category}
          />
        ]}
      />
    </>
  );
});

export default PositionFormInner;

export { default as PAY_SALARY } from './PAY_SALARY';
