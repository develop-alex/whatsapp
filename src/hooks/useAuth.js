import React from "react";

export const useAuth = () => {
    const [idInstance, setIdInstance] = React.useState('');
    const [apiTokenInstance, setApiTokenInstance] = React.useState('');
    React.useEffect(() => {
        setIdInstance(localStorage.getItem('instance'))
        setApiTokenInstance(localStorage.getItem('token'))
    }, [])
    return !(!idInstance || !apiTokenInstance);
}