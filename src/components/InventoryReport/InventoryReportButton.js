import { createWithRemoteLoader } from '@kne/remote-loader';
import InventoryReport from './InventoryReport';
import { Button } from 'antd';
import style from './style.module.scss';

const InventoryReportButton = createWithRemoteLoader({
  modules: ['components-core:Modal@useModal']
})(({ remoteModules, id, detailId, ...props }) => {
  const [useModal] = remoteModules;
  const modal = useModal();
  return (
    <Button
      {...props}
      onClick={() => {
        modal({
          size: 'large',
          footer: null,
          className: style['modal'],
          children: (
            <div className={style['report-modal']}>
              <InventoryReport id={id} detailId={detailId} />
            </div>
          )
        });
      }}
    />
  );
});

export default InventoryReportButton;
