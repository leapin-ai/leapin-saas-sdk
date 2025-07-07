import Header from './Header';
import { Flex, Tabs } from 'antd';
import style from './style.module.scss';
import { FormattedMessage } from '@kne/react-intl';
import Summary from './Summary';
import Record from './Record';
import Fetch from '@kne/react-fetch';

const Report = ({ title, exportDisabled, shareLink, apis }) => {
  return (
    <Fetch
      {...Object.assign({}, apis.detail)}
      render={({ data }) => {
        return (
          <div id="inventoryReportPrintTarget">
            <Flex vertical>
              <Header data={data} title={title} exportDisabled={exportDisabled} apis={apis} shareLink={shareLink} />
              <Tabs
                className={style['report-content']}
                items={[
                  {
                    label: <FormattedMessage id="tabReport" />,
                    key: 'summary',
                    children: <Summary data={data} />
                  },
                  {
                    label: <FormattedMessage id="tabReview" />,
                    key: 'record',
                    children: <Fetch {...Object.assign({}, apis.answer)} render={({ data }) => <Record data={data} />} />
                  }
                ]}
              />
            </Flex>
          </div>
        );
      }}
    />
  );
};

export default Report;
