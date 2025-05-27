import { globalInit } from './preset';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const renderRoot = async (root, options) => {
  const globalPreset = await globalInit(options);
  root.render(<App themeToken={globalPreset.themeToken} globalPreset={globalPreset} options={options} />);
};

const leapinSaasSdk = async (target, options) => {
  const root = ReactDOM.createRoot(target);
  renderRoot(root, Object.assign({}, options)).then(
    () => {},
    e => {
      console.log(e);
    }
  );
  return () => {
    root.unmount();
  };
};

export default leapinSaasSdk;
