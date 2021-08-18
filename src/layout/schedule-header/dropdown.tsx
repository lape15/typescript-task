import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../context';
import { fetchedZones, fetchingZones } from '../../actions';

const ZONES_URL =
  'https://my-json-server.typicode.com/ivanturianytsia-envio/json-data/zones';

export const Dropdown = () => {
  const [zone, setZone] = useState<string>('All Zone');
  const { state, dispatch } = useContext(GlobalContext);
  useEffect(() => {
    dispatch(fetchingZones());
    fetch(ZONES_URL)
      .then((response) => response.json())
      .then((response) => dispatch(fetchedZones(response)))
      .catch((err) => console.log(err));
  }, [dispatch]);
  const { zones } = state;

  const handleZoneNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setZone(event.target.value);
  };

  return (
    <div className="item_box">
      <label>
        Zones:
        <select value={zone} onChange={(e) => setZone(e.target.value)}>
          <option value="all" selected>
            All zones
          </option>
          {zones.map((zone: { name: string; id: number }) => (
            <option key={zone.id} value={zone.name}>
              {zone.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
};
