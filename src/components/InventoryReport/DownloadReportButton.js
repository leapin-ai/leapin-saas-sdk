import { createWithRemoteLoader } from '@kne/remote-loader';

const DownloadReportButton = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset', 'components-core:File@downloadBlobFile', 'components-core:LoadingButton']
})(({ remoteModules, ids, getIds, ...props }) => {
  const [usePreset, downloadBlobFile, LoadingButton] = remoteModules;
  const { apis, ajax } = usePreset();
  return (
    <LoadingButton
      {...props}
      onClick={async () => {
        if (typeof getIds === 'function') {
          ids = await getIds();
        }
        const urlList = await Promise.all(
          ids.map(async id => {
            const { data: resData } = await ajax(
              Object.assign({}, apis.inventory.getShareLink, {
                urlParams: { id }
              })
            );
            if (resData.code !== 0) {
              throw new Error(resData.msg);
            }
            return resData.data;
          })
        );

        const { data } = await ajax(
          Object.assign({}, apis.inventory.downloadReportBatch, {
            data: {
              urlList,
              options: {
                waitForSelectors: ['#inventoryReportPrintTarget'],
                waitForMaxTime: 60000,
                waitForVisible: true,
                margin: {
                  top: '6mm',
                  right: '6mm',
                  bottom: '6mm',
                  left: '6mm'
                },
                printBackground: true,
                displayHeaderFooter: false
              }
            }
          })
        );

        downloadBlobFile(data, `Report.zip`);
      }}
    />
  );
});

export default DownloadReportButton;
