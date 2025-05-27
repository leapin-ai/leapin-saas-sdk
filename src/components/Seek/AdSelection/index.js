import { createWithRemoteLoader } from '@kne/remote-loader';
import SeekComponent from '../SeekComponent';
import useControlValue from '@kne/use-control-value';
import transformSalary from '../transformSalary';

const AdSelectionField = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset']
})(({ remoteModules, account, location, category, positionTitle, salary, workType, ...props }) => {
  const [usePreset] = remoteModules;
  const { ajax, apis } = usePreset();
  const [value, onChange] = useControlValue(props);
  return (
    <SeekComponent
      name="adSelection"
      onChange={event => {
        const { selectedProduct } = event;
        onChange(selectedProduct?.id);
      }}
      positionProfile={{
        jobCategories: category,
        positionLocation: location?.value,
        positionOrganizations: account?.value,
        positionTitle,
        offeredRemunerationPackage: transformSalary(salary),
        seekAnzWorkTypeCode: workType
      }}
      getAuthToken={async () => {
        const { data: resData } = await ajax(
          Object.assign({}, apis.seek.getToken, {
            data: { hirerId: account?.value }
          })
        );
        if (resData.code !== 0) {
          return null;
        }

        return resData.data.access_token;
      }}
    />
  );
});

const AdSelection = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules, ...props }) => {
  const [FormInfo] = remoteModules;
  const { useOnChange } = FormInfo.hooks;
  const render = useOnChange(props);
  return render(AdSelectionField);
});

export default AdSelection;
