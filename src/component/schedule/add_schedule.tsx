import { useContext, useState, useEffect } from 'react';
import ModalWrapper from '../modal/modal_wrapper';
import { GlobalContext } from '../../context';
import {
  changeTemperatureUnit,
  doShowAddScheduleModal,
  addZonesToSchedule,
} from '../../actions';
import './add_schedule.css';

interface Zone {
  name: string;
  id: number;
}

const AddSchedule = () => {
  const [zoneDetails, setZoneDetails] = useState({
    zone: '',
    temperature: 0,
    time: '',
  });
  const { state, dispatch } = useContext(GlobalContext);
  const { showAddScheduleModal } = state;
  const { zones } = state;
  const [availableZones, setAvailableZones] = useState<Zone[]>([zones]);
  const [selectedZones, setSelectedZones] = useState<string[]>([]);

  useEffect(() => {
    setAvailableZones(zones);
  }, [zones]);

  const handleInputChange = (e: {
    target: HTMLInputElement | HTMLSelectElement;
  }) => {
    setZoneDetails({ ...zoneDetails, [e.target.name]: e.target.value });
    if (e.target.name === 'zone') {
      setSelectedZones([...selectedZones, e.target.value]);
      const newZone = availableZones.filter(
        (zone) => zone.name !== e.target.value
      );
      setAvailableZones(newZone);
    }
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const final = selectedZones.map((zone) => ({
      zone: zone,
      temperature: Number(zoneDetails.temperature),
      time: zoneDetails.time,
    }));
    dispatch(addZonesToSchedule(final));
  };

  const deleteSelectedZone = (index: number) => {
    const tempArray = selectedZones;
    tempArray.splice(index, 1);
    setSelectedZones(tempArray);
  };

  return (
    <ModalWrapper showModal={showAddScheduleModal}>
      <form className="form_wrapper" onSubmit={handleFormSubmit}>
        {console.log({ availableZones })}
        <header>
          <h2>Schedule</h2>
          <button onClick={() => dispatch(doShowAddScheduleModal(false))}>
            <span className="Button_buttonIcon___rrTs material-icons-round">
              close
            </span>
          </button>
        </header>
        <main>
          <div className="input_con">
            <label>Zones</label>

            <div className="selected_zones">
              {selectedZones.map((zone, index) => (
                <button
                  className="selected"
                  key={index}
                  onClick={() => deleteSelectedZone(index)}
                >
                  {zone}&nbsp;&nbsp;X
                </button>
              ))}
            </div>

            <select
              name="zone"
              id=""
              className="input"
              value={zoneDetails.zone}
              onChange={handleInputChange}
            >
              {availableZones.map((zone: { name: string; id: number }) => (
                <option key={zone.id} value={zone.name}>
                  {zone.name}
                </option>
              ))}
            </select>
          </div>
          <div className="input_con">
            <label>Temperature</label>
            <input
              type="number"
              className="input"
              name="temperature"
              value={zoneDetails.temperature}
              onChange={handleInputChange}
            />
          </div>
          <div className="input_con">
            <label>Time</label>
            <input
              type="datetime-local"
              className="input"
              name="time"
              value={zoneDetails.time}
              onChange={handleInputChange}
            />
          </div>
        </main>

        <footer>
          <span className="footer_btn">
            <span
              className={`material-icons-round thermo ${
                state.isFahrenheit ? 'f' : 'c'
              }`}
              onClick={() => dispatch(changeTemperatureUnit())}
            >
              thermostat
            </span>
            <span onClick={() => dispatch(changeTemperatureUnit())}>
              &#8451;
            </span>
            <span onClick={() => dispatch(changeTemperatureUnit())}>
              &#8457;
            </span>
          </span>

          <button className="btn" type="submit">
            Save
          </button>
        </footer>
      </form>
    </ModalWrapper>
  );
};

export default AddSchedule;
