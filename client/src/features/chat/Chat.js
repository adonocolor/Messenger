import React, {useEffect} from "react";
import '../../styles/topBar.scss'
import {useDispatch, useSelector} from "react-redux";
import {selectCurrentToken, selectCurrentUser} from "../auth/authSlice";
import {useNavigate} from "react-router-dom";
import {useGetChatsQuery} from "./chatApiSlice";
export const Chat = () => {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);

    const navigate = useNavigate();

    useEffect(() => {
        if (user === null) {
            navigate('/login');
        }}, [])

    const {
        data: chat,
        isFetching,
        isLoading,
    } = useGetChatsQuery()

    const content =
        (<>you are logged in as {user}</>)
    return content;
}

