export enum ZoneActionTypes {
  FETCHING = 'FETCHING',
  FETCHED = 'FETCHED',
  CHANGE_LAYOUT = 'CHANGE_LAYOUT',
}
export interface Zone {
  name: string;
  id: number;
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
  payload: boolean;
}
export interface changeTempUnit {
  type: 'CHANGE_TEMP_UNIT';
  payload: boolean;
}
