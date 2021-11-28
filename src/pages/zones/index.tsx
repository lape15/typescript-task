import { useContext } from 'react';
import { GlobalContext } from '../../context';

const Zones = () => {
  const { state } = useContext(GlobalContext);
  const { zones, scheduledZones } = state;
  return (
    <div>
      {console.log({ zones, scheduledZones })}
      All zones stay here and behave
    </div>
  );
};

export default Zones;
