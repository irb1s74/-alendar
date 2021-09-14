import React, {FC} from 'react';
import {Layout, Menu, Row} from "antd";
import {useHistory} from "react-router-dom";
import {RouteNames} from "../router";
import {useTypedSelector} from "../hooks/useTypedSelector";
import {useActions} from "../hooks/useActions";

const Navbar: FC = () => {
    const router = useHistory()
    const {isAuth, user} = useTypedSelector(state => state.auth)
    const {logout} = useActions();
    return (
        <Layout.Header>
            <Row justify='end'>
                {isAuth ?
                    <React.Fragment>
                        <Menu mode={'horizontal'} theme="dark" selectable={false}>
                            <Menu.Item key={0} style={{color: "#FFF"}}>
                                {user.user_name}
                            </Menu.Item>
                            <Menu.Item key={1} onClick={logout}>Выйти</Menu.Item>
                        </Menu>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Menu mode={'horizontal'} theme="dark" selectable={false}>
                            <Menu.Item key={0} onClick={() => router.push(RouteNames.LOGIN)}>
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