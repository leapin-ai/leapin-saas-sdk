import { createIntlProvider } from '@kne/react-intl';
import zhCN from './locale/zh-CN';
import enUS from './locale/en-US';

const IntlProvider = createIntlProvider({
  defaultLocale: 'zh-CN',
  messages: {
    'zh-CN': zhCN,
    'en-US': enUS
  },
  namespace: 'leapin-saas-sdk:InventoryReport'
});

export default IntlProvider;
