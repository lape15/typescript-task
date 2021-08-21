import { useContext } from 'react';
import { GlobalContext } from '../../context';
import './schedule.css';
import Zone from './zone';

interface AZone {
  zone: string;
  temperature: number;
  time: string;
}
const ScheduledZones = () => {
  const { state } = useContext(GlobalContext);
  const { scheduledZones } = state;
  return (
    <div className="list_con">
      <h2 className="list_title">All zones({scheduledZones.length})</h2>
      {scheduledZones.length ? (
        <ul className="list">
          {scheduledZones.map((zone: AZone, index: number) => (
            <Zone zone={zone} key={index} />
          ))}
        </ul>
      ) : (
        <div className="empty_box flex_container">
          <h3 className="empty">You have no schedule</h3>
          <h4>Please add a new item</h4>
        </div>
      )}
    </div>
  );
};

export default ScheduledZones;
