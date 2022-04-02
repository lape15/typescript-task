import { useState, useContext } from 'react';
import { saveEditedZone } from '../../actions';
import ModalWrapper from '../../component/modal/modal_wrapper';
import { GlobalContext } from '../../context';

type Props = {
  zone: {
    zone: string;
    temperature: number;
    time: string;
  };
  index: number;
  showModal: boolean;
  handleShowEditModal: () => void;
};
interface editedZone {
  zone: string;
  temperature: number;
  time: string;
}

export const EditZone: React.FC<Props> = (props) => {
  const { state, dispatch } = useContext(GlobalContext);
  const { zone, index, showModal, handleShowEditModal } = props;
  const [zoneDetails, setZoneDetails] = useState({
    zone: zone.zone,
    temperature: zone.temperature,
    time: zone.time,
    isValid: false,
  });

  const handleInputChange = (e: {
    target: HTMLInputElement | HTMLSelectElement;
  }) => {
    setZoneDetails({
      ...zoneDetails,
      [e.target.name]: e.target.value,
      isValid: checkValidity(),
    });
  };

  function getFieldValue(key: keyof editedZone) {
    return zoneDetails[key];
  }

  const checkValidity = () => {
    let valid = true;
    const zonesObj = Object.keys(zoneDetails).splice(0, 3);
    for (let i = 0; i <= zonesObj.length; i += 1) {
      valid = getFieldValue(zonesObj[i] as keyof editedZone) !== '' && valid;
    }
    return valid;
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const editedZone: editedZone = {
      zone: zoneDetails.zone,
      temperature: zoneDetails.temperature,
      time: zoneDetails.time,
    };
    dispatch(saveEditedZone(index, editedZone));
    handleShowEditModal();
  };

  return (
    <ModalWrapper showModal={showModal}>
      <form className="form_wrapper" onSubmit={handleFormSubmit}>
        <header>
          <h2>Schedule</h2>
          <button onClick={() => handleShowEditModal()} type="button">
            <span className="Button_buttonIcon___rrTs material-icons-round">
              close
            </span>
          </button>
        </header>
        <main>
          <div className="input_con">
            <label>Zones</label>

            <select
              name="zone"
              className="input"
              value={zoneDetails.zone}
              disabled
            >
              <option
                value={zone.zone}
                style={{ pointerEvents: 'none' }}
                disabled
              >
                {zoneDetails.zone}
              </option>
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
              //   onClick={() => dispatch(changeTemperatureUnit())}
            >
              thermostat
            </span>
            <span
            // onClick={() => dispatch(changeTemperatureUnit())}
            >
              &#8451;
            </span>
            <span
            // onClick={() => dispatch(changeTemperatureUnit())}
            >
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
