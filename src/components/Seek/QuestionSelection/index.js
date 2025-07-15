import { createWithRemoteLoader } from '@kne/remote-loader';
import SeekComponent from '../SeekComponent';
import useControlValue from '@kne/use-control-value';
import { Spin } from 'antd';

const QuestionSelectionField = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset']
})(({ remoteModules, getApis, mode, positionDetail, positionSummary, seekApplicationQuestionnaire, account, location, category, positionTitle, salary, workType, onBrandingChange, ...props }) => {
  const [usePreset] = remoteModules;
  const { ajax, apis } = usePreset();
  const [value] = useControlValue(props);

  if (mode === 'Update' && !value) {
    return <Spin />;
  }

  return (
    <SeekComponent
      name="questionnaire"
      getApis={getApis}
      payload={{
        questionnaireId: value,
        mode,
        schemeId: account?.schemeId,
        positionProfile: {
          jobCategories: [category],
          positionLocation: [location?.value],
          positionOrganizations: [account?.value],
          positionTitle: positionTitle,
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
            cache: 'seek-token',
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
