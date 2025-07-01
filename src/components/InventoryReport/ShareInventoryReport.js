import Report from './Report';
import { createWithRemoteLoader } from '@kne/remote-loader';

const ShareInventoryReport = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset']
})(({ remoteModules, company_tenant_id, share_token }) => {
  const [usePreset] = remoteModules;
  const { apis } = usePreset();
  return (
    <Report
      apis={{
        detail: Object.assign({}, apis.inventory.shareDetail, {
          urlParams: { company_tenant_id, share_token },
          params: { company_tenant_id, share_token }
        }),
        answer: Object.assign({}, apis.inventory.shareAnswer, {
          urlParams: { company_tenant_id, share_token },
          params: { company_tenant_id, share_token }
        })
      }}
    />
  );
});

export default ShareInventoryReport;
