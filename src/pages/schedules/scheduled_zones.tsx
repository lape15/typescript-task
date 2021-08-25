import { useContext, memo } from 'react';
import { GlobalContext } from '../../context';
import './schedule.css';
import Zone from './zone';

interface AZone {
  zone: string;
  temperature: number;
  time: string;
}

const getLayOutClass = (layout: string) => {
  if (layout === 'list') return 'list';
  else return 'grid';
};
const ScheduledZones = (props: any) => {
  const { state } = useContext(GlobalContext);
  const { layout, filteredZones } = state;

  return (
    <div className="list_con">
      <h2 className="list_title">All zones({filteredZones.length})</h2>
      {filteredZones.length ? (
        <ul className={`${getLayOutClass(layout)}`}>
          {filteredZones.map((zone: AZone, index: number) => (
            <Zone zone={zone} key={index} {...props} index={index} />
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

export default memo(ScheduledZones);
