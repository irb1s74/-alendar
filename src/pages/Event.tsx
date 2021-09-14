import React, {FC, useEffect, useState} from 'react';
import EventCalendar from "../components/EventComponents/EventCalendar";
import {Button, Layout, Modal, Row} from "antd";
import EventForm from "../components/form/EventForm";
import {useActions} from "../hooks/useActions";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {ICalendar} from "../models/ICalendar";

const Event: FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const {guest, events} = useTypedSelector(state => state.event)
    const {user_name} = useTypedSelector(state => state.auth.user)
    const {fetchGuest, fetchEvents, createEvent} = useActions()

    useEffect(() => {
        fetchGuest();
        fetchEvents(user_name);
    }, [])

    const addNewEvent = (event: ICalendar) => {
        setModalVisible(false)
        createEvent(event, user_name)
    }

    return (
        <Layout>
            <EventCalendar events={events || [] as ICalendar[]}/>
            <Row justify={"center"}>
                <Button onClick={() => setModalVisible(true)}>Добавить Событие</Button>
            </Row>
            <Modal
                title={'Добавить Событие'}
                visible={modalVisible}
                footer={null}
                onCancel={() => setModalVisible(false)}
            >
                <EventForm
                    submit={addNewEvent}
                    guests={guest}
                />
            </Modal>
        </Layout>
    );
};

export default Event;