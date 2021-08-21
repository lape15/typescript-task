import { useState } from 'react';
import './side_menu.css';
import { NavLink } from 'react-router-dom';

export const SideMenu = () => {
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };
  return (
    <div className="menu_wrapper">
      <div className={`menu ${openMenu && 'open'}`}>
        <button
          className={`menu_item ${openMenu && 'open'}`}
          onClick={handleMenu}
        ></button>
        <NavLink
          className="menu_link"
          to="/"
          onClick={() => openMenu && handleMenu()}
        >
          <span className={`material-icons-round ${!openMenu && 'close'}`}>
            alarm
          </span>
          Schedules
        </NavLink>
        <NavLink
          className={'menu_link'}
          to="/zones"
          onClick={() => openMenu && handleMenu()}
        >
          <span className={`material-icons-round ${!openMenu && 'close'}`}>
            pin_drop
          </span>
          Zones
        </NavLink>
      </div>
    </div>
  );
};
