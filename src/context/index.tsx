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
  saveEditedZone,
  deleteZone,
  filerScheduledZones,
  ScheduledZones,
  showMenu,
} from '../actions/types';

import { changeTempValue } from './util';

type State = {
  isGrid: boolean;
  // addSchedule: boolean;
  loading: boolean;
  zones: Array<Zone>;
  scheduledZones: [ScheduledZones];
  isFahrenheit: boolean;
  layout: string;
  showAddScheduleModal: boolean;
  filteredZones: [ScheduledZones];
  showMenu: boolean;
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
  | addZoneToSchedule
  | saveEditedZone
  | deleteZone
  | filerScheduledZones
  | showMenu;

const initialState = {
  isGrid: false,
  zones: [],
  scheduledZones: [],
  loading: true,
  isFahrenheit: true,
  layout: 'list',
  showAddScheduleModal: false,
  filteredZones: [],
  showMenu: false,
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
        scheduledZones: changeTempValue(
          !state.isFahrenheit,
          state.scheduledZones
        ),
        filteredZones: changeTempValue(
          !state.isFahrenheit,
          state.filteredZones
        ),
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
        scheduledZones: [...state.scheduledZones, ...payload],
        filteredZones: [...state.scheduledZones, ...payload],
        showAddScheduleModal: false,
      };

    case ZoneActionTypes.SAVE_EDITED_ZONE: {
      const { scheduledZones } = state;
      const { index, zone } = payload;
      let holdingState = [...scheduledZones];
      holdingState.splice(index, 1, zone);
      return {
        ...state,
        scheduledZones: holdingState,
        filteredZones: holdingState,
      };
    }

    case ZoneActionTypes.DELETE_ZONE: {
      const { scheduledZones } = state;
      const { index } = payload;
      let tempState = [...scheduledZones];
      tempState.splice(index, 1);
      return {
        ...state,
        scheduledZones: tempState,
        filteredZones: tempState,
      };
    }
    case ZoneActionTypes.FILTER_SCHEDULED_ZONES: {
      const { scheduledZones } = state;
      const { zoneName } = payload;
      let holdingArr = [...scheduledZones];
      holdingArr =
        zoneName === 'all'
          ? scheduledZones
          : scheduledZones.filter((zone) => zone.zone === zoneName);
      return {
        ...state,
        filteredZones: holdingArr,
      };
    }
    case ZoneActionTypes.SHOW_MENU: {
      return {
        ...state,
        showMenu: payload,
      };
    }
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
