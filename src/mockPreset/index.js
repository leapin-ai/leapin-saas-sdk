const apis = {
  inventory: {
    userList: {
      loader: () => {
        return import('./inventory/user-list.json').then(({ default: data }) => data.data);
      }
    },
    detail: {
      loader: () => {
        return import('./inventory/detail.json').then(({ default: data }) => data.data);
      }
    },
    answer: {
      loader: () => {
        return import('./inventory/answer.json').then(({ default: data }) => data.data);
      }
    },
    getShareLink: {
      loader: () => {
        return window.PUBLIC_URL + '/favicon.svg';
      }
    }
  }
};

const preset = {
  locale: 'en-US',
  ajax: ({ loader }) => {
    return Promise.resolve({ data: loader ? { code: 0, data: loader() } : { code: 0, data: {} } });
  },
  apis
};

export default preset;
