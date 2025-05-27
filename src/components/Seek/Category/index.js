import { createWithRemoteLoader } from '@kne/remote-loader';

const Category = createWithRemoteLoader({
  modules: ['components-core:FormInfo', 'components-core:Global@usePreset']
})(({ remoteModules, account, location, ...props }) => {
  const [FormInfo, usePreset] = remoteModules;
  const { apis } = usePreset();
  const { Cascader } = FormInfo.fields;
  return (
    <Cascader
      {...props}
      single
      onlyAllowLastLevel
      api={Object.assign({}, apis.seek.categories, {
        params: {
          hirerId: account?.value,
          schemeId: account?.schemeId,
          locationId: location?.value
        },
        transformData: data => {
          const core = list => {
            if (Array.isArray(list) && list.length > 0) {
              return list.map(item => {
                return {
                  label: item.name,
                  id: item.id?.value,
                  children: core(item.children)
                };
              });
            }
            return null;
          };
          return core(data.categories);
        }
      })}
    />
  );
});

export default Category;
