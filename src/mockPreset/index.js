import { globalInit } from '../preset';
import { getApis } from '@components/Apis';
import merge from 'lodash/merge';

const apis = merge({}, getApis(), {
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
    shareDetail: {
      loader: () => {
        return import('./inventory/detail.json').then(({ default: data }) => data.data);
      }
    },
    answer: {
      loader: () => {
        return import('./inventory/answer.json').then(({ default: data }) => data.data);
      }
    },
    inventory: {},
    getShareLink: {
      loader: () => {
        return 'https://staging.app.leapin-ai.com/share/company/89/talentInventoryEmployeeReport/2c2ab175-da3f-41c5-b0ce-b0f5ab20bccf/?lan=en';
      }
    }
  }
});

const preset = {
  locale: 'en-US',
  ajax: async ({ loader, ...props }) => {
    if (!loader && props.url) {
      const { ajax } = await globalInit();
      console.log('>>>>>>', props);
      return ajax({ loader, ...props });
    }
    return Promise.resolve({ data: loader ? { code: 0, data: loader() } : { code: 0, data: {} } });
  },
  apis
};

export default preset;
