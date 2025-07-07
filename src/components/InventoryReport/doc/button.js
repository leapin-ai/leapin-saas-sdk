const { InventoryReportButton, DownloadReportButton } = _InventoryReport;
const { default: mockPreset } = _mockPreset;
const { createWithRemoteLoader } = remoteLoader;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;

  return (
    <PureGlobal preset={mockPreset}>
      <InventoryReportButton>点击显示报表</InventoryReportButton>
      <DownloadReportButton ids={[1, 2, 3]}>点击下载批量报表</DownloadReportButton>
    </PureGlobal>
  );
});

render(<BaseExample />);
