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
} from '../actions/types';

import { changeTempValue } from './util';

type State = {
  isGrid: boolean;
  // addSchedule: boolean;
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
  | addZoneToSchedule
  | saveEditedZone
  | deleteZone;

const initialState = {
  isGrid: false,
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
        scheduledZones: changeTempValue(
          !state.isFahrenheit,
          state.scheduledZones
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
