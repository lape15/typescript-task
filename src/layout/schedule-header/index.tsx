import DisplayBox from './display-box';
import { Dropdown } from './dropdown';
import './schedule_settings.css';

const Button = () => (
  <div className="add_con">
    <button>Add schedule</button>
  </div>
);

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
