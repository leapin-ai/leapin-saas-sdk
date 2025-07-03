import NineSquareGridView from '@components/NineSquareGrid';
import { ReactComponent as LocationIcon } from './location.svg';
import style from './style.module.scss';

const NineSquareGrid = ({ value, ...props }) => {
  return (
    <NineSquareGridView
      {...props}
      values={{
        [value]: <LocationIcon className={style['location-icon']} />
      }}
    />
  );
};

export default NineSquareGrid;
