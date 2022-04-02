import { memo, useState, useContext } from 'react';
import { deleteZone } from '../../actions';
import { GlobalContext } from '../../context';
import { EditZone } from '../../pages/schedules/edit_zone';
import { AZone } from '../utils';
type Props = {
  zone: AZone;
  scheduled?: boolean;
  index: number;
};
const Zone: React.FC<Props> = (props) => {
  const [showEditModal, setSowEditModal] = useState(false);
  const { zone, index, scheduled } = props;
  const { dispatch } = useContext(GlobalContext);
  const handleShowEditModal = () => setSowEditModal(!showEditModal);

  return (
    <li>
      <div className="flex_container">
        <div className="list_itemtemp flex_container item-center">
          {zone.temperature ? zone.temperature : 'N/A'}&#176;
        </div>

        {!scheduled && (
          <h3 className="list_temp flex_container">
            <span className="material-icons-round text_icon">schedule</span>
            &nbsp;
            {new Date(zone.time).toDateString()}
          </h3>
        )}

        <h4 className="list_temp flex_container">
          <span className=" material-icons-round text_icon">pin_drop</span>
          &nbsp;
          {zone.zone ?? zone.name}
        </h4>
      </div>
      {scheduled && (
        <div className="list_buttons flex_container">
          <span className="Button_buttonIcon___rrTs material-icons-round">
            alarm_add
          </span>
          &nbsp;
          {zone.count! <= 1
            ? zone.count + 'schedule '
            : zone.count + 'schedules'}
        </div>
      )}

      {scheduled ? (
        <div className="list_buttons flex_container">
          <button type="button">
            <span className="Button_buttonIcon___rrTs material-icons-round">
              alarm_add
            </span>
          </button>
        </div>
      ) : (
        <div className="list_buttons flex_container">
          <button type="button" onClick={handleShowEditModal}>
            <span className="material-icons-round">edit</span>
          </button>
          &nbsp;&nbsp;
          <button
            type="button"
            className="del"
            onClick={() => dispatch(deleteZone(index))}
          >
            <span className="material-icons-round">delete_outline</span>
          </button>
        </div>
      )}

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
