import { Switch, Route } from 'react-router-dom';
import { Header } from '../layout/header';
import './pages.css';
import ScheduleSettings from '../layout/schedule-header';
import AddSchedule from '../component/schedule/add_schedule';
import ScheduledZones from './schedules/scheduled_zones';
import Zones from './zones';

export const Pages = () => {
  return (
    <div className="pages">
      <Header />
      <div className="pages_con">
        <ScheduleSettings />
        <Switch>
          <Route component={ScheduledZones} path="/" exact />
          <Route component={Zones} path="/zones" exact />
        </Switch>
      </div>
      <AddSchedule />
    </div>
  );
};
