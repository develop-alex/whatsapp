import React from 'react';
import Cart from "../ui/cart/cart";
import Input from "../ui/input/input";
import Loader from "../ui/loader/loader";
import {useNavigate} from 'react-router-dom';
import {CHAT_URL} from "../routes/constants";
import {useAuth} from "../hooks/useAuth";

const LoginComponent = () => {
    const [idInstance, setIdInstance] = React.useState('');
    const [apiTokenInstance, setApiTokenInstance] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    const state = useAuth();

    React.useEffect(() => {
        if (state) navigate(CHAT_URL);
    }, [state, navigate])

    const changeIdInstance = e => {
        setIdInstance(e.target.value);
    }
    const changeApiTokenInstance = e => {
        setApiTokenInstance(e.target.value);
    }

    const login = () => {
        setLoading(true)
        localStorage.setItem('instance', idInstance)
        localStorage.setItem('token', apiTokenInstance)
        navigate(CHAT_URL)
    }

    if (loading){
        return <Loader/>
    }

    return (
        <Cart>
            <h2>GREEN API CHAT - LOGIN FORM</h2>
            <Input
                label='idInstance'
                labelFor='idInstance'
                value={idInstance}
                onChange={changeIdInstance}
            />
            <Input
                label='apiTokenInstance'
                labelFor='apiTokenInstance'
                value={apiTokenInstance}
                onChange={changeApiTokenInstance}
            />
            <Input
                type='submit'
                value='Войти'
                onClick={login}
            />
        </Cart>
    );
};

export default LoginComponent;