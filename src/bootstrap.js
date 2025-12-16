import { globalInit } from './preset';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const renderRoot = async (root, options) => {
  const globalPreset = await globalInit(options);

  if (process.env.NODE_ENV === 'development') {
    await import('@kne/modules-dev/dist/create-entry.css');
    await import('@kne/modules-dev/dist/create-entry.modern').then(module => {
      const Entry = module.default(({ globalPreset }) => <App globalPreset={globalPreset} options={options} />);
      root.render(
        <BrowserRouter>
          <Entry themeToken={globalPreset.themeToken} globalPreset={globalPreset} />
        </BrowserRouter>
      );
    });
  } else {
    root.render(<App themeToken={globalPreset.themeToken} globalPreset={globalPreset} options={options} />);
  }
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
