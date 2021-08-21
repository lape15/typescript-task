import { Switch, Route } from 'react-router-dom';
import { Header } from '../layout/header';
import './pages.css';
import ScheduleSettings from '../layout/schedule-header';
import AddSchedule from '../component/schedule/add_schedule';
import ScheduledZones from './schedules/scheduled_zones';

export const Pages = () => {
  return (
    <div className="pages">
      <Header label="What" count={2} onIncrement={() => console.log('welp')} />
      <div className="pages_con">
        <ScheduleSettings />
        <Switch>
          <Route component={ScheduledZones} path="/" exact />
        </Switch>
      </div>
      <AddSchedule />
    </div>
  );
};
