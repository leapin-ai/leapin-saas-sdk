import { createWithRemoteLoader } from '@kne/remote-loader';
import PayDetails from '@kne/pay-details';
import '@kne/pay-details/dist/index.css';
import Location from '../Location';
import Category from '../Category';
import AdSelection from '../AdSelection';
import QuestionSelection from '../QuestionSelection';
import Branding from '../Branding';
import { useState } from 'react';
import { MailOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';

const PositionFormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:Global@usePreset', 'components-ckeditor:Editor']
})(({ remoteModules, positionTitle, mode, profileId, getQuestionSelectionApis }) => {
  const [FormInfo, usePreset, Editor] = remoteModules;
  const { useFormContext, MultiField } = FormInfo;
  const { SuperSelect, RadioGroup, TextArea, Input, PhoneNumber } = FormInfo.fields;
  const { apis } = usePreset();
  const { formData, openApi } = useFormContext();
  const [selectedProduct, setSelectedProduct] = useState({
    features: {
      branding: {
        coverImageIndicator: false,
        logoIndicator: false
      },
      searchBulletPoints: {
        limit: 0
      }
    },
    id: null,
    label: null,
    price: {
      currency: null,
      summary: null,
      value: null,
      tax: {
        code: null,
        value: null
      }
    }
  });
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
          <TextArea name="summary" label="Summary" rule="REQ LEN-0-150" block showCount />,

          <Input name="name" label="Contact Name" rule="REQ" prefix={<UserOutlined />} />,
          <Input name="email" label="Contact Email" rule="REQ EMAIL" prefix={<MailOutlined />} />,
          <Input name="phone" label="Contact Phone" rule="REQ" prefix={<PhoneOutlined />} />,
          // <Input name="address" label="Contact Address" rule="REQ" prefix={<EnvironmentOutlined />} />,

          <Editor name="detail" label="Description" rule="REQ" block maxLength={15000} />,
          // <Upload
          //   name="video"
          //   label="Video"
          //   block
          //   accept={['.mp4', '.webm', '.ogg']}
          //   getPermission={type => {
          //     return ['delete', 'preview'].indexOf(type) > -1;
          //   }}
          // />,
          // 视频链接 校验是否符合youtube格式
          <Input name="videoLink" label="Video Link" rule="YOUTUBE_URL" block />,
          // 视频位置
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
            mode={mode}
            name="seekAdvertisementProductId"
            label="SEEK ad selection"
            rule="REQ"
            positionTitle={positionTitle}
            profileId={profileId}
            display={() => formData.account && formData.location && formData.category}
            account={formData.account}
            location={formData.location}
            category={formData.category}
            salary={formData.salary}
            workType={formData.workType}
            onProductChange={setSelectedProduct}
          />,
          <Branding
            name="brandingId"
            label="Branding"
            account={formData.account}
            seekAdvertisementProduct={formData.seekAdvertisementProductId}
            brandingFeatures={selectedProduct?.features?.branding}
            block
            display={() => formData.account && formData.seekAdvertisementProductId && selectedProduct?.features?.branding}
          />,
          <MultiField
            name="keySellingPoints"
            label="Key selling points"
            rule="LEN-0-80"
            block
            display={() => selectedProduct?.features?.searchBulletPoints?.limit > 0}
            maxLength={selectedProduct?.features?.searchBulletPoints?.limit}
            field={Input}
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
            seekApplicationQuestionnaire={formData.seekApplicationQuestionnaire}
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
export { default as YOUTUBE_URL } from './YOUTUBE_URL';
