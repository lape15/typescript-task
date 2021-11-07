export enum ZoneActionTypes {
  FETCHING = 'FETCHING',
  FETCHED = 'FETCHED',
  CHANGE_LAYOUT = 'CHANGE_LAYOUT',
  ADD_SCHEDULE_MODAL = 'ADD_SCHEDULE_MODAL',
  ADD_ZONES_TOSCHEDULE = 'ADD_ZONES_TOSCHEDULE',
  SAVE_EDITED_ZONE = 'SAVE_EDITED_ZONE',
  DELETE_ZONE = 'DELETE_ZONE',
  FILTER_SCHEDULED_ZONES = 'FILTER_SCHEDULED_ZONES',
  SHOW_MENU = 'SHOW_MENU',
}
export interface Zone {
  name: string;
  id: number;
}

export interface ScheduledZones {
  zone: string;
  temperature: number;
  time: string;
}
export interface fetchingZones {
  type: ZoneActionTypes.FETCHING;
  payload: any;
}
export interface fetchZones {
  type: ZoneActionTypes.FETCHED;
  payload: [Zone];
}

export interface changeLayout {
  type: ZoneActionTypes.CHANGE_LAYOUT;
  payload: string;
}
export interface changeTempUnit {
  type: 'CHANGE_TEMP_UNIT';
  payload: boolean;
}
export interface showMenu {
  type: ZoneActionTypes.SHOW_MENU;
  payload: boolean;
}

export interface addZoneToSchedule {
  type: ZoneActionTypes.ADD_ZONES_TOSCHEDULE;
  payload: [];
}
export interface showAddScheduleModal {
  type: ZoneActionTypes.ADD_SCHEDULE_MODAL;
  payload: boolean;
}
export interface saveEditedZone {
  type: ZoneActionTypes.SAVE_EDITED_ZONE;
  payload: [Zone];
}

export interface deleteZone {
  type: ZoneActionTypes.DELETE_ZONE;
  payload: [];
}

export interface filerScheduledZones {
  type: ZoneActionTypes.FILTER_SCHEDULED_ZONES;
  payload: [];
}
