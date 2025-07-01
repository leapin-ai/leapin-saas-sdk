import { createWithRemoteLoader } from '@kne/remote-loader';
import InventoryReport from './InventoryReport';
import { Button } from 'antd';
import style from './style.module.scss';

const InventoryReportButton = createWithRemoteLoader({
  modules: ['components-core:Modal@useModal']
})(({ remoteModules, id, ...props }) => {
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
          children: <InventoryReport id={id} />
        });
      }}
    />
  );
});

export default InventoryReportButton;
