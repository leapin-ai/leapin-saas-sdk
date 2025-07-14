import { createWithRemoteLoader } from '@kne/remote-loader';
import useControlValue from '@kne/use-control-value';
import { Card, Flex, Spin } from 'antd';
import Fetch from '@kne/react-fetch';
import get from 'lodash/get';
import classnames from 'classnames';
import style from './style.module.scss';

const BrandingField = createWithRemoteLoader({
  modules: ['components-core:Global@usePreset', 'components-core:Common@SimpleBar']
})(({ remoteModules, account, seekAdvertisementProduct, brandingFeatures, ...props }) => {
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
            {/*{(!brandingFeatures?.logoIndicator || !brandingFeatures?.coverImageIndicator) && (*/}
            {/*  <div className={style['branding-description']}>*/}
            {/*    {!brandingFeatures?.logoIndicator && 'The cover image will not appear in the ad based on the currently selected ad type.'}*/}
            {/*    {!brandingFeatures?.coverImageIndicator && 'The logo will not appear in the ad based on the currently selected ad type.'}*/}
            {/*  </div>*/}
            {/*)}*/}
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
                    }}>
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
