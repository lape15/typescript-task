import { useContext } from 'react';
import DisplayBox from './display-box';
import { Dropdown } from './dropdown';
import './schedule_settings.css';
import { GlobalContext } from '../../context';
import { doShowAddScheduleModal } from '../../actions';

const Button = () => {
  const { dispatch } = useContext(GlobalContext);
  return (
    <div className="add_con">
      <button onClick={() => dispatch(doShowAddScheduleModal(true))}>
        Add schedule
      </button>
    </div>
  );
};
const ScheduleSettings = () => {
  return (
    <div className="schedule_filter">
      <Dropdown />
      <DisplayBox />
      <Button />
    </div>
  );
};
export default ScheduleSettings;
