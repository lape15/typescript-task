type Props = {
  zone: {
    zone: string;
    temperature: number;
    time: string;
  };
};
const Zone: React.FC<Props> = (props) => {
  const { zone } = props;
  console.log({ zone });
  return (
    <li>
      <div className="flex_container">
        <div className="list_itemtemp">
          {zone.temperature ? zone.temperature : ''}&#176;
        </div>
        <h3 className="">
          <span className="material-icons-round">schedule</span>&nbsp;
          {new Date(zone.time).toDateString()}
        </h3>
        <h4 className="">
          <span className=" material-icons-round">pin_drop</span>&nbsp;
          {zone.zone}
        </h4>
      </div>
      <div></div>
    </li>
  );
};

export default Zone;
