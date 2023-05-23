import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.sass';
import MessageStore from "./store/messageStore";

export const Context = React.createContext(null);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider
        value={{
            message: new MessageStore(),
        }}
    >
        <App />
    </Context.Provider>
);
