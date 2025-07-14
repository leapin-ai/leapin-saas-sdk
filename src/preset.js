import React from 'react';
import { preset as fetchPreset } from '@kne/react-fetch';
import { Spin, Empty, message } from 'antd';
import cookie from 'js-cookie';
import ensureSlash from '@kne/ensure-slash';
import md5 from 'md5';
import createAjax from '@kne/axios-fetch';
import { preset as remoteLoaderPreset } from '@kne/remote-loader';
import { getApis } from '@components/Apis';

window.PUBLIC_URL = window.runtimePublicUrl || process.env.PUBLIC_URL;

const baseApiUrl = window.runtimeApiUrl || '';
window.runtimeGatewayUrl = window.runtimeGatewayUrl || baseApiUrl || 'https://api.gw.leapin-ai.com';

const getLocale = () => {
  let locale = localStorage.getItem('sdk_lan');
  if (locale) {
    localStorage.setItem('x-leapin-lang-code', locale);
  } else {
    locale = localStorage.getItem('x-leapin-lang-code');
  }

  return locale;
};

export const globalInit = async () => {
  const ajax = createAjax({
    baseUrl: baseApiUrl,
    getDefaultHeaders: () => {
      return {
        'x-leapin-lang-code': getLocale(),
        Authorization: `Bearer ${cookie.get('token')}`
      };
    },
    registerInterceptors: interceptors => {
      interceptors.request.use(config => {
        (() => {
          if (config.headers['appName'] && config.headers['env']) {
            config.baseURL = `${window.runtimeGatewayUrl}/${config.headers['appName']}/${config.headers['env']}`;
            return;
          }
          if (config.headers['appName']) {
            config.baseURL = `${window.runtimeGatewayUrl}/${config.headers['appName']}`;
            return;
          }
        })();

        delete config.headers['appName'];
        delete config.headers['env'];
        return config;
      });
    },
    errorHandler: error => message.error(error)
  });
  fetchPreset({
    ajax,
    loading: (
      <Spin
        delay={500}
        style={{
          position: 'absolute',
          left: '50%',
          padding: '10px',
          transform: 'translateX(-50%)'
        }}
      />
    ),
    error: null,
    empty: <Empty />,
    transformResponse: response => {
      const { data } = response;
      response.data = {
        code: data.code === 0 ? 200 : data.code,
        msg: data.msg,
        results: data.data
      };
      return response;
    }
  });
  const registry = {
    url: 'https://cdn.leapin-ai.com',
    tpl: '{{url}}/components/@kne-components/{{remote}}/{{version}}/build'
  };

  const componentsCoreRemote = {
    ...registry,
    //url: 'http://localhost:3001',
    //tpl: '{{url}}',
    remote: 'components-core',
    defaultVersion: '0.3.32'
  };
  remoteLoaderPreset({
    remotes: {
      default: componentsCoreRemote,
      'components-core': componentsCoreRemote,
      'components-iconfont': {
        ...registry,
        remote: 'components-iconfont',
        defaultVersion: '0.2.1'
      },
      'components-ckeditor': {
        ...registry,
        remote: 'components-ckeditor',
        defaultVersion: '0.2.5'
      },
      'leapin-saas-sdk':
        process.env.NODE_ENV === 'development'
          ? {
              remote: 'leapin-saas-sdk',
              url: '/',
              tpl: '{{url}}'
            }
          : {
              ...registry,
              remote: 'leapin-saas-sdk',
              defaultVersion: process.env.DEFAULT_VERSION
            }
    }
  });

  return {
    ajax,
    locale: (() => {
      const locale = getLocale();
      if (locale === 'zh-Hans' || window.navigator.language === 'zh-CN') {
        return 'zh-CN';
      }
      return 'en-US';
    })(),
    apis: Object.assign({}, getApis(), {
      file: {
        contentWindowUrl: 'https://cdn.leapin-ai.com/components/@kne/iframe-resizer/0.1.3/dist/contentWindow.js', //pdfjsUrl: 'https://cdn.leapin-ai.com/components/pdfjs-dist/4.4.168',
        upload: async ({ file }) => {
          /*return {
                                                                                                                        data: {
                                                                                                                          code: 0,
                                                                                                                          data: {
                                                                                                                            src: 'https://user-video-staging.oss-cn-hangzhou.aliyuncs.com/tenant-89/candidate/cv/17700713ccc28c0ce29d6b87237bb8b5.pdf',
                                                                                                                            filename: file.name
                                                                                                                          }
                                                                                                                        }
                                                                                                                      };*/
          const { data: resData } = await ajax(
            Object.assign(
              {},
              {
                url: '/api/common/upload/token',
                params: { media_params: 'candidate-cv' },
                method: 'GET'
              }
            )
          );
          if (resData.code !== 0) {
            return { code: resData.code, msg: resData.error_msg };
          }
          const ossConfig = resData.data;

          const md5Hash = await new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsBinaryString(file);
            fileReader.onload = e => {
              const md5Hash = md5(e.target.result);
              resolve(md5Hash);
            };
            fileReader.onerror = () => {
              reject();
            };
          });

          const targetFileName = `${md5Hash}.${file.name.split('.').pop()}`;

          const { data: uploadRes } = await ajax.postForm(
            Object.assign(
              {},
              {
                url: ossConfig.host,
                showError: false,
                data: {
                  key: `${ensureSlash(ossConfig.dir, true)}${targetFileName}`,
                  'x-oss-object-acl': 'public-read',
                  policy: ossConfig.policy,
                  OSSAccessKeyId: ossConfig.OSSAccessKeyId,
                  signature: ossConfig.Signature,
                  success_action_status: 201,
                  file
                }
              }
            )
          );
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(uploadRes, 'text/xml');
          xmlDoc.getElementsByTagName('Location');
          return {
            data: {
              code: 0,
              data: { src: xmlDoc.getElementsByTagName('Location')[0].textContent, filename: file.name }
            }
          };
        }
      }
    }),
    themeToken: {
      colorPrimary: '#285BC0'
    }
  };
};
