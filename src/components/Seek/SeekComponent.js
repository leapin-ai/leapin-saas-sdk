import { createWithFetch } from '@kne/react-fetch';
import { getOrLoadRemote } from '@kne/remote-loader';
import { useEffect, useRef, memo } from 'react';
import isEqualWith from 'lodash/isEqualWith';

const SeekComponent = createWithFetch({
  loader: () => {
    return getOrLoadRemote('seekApis', null, 'https://integration.seek.com/panels/SeekApi.js');
  }
})(
  memo(
    ({ name, ...props }) => {
      const ref = useRef(null);
      useEffect(() => {
        console.log('rerender');
        window.SeekApi.render(ref.current, name, props);
      }, [name, props]);
      return <div ref={ref} />;
    },
    (prevProps, nextProps) => {
      return isEqualWith(prevProps, nextProps, (a, b) => {
        if (typeof a === 'function' && typeof b === 'function') {
          return true;
        }
      });
    }
  )
);

export default SeekComponent;
