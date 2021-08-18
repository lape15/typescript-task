const DisplayBox = () => {
  return (
    <div className="item_box">
      <label>Display:</label>
      <div className="icons_con">
        <label className="icon">
          <input type="radio" value="grid" />
          <span className="material-icons-round">view_list</span>
        </label>
        <label className="icon">
          <input type="radio" value="grid" />
          <span className="material-icons-round">grid_view</span>
        </label>
      </div>
    </div>
  );
};

export default DisplayBox;
