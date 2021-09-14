import React, {FC, useState} from "react";
import {Button, Form, Input} from "antd";
import {rules} from "../../utils/rules";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import {useActions} from "../../hooks/useActions";

const LoginForm: FC = () => {
    //
    const {login} = useActions();
    //
    const {error, isLoading} = useTypedSelector((state) => state.auth);
    const [username, setUsername] = useState(" ");
    const [password, setPassword] = useState(" ");

    const auth = () => {
        login(username, password);
    };

    return (
        <Form onFinish={auth}>
            {error && <div style={{color: "red"}}>{error}</div>}
            <Form.Item
                label="Имя пользователя"
                name="user_name"
                rules={[rules.required("Please input your username!")]}
            >
                <Input value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Form.Item>
            <Form.Item
                label="Password"
                name="user_password"
                rules={[rules.required("Please input your password!")]}
            >
                <Input.Password
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit" loading={isLoading}>
                    Войти
                </Button>
            </Form.Item>
        </Form>
    );
};

export default LoginForm;
