import React, {FC} from 'react';
import {Button, Form, Input} from "antd";
import {rules} from "../../utils/rules";
import {useDispatch} from "react-redux";
import {AuthActionCreators} from "../../store/reducers/auth/action-creators";

const LoginForm: FC = () => {
    const dispatch = useDispatch()

    const auth = () => {
        dispatch(AuthActionCreators.login('1', '0'))
    }
    return (
        <Form
            onFinish={auth}
        >
            <Form.Item
                label="Имя пользователя"
                name="user_name"
                rules={[rules.required('Please input your username!')]}
            >
                <Input/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="user_password"
                rules={[rules.required('Please input your password!')]}
            >
                <Input.Password/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;