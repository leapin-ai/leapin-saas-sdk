import { createWithRemoteLoader } from '@kne/remote-loader';
import SeekComponent from '../SeekComponent';
import useControlValue from '@kne/use-control-value';
import transformSalary from '../transformSalary';
import get from 'lodash/get';

const QuestionSelectionField = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset']
})(({ remoteModules, getApis, mode, positionDetail, positionSummary, account, location, category, positionTitle, salary, workType, onBrandingChange, ...props }) => {
  const [usePreset] = remoteModules;
  const { ajax, apis } = usePreset();
  const [value] = useControlValue(props);

  return (
    <SeekComponent
      name="questionnaire"
      getApis={getApis}
      questionnaireId={value}
      payload={{
        mode,
        schemeId: account?.schemeId,
        positionProfile: {
          jobCategories: [category],
          positionLocation: [location?.value],
          positionOrganizations: [account?.value],
          positionTitle,
          positionFormattedDescriptions: [
            {
              content: positionDetail,
              descriptionId: 'AdvertisementDetails'
            },
            {
              content: positionSummary,
              descriptionId: 'SearchSummary'
            }
          ]
        }
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

const QuestionSelection = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules, ...props }) => {
  const [FormInfo] = remoteModules;
  const { useOnChange } = FormInfo.hooks;
  const render = useOnChange(props);
  return render(QuestionSelectionField);
});

export default QuestionSelection;
