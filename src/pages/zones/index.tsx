import { useContext } from 'react';
import { GlobalContext } from '../../context';
import { getLayOutClass, AZone } from '../../component/utils';
import Zone from '../../component/zone/zone';

const Zones = () => {
  const { state } = useContext(GlobalContext);
  const { zones, scheduledZones, layout } = state;

  const getScheduledZones = (arr1: AZone[], arr2: AZone[]) => {
    let first = [...arr1];
    let second = [...arr2];
    for (let i = 0; i < first.length; i += 1) {
      const count = second.filter((sec) => first[i].name === sec.zone).length;
      first[i].count = count;
      first[i].temperature = count > 0 ? Math.floor(Math.random() * 10) : 0;
    }
    return first;
  };
  return (
    <div className="list_con">
      <h2 className="list_title">All zones({zones.length})</h2>
      <ul className={`${getLayOutClass(layout)}`}>
        {getScheduledZones(zones, scheduledZones).map(
          (zone: AZone, index: number) => (
            <Zone zone={zone} key={index} index={index} scheduled={true} />
          )
        )}
      </ul>
    </div>
  );
};

export default Zones;
