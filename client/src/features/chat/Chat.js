import React, {useEffect} from "react";
import '../../styles/topBar.scss'
import {useSelector} from "react-redux";
import {selectCurrentToken, selectCurrentUser} from "../auth/authSlice";
import {useNavigate} from "react-router-dom";
export const Chat = () => {
    const user = useSelector(selectCurrentUser);
    const navigate = useNavigate();
    useEffect(() => {
        if (user === null) {
            navigate('/login');
        }}, [])

    const content =
        (<>you are logged in as {user}</>)
    return content;
}

