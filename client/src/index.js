import React from "react";
import App from "./App";
import {createRoot} from "react-dom/client";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {persistor, store} from "./app/store";
import {PersistGate} from "redux-persist/integration/react";


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <>
        <React.StrictMode>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <BrowserRouter>
                            <App />
                    </BrowserRouter>
                </PersistGate>
            </Provider>
        </React.StrictMode>
    </>);