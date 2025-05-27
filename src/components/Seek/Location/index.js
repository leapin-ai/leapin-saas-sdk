import { createWithRemoteLoader } from '@kne/remote-loader';
import { Alert, Empty, Select } from 'antd';
import { useEffect, useState } from 'react';
import useControlValue from '@kne/use-control-value';

const LocationField = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset', 'components-core:FormInfo']
})(({ remoteModules, account, ...props }) => {
  const [usePreset, FormInfo] = remoteModules;
  const [value, onChange] = useControlValue(props);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const { ajax, apis } = usePreset();

  useEffect(() => {
    setOptions(null);
  }, [account]);

  return (
    <Select
      {...props}
      loading={loading}
      options={options}
      value={value}
      onChange={(value, item) => {
        onChange(item);
      }}
      popupRender={node => {
        if (!(options?.length && options?.length > 0)) {
          return <Alert message="Please enter address keywords to search" />;
        }
        return node;
      }}
      showSearch
      onSearch={async input => {
        if (!input) {
          setOptions([]);
          return;
        }
        setLoading(true);
        const { data: resData } = await ajax(
          Object.assign({}, apis.seek.getLocation, {
            params: {
              hirerId: account?.value,
              schemeId: account?.schemeId,
              text: input
            }
          })
        );
        setLoading(false);
        if (resData.code !== 0) {
          setOptions([]);
          return;
        }
        setOptions(
          resData.data.locations.map(item => {
            return { value: item.id, label: item.contextualName };
          })
        );
      }}
    />
  );
});

const Location = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules, ...props }) => {
  const [FormInfo] = remoteModules;
  const { useOnChange } = FormInfo.hooks;
  const render = useOnChange(
    Object.assign({}, props, {
      placeholder: `Please Select ${props.label || ''}`
    })
  );

  return render(LocationField);
});

Location.Field = LocationField;

export default Location;
