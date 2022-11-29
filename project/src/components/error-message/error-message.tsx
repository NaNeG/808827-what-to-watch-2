import { ReducerType } from '../../const';
import {useAppSelector} from '../../hooks';
import './error-message.css';

export default function ErrorMessage(): JSX.Element | null {
  const error = useAppSelector((state) => state[ReducerType.Main].error);

  return (error)
    ? <div className='error-message'>{error}</div>
    : null;

}
