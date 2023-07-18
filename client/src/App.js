import React, {Component} from "react";
import {Navigate, Route, Routes} from "react-router-dom";
import {Chat} from "./pages/Chat.jsx";
import {Login} from "./pages/Login.jsx";
import {Register} from "./pages/Register.jsx";

class App extends Component {
    render() {
        return (
            <>
                <Routes>
                    <Route path='*' element={<Navigate to="/" />} />
                    <Route path='/' element={<Chat />} />
                    <Route path="/login" element={<Login />} />
                    <Route path='/register' element={<Register />}/>
                </Routes>
            </>
        )
    }
}

export default App;