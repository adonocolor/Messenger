import React from "react";
import {Link} from "react-router-dom";
import {Navbar, Container, Nav, Stack} from "react-bootstrap";
export const NavBar = () => {
    return (
        <Navbar className={'topBar mb-4'}>
            <Container>
                <h2>
                    <Link to={"/"} className={"text-decoration-none"}>
                        Messenger
                    </Link>
                </h2>
                <Nav>
                    <Stack direction={'horizontal'} gap={2}>
                        <Link to={"/register"} className={"text-decoration-none"}>
                            Sign Up
                        </Link>
                        <Link to={'/login'} className={"text-decoration-none"}>
                            Log In
                        </Link>
                    </Stack>
                </Nav>
            </Container>
        </Navbar>
    );
}

