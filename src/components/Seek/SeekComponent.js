import { createWithFetch } from '@kne/react-fetch';
import { getOrLoadRemote } from '@kne/remote-loader';
import { memo, useEffect, useRef } from 'react';
import isEqualWith from 'lodash/isEqualWith';
import useRefCallback from '@kne/use-ref-callback';

const SeekComponent = createWithFetch({
  loader: () => {
    return getOrLoadRemote('seekApis', null, 'https://integration.seek.com/panels/SeekApi.js');
  }
})(
  memo(
    ({ name, payload, getApis, ...props }) => {
      const ref = useRef(null);
      useRefCallback(ref);
      useEffect(() => {
        console.log('rerender');
        try {
          const apis = window.SeekApi.render(ref.current, name, Object.assign({}, props, payload));
          getApis && getApis(apis);
        } catch (error) {
          console.error('SeekApi渲染失败:', error);
        }
      }, [name, props]);
      return <div ref={ref} />;
    },
    (prevProps, nextProps) => {
      return isEqualWith(prevProps.payload, nextProps.payload, (a, b) => {
        if (typeof a === 'function' && typeof b === 'function') {
          return true;
        }
      });
    }
  )
);

export default SeekComponent;
