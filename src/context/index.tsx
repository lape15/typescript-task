import { useReducer, createContext, Dispatch, useMemo } from 'react';
import {
  fetchZones,
  fetchingZones,
  changeLayout,
  changeTempUnit,
  Zone,
  ZoneActionTypes,
  showAddScheduleModal,
  addZoneToSchedule,
} from '../actions/types';

type State = {
  isGrid: boolean;
  addSchedule: boolean;
  loading: boolean;
  zones: Array<Zone>;
  scheduledZones: [Zone];
  isFahrenheit: boolean;
  layout: string;
  showAddScheduleModal: boolean;
};

type ProviderProps = {
  children: React.ReactNode;
};

type ZoneActions =
  | fetchingZones
  | fetchZones
  | changeLayout
  | changeTempUnit
  | showAddScheduleModal
  | addZoneToSchedule;

const initialState = {
  isGrid: false,
  addSchedule: false,
  zones: [],
  scheduledZones: [],
  loading: true,
  isFahrenheit: true,
  layout: 'list',
  showAddScheduleModal: false,
};

function globalReducer(state: State, action: ZoneActions) {
  const { type, payload } = action;
  switch (type) {
    case ZoneActionTypes.FETCHING:
      return {
        ...state,
        ...payload,
      };

    case ZoneActionTypes.FETCHED:
      return {
        ...state,
        loading: false,
        zones: payload,
      };

    case 'CHANGE_TEMP_UNIT':
      return {
        ...state,
        isFahrenheit: !state.isFahrenheit,
      };

    case ZoneActionTypes.CHANGE_LAYOUT:
      return {
        ...state,
        layout: payload,
      };
    case ZoneActionTypes.ADD_SCHEDULE_MODAL:
      return {
        ...state,
        showAddScheduleModal: payload,
      };
    case ZoneActionTypes.ADD_ZONES_TOSCHEDULE:
      return {
        ...state,
        scheduledZones: payload,
      };
    default:
      return state;
  }
}
export const GlobalContext = createContext<State | any>(null);
export const DispatchContext = createContext<Dispatch<ZoneActions> | null>(
  null
);

const GlobalContextProvider = ({ children }: ProviderProps) => {
  const [state, dispatch] = useReducer<any>(globalReducer, initialState);

  const memoizedValues = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <GlobalContext.Provider value={memoizedValues}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContextProvider;
