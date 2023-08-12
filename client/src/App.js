import React, {Component} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Chat} from "./features/chat/Chat.js";
import {Login} from "./features/auth/Login.js";
import {Register} from "./features/auth/Register.js";
import {NavBar} from "./partials/NavBar";
import "bootstrap/dist/css/bootstrap.min.css"
import {Container} from "react-bootstrap";
import './styles/main.scss'
class App extends Component {
    render() {
        return (
            <>
                <NavBar />
                <Container>
                    <Routes>
                        <Route path='*' element={<Navigate to="/" />} />
                        <Route path='/' element={<Chat />} />
                        <Route path="/login" element={<Login />} />
                        <Route path='/register' element={<Register />}/>
                    </Routes>
                </Container>
            </>
        )
    }
}

export default App;