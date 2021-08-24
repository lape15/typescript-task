import { ZoneActionTypes, Zone, ScheduledZones } from './types';

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

export const changeLayout = (layout: string) => ({
  type: ZoneActionTypes.CHANGE_LAYOUT,
  payload: layout,
});

export const doShowAddScheduleModal = (show: boolean) => ({
  type: ZoneActionTypes.ADD_SCHEDULE_MODAL,
  payload: show,
});

export const addZonesToSchedule = (zones: ScheduledZones[]) => ({
  type: ZoneActionTypes.ADD_ZONES_TOSCHEDULE,
  payload: zones,
});

export const saveEditedZone = (index: number, zone: any) => ({
  type: ZoneActionTypes.SAVE_EDITED_ZONE,
  payload: { index, zone },
});

export const deleteZone = (index: number) => ({
  type: ZoneActionTypes.DELETE_ZONE,
  payload: index,
});
