import Report from './Report';
import { createWithRemoteLoader } from '@kne/remote-loader';
import IntlProvider from './IntlProvider';
import style from './style.module.scss';

const ShareInventoryReport = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset']
})(({ remoteModules, company_tenant_id, share_token }) => {
  const [usePreset] = remoteModules;
  const { apis } = usePreset();
  return (
    <IntlProvider>
      <div className={style['share-report']}>
        <Report
          exportDisabled
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
      </div>
    </IntlProvider>
  );
});

export default ShareInventoryReport;
