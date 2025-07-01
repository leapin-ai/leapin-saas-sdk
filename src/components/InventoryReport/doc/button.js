const { InventoryReportButton } = _InventoryReport;
const { default: mockPreset } = _mockPreset;
const { createWithRemoteLoader } = remoteLoader;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;

  return (
    <PureGlobal preset={mockPreset}>
      <InventoryReportButton>点击显示报表</InventoryReportButton>
    </PureGlobal>
  );
});

render(<BaseExample />);
