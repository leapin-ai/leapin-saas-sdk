import { createWithRemoteLoader } from '@kne/remote-loader';
import useControlValue from '@kne/use-control-value';
import { Flex, Card, Spin } from 'antd';
import Fetch from '@kne/react-fetch';
import get from 'lodash/get';
import classnames from 'classnames';
import style from './style.module.scss';

const BrandingField = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset', 'components-core:Common@SimpleBar']
})(({ remoteModules, account, seekAdvertisementProduct, ...props }) => {
  const [value, onChange] = useControlValue(props);
  const [usePreset, SimpleBar] = remoteModules;
  const { ajax, apis } = usePreset();
  return (
    <Fetch
      {...Object.assign({}, apis.seek.getBranding, { params: { hirerId: account?.value } })}
      loading={
        <Flex wrap={false} gap={24} className={style['branding-list']}>
          <Spin />
        </Flex>
      }
      render={({ data }) => {
        return (
          <SimpleBar forceVisible autoHide={false}>
            <Flex wrap={false} gap={24} className={style['branding-list']}>
              {data.edges.map(({ node }) => {
                return (
                  <Card
                    key={get(node, 'id.value')}
                    hoverable
                    className={classnames(style['branding-card'], {
                      [style['is-active']]: value === get(node, 'id.value')
                    })}
                    cover={get(node, 'images[1].url') ? <img src={get(node, 'images[1].url')} alt="cover" /> : 'No cover image'}
                    onClick={() => {
                      onChange(get(node, 'id.value'));
                    }}
                  >
                    <Flex vertical gap={8}>
                      <img src={get(node, 'images[0].url')} alt="logo" className={style['branding-logo']} />
                      <Card.Meta title={get(node, 'name')} />
                    </Flex>
                  </Card>
                );
              })}
            </Flex>
          </SimpleBar>
        );
      }}
    />
  );
});

const Branding = createWithRemoteLoader({
  modules: ['components-core:FormInfo']
})(({ remoteModules, ...props }) => {
  const [FormInfo] = remoteModules;
  const { useOnChange } = FormInfo.hooks;
  const render = useOnChange(props);
  return render(BrandingField);
});

export default Branding;
