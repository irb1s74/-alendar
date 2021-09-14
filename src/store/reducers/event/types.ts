import {IUser} from "../../../models/IUser";
import {ICalendar} from "../../../models/ICalendar";

export interface EventState {
    guest: IUser[],
    events: ICalendar[],
    isLoading: boolean,
    error: string,
}

export enum EventActionEnum {
    SET_GUEST = 'SET_GUEST',
    SET_EVENTS = 'SET_EVENTS',
    SET_ERROR = 'SET_ERROR',
    SET_IS_LOADING = 'SET_IS_LOADING'
}

export interface SetGuestAction {
    type: EventActionEnum.SET_GUEST,
    payload: IUser[],
}

export interface SetEventsAction {
    type: EventActionEnum.SET_EVENTS,
    payload: ICalendar[]
}

export interface SetEventErrorAction {
    type: EventActionEnum.SET_ERROR,
    payload: string
}

export interface SetEventIsLoadingAction {
    type: EventActionEnum.SET_IS_LOADING,
    payload: boolean
}

export type EventActions =
    SetGuestAction |
    SetEventsAction |
    SetEventErrorAction |
    SetEventIsLoadingAction;

