import { useContext } from 'react';
import './header.css';
import { GlobalContext } from '../../context';
import { changeTemperatureUnit } from '../../actions';

type Props = {
  label: string;
  count: number;
  onIncrement: () => void;
};
export const Header: React.FC<Props> = (props) => {
  const { dispatch, state } = useContext(GlobalContext);
  return (
    <nav>
      <button className="header_btn">
        <h2>Schedules</h2>
      </button>
      <span className="header_btn2">
        <span
          className={`material-icons-round thermo ${
            state.isFahrenheit ? 'f' : 'c'
          }`}
          onClick={() => dispatch(changeTemperatureUnit())}
        >
          thermostat
        </span>
        <span onClick={() => dispatch(changeTemperatureUnit())}>&#8451;</span>
        <span onClick={() => dispatch(changeTemperatureUnit())}>&#8457;</span>
      </span>
    </nav>
  );
};