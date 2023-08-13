import React from "react";
import {Link, useNavigate} from "react-router-dom";
import {Navbar, Container, Nav, Stack, Button} from "react-bootstrap";
import {useDispatch, useSelector} from "react-redux";
import {logOut, selectCurrentToken} from "../features/auth/authSlice";
import {useLogoutMutation} from "../features/auth/authApiSlice";

export const NavBar = () => {
    const token = useSelector(selectCurrentToken);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [logout] = useLogoutMutation();
    const signOff = async () => {
        dispatch(logOut());
        await logout();
        navigate('/login');
    }
    const navigation = (
        token !== null ?
            <Button onClick={signOff} className={"text-decoration-none"}>
                Log Out
            </Button> :
            <>
            <Link to={"/register"} className={"text-decoration-none"}>
                Sign Up
            </Link>
            <Link to={'/login'} className={"text-decoration-none"}>
                Log In
            </Link>
            </>
    );

    const content = (
        <Navbar className={'topBar mb-4'}>
            <Container>
                <h2>
                    <Link to={"/"} className={"text-decoration-none"}>
                        Messenger
                    </Link>
                </h2>
                <Nav>
                    <Stack direction={'horizontal'} gap={2}>
                        {navigation}
                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    )
    return content;
}

