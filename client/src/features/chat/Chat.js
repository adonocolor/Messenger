import React from "react";
import '../../styles/topBar.scss'
import {useSelector} from "react-redux";
import {selectCurrentToken, selectCurrentUser} from "../auth/authSlice";
export const Chat = () => {
    const user = useSelector(selectCurrentUser);
    const content = user !== null ?
        (<>you are logged in as {user}</>) :
        (<>Placeholder</>)

    return content;
}

