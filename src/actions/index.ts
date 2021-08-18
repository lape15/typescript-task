import { ZoneActionTypes, Zone } from './types';

export const changeTemperatureUnit = () => ({
  type: 'CHANGE_TEMP_UNIT',
});

export const fetchingZones = () => ({
  type: ZoneActionTypes.FETCHING,
  payload: {
    loading: true,
  },
});

export const fetchedZones = (items: [Zone]) => ({
  type: ZoneActionTypes.FETCHED,
  payload: items,
});
