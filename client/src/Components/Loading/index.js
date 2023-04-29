import classNames from 'classnames/bind';
import style from './Loading.module.scss';

const cx = classNames.bind(style);

function Loading() {
  return (
    <div className={cx('loading')}>
      <div className={cx('pac-man')}></div>
    </div>
  );
}

export default Loading;
