window.leapinSaasSdk = (...props) => {
  window.__COMPONENTS_CORE_SIMPLE_BAR_DISABLED = true;
  return import('./bootstrap').then(({ default: module }) => module(...props));
};
