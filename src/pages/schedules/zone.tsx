import { memo, useState } from 'react';
import { EditZone } from './edit_zone';
type Props = {
  zone: {
    zone: string;
    temperature: number;
    time: string;
  };
  index: number;
};
const Zone: React.FC<Props> = (props) => {
  const [showEditModal, setSowEditModal] = useState(false);
  const { zone, index } = props;
  const handleShowEditModal = () => setSowEditModal(!showEditModal);
  return (
    <li>
      <div className="flex_container">
        <div className="list_itemtemp flex_container item-center">
          {zone.temperature ? zone.temperature : ''}&#176;
        </div>
        <h3 className="list_temp flex_container">
          <span className="material-icons-round text_icon">schedule</span>&nbsp;
          {new Date(zone.time).toDateString()}
        </h3>
        <h4 className="list_temp flex_container">
          <span className=" material-icons-round text_icon">pin_drop</span>
          &nbsp;
          {zone.zone}
        </h4>
      </div>
      <div className="list_buttons flex_container">
        <button type="button" onClick={handleShowEditModal}>
          <span className="material-icons-round">edit</span>
        </button>
        &nbsp;&nbsp;
        <button type="button" className="del">
          <span className="material-icons-round">delete_outline</span>
        </button>
      </div>
      <EditZone
        zone={zone}
        index={index}
        showModal={showEditModal}
        handleShowEditModal={handleShowEditModal}
      />
    </li>
  );
};

export default memo(Zone);
