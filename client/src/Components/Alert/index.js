import { useSelector } from 'react-redux';
import Loading from '../Loading';
import Toast from './Toast';

function Alert() {
  const { alert } = useSelector((state) => state);
  return (
    <div>
      {alert.loading && <Loading />}
      {alert.error && <Toast msg={alert.error} error />}
    </div>
  );
}

export default Alert;
