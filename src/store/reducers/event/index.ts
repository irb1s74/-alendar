import {EventActionEnum, EventActions, EventState} from "./types";
import {ICalendar} from "../../../models/ICalendar";
import {IUser} from "../../../models/IUser";

const initialState: EventState = {
    guest: [] as IUser[],
    events: [] as ICalendar[],
    isLoading: false,
    error: '',
}
export default function EventReducer(state = initialState, action: EventActions): EventState {
    switch (action.type) {
        case EventActionEnum.SET_GUEST:
            return {...state, guest: <IUser[]>action.payload, isLoading: false}
        case EventActionEnum.SET_EVENTS:
            return {...state, events: <ICalendar[]>action.payload, isLoading: false}
        case EventActionEnum.SET_ERROR:
            return {...state, error: action.payload, isLoading: false}
        case EventActionEnum.SET_IS_LOADING:
            return {...state, isLoading: action.payload}
        default:
            return state;
    }
}