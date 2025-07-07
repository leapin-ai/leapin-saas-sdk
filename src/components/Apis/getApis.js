const getApis = options => {
  const { prefix } = Object.assign(
    {},
    {
      prefix: '/api'
    },
    options
  );
  return {
    inventory: {
      downloadReport: {
        url: `${prefix}/v1/parseUrlToPdf`,
        method: 'POST',
        responseType: 'blob',
        headers: {
          appName: 'webprint'
        }
      },
      downloadReportBatch: {
        url: `${prefix}/v1/parseUrlToPdfBatch`,
        method: 'POST',
        responseType: 'blob',
        headers: {
          appName: 'webprint'
        }
      },
      userList: {
        url: `${prefix}/inventory/inventory/inventory_form/{id}/`,
        method: 'GET'
      },
      detail: {
        url: `${prefix}/inventory/inventory_user/inventory_user_report/{id}/`,
        method: 'GET'
      },
      answer: {
        url: `${prefix}/inventory/inventory_user/inventory_user_form_answers/{id}/`,
        method: 'GET'
      },
      shareDetail: {
        url: `${prefix}/inventory/share/company/{company_tenant_id}/inventory_user_report/{share_token}/`,
        method: 'GET'
      },
      shareAnswer: {
        url: `${prefix}/inventory/share/company/{company_tenant_id}/inventory_user_form/{share_token}/`,
        method: 'GET'
      },
      getShareLink: {
        url: `${prefix}/inventory/share/inventory_user/{id}/`
      }
    },
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
      },
      getBranding: {
        url: `${prefix}/integration/seek/brand/list/`,
        method: 'GET'
      },
      preview: {
        url: `${prefix}/integration/seek/job/preview/`,
        method: 'POST'
      }
    }
  };
};

export default getApis;
