const getApis = options => {
  const { prefix } = Object.assign(
    {},
    {
      prefix: '/api'
    },
    options
  );
  return {
    seek: {
      organizations: {
        url: `${prefix}/integration/seek/organizations/`,
        method: 'GET'
      },
      getLocation: {
        url: `${prefix}/integration/seek/job/locations/`,
        method: 'GET'
      },
      categories: {
        url: `${prefix}/integration/seek/job/categories/`,
        method: 'GET'
      },
      getToken: {
        url: `${prefix}/integration/seek/browser_token/`,
        method: 'POST'
      },
      post: {
        url: `${prefix}/integration/seek/job/posting/`,
        method: 'POST'
      },
      retrieve: {
        url: `${prefix}/integration/seek/job/retrieve/`,
        method: 'GET'
      },
      close: {
        url: `${prefix}/integration/seek/job/close/`,
        method: 'PUT'
      },
      update: {
        url: `${prefix}/integration/seek/job/update/`,
        method: 'PUT'
      }
    }
  };
};

export default getApis;
