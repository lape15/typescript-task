import { useContext, useState, useEffect, useCallback } from 'react';
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
    isValid: false,
  });
  const { state, dispatch } = useContext(GlobalContext);
  const { showAddScheduleModal } = state;
  const { zones } = state;
  const [availableZones, setAvailableZones] = useState<Zone[]>([zones]);
  const [selectedZones, setSelectedZones] = useState<Zone[] | any>([]);

  useEffect(() => {
    setAvailableZones(zones);
  }, [zones]);

  const handleInputChange = (e: {
    target: HTMLInputElement | HTMLSelectElement;
  }) => {
    setZoneDetails({
      ...zoneDetails,
      [e.target.name]: e.target.value,
      isValid: checkValidity(),
    });
    if (e.target.name === 'zone') {
      let oneZone = availableZones.find((zone) => zone.name === e.target.value);
      setSelectedZones([...selectedZones, oneZone]);
      const newZone = availableZones.filter((zone) => zone.id !== oneZone?.id);
      setAvailableZones(newZone);
    }
  };

  useEffect(() => {
    if (!showAddScheduleModal) {
      setZoneDetails({
        zone: '',
        temperature: 0,
        time: '',
        isValid: false,
      });
      setSelectedZones([]);
      setAvailableZones(zones);
    }
  }, [showAddScheduleModal, zones]);

  const checkValidity = () => {
    let valid = true;
    valid = zoneDetails.zone !== '' && valid;
    valid = zoneDetails.temperature !== 0 && valid;
    valid = zoneDetails.time !== '' && valid;
    return valid;
  };
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const final = selectedZones.map((zone: Zone) => ({
      zone: zone.name,
      temperature: Number(zoneDetails.temperature),
      time: zoneDetails.time,
    }));
    dispatch(addZonesToSchedule(final));
  };

  //This function will definetely need to be refactored to make it cleaner and more readable.

  const deleteSelectedZone = useCallback(
    (index: number) => {
      const tempArray = selectedZones;
      const slicedArr = [...selectedZones];
      tempArray.splice(index, 1);
      const sliced = slicedArr.slice(index, index + 1);
      setSelectedZones([...tempArray]);
      setAvailableZones([...availableZones, ...sliced]);
    },
    [selectedZones, availableZones]
  );

  return (
    <ModalWrapper showModal={showAddScheduleModal}>
      <form className="form_wrapper" onSubmit={handleFormSubmit}>
        <header>
          <h2>Schedule</h2>
          <button
            onClick={() => dispatch(doShowAddScheduleModal(false))}
            type="button"
          >
            <span className="Button_buttonIcon___rrTs material-icons-round">
              close
            </span>
          </button>
        </header>
        <main>
          <div className="input_con">
            <label>Zones</label>

            <div className="selected_zones">
              {selectedZones.map((zone: Zone, index: number) => (
                <button
                  type="button"
                  className="selected"
                  key={index}
                  onClick={() => deleteSelectedZone(index)}
                >
                  {zone.name}&nbsp;&nbsp;X
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
              <option
                value="Select Zones"
                // selected
                style={{ pointerEvents: 'none', opacity: 0.5 }}
              >
                Select Zones
              </option>
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

          <button className="btn" type="submit" disabled={!zoneDetails.isValid}>
            Save
          </button>
        </footer>
      </form>
    </ModalWrapper>
  );
};

export default AddSchedule;
