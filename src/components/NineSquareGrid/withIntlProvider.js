import { createWithIntlProvider } from '@kne/react-intl';
import zhCN from './locale/zh-CN';
import enUS from './locale/en-US';

const withIntlProvider = createWithIntlProvider({
  defaultLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  },
  namespace: 'leapin-saas-sdk:NineSquareGrid'
});

export default withIntlProvider;
