import { createWithRemoteLoader } from '@kne/remote-loader';
import PayDetails from '@kne/pay-details';
import '@kne/pay-details/dist/index.css';
import Location from '../Location';
import Category from '../Category';
import AdSelection from '../AdSelection';

const PositionFormInner = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:Global@usePreset']
})(({ remoteModules, positionTitle }) => {
  const [FormInfo, usePreset] = remoteModules;
  const { useFormContext } = FormInfo;
  const { SuperSelect, RadioGroup, TextArea } = FormInfo.fields;
  const { apis } = usePreset();
  const { formData, openApi } = useFormContext();

  return (
    <FormInfo
      list={[
        <SuperSelect
          block
          name="account"
          label="SEEK Account"
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
        <TextArea name="summary" label="Job Summary" rule="REQ" maxLength={150} block />,
        <TextArea name="detail" label="Job description" rule="REQ" block />,
        <PayDetails name="salary" label="Salary" rule="REQ PAY_SALARY" block />,
        <Location name="location" label="Location" rule="REQ" display={() => formData.account} account={formData.account} />,
        <Category name="category" label="Category" rule="REQ" display={() => formData.account && formData.location} account={formData.account} location={formData.location} />,
        <RadioGroup
          name="seekWorkArrangement"
          label="Work Arrangement"
          options={[
            { value: 'OnSite', label: 'On Site' },
            { value: 'Remote', label: 'Remote' },
            { value: 'Hybrid', label: 'Hybrid' }
          ]}
        />,
        <RadioGroup
          name="workType"
          label="Work Type"
          options={[
            { value: 'FullTime', label: 'Full Time' },
            { value: 'PartTime', label: 'Part Time' },
            { value: 'ContractTemp', label: 'ContractTemp' },
            { value: 'Casual', label: 'Casual' }
          ]}
        />,
        <AdSelection
          block
          name="seekAdvertisementProductId"
          label="SEEK Ad Selection"
          rule="REQ"
          positionTitle={positionTitle}
          display={() => formData.account && formData.location && formData.category}
          account={formData.account}
          location={formData.location}
          category={formData.category}
          salary={formData.salary}
          workType={formData.workType}
        />
      ]}
    />
  );
});

export default PositionFormInner;

export { default as PAY_SALARY } from './PAY_SALARY';
