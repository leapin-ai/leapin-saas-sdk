const { ShareInventoryReport } = _InventoryReport;
const { default: mockPreset } = _mockPreset;
const { createWithRemoteLoader } = remoteLoader;
const BaseExample = createWithRemoteLoader({
  modules: ['components-core:Global@PureGlobal']
})(({ remoteModules }) => {
  const [PureGlobal] = remoteModules;

  return (
    <PureGlobal preset={mockPreset}>
      <ShareInventoryReport className="is-print" />
    </PureGlobal>
  );
});

render(<BaseExample />);
