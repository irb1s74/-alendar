import React, {FC, useState} from 'react';
import {Button, Form, Input, Row, Select} from "antd";
import {rules} from "../../utils/rules";
import {DatePicker} from "antd/es";
import {IUser} from "../../models/IUser";
import {ICalendar} from "../../models/ICalendar";
import {Moment} from "moment";
import {formatDate} from "../../utils/date";
import {useTypedSelector} from "../../hooks/useTypedSelector";

interface EventFormProps {
    guests: IUser[],
    submit: (event: ICalendar) => void,
}

const EventForm: FC<EventFormProps> = (props) => {
    const {user_name} = useTypedSelector(state => state.auth.user)
    const [event, setEvent] = useState<ICalendar>({
        author: '',
        date: '',
        description: '',
        guest: '',
    } as ICalendar)

    const selectDate = (date: Moment | null) => {
        if (date) {
            setEvent({...event, date: formatDate(date.toDate())})
        }
    }
    const submitForm = () => {
        props.submit({...event, author: user_name})
    }


    return (
        <Form onFinish={submitForm}>
            <Form.Item
                label="Название события"
                name="description"
                rules={[rules.required()]}
            >
                <Input
                    onChange={e => setEvent({...event, description: e.target.value})}
                    value={event.description}/>
            </Form.Item>
            <Form.Item
                label="Дата события"
                name="date"
                rules={[rules.required()]}
            >
                <DatePicker
                    onChange={(date) => selectDate(date)}
                />
            </Form.Item>
            <Form.Item
                label="Выберите гостя"
                name="guest"
                rules={[rules.required()]}
            >
                <Select onChange={(guest: string) => setEvent({...event, guest} as ICalendar)}>
                    {props.guests.map(gusset => (
                        <Select.Option key={gusset.user_name} value={gusset.user_name}>
                            {gusset.user_name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>
            <Row justify={'end'}>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Создать
                    </Button>
                </Form.Item>
            </Row>
        </Form>
    );
};

export default EventForm;