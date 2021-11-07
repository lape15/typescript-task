import { useContext, useState } from 'react';
import { GlobalContext } from '../../context';
import { changeLayout } from '../../actions';

const DisplayBox = () => {
  const [display, setDisplay] = useState('list');
  const { dispatch } = useContext(GlobalContext);

  const handleDisplayChange = (e: { target: HTMLInputElement }) => {
    setDisplay(e.target.value);
    dispatch(changeLayout(e.target.value));
  };

  return (
    <div className="item_box hide">
      <label>Display:</label>
      <div className="icons_con">
        <label className="icon" title="List">
          <input
            type="radio"
            value="list"
            onChange={handleDisplayChange}
            checked={display === 'list'}
          />
          <span className="material-icons-round">view_list</span>
        </label>
        <label className="icon" title="Grid">
          <input
            type="radio"
            value="grid"
            onChange={handleDisplayChange}
            checked={display === 'grid'}
          />
          <span className="material-icons-round">grid_view</span>
        </label>
      </div>
    </div>
  );
};

export default DisplayBox;
