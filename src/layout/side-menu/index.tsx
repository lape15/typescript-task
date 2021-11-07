import { useState, useContext } from 'react';
import './side_menu.css';
import { NavLink } from 'react-router-dom';
import { GlobalContext } from '../../context';
import { doShowMenu } from '../../actions/index';

export const SideMenu = () => {
  const { dispatch, state } = useContext(GlobalContext);
  const { showMenu } = state;
  const [, setshowMenu] = useState<boolean>(false);

  return (
    <div className={`menu_wrapper ${showMenu && 'open'}`}>
      <div className={`menu ${showMenu && 'open'}`}>
        <button
          className={`menu_item ${showMenu && 'open'}`}
          onClick={() => dispatch(doShowMenu(!showMenu))}
        ></button>
        <NavLink
          className="menu_link"
          to="/"
          onClick={() => showMenu && dispatch(doShowMenu(!showMenu))}
        >
          <span className={`material-icons-round ${!showMenu && 'close'}`}>
            alarm
          </span>
          Schedules
        </NavLink>
        <NavLink
          className={'menu_link'}
          to="/zones"
          onClick={() => showMenu && dispatch(doShowMenu(!showMenu))}
        >
          <span className={`material-icons-round ${!showMenu && 'close'}`}>
            pin_drop
          </span>
          Zones
        </NavLink>
      </div>
    </div>
  );
};
