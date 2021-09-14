import React, {FC} from 'react';
import {Calendar} from "antd";
import {ICalendar} from "../../models/ICalendar";
import {Moment} from "moment/moment";
import {formatDate} from "../../utils/date";

interface EventProps {
    events: ICalendar[]
}

const EventCalendar: FC<EventProps> = (props) => {
    function dateCellRender(value: Moment) {
        const formatedDate = formatDate(value.toDate())
        const currentDatEvents = props.events.filter(ev => ev.date === formatedDate)

        return (
            <div>
                {currentDatEvents.map((ev, index) => (
                    <div key={index}>
                        {ev.description}
                    </div>
                ))}
            </div>
        );
    }

    return (
        <Calendar
            dateCellRender={dateCellRender}
        />
    );
};

export default EventCalendar;