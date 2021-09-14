import {IUser} from "../../../models/IUser";
import {EventActionEnum, SetEventErrorAction, SetEventIsLoadingAction, SetEventsAction, SetGuestAction} from "./types";
import {AppDispatch} from "../../index";
import UserService from "../../../api/UserService";
import {ICalendar} from "../../../models/ICalendar";

export const EventActionCreators = {
    setGuest: (guest: IUser[]): SetGuestAction => ({type: EventActionEnum.SET_GUEST, payload: guest}),
    setEvents: (events: ICalendar[]): SetEventsAction => ({type: EventActionEnum.SET_EVENTS, payload: events}),
    setIsError: (error: string): SetEventErrorAction => ({type: EventActionEnum.SET_ERROR, payload: error}),
    setIsLoading: (loading: boolean): SetEventIsLoadingAction => ({
        type: EventActionEnum.SET_IS_LOADING,
        payload: loading
    }),

    fetchGuest: () => async (dispatch: AppDispatch) => {
        try {
            const guest = await UserService.getUsers()
            dispatch(EventActionCreators.setGuest(guest.data))
        } catch (e) {
            console.log(e)
        }
    },
    fetchEvents: (username: string) => async (dispatch: AppDispatch) => {
        try {
            dispatch(EventActionCreators.setIsLoading(true));
            const events = JSON.parse(localStorage.getItem('events') || '[]') as ICalendar[];
            const currentUserEvents = events.filter(ev => ev.author === username || ev.guest === username);
            dispatch(EventActionCreators.setEvents(currentUserEvents))
        } catch (e) {
            dispatch(EventActionCreators.setIsLoading(false));
            console.log(e)
        }
    },
    createEvent: (event: ICalendar, username: string) => async (dispatch: AppDispatch) => {
        try {
            const events = localStorage.getItem("events") || '[]';
            const json = JSON.parse(events) as ICalendar[];
            json.push(event)
            const currentUserEvents = json.filter(ev => ev.author === username || ev.guest === username);
            dispatch(EventActionCreators.setEvents(currentUserEvents))
            localStorage.setItem('events', JSON.stringify(json))
        } catch (e) {
            console.log(e)
        }
    }


}