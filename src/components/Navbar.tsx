import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../router/inedx";
import {useTypedSelector} from "../hooks/useTypedSelector";

const Navbar: FC = () => {
    const router = useHistory()
    const {isAuth} = useTypedSelector(state => state.auth)
    return (
        <Layout.Header>
            <Row justify='end'>
                {isAuth ?
                    <React.Fragment>
                        <Menu theme="dark" mode='horizontal' selectable={false}>
                            <Menu.Item style={{color: "#FFF"}}>
                                irb1s
                            </Menu.Item>
                            <Menu.Item onClick={() => router.push(RouteNames.LOGIN)}>Выйти</Menu.Item>
                        </Menu>
                    </React.Fragment>
                    :
                    <React.Fragment>
                            <Menu theme="dark" mode='horizontal' selectable={false}>
                                <Menu.Item onClick={() => router.push(RouteNames.LOGIN)}>
                                    Логин
                                </Menu.Item>
                            </Menu>
                    </React.Fragment>
                }
            </Row>
        </Layout.Header>
    );
};

export default Navbar;