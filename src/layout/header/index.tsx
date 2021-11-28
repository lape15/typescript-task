import { useContext } from 'react';
import './header.css';
import { GlobalContext } from '../../context';
import { changeTemperatureUnit, doShowMenu } from '../../actions';

export const Header: React.FC = () => {
  const { dispatch, state } = useContext(GlobalContext);
  const { showMenu } = state;
  return (
    <nav>
      <button
        className={`menu_item ${showMenu && 'open'}`}
        onClick={() => dispatch(doShowMenu(!showMenu))}
      ></button>
      <button className="header_btn">
        <h2>Schedules</h2>
      </button>
      <span className="header_btn2" title="Temperature unit">
        <span
          className={`material-icons-round thermo ${
            state.isFahrenheit ? 'f' : 'c'
          }`}
          onClick={() => dispatch(changeTemperatureUnit())}
        >
          thermostat
        </span>
        <span onClick={() => dispatch(changeTemperatureUnit())}>&#8457;</span>
        <span onClick={() => dispatch(changeTemperatureUnit())}>&#8451;</span>
      </span>
    </nav>
  );
};
